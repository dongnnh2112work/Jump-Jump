export const CHARACTER_ROSTER = {
  boy: {
    id: "boy",
    name: "Boy",
    tag: "Default",
    hair: "#5D4037",
    skin: "#FFCCBC",
    eye: "#1A1A1A",
    shirt: "#42A5F5",
    shirtDark: "#1E88E5",
    pants: "#1565C0",
    pantsDark: "#0D47A1",
    shoe: "#212121",
    collar: "#FFFFFF",
    logo: "HW",
    logoColor: "#FFFFFF",
    hasSkirt: false,
    hasMask: false,
    isRobot: false,
    isAstronaut: false,
    blush: false,
  },
  girl: {
    id: "girl",
    name: "Girl",
    tag: "Playful",
    hair: "#6A1B9A",
    skin: "#FFCCBC",
    eye: "#880E4F",
    shirt: "#EC407A",
    shirtDark: "#C2185B",
    pants: "#F48FB1",
    pantsDark: "#EC407A",
    shoe: "#AD1457",
    collar: "#FCE4EC",
    logo: "HW",
    logoColor: "#FFFFFF",
    hasSkirt: true,
    hasMask: false,
    isRobot: false,
    isAstronaut: false,
    blush: true,
  },
  robot: {
    id: "robot",
    name: "Robot",
    tag: "Tech",
    hair: "#37474F",
    skin: null,
    eye: "#00E5FF",
    shirt: "#546E7A",
    shirtDark: "#37474F",
    pants: "#455A64",
    pantsDark: "#263238",
    shoe: "#263238",
    collar: "#78909C",
    logo: "AI",
    logoColor: "#00E5FF",
    hasSkirt: false,
    hasMask: false,
    isRobot: true,
    isAstronaut: false,
    blush: false,
    visor: "#00E5FF",
    glow: "rgba(0,229,255,0.3)",
  },
  ninja: {
    id: "ninja",
    name: "Ninja",
    tag: "Stealth",
    hair: "#000000",
    skin: "#212121",
    eye: "#FFFFFF",
    shirt: "#1A1A1A",
    shirtDark: "#000000",
    pants: "#1A1A1A",
    pantsDark: "#000000",
    shoe: "#B71C1C",
    collar: "#B71C1C",
    logo: "忍",
    logoColor: "#EF5350",
    hasSkirt: false,
    hasMask: true,
    maskColor: "#B71C1C",
    isRobot: false,
    isAstronaut: false,
    blush: false,
    belt: "#B71C1C",
  },
  astronaut: {
    id: "astronaut",
    name: "Astro",
    tag: "Space",
    hair: "#ECEFF1",
    skin: "#FFCCBC",
    eye: "#1A1A1A",
    shirt: "#ECEFF1",
    shirtDark: "#CFD8DC",
    pants: "#CFD8DC",
    pantsDark: "#B0BEC5",
    shoe: "#78909C",
    collar: "#FFFFFF",
    logo: "R",
    logoColor: "#F44336",
    hasSkirt: false,
    hasMask: false,
    isRobot: false,
    isAstronaut: true,
    helmetColor: "#ECEFF1",
    visorColor: "#FFA000",
    stripeColor: "#F44336",
    blush: false,
  },
};

export function drawVoxelCharacter(ctx, x, y, state, frame, characterId = "boy") {
  const C = CHARACTER_ROSTER[characterId] ?? CHARACTER_ROSTER.boy;
  const mappedState = mapState(state);

  let bob = 0;
  if (mappedState === "idle") bob = Math.sin(frame * 0.05) * 2.5;

  ctx.save();
  ctx.translate(x, y + 8);
  ctx.scale(1.5, 1.1);

  if (mappedState === "crouch") ctx.scale(1, 0.76);
  if (mappedState === "jump") ctx.translate(0, -8);
  if (mappedState === "land") {
    const t = Math.abs(Math.sin(frame * 0.3));
    ctx.scale(1.04, 0.88 + t * 0.12);
  }

  const by = -bob;

  if (C.isRobot) _drawRobot(ctx, by, C);
  else if (C.isAstronaut) _drawAstronaut(ctx, by, C);
  else _drawHuman(ctx, by, C);

  ctx.restore();
}

// ─── HUMAN ───────────────────────────────────────────────────────────────────
function _drawHuman(ctx, by, C) {
  const skin = C.skin || "#FFCCBC";
  ctx.textAlign = "center";

  // SHOES — width 12px, height 6px, +1px overhang each side
  ctx.fillStyle = C.shoe;
  ctx.fillRect(-12, by - 6, 11, 6);
  ctx.fillRect(1,   by - 6, 11, 6);

  // LEGS — 10px each, 2px gap (dark)
  if (C.hasSkirt) {
    ctx.fillStyle = C.pants;
    ctx.beginPath();
    ctx.moveTo(-14, by - 6);
    ctx.lineTo(14,  by - 6);
    ctx.lineTo(14,  by - 19);
    ctx.lineTo(-14, by - 19);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = C.pants;
    ctx.fillRect(-11, by - 19, 10, 13);
    ctx.fillRect(1,   by - 19, 10, 13);
    ctx.fillStyle = C.pantsDark;
    ctx.fillRect(-1,  by - 19, 2,  13);
  }

  // BELT (ninja)
  if (C.belt) {
    ctx.fillStyle = C.belt;
    ctx.fillRect(-11, by - 20, 22, 2);
  }

  // ARMS (skin) — 6px wide, extend 2px beyond body, drawn before body
  ctx.fillStyle = skin;
  ctx.fillRect(-13, by - 35, 6, 14);
  ctx.fillRect(7,   by - 35, 6, 14);

  // BODY — 22px wide, 16px tall
  ctx.fillStyle = C.shirt;
  ctx.fillRect(-11, by - 35, 22, 16);
  // Pocket
  ctx.fillStyle = C.shirtDark;
  ctx.fillRect(-8, by - 32, 7, 5);
  // Logo
  ctx.fillStyle = C.logoColor;
  ctx.font = C.logo === "忍" ? 'bold 9px serif' : 'bold 8px "DM Mono", monospace';
  ctx.fillText(C.logo, 3, by - 22);

  // COLLAR — 22px wide, 5px tall
  ctx.fillStyle = C.collar;
  ctx.fillRect(-11, by - 40, 22, 5);

  // MASK (ninja) — covers lower face
  if (C.hasMask) {
    ctx.fillStyle = C.maskColor;
    ctx.fillRect(-13, by - 54, 26, 14);
  }

  // FACE — 26px wide, 18px tall
  ctx.fillStyle = skin;
  ctx.fillRect(-13, by - 58, 26, 18);

  // BLUSH
  if (C.blush) {
    ctx.fillStyle = "rgba(255,100,100,0.35)";
    ctx.beginPath();
    ctx.arc(-7, by - 45, 4, 0, Math.PI * 2);
    ctx.arc(7,  by - 45, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // HAIR BASE — 28px wide, rounded top
  ctx.fillStyle = C.hair;
  ctx.beginPath();
  const hx = -14, hy = by - 68, hw = 28, hh = 12, hr = 5;
  ctx.moveTo(hx + hr, hy);
  ctx.lineTo(hx + hw - hr, hy);
  ctx.quadraticCurveTo(hx + hw, hy, hx + hw, hy + hr);
  ctx.lineTo(hx + hw, hy + hh);
  ctx.lineTo(hx,      hy + hh);
  ctx.lineTo(hx,      hy + hr);
  ctx.quadraticCurveTo(hx, hy, hx + hr, hy);
  ctx.closePath();
  ctx.fill();
  // Top tuft
  ctx.fillRect(-2, by - 70, 4, 3);
  // Girl side hair
  if (C.id === "girl") {
    ctx.fillRect(-18, by - 60, 5, 21);
    ctx.fillRect(13,  by - 60, 5, 21);
  }

  // EYES — 4×5px, drawn over face
  ctx.fillStyle = C.eye;
  ctx.fillRect(-9, by - 54, 4, 5);
  ctx.fillRect(5,  by - 54, 4, 5);
  // Eye shine
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillRect(-9, by - 54, 1, 2);
  ctx.fillRect(5,  by - 54, 1, 2);
  // Eyebrows
  ctx.fillStyle = C.hair;
  ctx.fillRect(-10, by - 56, 5, 1);
  ctx.fillRect(5,   by - 56, 5, 1);
  // Nose dot
  ctx.fillStyle = "rgba(160,80,60,0.3)";
  ctx.fillRect(-1, by - 48, 2, 2);
  // Smile arc
  ctx.strokeStyle = "rgba(80,30,20,0.45)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, by - 44, 5, 0.15, Math.PI - 0.15);
  ctx.stroke();
}

// ─── ROBOT ────────────────────────────────────────────────────────────────────
function _drawRobot(ctx, by, C) {
  ctx.textAlign = "center";

  // Shoes
  ctx.fillStyle = C.shoe;
  ctx.fillRect(-12, by - 6, 11, 6);
  ctx.fillRect(1,   by - 6, 11, 6);
  // Legs
  ctx.fillStyle = C.pants;
  ctx.fillRect(-11, by - 19, 10, 13);
  ctx.fillRect(1,   by - 19, 10, 13);
  ctx.fillStyle = C.pantsDark;
  ctx.fillRect(-1,  by - 19, 2,  13);
  // Arms (metal)
  ctx.fillStyle = C.collar;
  ctx.fillRect(-13, by - 35, 6, 14);
  ctx.fillRect(7,   by - 35, 6, 14);
  // Body
  ctx.fillStyle = C.shirt;
  ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = C.shirtDark;
  ctx.fillRect(-8,  by - 32, 16, 7);
  if (C.glow) { ctx.shadowColor = C.visor; ctx.shadowBlur = 6; }
  ctx.fillStyle = C.logoColor;
  ctx.font = 'bold 7px "DM Mono", monospace';
  ctx.fillText(C.logo, 0, by - 26);
  ctx.shadowBlur = 0;
  // Collar ring
  ctx.fillStyle = C.collar;
  ctx.fillRect(-11, by - 40, 22, 5);
  // Head (metal box)
  ctx.fillStyle = C.hair;
  ctx.fillRect(-13, by - 58, 26, 18);
  // Visor
  if (C.glow) { ctx.shadowColor = C.visor; ctx.shadowBlur = 12; }
  ctx.fillStyle = C.visor;
  ctx.globalAlpha = 0.85;
  ctx.fillRect(-10, by - 53, 20, 9);
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillRect(-9,  by - 52, 7, 3);
  // Head top panel
  ctx.fillStyle = C.hair;
  ctx.fillRect(-13, by - 68, 26, 12);
  // Antenna
  ctx.fillStyle = "#FF5722";
  ctx.fillRect(-1.5, by - 74, 3, 8);
  ctx.beginPath();
  ctx.arc(0, by - 74, 3.5, 0, Math.PI * 2);
  ctx.fill();
}

// ─── ASTRONAUT ────────────────────────────────────────────────────────────────
function _drawAstronaut(ctx, by, C) {
  ctx.textAlign = "center";

  // Shoes
  ctx.fillStyle = C.shoe;
  ctx.fillRect(-12, by - 6, 11, 6);
  ctx.fillRect(1,   by - 6, 11, 6);
  // Legs
  ctx.fillStyle = C.pants;
  ctx.fillRect(-11, by - 19, 10, 13);
  ctx.fillRect(1,   by - 19, 10, 13);
  ctx.fillStyle = C.pantsDark;
  ctx.fillRect(-1,  by - 19, 2,  13);
  // Arms (suit)
  ctx.fillStyle = C.shirt;
  ctx.fillRect(-14, by - 35, 7, 14);
  ctx.fillRect(7,   by - 35, 7, 14);
  // Body
  ctx.fillStyle = C.shirt;
  ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = C.stripeColor;
  ctx.fillRect(-11, by - 33, 4,  13);
  ctx.fillStyle = C.logoColor;
  ctx.font = 'bold 8px "Nunito", sans-serif';
  ctx.fillText(C.logo, 3, by - 22);
  // Collar ring
  ctx.fillStyle = C.collar;
  ctx.fillRect(-11, by - 40, 22, 5);
  // Helmet (big)
  ctx.fillStyle = C.helmetColor;
  ctx.fillRect(-14, by - 68, 28, 28);
  // Visor
  ctx.fillStyle = C.visorColor;
  ctx.globalAlpha = 0.8;
  ctx.fillRect(-10, by - 64, 20, 14);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillRect(-9,  by - 63, 7, 4);
}

function mapState(state) {
  if (state === "CROUCH") return "crouch";
  if (state === "JUMP") return "jump";
  if (state === "LAND") return "land";
  return "idle";
}

export function getCharacterStateFromFlags(player) {
  if (!player.alive) return "LAND";
  if (player.isGrounded && player.isCrouching) return "CROUCH";
  if (!player.isGrounded) return "JUMP";
  return "IDLE";
}
