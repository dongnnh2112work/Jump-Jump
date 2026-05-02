export const CHARACTER_ROSTER = {
  boy: {
    id: "boy", name: "Boy", tag: "Default",
    brandColor: "#42A5F5",
    desc: "The original Howl mascot. Quick on his feet and always ready for the next platform. A reliable all-rounder for any jump challenge.",
    hair: "#5D4037", skin: "#FFCCBC", eye: "#1A1A1A",
    shirt: "#42A5F5", shirtDark: "#1E88E5",
    pants: "#1565C0", pantsDark: "#0D47A1",
    shoe: "#212121", collar: "#FFFFFF",
    logo: "HW", logoColor: "#FFFFFF",
    hasSkirt: false, hasMask: false, isRobot: false, isAstronaut: false, blush: false,
  },
  girl: {
    id: "girl", name: "Girl", tag: "Playful",
    brandColor: "#EC407A",
    desc: "Fearless and full of energy — her vibrant style makes every jump look effortless. Side ponytails, big heart, zero hesitation.",
    hair: "#6A1B9A", skin: "#FFCCBC", eye: "#880E4F",
    shirt: "#EC407A", shirtDark: "#C2185B",
    pants: "#F48FB1", pantsDark: "#EC407A",
    shoe: "#AD1457", collar: "#FCE4EC",
    logo: "HW", logoColor: "#FFFFFF",
    hasSkirt: true, hasMask: false, isRobot: false, isAstronaut: false, blush: true,
  },
  robot: {
    id: "robot", name: "Robot", tag: "Tech",
    brandColor: "#00E5FF",
    desc: "AI-powered reflexes, zero hesitation. Engineered for precision and built for peak performance — the tech-head's pick.",
    hair: "#37474F", skin: null, eye: "#00E5FF",
    shirt: "#546E7A", shirtDark: "#37474F",
    pants: "#455A64", pantsDark: "#263238",
    shoe: "#263238", collar: "#78909C",
    logo: "AI", logoColor: "#00E5FF",
    hasSkirt: false, hasMask: false, isRobot: true, isAstronaut: false, blush: false,
    visor: "#00E5FF", glow: "rgba(0,229,255,0.3)",
  },
  ninja: {
    id: "ninja", name: "Ninja", tag: "Stealth",
    brandColor: "#EF5350",
    desc: "Silent, swift and deadly precise. Trained in the ancient art of the perfect jump. No noise, no hesitation — only the next platform.",
    hair: "#000000", skin: "#212121", eye: "#FFFFFF",
    shirt: "#1A1A1A", shirtDark: "#000000",
    pants: "#1A1A1A", pantsDark: "#000000",
    shoe: "#B71C1C", collar: "#B71C1C",
    logo: "忍", logoColor: "#EF5350",
    hasSkirt: false, hasMask: true, maskColor: "#B71C1C",
    isRobot: false, isAstronaut: false, blush: false, belt: "#B71C1C",
  },
  astronaut: {
    id: "astronaut", name: "Astro", tag: "Space",
    brandColor: "#FFA000",
    desc: "Launched from Mission Control with one directive: reach the top. Up here, gravity is just a suggestion.",
    hair: "#ECEFF1", skin: "#FFCCBC", eye: "#1A1A1A",
    shirt: "#ECEFF1", shirtDark: "#CFD8DC",
    pants: "#CFD8DC", pantsDark: "#B0BEC5",
    shoe: "#78909C", collar: "#FFFFFF",
    logo: "R", logoColor: "#F44336",
    hasSkirt: false, hasMask: false, isRobot: false, isAstronaut: true, blush: false,
    helmetColor: "#ECEFF1", visorColor: "#FFA000", stripeColor: "#F44336",
  },

  // ── Brand Characters ──────────────────────────────────────────────────────
  nike: {
    id: "nike", name: "AIR", tag: "Nike",
    brandColor: "#EEEEEE",
    desc: "Energetic athlete in black Nike tracksuit with iconic white Swoosh. Right-arm pump in idle, wide star pose on jump. Just do it.",
    isNike: true,
    hair: "#1A1A1A", skin: "#FFD5A8", eye: "#1A1A1A",
    shirt: "#111111", shirtDark: "#000000",
    pants: "#111111", pantsDark: "#000000",
    shoe: "#F0F0F0", collar: "#333333",
    logo: "✓", logoColor: "#FFFFFF",
    hasSkirt: false, hasMask: false, isRobot: false, isAstronaut: false, blush: false,
  },
  cocacola: {
    id: "cocacola", name: "FIZZY", tag: "Coca-Cola",
    brandColor: "#FF4444",
    desc: "Classic red uniform riding a wave of carbonation. Gentle sway with rising bubbles in idle — shoots up like a freshly opened can.",
    isCocaCola: true,
    hair: "#1A1A1A", skin: "#FFCCBC", eye: "#1A1A1A",
    shirt: "#CC0000", shirtDark: "#990000",
    pants: "#CC0000", pantsDark: "#880000",
    shoe: "#FFFFFF", collar: "#FFFFFF",
    logo: "~", logoColor: "#FFFFFF",
    hasSkirt: false, hasMask: false, isRobot: false, isAstronaut: false, blush: true,
  },
  milo: {
    id: "milo", name: "CHAMP", tag: "Milo",
    brandColor: "#2E8B57",
    desc: "Sports champion fuelled by chocolate malt energy. Both arms pump in victory idle — launches into a full champion raise on jump.",
    isMilo: true,
    hair: "#5D4037", skin: "#FFCD94", eye: "#1A1A1A",
    shirt: "#1B6B3A", shirtDark: "#145A30",
    pants: "#1B6B3A", pantsDark: "#0D3D1E",
    shoe: "#1B6B3A", collar: "#5D4037",
    logo: "★", logoColor: "#F9A825",
    hasSkirt: false, hasMask: false, isRobot: false, isAstronaut: false, blush: false,
  },
  kitkat: {
    id: "kitkat", name: "SNAP", tag: "Kit Kat",
    brandColor: "#CC0000",
    desc: "Take a break, take a Kit Kat. Arms cross and snap in idle — breaks apart on jump like two chocolate fingers flying free.",
    isKitKat: true,
    hair: "#3E2723", skin: "#FFCCBC", eye: "#1A1A1A",
    shirt: "#CC0000", shirtDark: "#990000",
    pants: "#3E2723", pantsDark: "#1A0000",
    shoe: "#CC0000", collar: "#FFFFFF",
    logo: "KK", logoColor: "#FFFFFF",
    hasSkirt: false, hasMask: false, isRobot: false, isAstronaut: false, blush: false,
  },
  pepsi: {
    id: "pepsi", name: "WAVE", tag: "Pepsi",
    brandColor: "#004FC4",
    desc: "Effortlessly cool in Pepsi blue. Ripple rings pulse out in idle. Rides a smooth blue wave arc on every jump.",
    isPepsi: true,
    hair: "#1A1A1A", skin: "#FFCCBC", eye: "#1A1A1A",
    shirt: "#004FC4", shirtDark: "#003087",
    pants: "#003087", pantsDark: "#001F5B",
    shoe: "#EE0000", collar: "#FFFFFF",
    logo: "P", logoColor: "#FFFFFF",
    hasSkirt: false, hasMask: false, isRobot: false, isAstronaut: false, blush: false,
  },
  puma: {
    id: "puma", name: "POUNCE", tag: "Puma",
    brandColor: "#FFCB00",
    desc: "Sleek and predatory in black and gold. Prowls with a low weight-shift in idle — then springs forward in a powerful pounce.",
    isPuma: true,
    hair: "#1A1A1A", skin: "#FFCCBC", eye: "#1A1A1A",
    shirt: "#1A1A1A", shirtDark: "#000000",
    pants: "#1A1A1A", pantsDark: "#000000",
    shoe: "#FFCB00", collar: "#FFCB00",
    logo: "🐆", logoColor: "#FFCB00",
    hasSkirt: false, hasMask: false, isRobot: false, isAstronaut: false, blush: false,
  },
};

// ─── Main draw dispatcher ─────────────────────────────────────────────────────
export function drawVoxelCharacter(ctx, x, y, state, frame, characterId = "boy") {
  const C = CHARACTER_ROSTER[characterId] ?? CHARACTER_ROSTER.boy;
  const mappedState = mapState(state);

  // Per-character idle bob
  let bob = 0;
  if (mappedState === "idle") {
    if      (C.isNike)    bob = Math.sin(frame * 0.09) * 4;
    else if (C.isCocaCola) bob = Math.sin(frame * 0.03) * 2;
    else if (C.isMilo)    bob = Math.sin(frame * 0.10) * 3.5;
    else if (C.isKitKat)  bob = Math.sin(frame * 0.06) * 3;
    else if (C.isPepsi)   bob = Math.sin(frame * 0.035) * 2.5;
    else if (C.isPuma)    bob = Math.sin(frame * 0.045) * 2;
    else                  bob = Math.sin(frame * 0.05) * 2.5;
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

  if      (C.isNike)    _drawNike(ctx, by, frame, mappedState);
  else if (C.isCocaCola) _drawCocaCola(ctx, by, frame, mappedState);
  else if (C.isMilo)    _drawMilo(ctx, by, frame, mappedState);
  else if (C.isKitKat)  _drawKitKat(ctx, by, frame, mappedState);
  else if (C.isPepsi)   _drawPepsi(ctx, by, frame, mappedState);
  else if (C.isPuma)    _drawPuma(ctx, by, frame, mappedState);
  else if (C.isRobot)   _drawRobot(ctx, by, C);
  else if (C.isAstronaut) _drawAstronaut(ctx, by, C);
  else                  _drawHuman(ctx, by, C);

  ctx.restore();
}

// ─── NIKE "AIR" ───────────────────────────────────────────────────────────────
function _drawNike(ctx, by, frame, state) {
  const skin = "#FFD5A8", black = "#111111", jetBlk = "#000000", white = "#FFFFFF", grey = "#444444";
  const pump = state === "idle" ? Math.sin(frame * 0.13) * 7 : 0;

  // Shoes
  ctx.fillStyle = "#EEEEEE";
  ctx.fillRect(-13, by - 8, 12, 8); ctx.fillRect(1, by - 8, 12, 8);
  ctx.fillStyle = black;
  ctx.fillRect(-13, by - 8, 12, 2); ctx.fillRect(1, by - 8, 12, 2);
  ctx.fillStyle = grey;
  ctx.fillRect(-13, by - 2, 12, 2); ctx.fillRect(1, by - 2, 12, 2);

  // Legs
  ctx.fillStyle = black;
  ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
  ctx.fillStyle = jetBlk; ctx.fillRect(-1, by - 19, 2, 13);
  ctx.fillStyle = white;
  ctx.fillRect(-11, by - 19, 2, 13); ctx.fillRect(9, by - 19, 2, 13);

  // Arms
  if (state === "jump") {
    ctx.fillStyle = skin;
    ctx.fillRect(-19, by - 44, 7, 15); ctx.fillRect(12, by - 44, 7, 15);
    ctx.fillStyle = white;
    ctx.fillRect(-19, by - 31, 7, 3); ctx.fillRect(12, by - 31, 7, 3);
  } else {
    ctx.fillStyle = skin;
    ctx.fillRect(-13, by - 35 + pump * 0.3, 6, 14);
    ctx.fillRect(7,   by - 35 - pump,       6, 14);
    ctx.fillStyle = white;
    ctx.fillRect(-13, by - 23 + pump * 0.3, 6, 3);
    ctx.fillRect(7,   by - 23 - pump,       6, 3);
  }

  // Body
  ctx.fillStyle = black; ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = jetBlk; ctx.fillRect(-11, by - 35, 5, 16);

  // Nike Swoosh
  ctx.fillStyle = white;
  ctx.beginPath();
  ctx.moveTo(-7, by - 24);
  ctx.bezierCurveTo(-3, by - 30, 6, by - 29, 11, by - 33);
  ctx.bezierCurveTo(7,  by - 22, 0, by - 23, -7, by - 24);
  ctx.closePath(); ctx.fill();

  // Collar
  ctx.fillStyle = "#222222"; ctx.fillRect(-11, by - 40, 22, 5);

  // Face
  ctx.fillStyle = skin; ctx.fillRect(-13, by - 58, 26, 18);
  ctx.fillStyle = white; ctx.fillRect(-14, by - 59, 28, 4); // headband

  // Hair
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-12, by - 68, 24, 11); ctx.fillRect(-2, by - 70, 4, 3);

  // Eyes
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-9, by - 54, 4, 5); ctx.fillRect(5, by - 54, 4, 5);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillRect(-9, by - 54, 1, 2); ctx.fillRect(5, by - 54, 1, 2);
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-11, by - 57, 6, 2); ctx.fillRect(5, by - 57, 6, 2);
  ctx.fillStyle = "rgba(160,80,60,0.3)"; ctx.fillRect(-1, by - 48, 2, 2);
  ctx.strokeStyle = "rgba(80,30,20,0.5)"; ctx.lineWidth = 1.3;
  ctx.beginPath(); ctx.arc(0, by - 44, 5, 0.3, Math.PI - 0.3); ctx.stroke();

  // Speed lines at pump peak
  if (state === "idle" && pump > 4) {
    ctx.globalAlpha = (pump - 4) / 3 * 0.5;
    ctx.strokeStyle = white; ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(14, by - 26 - i * 4); ctx.lineTo(21, by - 26 - i * 4); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

// ─── COCA-COLA "FIZZY" ────────────────────────────────────────────────────────
function _drawCocaCola(ctx, by, frame, state) {
  const skin = "#FFCCBC", red = "#CC0000", dkRed = "#990000", white = "#FFFFFF";
  const sway = state === "idle" ? Math.sin(frame * 0.025) * 1.5 : 0;

  // Bubbles
  const numB = state === "jump" ? 7 : 4;
  for (let i = 0; i < numB; i++) {
    const speed = state === "jump" ? 1.8 : 0.55;
    const t = ((frame * speed + i * 18) % 55);
    const alpha = (1 - t / 55) * (state === "jump" ? 0.85 : 0.65);
    if (alpha <= 0) continue;
    let bx, bY;
    if (state === "jump") {
      const angle = (i / numB) * Math.PI * 2;
      bx = Math.cos(angle) * (t * 0.6); bY = by - 28 + Math.sin(angle) * (t * 0.5);
    } else {
      bx = sway + Math.sin(frame * 0.04 + i * 1.3) * 5; bY = by - 18 - t;
    }
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath(); ctx.arc(bx, bY, 1.2 + (i % 3) * 0.6, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Shoes
  ctx.fillStyle = red; ctx.fillRect(-12, by - 8, 11, 8); ctx.fillRect(1, by - 8, 11, 8);
  ctx.fillStyle = white; ctx.fillRect(-12, by - 5, 11, 2); ctx.fillRect(1, by - 5, 11, 2);
  ctx.fillStyle = dkRed; ctx.fillRect(-12, by - 8, 11, 2); ctx.fillRect(1, by - 8, 11, 2);

  // Legs
  ctx.fillStyle = red; ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
  ctx.fillStyle = dkRed; ctx.fillRect(-1, by - 19, 2, 13);

  // Arms
  if (state === "jump") {
    ctx.fillStyle = skin;
    ctx.fillRect(-15, by - 46, 6, 16); ctx.fillRect(9, by - 46, 6, 16);
  } else {
    ctx.fillStyle = skin;
    ctx.fillRect(-13 + sway, by - 35, 6, 14); ctx.fillRect(7 + sway, by - 35, 6, 14);
  }

  // Body
  ctx.fillStyle = red; ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = dkRed; ctx.fillRect(6, by - 35, 5, 16);

  // Contour wave
  ctx.strokeStyle = white; ctx.lineCap = "round";
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(-9, by - 27); ctx.bezierCurveTo(-4, by - 33, 3, by - 22, 9, by - 27); ctx.stroke();
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-8, by - 23); ctx.bezierCurveTo(-3, by - 28, 3, by - 18, 8, by - 23); ctx.stroke();

  // Collar + bow
  ctx.fillStyle = white; ctx.fillRect(-11, by - 40, 22, 5);
  ctx.fillStyle = red;
  ctx.beginPath();
  ctx.moveTo(-4, by - 40); ctx.lineTo(0, by - 37); ctx.lineTo(4, by - 40);
  ctx.lineTo(4, by - 35); ctx.lineTo(0, by - 37); ctx.lineTo(-4, by - 35); ctx.closePath(); ctx.fill();

  // Face
  ctx.fillStyle = skin; ctx.fillRect(-13, by - 58, 26, 18);
  ctx.fillStyle = "rgba(255,100,100,0.35)";
  ctx.beginPath(); ctx.arc(-7, by - 46, 4, 0, Math.PI * 2); ctx.arc(7, by - 46, 4, 0, Math.PI * 2); ctx.fill();

  // Cap
  ctx.fillStyle = red; ctx.fillRect(-13, by - 68, 26, 14);
  ctx.fillStyle = white; ctx.fillRect(-13, by - 61, 26, 3);
  ctx.fillStyle = dkRed; ctx.fillRect(-15, by - 59, 30, 3);
  ctx.fillStyle = red; ctx.fillRect(-9, by - 72, 18, 6);

  _drawFace(ctx, by, "#1A1A1A", "#1A1A1A", false, false, true);
}

// ─── MILO "CHAMP" ─────────────────────────────────────────────────────────────
function _drawMilo(ctx, by, frame, state) {
  const skin  = "#FFCD94";
  const green = "#1B6B3A", ltGreen = "#2E8B57", dkGreen = "#0D3D1E";
  const brown = "#5D4037", gold = "#F9A825", white = "#FFFFFF";

  // Both arms pump simultaneously for champion energy
  const pump = state === "idle" ? Math.sin(frame * 0.10) * 6 : 0;

  // Shoes (green with white flash)
  ctx.fillStyle = green; ctx.fillRect(-12, by - 8, 11, 8); ctx.fillRect(1, by - 8, 11, 8);
  ctx.fillStyle = white; ctx.fillRect(-10, by - 6, 7, 2); ctx.fillRect(3, by - 6, 7, 2);
  ctx.fillStyle = dkGreen; ctx.fillRect(-12, by - 8, 11, 2); ctx.fillRect(1, by - 8, 11, 2);

  // Legs (dark green shorts)
  ctx.fillStyle = ltGreen; ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
  ctx.fillStyle = green; ctx.fillRect(-1, by - 19, 2, 13);

  // Arms — both pump up for champion cheer
  if (state === "jump") {
    ctx.fillStyle = skin;
    ctx.fillRect(-17, by - 48, 6, 18); ctx.fillRect(11, by - 48, 6, 18);
  } else {
    ctx.fillStyle = skin;
    ctx.fillRect(-13, by - 35 - pump, 6, 14);
    ctx.fillRect(7,   by - 35 - pump, 6, 14);
  }

  // Body (green jersey)
  ctx.fillStyle = ltGreen; ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = green; ctx.fillRect(-11, by - 35, 4, 16); // shadow panel

  // Milo star + "M" on chest
  ctx.fillStyle = gold;
  _star(ctx, 2, by - 26, 5);

  // Brown collar (chocolate accent)
  ctx.fillStyle = brown; ctx.fillRect(-11, by - 40, 22, 5);

  // Face
  ctx.fillStyle = skin; ctx.fillRect(-13, by - 58, 26, 18);

  // Hair — brown, messy sporty spikes
  ctx.fillStyle = brown;
  ctx.fillRect(-12, by - 68, 24, 12);
  ctx.fillRect(-2, by - 70, 4, 3);
  // Spikes
  ctx.fillRect(-9, by - 71, 4, 5); ctx.fillRect(5, by - 71, 4, 5); ctx.fillRect(-2, by - 72, 4, 4);

  _drawFace(ctx, by, "#1A1A1A", brown, false, false, false);

  // Champion grin (wider smile)
  ctx.strokeStyle = "rgba(80,30,20,0.55)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(0, by - 43, 6, 0.1, Math.PI - 0.1); ctx.stroke();
}

// ─── KIT KAT "SNAP" ───────────────────────────────────────────────────────────
function _drawKitKat(ctx, by, frame, state) {
  const skin  = "#FFCCBC";
  const red   = "#CC0000", dkRed = "#990000";
  const choc  = "#3E2723", ltChoc = "#5D4037", white = "#FFFFFF";

  // Snap animation: arms cross toward center then spread apart
  const snapT = (frame * 0.06) % (Math.PI * 2);
  const armX  = state === "idle" ? Math.cos(snapT) * 5 : 0; // -5 = crossed, +5 = open

  // Chocolate scatter on jump
  if (state === "jump") {
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI * 0.3;
      const dist = 10 + i * 3;
      const cx = Math.cos(angle) * dist, cy = by - 30 + Math.sin(angle) * dist;
      ctx.fillStyle = i % 2 === 0 ? choc : ltChoc;
      ctx.fillRect(cx - 2, cy - 1.5, 5, 3);
    }
  }

  // Shoes (red)
  ctx.fillStyle = red; ctx.fillRect(-12, by - 7, 11, 7); ctx.fillRect(1, by - 7, 11, 7);
  ctx.fillStyle = dkRed; ctx.fillRect(-12, by - 7, 11, 2); ctx.fillRect(1, by - 7, 11, 2);

  // Legs (chocolate brown)
  ctx.fillStyle = choc; ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
  ctx.fillStyle = "#1A0000"; ctx.fillRect(-1, by - 19, 2, 13);

  // Arms with snap motion
  if (state === "jump") {
    ctx.fillStyle = skin;
    ctx.fillRect(-18, by - 38, 6, 14); ctx.fillRect(12, by - 38, 6, 14);
  } else {
    ctx.fillStyle = skin;
    // Left arm swings right (toward center), right arm swings left
    ctx.fillRect(-13 + armX, by - 35, 6, 14);
    ctx.fillRect(7  - armX,  by - 35, 6, 14);
  }

  // Body (red jersey)
  ctx.fillStyle = red; ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = dkRed; ctx.fillRect(-11, by - 35, 5, 16);

  // Kit Kat double-bar logo on chest
  ctx.fillStyle = choc;
  ctx.fillRect(-8, by - 31, 7, 5);
  ctx.fillRect(1,  by - 31, 7, 5);
  ctx.fillStyle = white;
  ctx.fillRect(-1, by - 31, 2, 5); // gap between fingers
  // "break" score lines on each bar
  ctx.fillStyle = ltChoc;
  ctx.fillRect(-6, by - 30, 1, 3); ctx.fillRect(-3, by - 30, 1, 3);
  ctx.fillRect(3,  by - 30, 1, 3); ctx.fillRect(6,  by - 30, 1, 3);

  // White collar
  ctx.fillStyle = white; ctx.fillRect(-11, by - 40, 22, 5);

  // Face
  ctx.fillStyle = skin; ctx.fillRect(-13, by - 58, 26, 18);

  // Hair (dark chocolate brown)
  ctx.fillStyle = choc;
  ctx.fillRect(-12, by - 68, 24, 12); ctx.fillRect(-2, by - 70, 4, 3);

  _drawFace(ctx, by, "#1A1A1A", choc, false, false, false);
}

// ─── PEPSI "WAVE" ─────────────────────────────────────────────────────────────
function _drawPepsi(ctx, by, frame, state) {
  const skin  = "#FFCCBC";
  const blue  = "#004FC4", dkBlue = "#003087", ltBlue = "#1A6AE0";
  const red   = "#EE0000", white = "#FFFFFF";

  const sway = state === "idle" ? Math.sin(frame * 0.035) * 2 : 0; // cool confident lean

  // Ripple rings (idle + jump)
  if (state === "idle" || state === "jump") {
    const numRings = state === "jump" ? 4 : 3;
    for (let i = 0; i < numRings; i++) {
      const speed = state === "jump" ? 0.05 : 0.025;
      const t = ((frame * speed + i * 0.33) % 1);
      const r = t * (state === "jump" ? 28 : 20);
      const alpha = (1 - t) * (state === "jump" ? 0.5 : 0.22);
      if (alpha <= 0) continue;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = i % 2 === 0 ? blue : red;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(sway, by - 30, r, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Shoes (red — Pepsi globe red)
  ctx.fillStyle = red; ctx.fillRect(-12, by - 7, 11, 7); ctx.fillRect(1, by - 7, 11, 7);
  ctx.fillStyle = dkBlue; ctx.fillRect(-12, by - 7, 11, 2); ctx.fillRect(1, by - 7, 11, 2);

  // Legs (dark blue)
  ctx.fillStyle = dkBlue; ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
  ctx.fillStyle = "#001F5B"; ctx.fillRect(-1, by - 19, 2, 13);

  // Arms
  if (state === "jump") {
    ctx.fillStyle = skin;
    ctx.fillRect(-17, by - 44, 6, 15); ctx.fillRect(11, by - 44, 6, 15);
  } else {
    ctx.fillStyle = skin;
    ctx.fillRect(-13 + sway, by - 35, 6, 14); ctx.fillRect(7 + sway, by - 35, 6, 14);
  }

  // Body (Pepsi blue jersey)
  ctx.fillStyle = blue; ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = ltBlue; ctx.fillRect(5, by - 35, 6, 16); // highlight panel

  // Pepsi globe on chest
  // Globe circle
  ctx.save();
  ctx.beginPath(); ctx.arc(1, by - 27, 7, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = blue;  ctx.fillRect(-6, by - 34, 14, 7); // top half blue
  ctx.fillStyle = red;   ctx.fillRect(-6, by - 27, 14, 7); // bottom half red
  // White wavy divider
  ctx.fillStyle = white;
  ctx.beginPath();
  ctx.moveTo(-6, by - 27);
  ctx.bezierCurveTo(-2, by - 30, 4, by - 24, 8, by - 27);
  ctx.lineTo(8, by - 26); ctx.bezierCurveTo(4, by - 23, -2, by - 29, -6, by - 26);
  ctx.closePath(); ctx.fill();
  ctx.restore();
  // Globe outline
  ctx.strokeStyle = dkBlue; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(1, by - 27, 7, 0, Math.PI * 2); ctx.stroke();

  // White collar
  ctx.fillStyle = white; ctx.fillRect(-11, by - 40, 22, 5);

  // Face
  ctx.fillStyle = skin; ctx.fillRect(-13, by - 58, 26, 18);

  // Hair (dark, slick back)
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(-12, by - 68, 24, 12); ctx.fillRect(-2, by - 70, 4, 3);
  // Slick-back detail
  ctx.fillRect(-12, by - 59, 24, 3);

  _drawFace(ctx, by, "#1A1A1A", "#1A1A1A", false, false, false);
}

// ─── PUMA "POUNCE" ────────────────────────────────────────────────────────────
function _drawPuma(ctx, by, frame, state) {
  const skin = "#FFCCBC";
  const black = "#1A1A1A", jetBlk = "#000000", gold = "#FFCB00", dkGold = "#C9A200";

  // Prowl shift: body weight moves left-right with slight downward press
  const prowlX = state === "idle" ? Math.sin(frame * 0.04) * 3 : 0;
  const prowlY = state === "idle" ? Math.abs(Math.sin(frame * 0.04)) * 1.5 : 0; // slight squat

  // Speed streaks on jump
  if (state === "jump") {
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = gold; ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      const sx = -14 - i * 5, sy = by - 25 - i * 6;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx - 8, sy + 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Shoes (gold — Puma sole)
  ctx.fillStyle = gold; ctx.fillRect(-12, by - 8, 11, 8); ctx.fillRect(1, by - 8, 11, 8);
  ctx.fillStyle = dkGold; ctx.fillRect(-12, by - 8, 11, 2); ctx.fillRect(1, by - 8, 11, 2);
  ctx.fillStyle = black; ctx.fillRect(-12, by - 6, 11, 4); ctx.fillRect(1, by - 6, 11, 4);

  // Legs (black, form-fitting)
  ctx.fillStyle = black; ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
  ctx.fillStyle = jetBlk; ctx.fillRect(-1, by - 19, 2, 13);
  // Gold side seam
  ctx.fillStyle = gold; ctx.fillRect(9, by - 19, 2, 13); ctx.fillRect(-11, by - 19, 2, 13);

  // Arms — prowl lean shifts arms
  if (state === "jump") {
    // Pounce: forward lean with arms tucked-forward
    ctx.fillStyle = skin;
    ctx.fillRect(-16, by - 42, 6, 16); ctx.fillRect(10, by - 42, 6, 16);
  } else {
    ctx.fillStyle = skin;
    ctx.fillRect(-13 + prowlX * 0.5, by - 35 + prowlY, 6, 14);
    ctx.fillRect(7  + prowlX * 0.5, by - 35 + prowlY, 6, 14);
  }

  // Body (black with gold trim)
  ctx.fillStyle = black; ctx.fillRect(-11, by - 35, 22, 16);
  // Gold shoulder stripe
  ctx.fillStyle = gold;
  ctx.fillRect(-11, by - 35, 22, 3);
  ctx.fillRect(-11, by - 35, 3, 16); // left gold stripe

  // Puma leaping cat silhouette on chest
  ctx.fillStyle = gold;
  // Cat body (elongated diagonal)
  ctx.beginPath();
  ctx.moveTo(-2, by - 23); ctx.lineTo(7, by - 31); ctx.lineTo(9, by - 29);
  ctx.lineTo(0, by - 21); ctx.closePath(); ctx.fill();
  // Cat head
  ctx.beginPath(); ctx.arc(8, by - 31, 3, 0, Math.PI * 2); ctx.fill();
  // Cat ear
  ctx.beginPath(); ctx.moveTo(7, by - 34); ctx.lineTo(9, by - 37); ctx.lineTo(11, by - 34); ctx.closePath(); ctx.fill();
  // Back legs
  ctx.fillRect(-5, by - 25, 4, 3); ctx.fillRect(-5, by - 21, 3, 3);
  // Front paw reaching
  ctx.fillRect(9, by - 30, 5, 2);

  // Gold collar
  ctx.fillStyle = gold; ctx.fillRect(-11, by - 40, 22, 5);
  ctx.fillStyle = dkGold; ctx.fillRect(-11, by - 38, 22, 2);

  // Face
  ctx.fillStyle = skin; ctx.fillRect(-13, by - 58, 26, 18);

  // Hair (black, sharp/angular)
  ctx.fillStyle = black;
  ctx.fillRect(-12, by - 68, 24, 12); ctx.fillRect(-2, by - 70, 4, 3);
  // Slicked angular style
  ctx.fillRect(6, by - 68, 6, 6);   // right side sharp cut
  ctx.fillRect(-12, by - 68, 6, 6); // left side sharp cut

  _drawFace(ctx, by, "#1A1A1A", "#1A1A1A", false, false, false);
}

// ─── Shared face helper (eyes, brows, nose, smile) ───────────────────────────
function _drawFace(ctx, by, eyeColor, browColor, blush, hasShine, bigSmile) {
  if (blush) {
    ctx.fillStyle = "rgba(255,100,100,0.35)";
    ctx.beginPath(); ctx.arc(-7, by - 46, 4, 0, Math.PI * 2); ctx.arc(7, by - 46, 4, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = eyeColor;
  ctx.fillRect(-9, by - 54, 4, 5); ctx.fillRect(5, by - 54, 4, 5);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillRect(-9, by - 54, 1, 2); ctx.fillRect(5, by - 54, 1, 2);
  ctx.fillStyle = browColor;
  ctx.fillRect(-10, by - 56, 5, 1); ctx.fillRect(5, by - 56, 5, 1);
  ctx.fillStyle = "rgba(160,80,60,0.3)"; ctx.fillRect(-1, by - 48, 2, 2);
  ctx.strokeStyle = "rgba(80,30,20,0.45)"; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.arc(0, by - 44, bigSmile ? 6 : 5, 0.15, Math.PI - 0.15); ctx.stroke();
}

// ─── Star helper ─────────────────────────────────────────────────────────────
function _star(ctx, cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a  = (i * 4 * Math.PI / 5) - Math.PI / 2;
    const ai = ((i * 4 + 2) * Math.PI / 5) - Math.PI / 2;
    if (i === 0) ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    else         ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    ctx.lineTo(cx + r * 0.42 * Math.cos(ai), cy + r * 0.42 * Math.sin(ai));
  }
  ctx.closePath(); ctx.fill();
}

// ─── HUMAN ───────────────────────────────────────────────────────────────────
function _drawHuman(ctx, by, C) {
  const skin = C.skin || "#FFCCBC";
  ctx.textAlign = "center";

  ctx.fillStyle = C.shoe;
  ctx.fillRect(-12, by - 6, 11, 6); ctx.fillRect(1, by - 6, 11, 6);

  if (C.hasSkirt) {
    ctx.fillStyle = C.pants;
    ctx.beginPath();
    ctx.moveTo(-14, by - 6); ctx.lineTo(14, by - 6);
    ctx.lineTo(14, by - 19); ctx.lineTo(-14, by - 19); ctx.closePath(); ctx.fill();
  } else {
    ctx.fillStyle = C.pants;
    ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
    ctx.fillStyle = C.pantsDark; ctx.fillRect(-1, by - 19, 2, 13);
  }

  if (C.belt) { ctx.fillStyle = C.belt; ctx.fillRect(-11, by - 20, 22, 2); }

  ctx.fillStyle = skin;
  ctx.fillRect(-13, by - 35, 6, 14); ctx.fillRect(7, by - 35, 6, 14);

  ctx.fillStyle = C.shirt; ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = C.shirtDark; ctx.fillRect(-8, by - 32, 7, 5);
  ctx.fillStyle = C.logoColor;
  ctx.font = C.logo === "忍" ? 'bold 9px serif' : 'bold 8px "DM Mono", monospace';
  ctx.fillText(C.logo, 3, by - 22);

  ctx.fillStyle = C.collar; ctx.fillRect(-11, by - 40, 22, 5);

  if (C.hasMask) { ctx.fillStyle = C.maskColor; ctx.fillRect(-13, by - 54, 26, 14); }

  ctx.fillStyle = skin; ctx.fillRect(-13, by - 58, 26, 18);

  if (C.blush) {
    ctx.fillStyle = "rgba(255,100,100,0.35)";
    ctx.beginPath(); ctx.arc(-7, by - 45, 4, 0, Math.PI * 2); ctx.arc(7, by - 45, 4, 0, Math.PI * 2); ctx.fill();
  }

  ctx.fillStyle = C.hair;
  ctx.beginPath();
  const hx = -14, hy = by - 68, hw = 28, hh = 12, hr = 5;
  ctx.moveTo(hx + hr, hy); ctx.lineTo(hx + hw - hr, hy);
  ctx.quadraticCurveTo(hx + hw, hy, hx + hw, hy + hr);
  ctx.lineTo(hx + hw, hy + hh); ctx.lineTo(hx, hy + hh);
  ctx.lineTo(hx, hy + hr); ctx.quadraticCurveTo(hx, hy, hx + hr, hy);
  ctx.closePath(); ctx.fill();
  ctx.fillRect(-2, by - 70, 4, 3);
  if (C.id === "girl") { ctx.fillRect(-18, by - 60, 5, 21); ctx.fillRect(13, by - 60, 5, 21); }

  ctx.fillStyle = C.eye;
  ctx.fillRect(-9, by - 54, 4, 5); ctx.fillRect(5, by - 54, 4, 5);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillRect(-9, by - 54, 1, 2); ctx.fillRect(5, by - 54, 1, 2);
  ctx.fillStyle = C.hair;
  ctx.fillRect(-10, by - 56, 5, 1); ctx.fillRect(5, by - 56, 5, 1);
  ctx.fillStyle = "rgba(160,80,60,0.3)"; ctx.fillRect(-1, by - 48, 2, 2);
  ctx.strokeStyle = "rgba(80,30,20,0.45)"; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.arc(0, by - 44, 5, 0.15, Math.PI - 0.15); ctx.stroke();
}

// ─── ROBOT ───────────────────────────────────────────────────────────────────
function _drawRobot(ctx, by, C) {
  ctx.textAlign = "center";
  ctx.fillStyle = C.shoe;
  ctx.fillRect(-12, by - 6, 11, 6); ctx.fillRect(1, by - 6, 11, 6);
  ctx.fillStyle = C.pants;
  ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
  ctx.fillStyle = C.pantsDark; ctx.fillRect(-1, by - 19, 2, 13);
  ctx.fillStyle = C.collar;
  ctx.fillRect(-13, by - 35, 6, 14); ctx.fillRect(7, by - 35, 6, 14);
  ctx.fillStyle = C.shirt; ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = C.shirtDark; ctx.fillRect(-8, by - 32, 16, 7);
  if (C.glow) { ctx.shadowColor = C.visor; ctx.shadowBlur = 6; }
  ctx.fillStyle = C.logoColor;
  ctx.font = 'bold 7px "DM Mono", monospace'; ctx.fillText(C.logo, 0, by - 26);
  ctx.shadowBlur = 0;
  ctx.fillStyle = C.collar; ctx.fillRect(-11, by - 40, 22, 5);
  ctx.fillStyle = C.hair; ctx.fillRect(-13, by - 58, 26, 18);
  if (C.glow) { ctx.shadowColor = C.visor; ctx.shadowBlur = 12; }
  ctx.fillStyle = C.visor; ctx.globalAlpha = 0.85;
  ctx.fillRect(-10, by - 53, 20, 9); ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.fillRect(-9, by - 52, 7, 3);
  ctx.fillStyle = C.hair; ctx.fillRect(-13, by - 68, 26, 12);
  ctx.fillStyle = "#FF5722";
  ctx.fillRect(-1.5, by - 74, 3, 8);
  ctx.beginPath(); ctx.arc(0, by - 74, 3.5, 0, Math.PI * 2); ctx.fill();
}

// ─── ASTRONAUT ───────────────────────────────────────────────────────────────
function _drawAstronaut(ctx, by, C) {
  ctx.textAlign = "center";
  ctx.fillStyle = C.shoe;
  ctx.fillRect(-12, by - 6, 11, 6); ctx.fillRect(1, by - 6, 11, 6);
  ctx.fillStyle = C.pants;
  ctx.fillRect(-11, by - 19, 10, 13); ctx.fillRect(1, by - 19, 10, 13);
  ctx.fillStyle = C.pantsDark; ctx.fillRect(-1, by - 19, 2, 13);
  ctx.fillStyle = C.shirt;
  ctx.fillRect(-14, by - 35, 7, 14); ctx.fillRect(7, by - 35, 7, 14);
  ctx.fillRect(-11, by - 35, 22, 16);
  ctx.fillStyle = C.stripeColor; ctx.fillRect(-11, by - 33, 4, 13);
  ctx.fillStyle = C.logoColor;
  ctx.font = 'bold 8px "Nunito", sans-serif'; ctx.fillText(C.logo, 3, by - 22);
  ctx.fillStyle = C.collar; ctx.fillRect(-11, by - 40, 22, 5);
  ctx.fillStyle = C.helmetColor; ctx.fillRect(-14, by - 68, 28, 28);
  ctx.fillStyle = C.visorColor; ctx.globalAlpha = 0.8;
  ctx.fillRect(-10, by - 64, 20, 14); ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fillRect(-9, by - 63, 7, 4);
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
