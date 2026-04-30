import { CFG } from "./config.js";

// Landmark configs per mode
const LANDMARK_CONFIGS = {
  SHOULDER: { ids: [11, 12], minLandmarks: 13 },
  HEAD:     { ids: [0],      minLandmarks: 1  },
  HIP:      { ids: [23, 24], minLandmarks: 25 },
};

const MIN_VISIBILITY = 0.4;
const HISTORY_SIZE = 8;

export function createTrackingController({
  videoEl,
  overlayEl,
  onJumpPower,
  onRestart,
  onToggleDebug,
  onFullscreen,
  onPowerPreview,
  onPoseState,
  onCameraStatus,
  onTrackingMode,
  onHipY,
}) {
  const state = {
    mode: "keyboard",
    landmarkMode: "SHOULDER",   // SHOULDER | HEAD | HIP
    crouchValue: 0,
    isChargingSpace: false,
    chargeStartedAt: 0,
    currentPower: 0,
    poseState: "IDLE",
    standingBaseY: null,
    squatBottomY: null,
    cooldownUntil: 0,
    shoulderHistory: [],
    recentPeakY: 0,    // highest Y seen (= deepest squat) within the squat window
    recentPeakAt: 0,   // timestamp of that peak
    pose: null,
    poseCamera: null,
    trackingReady: false,
    tuning: {
      squatThreshold: 8,    // shoulder moves less than hip — keep low
      jumpThreshold: 6,
      powerMult: 1.2,
      cooldownMs: 400,
    },
  };
  const chargeMinMs = 120;
  const chargeMaxMs = 1200;

  // ─── Keyboard handlers ────────────────────────────────────────────────────
  function onKeyDown(e) {
    if (e.code === "Space") {
      e.preventDefault();
      if (e.repeat || state.isChargingSpace) return;
      state.isChargingSpace = true;
      state.chargeStartedAt = performance.now();
      state.currentPower = CFG.POWER.MIN;
      return;
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      state.crouchValue = Math.min(100, state.crouchValue + 15);
      return;
    }
    if (e.code === "ArrowUp") {
      e.preventDefault();
      const simulatedPower = clamp(30 + state.crouchValue * 0.7, CFG.POWER.MIN, CFG.POWER.MAX);
      state.crouchValue = 0;
      onJumpPower(simulatedPower);
      return;
    }
    if (e.code === "KeyR") { e.preventDefault(); onRestart(); return; }
    if (e.code === "KeyF") { e.preventDefault(); onFullscreen(); return; }
    if (e.code === "KeyD" && e.ctrlKey) { e.preventDefault(); onToggleDebug(); }
  }

  function onKeyUp(e) {
    if (e.code !== "Space") return;
    e.preventDefault();
    if (!state.isChargingSpace) return;
    syncChargePower();
    const power = state.currentPower;
    state.isChargingSpace = false;
    state.currentPower = 0;
    onJumpPower(power);
  }

  function syncChargePower() {
    if (!state.isChargingSpace) return;
    const elapsed = performance.now() - state.chargeStartedAt;
    const t = clamp((elapsed - chargeMinMs) / (chargeMaxMs - chargeMinMs), 0, 1);
    state.currentPower = Math.round(CFG.POWER.MIN + t * (CFG.POWER.MAX - CFG.POWER.MIN));
  }

  // ─── Camera / MediaPipe init ──────────────────────────────────────────────
  async function init() {
    try {
      await initPosePipeline();
      state.mode = "camera";
      onTrackingMode("camera");
      onCameraStatus("on", "Camera tracking active");
    } catch (_error) {
      state.mode = "keyboard";
      onTrackingMode("keyboard");
      onCameraStatus("off", "Camera denied/unavailable. Keyboard fallback active.");
    }
  }

  async function initPosePipeline() {
    await loadMediaPipeScripts();
    const PoseCtor = window.Pose;
    const CameraCtor = window.Camera;
    if (!PoseCtor || !CameraCtor) throw new Error("MediaPipe runtime unavailable");

    const pose = new PoseCtor({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults((results) => {
      processPoseResults(results);
      drawSkeleton(results);
    });

    const camera = new CameraCtor(videoEl, {
      onFrame: async () => { await pose.send({ image: videoEl }); },
      width: 640,
      height: 480,
    });

    await camera.start();
    state.pose = pose;
    state.poseCamera = camera;
    state.trackingReady = true;
  }

  // ─── Pose processing ─────────────────────────────────────────────────────
  // SQUAT_WINDOW_MS: how long to remember the deepest squat point.
  // Jump is valid any time the player pushes UP within this window after squatting.
  const SQUAT_WINDOW_MS = 700;

  function processPoseResults(results) {
    const landmarks = results.poseLandmarks;
    const cfg = LANDMARK_CONFIGS[state.landmarkMode];

    if (!landmarks || landmarks.length < cfg.minLandmarks) return setPoseState("IDLE");

    let sumY = 0, valid = 0;
    for (const id of cfg.ids) {
      const p = landmarks[id];
      if (!p) return setPoseState("IDLE");
      if (p.visibility !== undefined && p.visibility < MIN_VISIBILITY) return setPoseState("IDLE");
      sumY += p.y;
      valid++;
    }
    if (valid === 0) return setPoseState("IDLE");

    const trackYPx = (sumY / valid) * (overlayEl.height || 480);
    const now = performance.now();

    // ── Calibrate baseline ────────────────────────────────────────────────
    if (state.standingBaseY == null) {
      state.standingBaseY = trackYPx;
      state.recentPeakY   = trackYPx;
      state.recentPeakAt  = now;
    }

    // ── Track deepest squat within SQUAT_WINDOW_MS ───────────────────────
    // (Y increases downward, so "deepest" = highest Y value)
    if (trackYPx >= state.recentPeakY) {
      state.recentPeakY  = trackYPx;
      state.recentPeakAt = now;
    } else if (now - state.recentPeakAt > SQUAT_WINDOW_MS) {
      // Peak has expired — reset to current position
      state.recentPeakY  = trackYPx;
      state.recentPeakAt = now;
    }

    // sqDepth = how far below standing baseline the deepest recent squat was
    const sqDepth = Math.max(0, state.recentPeakY - state.standingBaseY);

    // Only update baseline when body is near standing to prevent drift
    if (sqDepth < state.tuning.squatThreshold) {
      state.standingBaseY = state.standingBaseY * 0.97 + trackYPx * 0.03;
    }

    // ── Velocity: use short 3-frame window for explosive-move detection ───
    state.shoulderHistory.unshift(trackYPx);
    if (state.shoulderHistory.length > HISTORY_SIZE) state.shoulderHistory.pop();
    if (state.shoulderHistory.length < 2) return setPoseState("IDLE");

    const vWindow  = Math.min(state.shoulderHistory.length, 3);
    const velocity = state.shoulderHistory[0] - state.shoulderHistory[vWindow - 1];
    // velocity > 0 = moving down (squat), velocity < 0 = moving up (launch)

    onHipY(trackYPx);

    if (state.isChargingSpace) { setPoseState("STANDING"); return; }
    if (now < state.cooldownUntil) { setPoseState("COOLDOWN"); return; }

    // ── Option B: jump detection independent of prior state ───────────────
    // Trigger if: recently squatted deep enough AND now launching upward fast.
    // This catches explosive jumps where squat + launch happen within ~700ms.
    if (sqDepth > state.tuning.squatThreshold && velocity < -state.tuning.jumpThreshold) {
      setPoseState("JUMP");
      const jumpPower = calcJumpPower(Math.abs(velocity), sqDepth, state.tuning.powerMult);
      state.currentPower = jumpPower;
      onPowerPreview(jumpPower);
      onJumpPower(jumpPower);
      state.cooldownUntil = now + state.tuning.cooldownMs;
      // Reset peak so a second consecutive jump needs a fresh squat
      state.recentPeakY  = trackYPx;
      state.recentPeakAt = now;
      return;
    }

    // ── CROUCHING: currently below baseline (show power preview bar) ──────
    const currentDepth = Math.max(0, trackYPx - state.standingBaseY);
    if (currentDepth > state.tuning.squatThreshold) {
      setPoseState("CROUCHING");
      const previewPower = calcJumpPower(0, sqDepth);
      state.currentPower = previewPower;
      onPowerPreview(previewPower);
      return;
    }

    setPoseState("STANDING");
    state.currentPower = 0;
    onPowerPreview(0);
  }

  function setPoseState(next) {
    state.poseState = next;
    onPoseState(next);
  }

  // ─── Skeleton overlay ────────────────────────────────────────────────────
  function drawSkeleton(results) {
    const ctx = overlayEl.getContext("2d");
    if (!ctx) return;
    const { width, height } = overlayEl;
    ctx.clearRect(0, 0, width, height);

    const landmarks = results.poseLandmarks;
    if (!landmarks) return;

    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(200,255,0,0.75)";

    const segments = [
      [11, 12], [11, 23], [12, 24], [23, 24],
      [23, 25], [24, 26], [25, 27], [26, 28],
    ];
    for (const [a, b] of segments) {
      const p1 = landmarks[a];
      const p2 = landmarks[b];
      if (!p1 || !p2) continue;
      ctx.beginPath();
      ctx.moveTo(p1.x * width, p1.y * height);
      ctx.lineTo(p2.x * width, p2.y * height);
      ctx.stroke();
    }

    // Highlight the currently tracked points in orange
    const highlightIds = LANDMARK_CONFIGS[state.landmarkMode].ids;
    for (const id of highlightIds) {
      const p = landmarks[id];
      if (!p) continue;
      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#FF6B35";
      ctx.fill();
    }
    ctx.restore();
  }

  // ─── Public API ──────────────────────────────────────────────────────────
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return {
    init,
    getCrouchValue()  { return state.crouchValue; },
    getCurrentPower() {
      if (state.isChargingSpace) syncChargePower();
      return state.currentPower;
    },
    getMode()         { return state.mode; },
    getPoseState()    { return state.poseState; },
    isSpaceCharging() { return state.isChargingSpace; },
    getLandmarkMode() { return state.landmarkMode; },
    setLandmarkMode(mode) {
      if (!LANDMARK_CONFIGS[mode]) return;
      state.landmarkMode = mode;
      // Fresh calibration for the new landmark
      state.standingBaseY = null;
      state.recentPeakY   = 0;
      state.recentPeakAt  = 0;
      state.shoulderHistory.length = 0;
    },
    setTuning(nextTuning) {
      state.tuning = { ...state.tuning, ...nextTuning };
    },
    cleanup() {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (state.poseCamera && typeof state.poseCamera.stop === "function") state.poseCamera.stop();
    },
  };
}

function calcJumpPower(velocityUp, squatDepth, powerMult = 1.2) {
  // squatDepth for shoulders is ~15-40px vs ~30-60px for hips,
  // so we use a higher base multiplier (2.0) so small movements still generate useful power.
  const raw = velocityUp * 0.8 * powerMult + squatDepth * 2.0;
  return clamp(Math.round(raw), CFG.POWER.MIN, CFG.POWER.MAX);
}

async function loadMediaPipeScripts() {
  await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js", "mediapipe-pose");
  await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js", "mediapipe-camera-utils");
}

function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve();
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload  = () => resolve();
    script.onerror = () => reject(new Error(`Script load failed: ${src}`));
    document.head.appendChild(script);
  });
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
