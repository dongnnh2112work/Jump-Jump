import { CFG } from "./config.js";
import { drawVoxelCharacter, getCharacterStateFromFlags } from "./character.js";
import { drawIsoPlatform, generatePlatforms, appendPlatforms, worldToScreen } from "./platforms.js";
import { pickRandomTheme } from "./theme.js";

export function createGame(canvas, ui, handlers = {}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context unavailable");
  const FADE_OUT_MS = 520;
  const JUMP_PREP_MS = 95;

  const state = {
    camera: { x: 0, y: 0, rotationDeg: 0, targetRotationDeg: 0, pivotX: 0, pivotY: 0, zoom: 1.8 },
    platforms: [],
    player: {
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      alive: true,
      isGrounded: true,
      isCrouching: false,
      currentPlatformId: 0,
      jumpTargetId: null,
      jumpTargetDistance: 0,
      facingDeg: 0,
      targetFacingDeg: 0,
      facingSign: 1,
      pendingJumpMs: 0,
      launchVx: 0,
      launchVy: 0,
      launchVz: 0,
      score: 0,
      landVisualOffX: 0,
      landVisualOffY: 0,
    },
    bestScore: Number(localStorage.getItem("howl_best") ?? "0"),
    fps: 0,
    fadedPlatforms: [],
    successFx: [],
    clouds: [],
    dustFx: [],
    theme: pickRandomTheme(),
    envParticles: [],
    jumpCount: 0,
    sessionScores: parseSessionScores(),
    gameOverShown: false,
    combo: 0,
    comboFxUntil: 0,
    newBestFxUntil: 0,
    shakeFramesLeft: 0,
    demoMode: false,
    demoJumpTimer: 0,
    frame: 0,
    characterId: localStorage.getItem("howl_character") || "boy",
  };

  resetWorld();

  function resetWorld() {
    state.platforms = generatePlatforms(56);
    const start = state.platforms[0];
    state.player.x = start.x;
    state.player.y = start.y;
    state.player.z = start.stack;
    state.player.vx = 0;
    state.player.vy = 0;
    state.player.vz = 0;
    state.player.alive = true;
    state.player.isGrounded = true;
    state.player.isCrouching = false;
    state.player.currentPlatformId = start.id;
    state.player.jumpTargetId = null;
    state.player.jumpTargetDistance = 0;
    state.player.score = 0;
    state.player.facingDeg = 0;
    state.player.targetFacingDeg = 0;
    state.player.facingSign = 1;
    state.player.pendingJumpMs = 0;
    state.player.launchVx = 0;
    state.player.launchVy = 0;
    state.player.launchVz = 0;
    state.player.landVisualOffX = 0;
    state.player.landVisualOffY = 0;
    state.jumpCount = 0;
    state.fadedPlatforms = [];
    state.successFx = [];
    state.theme = pickRandomTheme();
    syncThemeToCss(state.theme);
    const tw = canvas.clientWidth || 1280;
    const th = canvas.clientHeight || 720;
    state.clouds = createClouds(7, tw, th);
    state.envParticles = state.theme.createParticles(tw, th);
    state.dustFx = [];
    state.gameOverShown = false;
    state.combo = 0;
    state.comboFxUntil = 0;
    state.newBestFxUntil = 0;
    state.shakeFramesLeft = 0;
    state.demoJumpTimer = 0;
    ui.hideGameOver();
    ui.updateScore(state.player.score, state.bestScore, state.jumpCount);
  }

  function resize(width, height, dpr = window.devicePixelRatio || 1) {
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function jumpWithPower(power) {
    const player = state.player;
    if (!player.alive || !player.isGrounded || player.pendingJumpMs > 0) return;
    const nextPlatform = state.platforms[player.currentPlatformId + 1];
    if (!nextPlatform) return;

    const dx = nextPlatform.x - player.x;
    const dy = nextPlatform.y - player.y;
    const distance = Math.max(0.01, Math.hypot(dx, dy));
    const push = power / 100;
    const speed = 0.8 + push * 3.6;

    player.launchVx = (dx / distance) * speed;
    player.launchVy = (dy / distance) * speed;
    player.launchVz = -(power * CFG.WORLD.JUMP_VY_FACTOR + CFG.WORLD.JUMP_VY_BASE);
    player.landVisualOffX = 0;
    player.landVisualOffY = 0;
    player.pendingJumpMs = JUMP_PREP_MS;
    player.isCrouching = true;
    player.jumpTargetId = nextPlatform.id;
    player.jumpTargetDistance = distance;
    const nextFacing = directionToAngle(dx, dy);
    player.targetFacingDeg = nextFacing;
    player.facingSign = facingSignFromDirection(dx, dy);
    state.camera.targetRotationDeg = nextFacing;
  }

  function setCrouch(yes) {
    state.player.isCrouching = Boolean(yes) && state.player.isGrounded && state.player.alive;
  }

  function update(dt) {
    state.frame += 1;
    const player = state.player;
    if (!player.alive) return;

    if (player.isGrounded && player.pendingJumpMs > 0) {
      player.pendingJumpMs -= dt * 1000;
      if (player.pendingJumpMs <= 0) {
        player.pendingJumpMs = 0;
        player.vx = player.launchVx;
        player.vy = player.launchVy;
        player.vz = player.launchVz;
        player.isGrounded = false;
        player.isCrouching = false;
        state.jumpCount += 1;
        ui.updateScore(player.score, state.bestScore, state.jumpCount);
        handlers.onJump?.();
      }
    }

    if (state.demoMode && player.isGrounded && player.pendingJumpMs <= 0) {
      state.demoJumpTimer -= dt;
      if (state.demoJumpTimer <= 0) {
        state.demoJumpTimer = 0.45 + Math.random() * 0.42;
        jumpWithPower(38 + Math.random() * 48);
      }
    }

    if (!player.isGrounded) {
      const prevZ = player.z;
      player.vz += CFG.WORLD.GRAVITY * dt;
      player.x += player.vx * dt;
      player.y += player.vy * dt;
      player.z -= player.vz * dt;

      const landingPlatform = findLandingPlatform(player, prevZ);
      if (landingPlatform) {
        const previousPlatformId = player.currentPlatformId;
        // Record where player actually hit relative to block center (before snap)
        player.landVisualOffX = player.x - landingPlatform.x;
        player.landVisualOffY = player.y - landingPlatform.y;
        player.z = landingPlatform.stack;
        player.x = landingPlatform.x;
        player.y = landingPlatform.y;
        player.vx = 0;
        player.vy = 0;
        player.vz = 0;
        player.isGrounded = true;
        player.currentPlatformId = landingPlatform.id;
        player.jumpTargetId = null;
        player.jumpTargetDistance = 0;
        if (landingPlatform.id !== previousPlatformId) {
          state.fadedPlatforms.push({
            id: previousPlatformId,
            startedAt: performance.now(),
          });
        }

        if (!landingPlatform.passed) {
          landingPlatform.passed = true;
          const prevBest = state.bestScore;
          player.score += 1;
          state.bestScore = Math.max(state.bestScore, player.score);
          localStorage.setItem("howl_best", String(state.bestScore));
          ui.updateScore(player.score, state.bestScore, state.jumpCount);
          state.combo += 1;
          state.comboFxUntil = performance.now() + 700;
          if (state.bestScore > prevBest) {
            state.newBestFxUntil = performance.now() + 1200;
          }
          state.successFx.push({
            x: landingPlatform.x,
            y: landingPlatform.y,
            z: landingPlatform.stack,
            startAt: performance.now(),
            points: 1,
          });
          spawnDust(landingPlatform.x, landingPlatform.y, landingPlatform.stack);
          handlers.onLand?.();
        }
      }

      if (player.z < -CFG.WORLD.FLOOR_DEATH_OFFSET) {
        player.alive = false;
        state.combo = 0;
        state.shakeFramesLeft = 3;
        handlers.onFail?.();
      }
    }

    updateCamera();
    updateClouds(dt);
    updateEnvParticles(dt);
    updateDust(dt);
    state.fadedPlatforms = state.fadedPlatforms.filter((item) => performance.now() - item.startedAt < FADE_OUT_MS);
    state.successFx = state.successFx.filter((fx) => performance.now() - fx.startAt < 650);

    // Auto-extend platform track when near the end
    if (player.isGrounded && state.platforms.length - player.currentPlatformId < 14) {
      const more = appendPlatforms(state.platforms, 28);
      state.platforms.push(...more);
    }

    if (!player.alive && !state.gameOverShown) {
      state.gameOverShown = true;
      state.sessionScores.push(player.score);
      state.sessionScores.sort((a, b) => b - a);
      const top5 = state.sessionScores.slice(0, 5);
      localStorage.setItem("howl_session_top5", JSON.stringify(top5));
      ui.showGameOver(player.score, state.bestScore, top5);
    }
  }

  function updateCamera() {
    const player = state.player;
    state.camera.pivotX = player.x;
    state.camera.pivotY = player.y;
    const next = state.platforms[player.currentPlatformId + 1];
    if (next && player.isGrounded) {
      const dx = next.x - player.x;
      const dy = next.y - player.y;
      const nextFacing = directionToAngle(dx, dy);
      player.targetFacingDeg = nextFacing;
      state.camera.targetRotationDeg = nextFacing;
    }
    player.facingDeg = lerpAngleDeg(player.facingDeg, player.targetFacingDeg, 0.2);
    state.camera.rotationDeg = lerpAngleDeg(state.camera.rotationDeg, state.camera.targetRotationDeg, 0.12);

    const halfW = (CFG.ISO.TILE_WIDTH * state.camera.zoom) / 2;
    const halfD = (CFG.ISO.TILE_DEPTH * state.camera.zoom) / 2;
    const desiredX = canvas.clientWidth * 0.5;
    const desiredY = canvas.clientHeight * 0.45;
    const targetCamX = desiredX - (player.x - player.y) * halfW;
    const targetCamY = desiredY - (player.x + player.y) * halfD + player.z * CFG.ISO.TILE_HEIGHT * state.camera.zoom;
    state.camera.x += (targetCamX - state.camera.x) * CFG.CAMERA.FOLLOW_LERP;
    state.camera.y += (targetCamY - state.camera.y) * CFG.CAMERA.FOLLOW_LERP;
  }

  function findLandingPlatform(player, prevZ) {
    if (player.vz < 0) return null;
    if (player.jumpTargetId == null) return null;
    const p = state.platforms[player.jumpTargetId];
    if (!p) return null;
    const platformTop = p.stack;
    // World-space: player descended through platform top this frame
    const crossedTop = prevZ >= platformTop && player.z <= platformTop + 0.3;
    if (!crossedTop) return null;
    const dx = Math.abs(player.x - p.x);
    const dy = Math.abs(player.y - p.y);
    const onTopFace = Math.hypot(dx, dy) <= 0.9;
    console.log("[land]", "prevZ:", prevZ.toFixed(2), "z:", player.z.toFixed(2), "top:", platformTop, "dist:", Math.hypot(dx, dy).toFixed(2), "hit:", onTopFace);
    return onTopFace ? p : null;
  }

  function drawBackground() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
    grad.addColorStop(0, state.theme.sky.top);
    grad.addColorStop(1, state.theme.sky.bottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    drawClouds();
    drawEnvParticles();
  }

  function render() {
    if (state.shakeFramesLeft > 0) {
      const frameSeed = state.shakeFramesLeft;
      const ox = frameSeed % 2 === 0 ? 4 : -4;
      const oy = frameSeed % 3 === 0 ? -4 : 4;
      ctx.save();
      ctx.translate(ox, oy);
      renderWorld();
      ctx.restore();
      state.shakeFramesLeft -= 1;
      return;
    }
    renderWorld();
  }

  function renderWorld() {
    drawBackground();

    const currentId = state.player.currentPlatformId;
    const fadedIds = new Set(state.fadedPlatforms.map((item) => item.id));
    const sorted = state.platforms
      .filter((p) => p.id === currentId || p.id === currentId + 1 || fadedIds.has(p.id))
      .map((p) => ({ ...p, isoX: p.x, isoY: p.y }))
      .sort((a, b) => (a.isoY + a.isoX) - (b.isoY + b.isoX));
    for (const p of sorted) {
      const fadeItem = state.fadedPlatforms.find((item) => item.id === p.id);
      let alpha = 1;
      if (fadeItem) {
        const fadeT = Math.min(1, (performance.now() - fadeItem.startedAt) / FADE_OUT_MS);
        alpha = 1 - fadeT * fadeT;
      }
      if (alpha <= 0.02) continue;

      ctx.save();
      ctx.globalAlpha = alpha;
      const pos = worldToScreen(p.x, p.y, p.z, {
        ...state.camera,
        pivotX: state.camera.pivotX,
        pivotY: state.camera.pivotY,
      });
      const themedColors = state.theme.platformColors(p.type, p.colors);
      drawIsoPlatform(
        ctx,
        pos.x,
        pos.y,
        (p.size?.w ?? CFG.ISO.TILE_WIDTH) * state.camera.zoom,
        (p.size?.d ?? CFG.ISO.TILE_DEPTH) * state.camera.zoom,
        (p.size?.h ?? CFG.ISO.TILE_HEIGHT) * p.stack * state.camera.zoom,
        themedColors,
        p
      );

      ctx.restore();
    }

    const player = state.player;
    const cam = { ...state.camera, pivotX: state.camera.pivotX, pivotY: state.camera.pivotY };
    const playerPos = worldToScreen(player.x, player.y, player.z, cam);

    // ── getPlatformStandY / getPlatformStandX ─────────────────────────────
    // worldToScreen(player.x, player.y, player.z) is shifted UPWARD by
    //   stack * TILE_HEIGHT * zoom  (because player.z = platform.stack, not 0).
    // The platform itself is drawn at z=0, so its top-face top-vertex is at
    //   worldToScreen(p.x, p.y, 0).y  — 72px BELOW playerPos when stack=2.
    // We must add back  stackH = stack * TILE_HEIGHT * zoom  before applying
    // the 65%-depth offset, otherwise the foot floats that many pixels above
    // the actual block surface.
    const curPlat = state.platforms[player.currentPlatformId];
    const curPlatSize = curPlat?.size;
    const isoW = (curPlatSize?.w ?? CFG.ISO.TILE_WIDTH)  * state.camera.zoom;
    const isoD = (curPlatSize?.d ?? CFG.ISO.TILE_DEPTH) * state.camera.zoom;
    // stackH compensates for the z-offset baked into playerPos.y
    const stackH = (curPlat?.stack ?? 0) * CFG.ISO.TILE_HEIGHT * state.camera.zoom;
    // Visual landing offset: where the player actually hit relative to block center.
    // Convert world-space (lox, loy) → iso screen offset so the character appears
    // at the real landing point (center hit = center, edge hit = near edge).
    const halfTileW = CFG.ISO.TILE_WIDTH * state.camera.zoom * 0.5;
    const halfTileD = CFG.ISO.TILE_DEPTH  * state.camera.zoom * 0.5;
    const lox = player.isGrounded ? (player.landVisualOffX ?? 0) : 0;
    const loy = player.isGrounded ? (player.landVisualOffY ?? 0) : 0;
    // Clamp so the character never visually exits the block (max ~40% of half-extent)
    const maxOff = 0.38;
    const clox = Math.max(-maxOff, Math.min(maxOff, lox));
    const cloy = Math.max(-maxOff, Math.min(maxOff, loy));
    const screenOffX = (clox - cloy) * halfTileW;
    const screenOffY = (clox + cloy) * halfTileD;

    const standX = playerPos.x + screenOffX;
    const standY = playerPos.y + stackH + isoD * 0.5 + screenOffY;

    // Shadow ellipse on platform top face — never bobs
    if (player.isGrounded) {
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath();
      ctx.ellipse(standX, standY + 2, 22, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // Verify: diff should be 0 (foot exactly on surface)
      const platPos = worldToScreen(curPlat.x, curPlat.y, curPlat.z, cam);
      const platStandY = platPos.y + isoD * 0.65;
      console.log("standY:", standY.toFixed(1), "platStandY:", platStandY.toFixed(1), "diff:", (standY - platStandY).toFixed(2));
    }

    const charState = getCharacterStateFromFlags(player);
    // Bob is a visual-only offset inside drawVoxelCharacter — standY is ground truth
    drawVoxelCharacter(ctx, standX, standY, charState, state.frame, state.characterId);
    handlers.onPlayerAnchor?.(standX, standY - 90);
    drawDust();
    drawSuccessFx();
    drawHud();
    drawCombo();
    drawNewBest();

  }

  function drawSuccessFx() {
    const now = performance.now();
    for (const fx of state.successFx) {
      const t = Math.min(1, (now - fx.startAt) / 650);
      const pos = worldToScreen(fx.x, fx.y, fx.z, state.camera);
      const y = pos.y + CFG.ISO.TILE_DEPTH * 0.45 * state.camera.zoom;
      const r = 8 + t * 24;
      ctx.save();
      ctx.globalAlpha = 1 - t;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = '700 20px "Nunito"';
      ctx.fillText(`+${fx.points}`, pos.x - 10, y - 20 - t * 26);
      ctx.restore();
    }
  }

  function drawHud() {
    const score = state.player.score;
    const best = state.bestScore;
    ctx.fillStyle = "#ffffff";
    ctx.font = '700 58px "Fredoka One"';
    ctx.fillText(String(score), 18, 66);
    ctx.font = '700 16px "Nunito"';
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(`BEST ${best}`, 20, 88);
  }

  function drawCombo() {
    if (state.combo < 2 || performance.now() > state.comboFxUntil) return;
    ctx.fillStyle = "rgba(255,255,255,0.96)";
    ctx.font = '700 28px "Fredoka One"';
    ctx.fillText(`${state.combo}x COMBO`, canvas.clientWidth * 0.5 - 92, 72);
  }

  function drawNewBest() {
    if (performance.now() > state.newBestFxUntil) return;
    const t = 1 - (state.newBestFxUntil - performance.now()) / 1200;
    ctx.save();
    ctx.globalAlpha = 1 - Math.max(0, t - 0.65) / 0.35;
    ctx.fillStyle = "#FFF176";
    ctx.font = '700 34px "Fredoka One"';
    ctx.fillText("NEW BEST!", canvas.clientWidth * 0.5 - 110, 120 - t * 18);
    ctx.restore();
  }

  function createClouds(count, width, height) {
    const list = [];
    for (let i = 0; i < count; i += 1) {
      const layer = i % 2 === 0 ? "near" : "far";
      const scale = layer === "near" ? rand(0.95, 1.35) : rand(0.55, 0.85);
      const speed = layer === "near" ? rand(14, 24) : rand(7, 13);
      list.push({
        x: rand(-100, width + 140),
        y: rand(40, height * 0.6),
        scale,
        speed,
        alpha: layer === "near" ? 0.72 : 0.55,
      });
    }
    return list;
  }

  function updateClouds(dt) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    for (const c of state.clouds) {
      c.x -= c.speed * dt;
      if (c.x < -140) {
        c.x = width + rand(40, 180);
        c.y = rand(30, height * 0.58);
      }
    }
  }

  function drawClouds() {
    const [cr, cg, cb] = state.theme.cloudRgb;
    for (const c of state.clouds) {
      const w = 70 * c.scale;
      const h = 30 * c.scale;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${c.alpha})`;
      ctx.beginPath();
      ctx.arc(-w * 0.16, h * 0.6, h * 0.52, 0, Math.PI * 2);
      ctx.arc(w * 0.12, h * 0.5, h * 0.62, 0, Math.PI * 2);
      ctx.arc(w * 0.42, h * 0.64, h * 0.42, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnDust(x, y, z) {
    for (let i = 0; i < 9; i += 1) {
      state.dustFx.push({
        x,
        y,
        z,
        vx: rand(-0.34, 0.34),
        vy: rand(-0.34, 0.34),
        vz: rand(0.18, 0.42),
        life: rand(0.22, 0.4),
      });
    }
  }

  function updateDust(dt) {
    for (const p of state.dustFx) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;
      p.vz -= 0.9 * dt;
      p.life -= dt;
    }
    state.dustFx = state.dustFx.filter((p) => p.life > 0);
  }

  function drawDust() {
    for (const p of state.dustFx) {
      const pos = worldToScreen(p.x, p.y, p.z, state.camera);
      ctx.save();
      ctx.globalAlpha = Math.min(1, p.life / 0.4);
      ctx.fillStyle = "rgba(220,220,220,0.95)";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y + CFG.ISO.TILE_DEPTH * 0.42 * state.camera.zoom, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function updateEnvParticles(dt) {
    state.theme.updateParticles(dt, state.envParticles, canvas.clientWidth || 1280, canvas.clientHeight || 720);
  }

  function drawEnvParticles() {
    state.theme.drawParticles(ctx, state.envParticles);
  }

  function syncThemeToCss(theme) {
    const root = document.documentElement;
    root.style.setProperty('--sky-top', theme.sky.top);
    root.style.setProperty('--sky-bottom', theme.sky.bottom);
  }

  return {
    state,
    resize,
    update,
    render,
    jumpWithPower,
    resetWorld,
    setCrouch,
    setCharacter(characterId) {
      state.characterId = characterId || "boy";
      localStorage.setItem("howl_character", state.characterId);
    },
    setDemoMode(yes) {
      state.demoMode = Boolean(yes);
      state.demoJumpTimer = 0;
    },
  };
}

function directionToRightAngle(dx, dy) {
  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? 0 : 180;
  return dy >= 0 ? 90 : -90;
}

function directionToAngle(dx, dy) {
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function lerpAngleDeg(current, target, t) {
  const delta = ((((target - current) % 360) + 540) % 360) - 180;
  return current + delta * t;
}

function facingSignFromDirection(dx, dy) {
  return dx - dy >= 0 ? 1 : -1;
}

function parseSessionScores() {
  try {
    const raw = localStorage.getItem("howl_session_top5");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => Number.isFinite(v)).map(Number) : [];
  } catch {
    return [];
  }
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}
