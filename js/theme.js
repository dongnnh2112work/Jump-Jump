// ─── Particle factories ────────────────────────────────────────────────────

const PETAL_COLORS = [
  'rgba(255,182,193,0.78)',
  'rgba(255,218,185,0.75)',
  'rgba(255,255,255,0.72)',
  'rgba(253,233,210,0.70)',
];

function makePetal(x, y) {
  return {
    x, y,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 3.0,
    speedX: 18 + Math.random() * 22,
    waveAmp: 12 + Math.random() * 16,
    waveFreq: 0.7 + Math.random() * 1.2,
    waveOffset: Math.random() * Math.PI * 2,
    w: 5 + Math.random() * 3,
    h: 2.5 + Math.random() * 1.5,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    time: Math.random() * 10,
  };
}

function makeSnow(x, y) {
  return {
    x, y,
    size: 1.5 + Math.random() * 3,
    speedY: 28 + Math.random() * 42,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.8 + Math.random() * 1.5,
    wobbleAmp: 10 + Math.random() * 14,
    alpha: 0.5 + Math.random() * 0.45,
    time: Math.random() * 10,
  };
}

function makeFirefly(width, height) {
  return {
    x: Math.random() * width,
    y: height * 0.15 + Math.random() * height * 0.75,
    vx: (Math.random() - 0.5) * 18,
    vy: -(3 + Math.random() * 12),
    wobbleX: Math.random() * Math.PI * 2,
    wobbleY: Math.random() * Math.PI * 2,
    wsx: 0.5 + Math.random() * 1.2,
    wsy: 0.4 + Math.random() * 0.9,
    blink: Math.random() * Math.PI * 2,
    blinkSpeed: 1.2 + Math.random() * 2.0,
    size: 1.8 + Math.random() * 2.0,
    time: Math.random() * 20,
  };
}

// ─── Theme definitions ─────────────────────────────────────────────────────

export const THEMES = {

  // ── Theme 1: Cloud Garden (Spring / default feel) ──────────────────────
  cloudGarden: {
    id: 'cloud-garden',
    label: 'Cloud Garden',
    sky: { top: '#4FC8E8', bottom: '#A8E6F0' },
    cloudRgb: [255, 255, 255],

    createParticles(width, height) {
      return Array.from({ length: 18 }, () =>
        makePetal(Math.random() * (width + 100), Math.random() * height * 0.75)
      );
    },

    updateParticles(dt, particles, width, height) {
      for (const p of particles) {
        p.time += dt;
        p.x -= p.speedX * dt;
        p.y += Math.sin(p.waveFreq * p.time + p.waveOffset) * p.waveAmp * dt;
        p.rot += p.rotSpeed * dt;
        if (p.x < -20) {
          Object.assign(p, makePetal(width + 20 + Math.random() * 100, Math.random() * height * 0.75));
        }
      }
    },

    drawParticles(ctx, particles) {
      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },

    platformColors(_type, base) {
      return base;
    },
  },

  // ── Theme 2: Arctic Peak (Winter) ───────────────────────────────────────
  arcticPeak: {
    id: 'arctic-peak',
    label: 'Arctic Peak',
    sky: { top: '#B8E4F0', bottom: '#E8F6FF' },
    cloudRgb: [220, 240, 255],

    createParticles(width, height) {
      return Array.from({ length: 65 }, () =>
        makeSnow(Math.random() * width, Math.random() * height)
      );
    },

    updateParticles(dt, particles, width, height) {
      for (const p of particles) {
        p.time += dt;
        p.y += p.speedY * dt;
        p.x += Math.sin(p.wobbleSpeed * p.time + p.wobble) * p.wobbleAmp * dt;
        if (p.y > height + 10) {
          Object.assign(p, makeSnow(-10 + Math.random() * (width + 20), -10));
        }
        if (p.x < -15) p.x = width + 10;
        if (p.x > width + 15) p.x = -10;
      }
    },

    drawParticles(ctx, particles) {
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#E8F4FF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },

    platformColors(type, base) {
      if (type === 'grass') return { top: '#EEF7FF', left: '#9ABFCF', right: '#7EAABF' };
      if (type === 'wood')  return { top: '#D8EDF6', left: base.left, right: base.right };
      return base;
    },
  },

  // ── Theme 3: Lantern Dusk (Sunset / Magical) ────────────────────────────
  lanternDusk: {
    id: 'lantern-dusk',
    label: 'Lantern Dusk',
    sky: { top: '#FF8C42', bottom: '#C471ED' },
    cloudRgb: [255, 210, 160],

    createParticles(width, height) {
      return Array.from({ length: 22 }, () => makeFirefly(width, height));
    },

    updateParticles(dt, particles, width, height) {
      for (const p of particles) {
        p.time += dt;
        p.x += p.vx * dt * 0.12 + Math.sin(p.wsx * p.time + p.wobbleX) * 22 * dt;
        p.y += p.vy * dt * 0.18 + Math.cos(p.wsy * p.time + p.wobbleY) * 16 * dt;
        if (p.y < -20) {
          Object.assign(p, makeFirefly(width, height));
          p.y = height + 10;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;
      }
    },

    drawParticles(ctx, particles) {
      for (const p of particles) {
        const blink = (Math.sin(p.blinkSpeed * p.time + p.blink) + 1) * 0.5;
        const alpha = 0.25 + blink * 0.7;
        const r = p.size;
        ctx.save();
        // Glow halo
        ctx.globalAlpha = alpha * 0.35;
        ctx.shadowColor = '#FFE57F';
        ctx.shadowBlur = r * 7;
        ctx.fillStyle = '#FFE57F';
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Core dot
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#FFFDE7';
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },

    platformColors(type, base) {
      if (type === 'grass') return { top: '#8B6D2A', left: '#6B4D1A', right: '#5A3F14' };
      if (type === 'stone') return { top: '#B8906A', left: '#8B6B4F', right: '#7A5A40' };
      return base;
    },
  },
};

// ─── Public API ────────────────────────────────────────────────────────────

const THEME_KEYS = Object.keys(THEMES);

export function pickRandomTheme() {
  return THEMES[THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)]];
}
