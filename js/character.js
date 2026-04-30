export const CHARACTER_ROSTER = {
  boy: {
    id: "boy",
    name: "Boy",
    tag: "Default",
    desc: "The original Howl mascot. Quick on his feet and always ready for the next platform. A reliable all-rounder for any jump challenge.",
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
    desc: "Fearless and full of energy — her vibrant style makes every jump look effortless. Side ponytails, big heart, zero hesitation.",
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
    desc: "AI-powered reflexes, zero hesitation. Engineered for precision and built for peak performance — the tech-head's pick.",
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
    desc: "Silent, swift and deadly precise. Trained in the ancient art of the perfect jump. No noise, no hesitation — only the next platform.",
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
    desc: "Launched from Mission Control with one directive: reach the top. Up here, gravity is just a suggestion.",
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
  // ── Brand Characters ─────────────────────────────────────────────────────
  nike: {
    id: "nike",
    name: "AIR",
    tag: "Nike",
    desc: "Energetic athlete in black Nike tracksuit with iconic white Swoosh. Right-arm pump in idle, wide star pose on jump. Just do it.",
    isNike: true,
    // Kept for roster compatibility
    hair: "#1A1A1A",
    skin: "#FFD5A8",
    eye: "#1A1A1A",
    shirt: "#111111",
    shirtDark: "#000000",
    pants: "#111111",
    pantsDark: "#000000",
    shoe: "#F0F0F0",
    collar: "#333333",
    logo: "✓",
    logoColor: "#FFFFFF",
    hasSkirt: false,
    hasMask: false,
    isRobot: false,
    isAstronaut: false,
    blush: false,
  },
  cocacola: {
    id: "cocacola",
    name: "FIZZY",
    tag: "Coca-Cola",
    desc: "Classic red uniform riding a wave of carbonation. Gentle sway with rising bubbles in idle — shoots up like a freshly opened can.",
    isCocaCola: true,
    hair: "#1A1A1A",
    skin: "#FFCCBC",
    eye: "#1A1A1A",
    shirt: "#CC0000",
    shirtDark: "#990000",
    pants: "#CC0000",
    pantsDark: "#880000",
    shoe: "#FFFFFF",
    collar: "#FFFFFF",
    logo: "~",
    logoColor: "#FFFFFF",
    hasSkirt: false,
    hasMask: false,
    isRobot: false,
    isAstronaut: false,
    blush: true,
  },
};

export function drawVoxelCharacter(ctx, x, y, state, frame, characterId = "boy") {
  const C = CHARACTER_ROSTER[characterId] ?? CHARACTER_ROSTER.boy;
  const mappedState = mapState(state);

  // Per-character idle bob — brand characters have signature rhythm
  let bob = 0;
  if (mappedState === "idle") {
    if (C.isNike)       bob = Math.sin(frame * 0.09) * 4;   // fast, energetic
    else if (C.isCocaCola) bob = Math.sin(frame * 0.03) * 2; // slow, bubbly sway
    else                bob = Math.sin(frame * 0.05) * 2.5;  // default
  }

  ctx.save();
  ctx.translate(x, y + 8);
  ctx.scale(1.5, 1.1);

  if (mappedState === "crouch") ctx.scale(1, 0.76);
  if (mappedState === "jump")   ctx.translate(0, -8);
  if (mappedState === "land") {
    const t = Math.abs(Math.sin(frame * 0.3));
    ctx.scale(1.04, 0.88 + t * 0.12);
  }

  const by = -bob;

  if      (C.isNike)      _drawNike(ctx, by, frame, mappedState);
  else if (C.isCocaCola)  _drawCocaCola(ctx, by, frame, mappedState);
  else if (C.isRobot)     _drawRobot(ctx, by, C);
  else if (C.isAstronaut) _drawAstronaut(ctx, by, C);
  else                    _drawHuman(ctx, by, C);

  ctx.restore();
}

// ─── NIKE "AIR" ───────────────────────────────────────────────────────────────
// Aesthetic: black athletic wear, white Swoosh, headband, energetic arm-pump idle
function _drawNike(ctx, by, frame, state) {
  const skin    = "#FFD5A8";
  const black   = "#111111";
  const jetBlk  = "#000000";
  const white   = "#FFFFFF";
  const grey    = "#444444";

  // ── Arm pump (idle) — right arm curls up and down ──
  const pump    = state === "idle" ? Math.sin(frame * 0.13) * 7 : 0;   // ±7 px
  const pumpDir = pump;   // positive = arm goes up (more negative y)

  // ── SHOES — white Nike Air with black midsole ──────────────────────────
  ctx.fillStyle = "#EEEEEE";
  ctx.fillRect(-13, by - 8, 12, 8);
  ctx.fillRect(1,   by - 8, 12, 8);
  // Black midsole strip
  ctx.fillStyle = black;
  ctx.fillRect(-13, by - 8, 12, 2);
  ctx.fillRect(1,   by - 8, 12, 2);
  // Grey outsole
  ctx.fillStyle = grey;
  ctx.fillRect(-13, by - 2, 12, 2);
  ctx.fillRect(1,   by - 2, 12, 2);

  // ── LEGS — black track pants with white side stripe ───────────────────
  ctx.fillStyle = black;
  ctx.fillRect(-11, by - 19, 10, 13);
  ctx.fillRect(1,   by - 19, 10, 13);
  ctx.fillStyle = jetBlk;
  ctx.fillRect(-1,  by - 19, 2,  13);
  // White side stripe (Nike track pant detail)
  ctx.fillStyle = white;
  ctx.fillRect(-11, by - 19, 2, 13);
  ctx.fillRect(9,   by - 19, 2, 13);

  // ── ARMS ─────────────────────────────────────────────────────────────
  if (state === "jump") {
    // Jump: arms spread wide and raised — athletic star pose
    ctx.fillStyle = skin;
    ctx.fillRect(-19, by - 44, 7, 15);
    ctx.fillRect(12,  by - 44, 7, 15);
    // Wristbands on jump arms
    ctx.fillStyle = white;
    ctx.fillRect(-19, by - 31, 7, 3);
    ctx.fillRect(12,  by - 31, 7, 3);
  } else {
    // Idle / crouch / land: right arm pumps
    ctx.fillStyle = skin;
    ctx.fillRect(-13, by - 35 + pump * 0.3, 6, 14);   // left arm (counter)
    ctx.fillRect(7,   by - 35 - pumpDir,    6, 14);   // right arm pumps up
    // Wristbands
    ctx.fillStyle = white;
    ctx.fillRect(-13, by - 23 + pump * 0.3, 6, 3);
    ctx.fillRect(7,   by - 23 - pumpDir,    6, 3);
  }

  // ── BODY — black jersey ───────────────────────────────────────────────
  ctx.fillStyle = black;
  ctx.fillRect(-11, by - 35, 22, 16);
  // Jersey panel shadow
  ctx.fillStyle = jetBlk;
  ctx.fillRect(-11, by - 35, 5, 16);

  // ── NIKE SWOOSH — white bezier on chest ───────────────────────────────
  // Authentic swoosh: narrow left tip → broad sweep → narrow right tail
  ctx.fillStyle = white;
  ctx.beginPath();
  ctx.moveTo(-7, by - 24);                               // left tip
  ctx.bezierCurveTo(-3, by - 30, 6, by - 29, 11, by - 33); // top arch
  ctx.bezierCurveTo(7,  by - 22, 0,  by - 23, -7, by - 24); // bottom sweep back
  ctx.closePath();
  ctx.fill();

  // ── COLLAR — dark crew neck ───────────────────────────────────────────
  ctx.fillStyle = "#222222";
  ctx.fillRect(-11, by - 40, 22, 5);

  // ── FACE — athletic skin tone ─────────────────────────────────────────
  ctx.fillStyle = skin;
  ctx.fillRect(-13, by - 58, 26, 18);

  // ── HEADBAND — white across forehead ─────────────────────────────────
  ctx.fillStyle = white;
  ctx.fillRect(-14, by - 59, 28, 4);

  // ── HAIR — short black, athletic cut ─────────────────────────────────
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-12, by - 68, 24, 11);
  ctx.fillRect(-2,  by - 70, 4,  3);  // tuft

  // ── EYES — focused/intense ────────────────────────────────────────────
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-9, by - 54, 4, 5);
  ctx.fillRect(5,  by - 54, 4, 5);
  // Shine
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillRect(-9, by - 54, 1, 2);
  ctx.fillRect(5,  by - 54, 1, 2);
  // Determined thick eyebrows
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-11, by - 57, 6, 2);
  ctx.fillRect(5,   by - 57, 6, 2);
  // Nose
  ctx.fillStyle = "rgba(160,80,60,0.3)";
  ctx.fillRect(-1, by - 48, 2, 2);
  // Confident half-smile
  ctx.strokeStyle = "rgba(80,30,20,0.5)";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.arc(0, by - 44, 5, 0.3, Math.PI - 0.3);
  ctx.stroke();

  // ── SPEED LINES — appear at arm-pump peak ─────────────────────────────
  if (state === "idle" && pumpDir > 4) {
    const alpha = (pumpDir - 4) / 3 * 0.5;
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = white;
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(14,  by - 26 - i * 4);
      ctx.lineTo(21,  by - 26 - i * 4);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

// ─── COCA-COLA "FIZZY" ────────────────────────────────────────────────────────
// Aesthetic: classic red uniform, white contour wave, red cap, rising bubbles
function _drawCocaCola(ctx, by, frame, state) {
  const skin    = "#FFCCBC";
  const red     = "#CC0000";
  const dkRed   = "#990000";
  const white   = "#FFFFFF";

  const sway    = state === "idle" ? Math.sin(frame * 0.025) * 1.5 : 0; // gentle lean

  // ── BUBBLES — idle: float up gently; jump: fizz burst outward ─────────
  const numB = state === "jump" ? 7 : 4;
  for (let i = 0; i < numB; i++) {
    const speed = state === "jump" ? 1.8 : 0.55;
    const t = ((frame * speed + i * 18) % 55);
    const alpha = (1 - t / 55) * (state === "jump" ? 0.85 : 0.65);
    if (alpha <= 0) continue;

    let bx, bY;
    if (state === "jump") {
      const angle = (i / numB) * Math.PI * 2;
      bx = Math.cos(angle) * (t * 0.6);
      bY = by - 28 + Math.sin(angle) * (t * 0.5);
    } else {
      bx = sway + Math.sin(frame * 0.04 + i * 1.3) * 5;
      bY = by - 18 - t;
    }
    const br = 1.2 + (i % 3) * 0.6;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(bx, bY, br, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // ── SHOES — red & white classic ───────────────────────────────────────
  ctx.fillStyle = red;
  ctx.fillRect(-12, by - 8, 11, 8);
  ctx.fillRect(1,   by - 8, 11, 8);
  // White stripe on shoe
  ctx.fillStyle = white;
  ctx.fillRect(-12, by - 5, 11, 2);
  ctx.fillRect(1,   by - 5, 11, 2);
  // Sole
  ctx.fillStyle = dkRed;
  ctx.fillRect(-12, by - 8, 11, 2);
  ctx.fillRect(1,   by - 8, 11, 2);

  // ── LEGS — red trousers ───────────────────────────────────────────────
  ctx.fillStyle = red;
  ctx.fillRect(-11, by - 19, 10, 13);
  ctx.fillRect(1,   by - 19, 10, 13);
  ctx.fillStyle = dkRed;
  ctx.fillRect(-1,  by - 19, 2,  13);

  // ── ARMS ─────────────────────────────────────────────────────────────
  if (state === "jump") {
    // Jump: arms shoot upward — launched by fizz!
    ctx.fillStyle = skin;
    ctx.fillRect(-15, by - 46, 6, 16);
    ctx.fillRect(9,   by - 46, 6, 16);
  } else {
    // Idle / crouch: gentle sway
    ctx.fillStyle = skin;
    ctx.fillRect(-13 + sway, by - 35, 6, 14);
    ctx.fillRect(7  + sway,  by - 35, 6, 14);
  }

  // ── BODY — red Coca-Cola uniform ──────────────────────────────────────
  ctx.fillStyle = red;
  ctx.fillRect(-11, by - 35, 22, 16);
  // Uniform side shadow
  ctx.fillStyle = dkRed;
  ctx.fillRect(6,   by - 35, 5, 16);

  // ── COCA-COLA CONTOUR WAVE — white double-wave script on chest ────────
  ctx.strokeStyle = white;
  ctx.lineCap = "round";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-9, by - 27);
  ctx.bezierCurveTo(-4, by - 33, 3, by - 22, 9, by - 27);
  ctx.stroke();
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-8, by - 23);
  ctx.bezierCurveTo(-3, by - 28, 3, by - 18, 8, by - 23);
  ctx.stroke();

  // ── COLLAR — white with red bow tie ───────────────────────────────────
  ctx.fillStyle = white;
  ctx.fillRect(-11, by - 40, 22, 5);
  // Red bow
  ctx.fillStyle = red;
  ctx.beginPath();
  ctx.moveTo(-4, by - 40);
  ctx.lineTo(0,  by - 37);
  ctx.lineTo(4,  by - 40);
  ctx.lineTo(4,  by - 35);
  ctx.lineTo(0,  by - 37);
  ctx.lineTo(-4, by - 35);
  ctx.closePath();
  ctx.fill();

  // ── FACE ──────────────────────────────────────────────────────────────
  ctx.fillStyle = skin;
  ctx.fillRect(-13, by - 58, 26, 18);
  // Rosy cheeks
  ctx.fillStyle = "rgba(255,100,100,0.35)";
  ctx.beginPath();
  ctx.arc(-7, by - 46, 4, 0, Math.PI * 2);
  ctx.arc(7,  by - 46, 4, 0, Math.PI * 2);
  ctx.fill();

  // ── RED CAP — with white Coca-Cola stripe ─────────────────────────────
  // Cap body
  ctx.fillStyle = red;
  ctx.fillRect(-13, by - 68, 26, 14);
  // White horizontal stripe across cap
  ctx.fillStyle = white;
  ctx.fillRect(-13, by - 61, 26, 3);
  // Cap brim (dark red, extends slightly past head)
  ctx.fillStyle = dkRed;
  ctx.fillRect(-15, by - 59, 30, 3);
  // Cap top dome
  ctx.fillStyle = red;
  ctx.fillRect(-9, by - 72, 18, 6);

  // ── EYES — happy, cheerful ────────────────────────────────────────────
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-9, by - 54, 4, 5);
  ctx.fillRect(5,  by - 54, 4, 5);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillRect(-9, by - 54, 1, 2);
  ctx.fillRect(5,  by - 54, 1, 2);
  // Soft eyebrows
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-9, by - 56, 5, 1);
  ctx.fillRect(5,  by - 56, 5, 1);
  // Nose
  ctx.fillStyle = "rgba(160,80,60,0.3)";
  ctx.fillRect(-1, by - 48, 2, 2);
  // Big cheerful smile
  ctx.strokeStyle = "rgba(80,30,20,0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, by - 44, 6, 0.1, Math.PI - 0.1);
  ctx.stroke();
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
  if (state === "JUMP")   return "jump";
  if (state === "LAND")   return "land";
  return "idle";
}

export function getCharacterStateFromFlags(player) {
  if (!player.alive) return "LAND";
  if (player.isGrounded && player.isCrouching) return "CROUCH";
  if (!player.isGrounded) return "JUMP";
  return "IDLE";
}
