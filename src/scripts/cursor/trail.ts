/**
 * Cursor light trail: a tapering ribbon of light that follows the pointer and
 * fades within half a second. Pointer devices only; off for reduced motion.
 */
export function startTrail(canvas: HTMLCanvasElement) {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.remove();
    return;
  }
  const ctx = canvas.getContext('2d')!;
  const LIFE = 520;
  const pts: { x: number; y: number; t: number }[] = [];
  let dpr = 1;
  let raf = 0;
  let hue = 40;

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
  };
  resize();
  addEventListener('resize', resize);

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (!raf) raf = requestAnimationFrame(frame);
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => (pts.length = 0));

  function frame(now: number) {
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    const dark = document.documentElement.dataset.theme === 'dark';
    hue = (hue + 0.35) % 360;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const life = 1 - (now - b.t) / LIFE;
      if (life <= 0) continue;
      // Light mode: the highlighter palette, cycling. Dark mode: warm gold sparkler.
      const h = dark ? 45 + Math.sin((hue + i * 4) / 30) * 12 : (hue + i * 3) % 360;
      const color = dark ? `hsla(${h}, 95%, 62%, ${life * 0.9})` : `hsla(${h}, 90%, 72%, ${life * 0.85})`;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = dark ? 18 : 10;
      ctx.lineWidth = 1.5 + life * (dark ? 7 : 9);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    const head = pts[pts.length - 1];
    if (head) {
      const life = 1 - (now - head.t) / LIFE;
      const r = dark ? 34 : 26;
      const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, r);
      g.addColorStop(0, dark ? `hsla(45, 100%, 70%, ${0.55 * life})` : `hsla(${hue}, 90%, 75%, ${0.45 * life})`);
      g.addColorStop(1, 'hsla(0, 0%, 100%, 0)');
      ctx.shadowBlur = 0;
      ctx.fillStyle = g;
      ctx.fillRect(head.x - r, head.y - r, r * 2, r * 2);
    }

    raf = pts.length ? requestAnimationFrame(frame) : 0;
    if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
}
