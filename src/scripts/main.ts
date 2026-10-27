import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { compose, write, erase, reveal, remeasure, type Script } from './handwriting';
import { Scribble } from './sound';
import { startTrail } from './cursor/trail';

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
  setupClineShieldClip();
  setupSignature();
  await setupName();
}

/* ---------------- Cursor: light trail (pointer devices only) ---------------- */
function setupCursor() {
  const canvas = $<HTMLCanvasElement>('#trail');
  if (!matchMedia('(pointer: fine)').matches || reduced) return canvas.remove();
  startTrail(canvas);
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

  // Awards count off one at a time: a row slides in, its trophy lands, then the next row.
  const awardRows = $$('[data-reveal="award"]');
  if (awardRows.length) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.awards', start: 'top 82%', once: true } });
    awardRows.forEach((row, i) => {
      tl.from(row, { opacity: 0, x: -40, duration: 0.28, ease: 'expo.out' }, i === 0 ? 0 : '-=0.1').from(
        row.querySelector('.award__trophy'),
        { scale: 0, rotate: -360, duration: 0.34, ease: 'back.out(1.6)' },
        '-=0.18',
      );
    });
  }
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

/* ---------------- ClineShield cover: zoom on the agent, block, pull back to the IDE ---------------- */
function setupClineShieldClip() {
  const root = document.querySelector<HTMLElement>('[data-cs]');
  if (!root) return;
  const q = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
  const stage = q('[data-cs-stage]')[0];
  const lines = q('[data-cs-line]');
  const shield = q('[data-cs-shield]')[0];
  const dels = q('[data-cs-del]');
  const blocked = q('[data-cs-blocked]')[0];
  const risk = q('[data-cs-risk]')[0];
  const bar = q('[data-cs-riskbar]')[0];
  const hot = q('[data-cs-hot]')[0];

  const finalState = () => {
    gsap.set([...lines, shield], { opacity: 1, y: 0 });
    dels.forEach((d) => d.classList.add('del'));
    blocked.textContent = '3';
    risk.textContent = '72';
    gsap.set(bar, { width: '72%' });
    gsap.set(hot, { '--h': 1 });
  };
  if (reduced) return finalState();

  // Camera: frame the deleted lines and the Cline terminal under them (stage is 64em x 40em;
  // the editor column spans x 20–64em, the framed band y 6–33.6em). The origin is that
  // band's centre, and the translate moves it to the stage centre (32em, 20em).
  const zoomIn = { scale: 1.45, x: '-10em', y: '0.2em', transformOrigin: '42em 19.8em' };
  const counter = { blocked: 2, risk: 38 };

  const tl = gsap.timeline({ repeat: -1, paused: true });
  tl.call(() => {
    dels.forEach((d) => d.classList.remove('del'));
    counter.blocked = 2;
    counter.risk = 38;
    blocked.textContent = '2';
    risk.textContent = '38';
  })
    .set(stage, zoomIn)
    .set([...lines, shield], { opacity: 0, y: 6 })
    .set(bar, { width: '38%' })
    .set(hot, { '--h': 0.8 })
    .to(lines[0], { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' }, 0.4)
    .to(lines[1], { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' }, 1.3)
    .call(() => dels.forEach((d) => d.classList.add('del')), [], 1.5)
    .fromTo(shield, { opacity: 0, y: 8, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, 2.5)
    .to(stage, { scale: 1, x: 0, y: 0, duration: 1.3, ease: 'expo.inOut' }, 4.4)
    .to(
      counter,
      {
        blocked: 3,
        risk: 72,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: () => {
          blocked.textContent = String(Math.round(counter.blocked));
          risk.textContent = String(Math.round(counter.risk));
        },
      },
      5.6,
    )
    .to(bar, { width: '72%', duration: 0.9, ease: 'power2.out' }, 5.6)
    .to(hot, { '--h': 1, scale: 1.35, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.inOut' }, 5.7)
    .to({}, { duration: 2.6 });

  ScrollTrigger.create({
    trigger: root,
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
    remeasure(name);
    if (greet) remeasure(greet);
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
  // Belt and braces: Vara occasionally settles glyph positions late, so refit once things are idle.
  if (!root.classList.contains('intro')) for (const ms of [300, 1200]) setTimeout(fit, ms);

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
  // A quick hand: ink and pen lifts both run at 2/3 of a natural pace (~1.9s in all),
  // and the scribble plays a little faster to match.
  const pace = 2 / 3;
  const greetSeconds = 1.9 * pace;

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
    .add(write(greet.paths, greetSeconds, (d) => sound.stroke(d, 1.2), pace), 0.35)
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
