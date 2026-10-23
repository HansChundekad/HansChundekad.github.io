/**
 * Pen-driven scribble. Each stroke the pen draws plays its own slice of a
 * continuous scratch texture for exactly as long as the stroke takes, so the
 * sound starts, stops, and pauses with the ink.
 *
 * Browsers keep the AudioContext suspended until the visitor interacts. If it
 * is suspended when the greeting starts, `onBlocked` fires; the first
 * click/tap/key resumes it and the remaining strokes are heard.
 */
export class Scribble {
  private ctx: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private cursor = 0;
  private active = false;
  private volume = 0.5;
  unlocked = false;
  onUnlock: (() => void) | null = null;
  onBlocked: (() => void) | null = null;

  constructor() {
    try {
      this.ctx = new AudioContext();
    } catch {
      return;
    }
    fetch('/audio/writing.m4a')
      .then((r) => r.arrayBuffer())
      .then((b) => this.ctx!.decodeAudioData(b))
      .then((buf) => (this.buffer = buf))
      .catch(() => {});

    const unlock = () => {
      this.ctx?.resume().then(() => this.markUnlocked());
    };
    window.addEventListener('pointerdown', unlock, { once: true, capture: true });
    window.addEventListener('keydown', unlock, { once: true, capture: true });
  }

  private markUnlocked() {
    if (this.unlocked) return;
    this.unlocked = true;
    this.onUnlock?.();
  }

  /** The greeting is about to be written: strokes from now on make sound. */
  start() {
    this.active = true;
    if (!this.ctx) return;
    if (this.ctx.state === 'running') return this.markUnlocked();
    this.ctx.resume().then(() => this.markUnlocked());
    // resume() stays pending while the browser blocks audio; give it a beat to decide.
    setTimeout(() => {
      if (this.ctx && this.ctx.state !== 'running' && !this.unlocked) this.onBlocked?.();
    }, 120);
  }

  /** One pen stroke lasting `seconds`, starting now. */
  stroke(seconds: number) {
    const ctx = this.ctx;
    const buf = this.buffer;
    if (!this.active || !ctx || !buf || ctx.state !== 'running' || seconds < 0.02) return;

    const rate = 0.9 + Math.random() * 0.2;
    const span = seconds * rate;
    if (this.cursor + span > buf.duration - 0.05) this.cursor = Math.random() * 0.4;

    const t = ctx.currentTime;
    const attack = Math.min(0.015, seconds / 3);
    const release = Math.min(0.035, seconds / 3);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(this.volume, t + attack);
    gain.gain.setValueAtTime(this.volume, t + seconds - release);
    gain.gain.linearRampToValueAtTime(0, t + seconds);

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = rate;
    src.connect(gain).connect(ctx.destination);
    src.start(t, this.cursor, span + 0.01);
    this.cursor += span;
  }

  /** The greeting is written: later strokes and late unlocks stay silent. */
  finish() {
    this.active = false;
  }
}
