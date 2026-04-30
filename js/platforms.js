import { CFG } from "./config.js";

export const BLOCK_TYPES = {
  grass: { name: "Grass", top: "#7EC850", left: "#5A9E30", right: "#4A8220", requiredPower: [0, 40], label: "🌿" },
  wood: { name: "Wood", top: "#A1887F", left: "#795548", right: "#6D4C41", requiredPower: [20, 55], label: "🪵" },
  stone: { name: "Stone", top: "#9E9E9E", left: "#757575", right: "#616161", requiredPower: [30, 60], label: "🪨" },
  ice: { name: "Ice", top: "#E1F5FE", left: "#81D4FA", right: "#4FC3F7", requiredPower: [25, 50], label: "🧊", slippery: true },
  lava: {
    name: "Lava",
    top: "#FF7043",
    left: "#BF360C",
    right: "#8D2303",
    requiredPower: [60, 85],
    label: "🌋",
    glow: "rgba(255,112,67,0.3)",
  },
  cloud: { name: "Cloud", top: "#ECEFF1", left: "#CFD8DC", right: "#B0BEC5", requiredPower: [40, 70], label: "☁️", bounce: 1.2 },
  space: { name: "Space", top: "#1A237E", left: "#0D1259", right: "#070B3A", requiredPower: [70, 90], label: "⭐", starParticle: true },
  gold: {
    name: "Gold",
    top: "#FFD600",
    left: "#F9A825",
    right: "#E65100",
    requiredPower: [80, 100],
    label: "💎",
    glow: "rgba(255,214,0,0.4)",
    scoreMultiplier: 2,
  },
};

export const BLOCK_SIZES = {
  grass:  { w: 110, d: 55, h: 22, stacks: 2 },
  wood:   { w: 110, d: 55, h: 22, stacks: 2 },
  stone:  { w: 110, d: 55, h: 22, stacks: 3 },
  ice:    { w: 110, d: 55, h: 22, stacks: 2 },
  lava:   { w: 110, d: 55, h: 22, stacks: 2 },
  cloud:  { w: 110, d: 55, h: 22, stacks: 2 },
  space:  { w: 110, d: 55, h: 22, stacks: 2 },
  gold:   { w: 110, d: 55, h: 22, stacks: 4 },
};

export function worldToScreen(x, y, z, camera) {
  const pivotX = camera.pivotX ?? 0;
  const pivotY = camera.pivotY ?? 0;
  const rotationDeg = camera.rotationDeg ?? 0;
  const theta = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const rx = x - pivotX;
  const ry = y - pivotY;
  const worldX = rx * cos - ry * sin + pivotX;
  const worldY = rx * sin + ry * cos + pivotY;
  const halfW = CFG.ISO.TILE_WIDTH / 2;
  const halfD = CFG.ISO.TILE_DEPTH / 2;
  const zoom = camera.zoom ?? 1;
  const screenX = (worldX - worldY) * halfW * zoom + camera.x;
  const screenY = (worldX + worldY) * halfD * zoom - z * CFG.ISO.TILE_HEIGHT * zoom + camera.y;
  return { x: screenX, y: screenY };
}

export function drawIsoPlatform(ctx, screenX, screenY, w, d, h, colors, platform) {
  const hw = w / 2;
  const hd = d / 2;
  const cx = screenX;
  const cy = screenY;
  const stack = platform?.stack ?? 1;
  const hPerStack = h / Math.max(1, stack);

  if (platform?.typeDef?.glow) {
    ctx.shadowColor = platform.typeDef.glow;
    ctx.shadowBlur = 16;
  }

  // --- TOP FACE — rounded corners via quadraticCurveTo ---
  const L = Math.hypot(hw, hd);
  const t = Math.min(0.1, 10 / L); // corner fraction, max 10px radius
  ctx.beginPath();
  ctx.moveTo(cx + hw * t, cy + hd * t);
  ctx.lineTo(cx + hw * (1 - t), cy + hd * (1 - t));
  ctx.quadraticCurveTo(cx + hw, cy + hd, cx + hw * (1 - t), cy + hd * (1 + t));
  ctx.lineTo(cx + hw * t, cy + d - hd * t);
  ctx.quadraticCurveTo(cx, cy + d, cx - hw * t, cy + d - hd * t);
  ctx.lineTo(cx - hw * (1 - t), cy + hd * (1 + t));
  ctx.quadraticCurveTo(cx - hw, cy + hd, cx - hw * (1 - t), cy + hd * (1 - t));
  ctx.lineTo(cx - hw * t, cy + hd * t);
  ctx.quadraticCurveTo(cx, cy, cx + hw * t, cy + hd * t);
  ctx.closePath();
  ctx.fillStyle = colors.top;
  ctx.fill();

  drawTopDetail(ctx, screenX, screenY, w, d, platform);

  // Top-face edge highlight
  ctx.beginPath();
  ctx.moveTo(cx + hw * t, cy + hd * t);
  ctx.lineTo(cx + hw * (1 - t), cy + hd * (1 - t));
  ctx.quadraticCurveTo(cx + hw, cy + hd, cx + hw * (1 - t), cy + hd * (1 + t));
  ctx.lineTo(cx + hw * t, cy + d - hd * t);
  ctx.quadraticCurveTo(cx, cy + d, cx - hw * t, cy + d - hd * t);
  ctx.lineTo(cx - hw * (1 - t), cy + hd * (1 + t));
  ctx.quadraticCurveTo(cx - hw, cy + hd, cx - hw * (1 - t), cy + hd * (1 - t));
  ctx.lineTo(cx - hw * t, cy + hd * t);
  ctx.quadraticCurveTo(cx, cy, cx + hw * t, cy + hd * t);
  ctx.closePath();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // --- LEFT FACE — top-to-bottom gradient ---
  const lg = ctx.createLinearGradient(cx - hw, cy + hd, cx - hw, cy + hd + h);
  lg.addColorStop(0, colors.left);
  lg.addColorStop(1, darkenColor(colors.left, 0.15));
  ctx.beginPath();
  ctx.moveTo(cx - hw, cy + hd);
  ctx.lineTo(cx, cy + d);
  ctx.lineTo(cx, cy + d + h);
  ctx.lineTo(cx - hw, cy + hd + h);
  ctx.closePath();
  ctx.fillStyle = lg;
  ctx.fill();

  // --- RIGHT FACE — top-to-bottom gradient ---
  const rg = ctx.createLinearGradient(cx + hw, cy + hd, cx + hw, cy + hd + h);
  rg.addColorStop(0, colors.right);
  rg.addColorStop(1, darkenColor(colors.right, 0.2));
  ctx.beginPath();
  ctx.moveTo(cx + hw, cy + hd);
  ctx.lineTo(cx, cy + d);
  ctx.lineTo(cx, cy + d + h);
  ctx.lineTo(cx + hw, cy + hd + h);
  ctx.closePath();
  ctx.fillStyle = rg;
  ctx.fill();

  // --- STACK SEPARATION LINES ---
  if (stack > 1) {
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    for (let s = 1; s < stack; s += 1) {
      ctx.beginPath();
      ctx.moveTo(cx - hw, cy + hd + hPerStack * s);
      ctx.lineTo(cx,      cy + d  + hPerStack * s);
      ctx.lineTo(cx + hw, cy + hd + hPerStack * s);
      ctx.stroke();
    }
  }
}

function darkenColor(hex, amount) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const f = (v) => Math.max(0, Math.floor(v * (1 - amount))).toString(16).padStart(2, "0");
  return `#${f(r)}${f(g)}${f(b)}`;
}

export function generatePlatforms(count = 48) {
  const list = [];
  let worldX = 0;
  let worldY = 0;
  let heading = { x: 1, y: 0 };

  for (let i = 0; i < count; i += 1) {
    let gap = i === 0 ? 0 : 1.3 + Math.random() * 2.2;
    if (i > 1 && Math.random() < 0.58) {
      heading = rotate90(heading, Math.random() < 0.5 ? -1 : 1);
    }
    let nextX = worldX + heading.x * gap;
    let nextY = worldY + heading.y * gap;

    // Avoid visual overlap by enforcing minimum spacing from recent tiles.
    if (i > 2) {
      let tries = 0;
      while (tries < 6 && isTooCloseToRecent(nextX, nextY, list, 6, 1.15)) {
        gap += 0.32;
        nextX = worldX + heading.x * gap;
        nextY = worldY + heading.y * gap;
        tries += 1;
      }
    }
    worldX = nextX;
    worldY = nextY;

    const type = i === 0 ? "grass" : selectBlockType(i);
    const typeDef = BLOCK_TYPES[type];
    const size = BLOCK_SIZES[type];
    const stack = size?.stacks ?? randInt(CFG.ISO.PLATFORM_STACK_MIN, CFG.ISO.PLATFORM_STACK_MAX);
    const requiredPower = i === 0 ? CFG.POWER.MIN : randInt(typeDef.requiredPower[0], typeDef.requiredPower[1]);

    list.push({
      id: i,
      x: worldX,
      y: worldY,
      z: 0,
      stack,
      type,
      typeDef,
      colors: { top: typeDef.top, left: typeDef.left, right: typeDef.right },
      size,
      requiredPower,
      passed: false,
    });
  }

  if (list[0]) {
    list[0].x = 0;
    list[0].y = 0;
    list[0].requiredPower = CFG.POWER.MIN;
  }

  return list;
}

function rotate90(v, dir) {
  return dir < 0 ? { x: v.y, y: -v.x } : { x: -v.y, y: v.x };
}

function isTooCloseToRecent(x, y, list, recentCount, minDist) {
  const startIdx = Math.max(0, list.length - recentCount);
  for (let i = startIdx; i < list.length; i += 1) {
    const p = list[i];
    if (Math.hypot(x - p.x, y - p.y) < minDist) return true;
  }
  return false;
}

function selectBlockType(score) {
  // Mapping difficulty bands from character-block-showcase.html
  if (score < 5) return weightedRandom(["grass", "grass", "wood"]);
  if (score < 10) return weightedRandom(["stone", "ice", "wood", "grass"]);
  if (score < 20) return weightedRandom(["lava", "cloud", "stone", "ice"]);
  if (score < 35) return weightedRandom(["space", "lava", "cloud", "ice"]);
  return weightedRandom(["gold", "space", "lava", "cloud"]);
}

function weightedRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawTopDetail(ctx, screenX, screenY, w, d, platform) {
  const type = platform?.type;
  if (!type) return;
  const hw = w / 2;
  const hd = d / 2;
  const sx = screenX;
  const sy = screenY;
  ctx.save();

  if (type === "grass") {
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    const pts = [
      [sx - hw * 0.2, sy + hd * 0.5],
      [sx + hw * 0.04, sy + hd * 0.72],
      [sx + hw * 0.22, sy + hd * 0.32],
    ];
    for (const [px, py] of pts) ctx.fillRect(px - 3, py - 1.5, 6, 3);
  } else if (type === "stone") {
    ctx.strokeStyle = "rgba(0,0,0,0.22)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(sx - hw * 0.12, sy + hd * 0.85);
    ctx.lineTo(sx + hw * 0.1,  sy + hd * 1.22);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(sx + hw * 0.08, sy + hd * 0.62);
    ctx.lineTo(sx - hw * 0.1,  sy + hd * 1.35);
    ctx.stroke();
  } else if (type === "wood") {
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 0.9;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(sx - hw * 0.32, sy + hd + (i - 1) * hd * 0.32);
      ctx.lineTo(sx + hw * 0.32, sy + hd + (i - 1) * hd * 0.32);
      ctx.stroke();
    }
  } else if (type === "ice") {
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.fillRect(sx - hw * 0.22, sy + hd - 2, hw * 0.22, 4);
  } else if (type === "lava") {
    ctx.fillStyle = "#FFCA28";
    ctx.beginPath();
    ctx.arc(sx - hw * 0.1,  sy + hd * 0.78, hd * 0.06, 0, Math.PI * 2);
    ctx.arc(sx + hw * 0.08, sy + hd * 1.08, hd * 0.08, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "space") {
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 7; i += 1) {
      ctx.fillRect(sx - hw * 0.22 + i * hw * 0.073, sy + hd - 3 + (i % 2) * 5, 2, 2);
    }
  } else if (type === "gold") {
    ctx.strokeStyle = "rgba(0,0,0,0.28)";
    ctx.lineWidth = 1.5;
    const gs = hw * 0.13;
    ctx.beginPath();
    ctx.moveTo(sx,        sy + hd - gs);
    ctx.lineTo(sx + gs * 1.3, sy + hd);
    ctx.lineTo(sx,        sy + hd + gs);
    ctx.lineTo(sx - gs * 1.3, sy + hd);
    ctx.closePath();
    ctx.stroke();
  }

  if (platform?.typeDef?.label) {
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = `${Math.round(Math.max(14, d * 0.15))}px serif`;
    ctx.textAlign = "center";
    ctx.fillText(platform.typeDef.label, sx, sy + hd + d * 0.1);
  }
  ctx.restore();
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
