import { gsap } from 'gsap';

const TARGETS = '.bignav a, .bignav__theme, .topbar__nav a, .topbar__name, .icon-btn, .btn, .card__links a, .contact-row a';

/**
 * Magnetic hover: each link or button leans toward the pointer the first time
 * it comes close, springs back, and then stays put for the rest of the visit.
 */
export function startMagnetic() {
  const RANGE = 36;
  const PULL = 0.32;
  const MAX = 10;
  const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
  const pulled = new Set<HTMLElement>();
  const spent = new Set<HTMLElement>();

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      for (const el of els) {
        if (spent.has(el)) continue;
        const r = el.getBoundingClientRect();
        const near =
          e.clientX > r.left - RANGE && e.clientX < r.right + RANGE && e.clientY > r.top - RANGE && e.clientY < r.bottom + RANGE;
        if (near) {
          pulled.add(el);
          gsap.to(el, {
            x: gsap.utils.clamp(-MAX, MAX, (e.clientX - (r.left + r.width / 2)) * PULL),
            y: gsap.utils.clamp(-MAX, MAX, (e.clientY - (r.top + r.height / 2)) * PULL),
            duration: 0.4,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        } else if (pulled.has(el)) {
          pulled.delete(el);
          spent.add(el);
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
        }
      }
    },
    { passive: true },
  );
}
