// ─── Sound System — Howl Jump ─────────────────────────────────────────────
// All audio is generated via Web Audio API (no external files).

export function createSoundFx() {
  let ctx = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;

  // Music scheduler state
  let schedulerTimer = null;
  let nextStepTime = 0;
  let stepIndex = 0;
  const LOOKAHEAD = 0.12;   // seconds to schedule ahead
  const INTERVAL  = 60;     // ms between scheduler ticks

  // ── BPM & note grid ──────────────────────────────────────────────────────
  const BPM  = 124;
  const STEP = 60 / BPM / 2;   // 8th-note duration in seconds

  // ── Note frequencies (Hz) ────────────────────────────────────────────────
  const N = {
    C3:130.81, D3:146.83, E3:164.81, G3:196.00, A3:220.00,
    C4:261.63, D4:293.66, E4:329.63, G4:392.00, A4:440.00,
    C5:523.25, D5:587.33, E5:659.25, G5:783.99, A5:880.00,
    _: 0,
  };

  // ── 16-step patterns (2 bars of 4/4 in 8th notes) ───────────────────────
  const MELODY = [
    N.E5, N.G5, N.A5, N.G5,
    N.E5, N.C5, N.D5, N.E5,
    N.G5, N.E5, N.C5, N.A4,
    N.G4, N.A4, N.C5, N._,
  ];

  const BASS = [
    N.C3, N._, N._, N._,
    N.G3, N._, N._, N._,
    N.A3, N._, N._, N._,
    N.G3, N._, N._, N._,
  ];

  // Pads fire every 4 steps (chord index = Math.floor(step/4))
  const PADS = [
    [N.C4, N.G4],
    [N.A3, N.E4],
    [N.C4, N.G4],
    [N.G3, N.D4],
  ];

  // ── Boot audio context ────────────────────────────────────────────────────
  function boot() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      return;
    }
    ctx = new AudioContext();

    masterGain = ctx.createGain();
    masterGain.gain.value = 1.0;
    masterGain.connect(ctx.destination);

    musicGain = ctx.createGain();
    musicGain.gain.value = 0.0;   // fades in
    musicGain.connect(masterGain);

    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.55;
    sfxGain.connect(masterGain);

    // Start music and fade in over 2 seconds
    startMusicScheduler();
    musicGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 2.0);
  }

  // ── Music scheduler ───────────────────────────────────────────────────────
  function startMusicScheduler() {
    if (schedulerTimer) return;
    nextStepTime = ctx.currentTime + 0.05;
    stepIndex = 0;
    schedulerTimer = setInterval(tickScheduler, INTERVAL);
  }

  function stopMusicScheduler() {
    if (schedulerTimer) { clearInterval(schedulerTimer); schedulerTimer = null; }
  }

  function tickScheduler() {
    if (!ctx) return;
    const until = ctx.currentTime + LOOKAHEAD;
    while (nextStepTime < until) {
      scheduleStep(stepIndex % MELODY.length, nextStepTime);
      stepIndex += 1;
      nextStepTime += STEP;
    }
  }

  function scheduleStep(step, when) {
    // Melody
    const mhz = MELODY[step];
    if (mhz > 0) playMusicNote(mhz, 'triangle', when, STEP * 0.72, 0.13);

    // Bass (every other step that has a note)
    const bhz = BASS[step];
    if (bhz > 0) playMusicNote(bhz, 'triangle', when, STEP * 1.6, 0.10);

    // Pad chord (trigger on step 0, 4, 8, 12)
    if (step % 4 === 0) {
      const chord = PADS[Math.floor(step / 4)];
      chord.forEach(hz => playPadNote(hz, when, STEP * 3.8, 0.045));
    }
  }

  function playMusicNote(freq, type, when, dur, vol) {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(vol, when + 0.015);
    gain.gain.setValueAtTime(vol, when + dur * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(gain);
    gain.connect(musicGain);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  }

  function playPadNote(freq, when, dur, vol) {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    // Soften with low-pass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(vol, when + 0.04);
    gain.gain.setValueAtTime(vol, when + dur * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(musicGain);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  }

  // ── SFX helpers ───────────────────────────────────────────────────────────
  function tone(freq0, freq1, dur, vol, type = 'sine', destGain = sfxGain) {
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const now  = ctx.currentTime;
    osc.type = type;
    osc.frequency.setValueAtTime(freq0, now);
    osc.frequency.linearRampToValueAtTime(freq1, now + dur);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(gain);
    gain.connect(destGain);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  function noise(dur, vol, cutoff = 2000) {
    if (!ctx) return;
    const bufSize = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = cutoff;
    filter.Q.value = 0.8;
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGain);
    src.start(now);
  }

  // ── Public SFX ────────────────────────────────────────────────────────────

  function playJump() {
    boot();
    // Whoosh: rising sweep
    tone(260, 540, 0.13, 0.28, 'sine');
    // Soft pop on attack
    tone(440, 660, 0.06, 0.18, 'triangle');
    // Small noise burst
    noise(0.05, 0.06, 1200);
  }

  function playLand() {
    boot();
    // Low thud
    tone(220, 80, 0.10, 0.35, 'triangle');
    // Bright chime
    tone(1100, 860, 0.22, 0.22, 'sine');
    // Subtle sparkle
    tone(1800, 1400, 0.12, 0.10, 'sine');
  }

  function playFail() {
    boot();
    // Descending wah
    tone(420, 140, 0.45, 0.32, 'sawtooth');
    // Low drone
    tone(180, 80, 0.55, 0.18, 'triangle');
    // Impact noise
    noise(0.12, 0.12, 300);
  }

  function startMusic() {
    boot();
  }

  function stopMusic() {
    if (!ctx) return;
    stopMusicScheduler();
    if (musicGain) {
      musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime);
      musicGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    }
  }

  function resumeMusic() {
    if (!ctx) return;
    startMusicScheduler();
    if (musicGain) {
      musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime);
      musicGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.0);
    }
  }

  return {
    playJump,
    playLand,
    playFail,
    startMusic,
    stopMusic,
    resumeMusic,
  };
}
