import { CFG } from "./config.js";
import { createGame } from "./game.js";
import { createSoundFx } from "./sound.js";
import { createTrackingController } from "./tracking.js";
import { createUI } from "./ui.js";

const canvas = mustById("gameCanvas");
const cameraVideo = mustById("cameraVideo");
const skeletonCanvas = mustById("skeletonCanvas");
const tutorialOverlay = mustById("tutorialOverlay");
const ui = createUI();
const soundFx = createSoundFx();
const game = createGame(canvas, ui, {
  onJump: () => soundFx.playJump(),
  onLand: () => soundFx.playLand(),
  onFail: () => { soundFx.playFail(); soundFx.stopMusic(); },
  onPlayerAnchor: (x, y) => ui.setFloatingPowerPosition(x, y),
});
game.setCharacter(localStorage.getItem("howl_character") || "boy");

let debugVisible = CFG.DEBUG.SHOW_PANEL;
ui.setDebugVisible(debugVisible);
const tutorial = setupTutorialOverlay();
let lastInputAt = performance.now();
let idleMode = false;

const tracking = createTrackingController({
  videoEl: cameraVideo,
  overlayEl: skeletonCanvas,
  onJumpPower: (power) => {
    markInputActivity();
    ui.updatePower(power);
    game.jumpWithPower(power);
  },
  onRestart: () => game.resetWorld(),
  onToggleDebug: () => {
    debugVisible = !debugVisible;
    ui.setDebugVisible(debugVisible);
  },
  onFullscreen: () => toggleFullscreen(),
  onPowerPreview: (power) => ui.updatePower(power),
  onPoseState: (poseState) => {
    ui.setDebugState(poseState);
    if (poseState === "JUMP") tutorial.dismiss("pose-success");
  },
  onCameraStatus: (status, message) => ui.setCameraStatus(status === "on", message),
  onTrackingMode: () => {},
  onHipY: (y) => ui.setHipY(y),
});
tracking.init();
ui.bindDebugSliders((tuning) => tracking.setTuning(tuning));
ui.bindTrackingModeToggle((mode) => tracking.setLandmarkMode(mode));
applyKioskMode();
loadBranding();
ui.showCharacterSelect((characterId) => {
  game.setCharacter(characterId);
  markInputActivity();
});

ui.refs.restartBtn.addEventListener("click", () => {
  markInputActivity();
  game.resetWorld();
  soundFx.resumeMusic();
});
ui.refs.fullscreenBtn.addEventListener("click", () => toggleFullscreen());
ui.bindGameOverActions(
  () => {
    markInputActivity();
    game.resetWorld();
    soundFx.resumeMusic();
  },
  () => {
    markInputActivity();
    game.resetWorld();
    tutorial.showAgain();
  }
);

function onResize() {
  const rect = canvas.getBoundingClientRect();
  game.resize(rect.width, rect.height);
  const cameraRect = cameraVideo.getBoundingClientRect();
  skeletonCanvas.width = Math.max(1, Math.floor(cameraRect.width));
  skeletonCanvas.height = Math.max(1, Math.floor(cameraRect.height));
}

const resizeObserver = new ResizeObserver(onResize);
resizeObserver.observe(canvas);
onResize();

let lastTs = performance.now();
let fpsAccum = 0;
let fpsFrames = 0;
let fpsTime = 0;
let floatingFadeUntil = 0;

function tick(now) {
  const dt = Math.min(0.033, (now - lastTs) / 1000);
  lastTs = now;

  ui.updatePower(tracking.getCurrentPower());
  const isKeyboard = tracking.getMode() === "keyboard";
  const poseState = tracking.getPoseState();
  const currentPower = tracking.getCurrentPower();
  const isSpaceCharging = tracking.isSpaceCharging();
  if (poseState === "JUMP") floatingFadeUntil = now + 300;
  const forceHide = poseState === "STANDING" || poseState === "COOLDOWN";
  const shouldShowFloating =
    !forceHide && (poseState === "CROUCHING" || isSpaceCharging || (isKeyboard && currentPower > 0) || now < floatingFadeUntil);
  ui.setFloatingPowerVisible(shouldShowFloating);
  game.setCrouch(isKeyboard && tracking.getCrouchValue() > 0);
  game.update(dt);
  game.render();
  updateIdleState(now);

  fpsTime += dt;
  fpsAccum += 1 / Math.max(0.0001, dt);
  fpsFrames += 1;
  if (fpsTime >= 0.4) {
    game.state.fps = fpsAccum / fpsFrames;
    ui.setFps(game.state.fps);
    if (!game.state.player.alive) ui.setDebugState("DEAD");
    fpsAccum = 0;
    fpsFrames = 0;
    fpsTime = 0;
  }

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    return;
  }
  document.exitFullscreen().catch(() => {});
}

function mustById(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing #${id}`);
  return el;
}

window.addEventListener("beforeunload", () => tracking.cleanup());
window.addEventListener("keydown", markInputActivity, { passive: true });
window.addEventListener("pointerdown", markInputActivity, { passive: true });
window.addEventListener("touchstart", markInputActivity, { passive: true });

function setupTutorialOverlay() {
  const tutorialSeenKey = "howl.jump.tutorial.seen";
  const hasSeenTutorial = localStorage.getItem(tutorialSeenKey) === "1";
  if (hasSeenTutorial) {
    return { dismiss: () => {}, showAgain: () => {} };
  }

  tutorialOverlay.classList.remove("hidden");

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    tutorialOverlay.classList.add("hidden");
    localStorage.setItem(tutorialSeenKey, "1");
    tutorialOverlay.removeEventListener("pointerdown", dismiss);
  };

  tutorialOverlay.addEventListener("pointerdown", dismiss);
  window.setTimeout(dismiss, 4000);
  return {
    dismiss,
    showAgain() {
      dismissed = false;
      tutorialOverlay.classList.remove("hidden");
      tutorialOverlay.addEventListener("pointerdown", dismiss);
      window.setTimeout(dismiss, 4000);
    },
  };
}

let musicStarted = false;
function markInputActivity() {
  lastInputAt = performance.now();
  if (!musicStarted) {
    musicStarted = true;
    soundFx.startMusic();
  }
  if (!idleMode) return;
  idleMode = false;
  ui.setAttractVisible(false);
  game.setDemoMode(false);
  soundFx.resumeMusic();
}

function updateIdleState(now) {
  const idleFor = now - lastInputAt;
  if (idleFor < 30000) return;
  if (idleMode) return;
  idleMode = true;
  game.resetWorld();
  game.setDemoMode(true);
  ui.setAttractVisible(true);
}

function applyKioskMode() {
  document.body.classList.add("kiosk-mode");
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "f12" || (e.ctrlKey && e.shiftKey && key === "i") || (e.metaKey && e.altKey && key === "i")) {
      e.preventDefault();
    }
  });
}

async function loadBranding() {
  try {
    const res = await fetch("./config.json", { cache: "no-store" });
    if (!res.ok) return;
    const cfg = await res.json();
    if (cfg && typeof cfg.brandText === "string" && cfg.brandText.trim()) {
      ui.setBrandText(cfg.brandText.trim());
    }
  } catch {
    // Keep default branding when config is unavailable.
  }
}
