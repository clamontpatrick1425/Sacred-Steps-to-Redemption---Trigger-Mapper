// Lightweight sacred chime generator using Web Audio API for grounding moments
export function playSacredChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Harmonic bell frequencies (F# minor contemplative chord: F#4, A4, C#5, E5)
    const freqs = [369.99, 440.0, 554.37, 659.25];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Soft attack and long gentle exponential decay
      const attack = 0.04 + idx * 0.02;
      const decay = 2.4 - idx * 0.3;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08 / (idx + 1), now + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });
  } catch {
    // Audio context may be restricted before user gesture
  }
}
