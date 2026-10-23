import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { compose, write, erase, reveal, type Script } from './handwriting';
import { Scribble } from './sound';
import { startTrail } from './cursor/trail';
import { startMagnetic } from './cursor/magnetic';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));

const GREETING = "Hey, it's Hans";
const NAME = 'Hans Chundekad';
const WRITE_SECONDS = 2.4;
const BASE_FONT = 40;

let lenis: Lenis | null = null;

export async function boot() {
  setupTheme();
  setupScroll();
  setupCursor();
  await document.fonts.ready;
  setupReveals();
  setupTriageLog();
  setupSignature();
  await setupName();
}

/* ---------------- Cursor: light trail + magnetic links (pointer devices only) ---------------- */
function setupCursor() {
  const canvas = $<HTMLCanvasElement>('#trail');
  if (!matchMedia('(pointer: fine)').matches || reduced) return canvas.remove();
  startTrail(canvas);
  startMagnetic();
}

/* ---------------- Theme ---------------- */
function setupTheme() {
  for (const btn of $$('[data-theme-toggle]')) {
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {}
    });
  }
}

/* ---------------- Smooth scroll, sticky header, nav jumps ---------------- */
function setupScroll() {
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis!.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const topbar = $('#topbar');
  ScrollTrigger.create({
    trigger: '#bignav',
    start: 'bottom top+=64',
    onToggle: (self) => topbar.classList.toggle('is-stuck', self.isActive),
    end: 'max',
  });

  const links = $$<HTMLAnchorElement>('.topbar__nav a');
  for (const id of ['work', 'projects', 'awards']) {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        const link = links.find((l) => l.hash === `#${id}`);
        if (link) link.setAttribute('aria-current', String(self.isActive));
      },
    });
  }

  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const target = a.hash === '#top' ? document.body : document.querySelector<HTMLElement>(a.hash);
    if (!target) return;
    e.preventDefault();
    const arrive = () => pop(target);
    if (lenis) lenis.scrollTo(target, { offset: a.hash === '#top' ? 0 : -24, duration: 1.3, onComplete: arrive });
    else {
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      setTimeout(arrive, 500);
    }
    history.replaceState(null, '', a.hash);
  });
}

/** The section you jumped to answers with a little pop and a marker swipe. */
function pop(target: HTMLElement) {
  if (reduced) return;
  const title = target.querySelector<HTMLElement>('.section__title');
  if (title) {
    title.classList.remove('is-fading');
    title.classList.add('is-popped');
    gsap.fromTo(title, { scale: 1 }, { scale: 1.07, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 });
    setTimeout(() => title.classList.add('is-fading'), 1300);
    setTimeout(() => title.classList.remove('is-popped', 'is-fading'), 2300);
  } else if (target.classList.contains('card')) {
    gsap.fromTo(
      target.querySelector('.card__media'),
      { scale: 0.96 },
      { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.5)' },
    );
  }
}

/* ---------------- Scroll reveals (each section moves its own way) ---------------- */
function setupReveals() {
  if (reduced) return;

  for (const title of $$('.section__title')) {
    const split = SplitText.create(title, { type: 'chars', charsClass: 'char' });
    gsap.from(split.chars, {
      yPercent: 110,
      opacity: 0,
      rotate: 6,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.035,
      scrollTrigger: { trigger: title, start: 'top 88%', once: true },
    });
  }

  for (const lede of $$('.awards__more')) {
    gsap.from(lede, { opacity: 0, y: 14, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: lede, start: 'top 90%', once: true } });
  }

  ScrollTrigger.batch('[data-reveal="card"]', {
    start: 'top 88%',
    once: true,
    onEnter: (cards) => {
      cards.forEach((card, i) => {
        const tl = gsap.timeline({ delay: i * 0.12 });
        tl.fromTo(
          card.querySelector('.card__media'),
          { clipPath: 'inset(100% 0% 0% 0% round 14px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.1, ease: 'expo.out', clearProps: 'clipPath' },
        ).from(
          card.querySelectorAll('.card__head, .card__event, .card__tagline, .card__award, .stack, .card__links'),
          { opacity: 0, y: 16, duration: 0.8, ease: 'expo.out', stagger: 0.06 },
          '-=0.75',
        ).to(card.querySelectorAll('.pen path'), { strokeDashoffset: 0, duration: 0.65, ease: 'power2.inOut', stagger: 0.2 }, '-=0.7');
      });
    },
  });
  gsap.set('[data-reveal="card"] .card__media', { clipPath: 'inset(100% 0% 0% 0% round 14px)' });
  gsap.set('[data-reveal="card"] .pen path', { strokeDashoffset: 1 });

  ScrollTrigger.batch('[data-reveal="award"]', {
    start: 'top 90%',
    once: true,
    onEnter: (rows) => {
      gsap.from(rows, { opacity: 0, x: -36, duration: 0.9, ease: 'expo.out', stagger: 0.1 });
      gsap.from(
        rows.map((r) => r.querySelector('.award__trophy')),
        { scale: 0, rotate: -40, duration: 0.8, ease: 'back.out(2.2)', stagger: 0.1, delay: 0.15 },
      );
    },
  });
}

/* ---------------- Triage cover: the agents talk it out, on a loop ---------------- */
function setupTriageLog() {
  const log = document.querySelector<HTMLElement>('[data-triage-log]');
  if (!log) return;
  const lines = Array.from(log.querySelectorAll('li'));
  const status = log.querySelector<HTMLElement>('[data-status]')!;
  const setStatus = (done: boolean) => {
    status.textContent = done ? 'Reproduced' : 'running';
    status.classList.toggle('is-done', done);
  };
  if (reduced) return setStatus(true);

  const tl = gsap.timeline({ repeat: -1, paused: true });
  tl.call(() => setStatus(false))
    .set(lines, { opacity: 0, x: -8 })
    .to(lines, { opacity: 1, x: 0, duration: 0.35, ease: 'expo.out', stagger: 0.62 }, 0.4)
    .call(() => setStatus(true))
    .to(lines, { opacity: 0, duration: 0.5, delay: 2.8 });

  ScrollTrigger.create({
    trigger: log,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
  });
}

/* ---------------- Footer sign-off ---------------- */
async function setupSignature() {
  const holder = $('.footer__sign');
  const sig = await compose('#vara-sign', 'Thanks!', BASE_FONT);
  const k = holder.clientHeight / sig.height;
  sig.svg.style.width = `${sig.width * k}px`;
  if (reduced) return reveal(sig.paths);
  ScrollTrigger.create({
    trigger: holder,
    start: 'top 85%',
    once: true,
    onEnter: () => write(sig.paths, 1.4),
  });
}

/* ---------------- Name: the intro ---------------- */
async function setupName() {
  const slot = $('#name-slot');
  const h1 = slot.querySelector('h1')!;
  const fontPx = parseFloat(getComputedStyle(h1).fontSize);

  const [name, greet] = await Promise.all([
    compose('#vara-name', NAME, BASE_FONT),
    root.classList.contains('intro') ? compose('#vara-greet', GREETING, BASE_FONT) : Promise.resolve(null),
  ]);

  // Scale both scripts identically so the name reads at the h1 size and fits the column.
  const fit = () => {
    const avail = slot.parentElement!.clientWidth;
    const k = Math.min((fontPx * 6.4) / name.width, avail / name.width);
    const top = Math.min(name.top, greet?.top ?? Infinity);
    for (const s of [name, greet]) {
      if (!s) continue;
      s.svg.style.width = `${s.width * k}px`;
      s.svg.style.top = `${(s.top - top) * k}px`;
    }
    slot.style.height = `${Math.max(name.height + name.top - top, greet ? greet.height + greet.top - top : 0) * k}px`;
  };
  fit();
  addEventListener('resize', fit);

  const sound = new Scribble();

  if (!root.classList.contains('intro') || !greet) {
    if (reduced) reveal(name.paths);
    else write(name.paths, 1.3);
    return;
  }

  runIntro(slot, greet, name, sound);
}

function runIntro(slot: HTMLElement, greet: Script, name: Script, sound: Scribble) {
  const hint = $('#intro-hint');
  const rise = $$('[data-rise]');

  lenis?.stop();
  scrollTo(0, 0);

  // The hint only appears when the browser actually refuses to play the scribble.
  sound.onBlocked = () => {
    if (root.classList.contains('intro')) gsap.fromTo(hint, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' });
  };
  sound.onUnlock = () => gsap.to(hint, { opacity: 0, duration: 0.3 });
  // Ink time only; pen lifts between letters and words add roughly another second.
  const greetSeconds = 1.9;

  // Start the greeting large and centred in the viewport.
  const r = slot.getBoundingClientRect();
  const gw = parseFloat(greet.svg.style.width);
  const gh = slot.offsetHeight;
  const S = Math.min((innerWidth * 0.8) / gw, (innerHeight * 0.4) / gh, 3.4);
  gsap.set(slot, {
    x: (innerWidth - gw * S) / 2 - r.left,
    y: (innerHeight - gh * S) / 2 - r.top,
    scale: S,
    transformOrigin: '0 0',
  });

  // The intro always plays through; scrolling is locked (CSS + Lenis) until the page settles.
  gsap
    .timeline()
    .add(() => sound.start(), 0.3)
    .add(write(greet.paths, greetSeconds, (d) => sound.stroke(d)), 0.35)
    // Sound belongs to the greeting only; once it is written the hint has nothing left to offer.
    .add(() => {
      sound.finish();
      gsap.to(hint, { opacity: 0, duration: 0.3 });
    })
    .to(slot, { x: 0, y: 0, scale: 1, duration: 1.2, ease: 'expo.inOut' }, '+=0.3')
    .add(() => lenis?.start())
    .add(settle(rise), '-=0.35')
    .add(() => finishIntro(), '-=0.2')
    // Two beats later the greeting un-writes and the full name is written in place.
    .add(erase(greet.paths, 0.8), '+=2')
    .add(write(name.paths, WRITE_SECONDS));
}

/** Everything under the name rises in reading order, then the markers draw. */
function settle(rise: HTMLElement[]) {
  const [avatar, ...rest] = rise;
  const tl = gsap.timeline();
  tl.fromTo(avatar, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.8)' })
    .fromTo(rest, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.85, ease: 'expo.out', stagger: 0.085 }, 0.1)
    .add(() => root.classList.add('marks-on'), 0.55);
  return tl;
}

function finishIntro() {
  root.classList.add('marks-on');
  root.classList.remove('intro');
  ScrollTrigger.refresh();
}
