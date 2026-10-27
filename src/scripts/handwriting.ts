import { gsap } from 'gsap';
// @ts-expect-error vara ships no types
import Vara from 'vara';

const FONT = '/vara/SatisfySL.json';

export type Script = {
  svg: SVGSVGElement;
  paths: SVGPathElement[];
  /** Natural width/height of the fitted svg and its top edge in Vara's layout space. */
  width: number;
  height: number;
  top: number;
};

/**
 * Vara lays out the single-stroke glyphs; GSAP does all the drawing so the
 * writing can be timed to the sound, erased, skipped, and replayed.
 */
export function compose(selector: string, text: string, fontSize: number): Promise<Script> {
  return new Promise((resolve) => {
    const v = new Vara(selector, FONT, [{ text, fontSize, strokeWidth: 2.1, autoAnimation: false, queued: false }], {
      textAlign: 'left',
    });
    // Vara can still be placing glyphs after ready() fires, so wait until the
    // drawn bounds stop changing between frames before measuring.
    const settled = (svg: SVGSVGElement, done: () => void) => {
      let last = -1;
      let frames = 0;
      const tick = () => {
        const w = svg.getBBox().width;
        if ((w > 0 && Math.abs(w - last) < 0.01) || ++frames > 90) return done();
        last = w;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    v.ready(() => settled(v.svg as SVGSVGElement, () => {
      const svg = v.svg as SVGSVGElement;
      const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path')).filter(
        (p) => p.getAttribute('stroke') !== 'transparent',
      );
      const box = svg.getBBox();
      const pad = 6;
      svg.setAttribute('viewBox', `${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`);
      svg.setAttribute('width', String(box.width + pad * 2));
      svg.setAttribute('height', String(box.height + pad * 2));
      svg.style.width = `${box.width + pad * 2}px`;
      svg.style.height = 'auto';
      hide(paths);
      resolve({ svg, paths, width: box.width + pad * 2, height: box.height + pad * 2, top: box.y - pad });
    }));
  });
}

function len(p: SVGPathElement) {
  return p.getTotalLength();
}

/** Re-read the drawn bounds and refit the viewBox (glyphs can shift after the first measure). */
export function remeasure(script: Script) {
  const box = script.svg.getBBox();
  if (!box.width) return;
  const pad = 6;
  script.svg.setAttribute('viewBox', `${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`);
  // The width/height attributes set the aspect ratio that height:auto follows; keep them in step.
  script.svg.setAttribute('width', String(box.width + pad * 2));
  script.svg.setAttribute('height', String(box.height + pad * 2));
  script.width = box.width + pad * 2;
  script.height = box.height + pad * 2;
  script.top = box.y - pad;
}

export function hide(paths: SVGPathElement[]) {
  for (const p of paths) {
    const l = len(p);
    p.style.strokeDasharray = `${l} ${l + 2}`;
    p.style.strokeDashoffset = String(l + 1);
    p.style.opacity = '0';
  }
}

export function reveal(paths: SVGPathElement[]) {
  for (const p of paths) {
    p.style.opacity = '1';
    p.style.strokeDashoffset = '0';
  }
}

const LIFT = { stroke: 0.035, letter: 0.06, word: 0.2 };

/**
 * Pen-order drawing: each stroke gets ink time in proportion to its length,
 * with short pen lifts between strokes, letters, and words. `onStroke` fires
 * as each stroke begins, with its duration, so sound can follow the pen.
 */
export function write(
  paths: SVGPathElement[],
  seconds: number,
  onStroke?: (duration: number) => void,
  liftScale = 1,
): gsap.core.Timeline {
  const total = paths.reduce((s, p) => s + len(p), 0) || 1;
  const tl = gsap.timeline();
  let prevChar: Element | null = null;
  for (const p of paths) {
    const l = len(p);
    const duration = (l / total) * seconds;
    const char = p.parentElement;
    if (prevChar) {
      let lift = LIFT.stroke;
      if (char !== prevChar) {
        // Vara keeps one group per character, spaces included; skipping one means a new word.
        lift = prevChar.nextElementSibling === char ? LIFT.letter : LIFT.word;
      }
      tl.to({}, { duration: lift * liftScale });
    }
    prevChar = char;
    if (onStroke) tl.call(onStroke, [duration]);
    tl.set(p, { opacity: 1 }).fromTo(p, { strokeDashoffset: l + 1 }, { strokeDashoffset: 0, duration, ease: 'none' });
  }
  return tl;
}

/** Un-writes from the last stroke back to the first. */
export function erase(paths: SVGPathElement[], seconds: number): gsap.core.Timeline {
  const total = paths.reduce((s, p) => s + len(p), 0) || 1;
  const tl = gsap.timeline();
  for (const p of [...paths].reverse()) {
    const l = len(p);
    tl.to(p, { strokeDashoffset: l + 1, duration: (l / total) * seconds, ease: 'none' }).set(p, { opacity: 0 });
  }
  return tl;
}
