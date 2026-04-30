import { CHARACTER_ROSTER, drawVoxelCharacter } from "./character.js";

export function createUI() {
  const refs = {
    powerFill: byId("powerFill"),
    powerLabel: byId("powerLabel"),
    scoreValue: byId("scoreValue"),
    bestValue: byId("bestValue"),
    jumpCountValue: byId("jumpCountValue"),
    floatingPower: byId("floatingPower"),
    floatingPowerFill: byId("floatingPowerFill"),
    floatingPowerLabel: byId("floatingPowerLabel"),
    gameStage: byId("gameStage"),
    debugPanel: byId("debugPanel"),
    debugState: byId("debugState"),
    debugFps: byId("debugFps"),
    debugPower: byId("debugPower"),
    debugHipY: byId("debugHipY"),
    btnTrackShoulder: byId("btnTrackShoulder"),
    btnTrackHead:     byId("btnTrackHead"),
    btnTrackHip:      byId("btnTrackHip"),
    sliderSquat: byId("sliderSquat"),
    sliderSquatValue: byId("sliderSquatValue"),
    sliderJump: byId("sliderJump"),
    sliderJumpValue: byId("sliderJumpValue"),
    sliderPowerMult: byId("sliderPowerMult"),
    sliderPowerMultValue: byId("sliderPowerMultValue"),
    sliderCooldown: byId("sliderCooldown"),
    sliderCooldownValue: byId("sliderCooldownValue"),
    restartBtn: byId("restartBtn"),
    fullscreenBtn: byId("fullscreenBtn"),
    cameraStatus: byId("cameraStatus"),
    cameraMessage: byId("cameraMessage"),
    gameOverOverlay: byId("gameOverOverlay"),
    gameOverScore: byId("gameOverScore"),
    gameOverBest: byId("gameOverBest"),
    sessionTop5: byId("sessionTop5"),
    gameOverRetryBtn: byId("gameOverRetryBtn"),
    gameOverHomeBtn: byId("gameOverHomeBtn"),
    brandText: byId("brandText"),
    attractOverlay: byId("attractOverlay"),
    attractBrand: byId("attractBrand"),
  };

  function updatePower(power) {
    const clamped = clamp(power, 0, 100);
    refs.powerFill.style.width = `${clamped}%`;
    const zone = powerZone(clamped);
    refs.powerFill.style.background = zone.color;
    refs.powerLabel.textContent = "";
    refs.debugPower.textContent = clamped.toFixed(0);
    refs.floatingPowerFill.style.width = `${Math.round(clamped)}%`;
    refs.floatingPowerFill.style.background = clamped < 40 ? "#66BB6A" : clamped < 70 ? "#FFA726" : "#EF5350";
    refs.floatingPowerLabel.textContent = `⚡${Math.round(clamped)}`;
  }

  function updateScore(score, best, jumpCount) {
    refs.scoreValue.textContent = String(score);
    refs.bestValue.textContent = String(best);
    refs.jumpCountValue.textContent = String(jumpCount);
  }

  function setDebugVisible(visible) {
    refs.debugPanel.classList.toggle("hidden", !visible);
  }

  function setDebugState(text) {
    refs.debugState.textContent = text;
  }

  function setFps(fps) {
    refs.debugFps.textContent = fps.toFixed(0);
  }

  function setTrackY(y) {
    refs.debugHipY.textContent = y.toFixed(1);
  }
  // keep legacy alias
  const setHipY = setTrackY;

  function bindTrackingModeToggle(onChange) {
    const btns = {
      SHOULDER: refs.btnTrackShoulder,
      HEAD:     refs.btnTrackHead,
      HIP:      refs.btnTrackHip,
    };
    function activate(mode) {
      for (const [m, btn] of Object.entries(btns)) {
        btn.classList.toggle("active", m === mode);
      }
      onChange(mode);
    }
    for (const [mode, btn] of Object.entries(btns)) {
      btn.addEventListener("click", () => activate(mode));
    }
  }

  function setFloatingPowerVisible(visible) {
    if (visible) {
      refs.floatingPower.classList.remove("hidden");
      refs.floatingPower.classList.add("active");
      return;
    }
    refs.floatingPower.classList.remove("active");
    window.setTimeout(() => {
      if (!refs.floatingPower.classList.contains("active")) refs.floatingPower.classList.add("hidden");
    }, 300);
  }

  function setFloatingPowerPosition(x, y) {
    refs.floatingPower.style.left = `${x}px`;
    refs.floatingPower.style.top = `${y}px`;
  }

  function setStageRotation(rotationDeg) {
    refs.gameStage.style.transform = `rotate(${rotationDeg.toFixed(2)}deg)`;
  }

  function setBrandText(text) {
    refs.brandText.textContent = text;
    refs.attractBrand.textContent = text;
  }

  function setCameraStatus(isOn, message) {
    refs.cameraStatus.classList.toggle("status-on", isOn);
    refs.cameraStatus.classList.toggle("status-off", !isOn);
    refs.cameraMessage.textContent = message;
  }

  function showGameOver(score, best, sessionTop5) {
    refs.gameOverScore.textContent = String(score);
    refs.gameOverBest.textContent = String(best);
    refs.sessionTop5.innerHTML = "";
    for (const item of sessionTop5.slice(0, 5)) {
      const li = document.createElement("li");
      li.textContent = String(item);
      refs.sessionTop5.appendChild(li);
    }
    refs.gameOverOverlay.classList.remove("hidden");
  }

  function hideGameOver() {
    refs.gameOverOverlay.classList.add("hidden");
  }

  function setAttractVisible(visible) {
    refs.attractOverlay.classList.toggle("hidden", !visible);
  }

  function bindGameOverActions(onRetry, onHome) {
    refs.gameOverRetryBtn.addEventListener("click", onRetry);
    refs.gameOverHomeBtn.addEventListener("click", onHome);
  }

  function bindDebugSliders(onChange) {
    const emit = () =>
      onChange({
        squatThreshold: Number(refs.sliderSquat.value),
        jumpThreshold: Number(refs.sliderJump.value),
        powerMult: Number(refs.sliderPowerMult.value),
        cooldownMs: Number(refs.sliderCooldown.value),
      });
    const syncLabels = () => {
      refs.sliderSquatValue.textContent = refs.sliderSquat.value;
      refs.sliderJumpValue.textContent = refs.sliderJump.value;
      refs.sliderPowerMultValue.textContent = refs.sliderPowerMult.value;
      refs.sliderCooldownValue.textContent = refs.sliderCooldown.value;
    };
    for (const slider of [refs.sliderSquat, refs.sliderJump, refs.sliderPowerMult, refs.sliderCooldown]) {
      slider.addEventListener("input", () => {
        syncLabels();
        emit();
      });
    }
    syncLabels();
    emit();
  }

  function showCharacterSelect(onConfirm) {
    const existing = document.getElementById("characterSelectOverlay");
    if (existing) existing.remove();
    const ids = Object.keys(CHARACTER_ROSTER);
    let selected = localStorage.getItem("howl_character") || "boy";
    if (!ids.includes(selected)) selected = "boy";
    const overlay = document.createElement("section");
    overlay.id = "characterSelectOverlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "60";
    overlay.style.background = "rgba(0,0,0,0.55)";
    overlay.style.display = "grid";
    overlay.style.placeItems = "center";
    overlay.innerHTML = `
      <div style="width:min(860px,96vw);padding:18px;border-radius:16px;border:1px solid rgba(255,255,255,.35);background:rgba(10,10,20,.72)">
        <div style="font-family:'Fredoka One',cursive;font-size:30px;text-align:center">Choose Character</div>
        <div id="charGrid" style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:14px 0"></div>
        <div style="display:flex;justify-content:center;gap:10px">
          <button id="charPlayBtn" class="ghost-btn" type="button">PLAY</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const grid = overlay.querySelector("#charGrid");
    const slotMap = new Map();
    for (const id of ids) {
      const slot = document.createElement("button");
      slot.type = "button";
      slot.style.background = "rgba(255,255,255,.08)";
      slot.style.border = "2px solid rgba(255,255,255,.2)";
      slot.style.borderRadius = "12px";
      slot.style.padding = "8px";
      slot.style.cursor = "pointer";
      slot.innerHTML = `<canvas width="80" height="100" style="display:block;margin:0 auto"></canvas><div style="font:700 12px Nunito;text-align:center;margin-top:6px">${CHARACTER_ROSTER[id].name}</div>`;
      slot.addEventListener("click", () => {
        selected = id;
        paintSelection();
      });
      grid.appendChild(slot);
      slotMap.set(id, slot);
    }

    const paintSelection = () => {
      for (const [id, slot] of slotMap) {
        slot.style.borderColor = id === selected ? "#c8ff00" : "rgba(255,255,255,.2)";
        slot.style.transform = id === selected ? "scale(1.05)" : "scale(1)";
      }
    };
    paintSelection();

    let frame = 0;
    let raf = 0;
    const renderPreview = () => {
      frame += 1;
      for (const [id, slot] of slotMap) {
        const canvas = slot.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawVoxelCharacter(ctx, canvas.width / 2, canvas.height - 8, "IDLE", frame, id);
      }
      raf = requestAnimationFrame(renderPreview);
    };
    renderPreview();

    const done = () => {
      cancelAnimationFrame(raf);
      overlay.remove();
      localStorage.setItem("howl_character", selected);
      onConfirm(selected);
      window.removeEventListener("keydown", onKey);
    };
    const onKey = (e) => {
      const idx = ids.indexOf(selected);
      if (e.key === "ArrowLeft") {
        selected = ids[(idx - 1 + ids.length) % ids.length];
        paintSelection();
      } else if (e.key === "ArrowRight") {
        selected = ids[(idx + 1) % ids.length];
        paintSelection();
      } else if (e.key === "Enter") {
        done();
      }
    };
    window.addEventListener("keydown", onKey);
    overlay.querySelector("#charPlayBtn").addEventListener("click", done);
  }

  return {
    refs,
    updatePower,
    updateScore,
    setDebugVisible,
    setDebugState,
    setFps,
    setHipY,
    setFloatingPowerVisible,
    setFloatingPowerPosition,
    setStageRotation,
    setBrandText,
    setCameraStatus,
    showGameOver,
    hideGameOver,
    setAttractVisible,
    bindGameOverActions,
    bindDebugSliders,
    bindTrackingModeToggle,
    showCharacterSelect,
  };
}

function powerZone(power) {
  if (power < 40) return { label: "Quá nhẹ", color: "#AED581" };
  if (power < 70) return { label: "Power zone", color: "var(--power-mid)" };
  if (power < 90) return { label: "Mạnh", color: "#FFA726" };
  return { label: "MAX", color: "#EF5350" };
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function byId(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el;
}
