export function createSoundFx() {
  let audioCtx = null;

  function ensureCtx() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
    return audioCtx;
  }

  function beep(startHz, endHz, durationSec) {
    const ctx = ensureCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(startHz, now);
    osc.frequency.linearRampToValueAtTime(endHz, now + durationSec);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  }

  return {
    playJump() {
      beep(200, 400, 0.1);
    },
    playLand() {
      beep(400, 200, 0.08);
    },
    playFail() {
      beep(300, 100, 0.3);
    },
  };
}
