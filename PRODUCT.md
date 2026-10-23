# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Astro (static output) + GSAP (DrawSVG, SplitText, Flip, ScrollTrigger) + Lenis smooth scroll. Chosen because the site is mostly content with heavy, choreographed motion. Astro ships near-zero JS by default, so the animation budget goes to the intro and cursor effects rather than framework overhead, and it deploys as static files anywhere.

Deploy: GitHub Pages (free) at `<github-username>.github.io`, built and published via Astro's official GitHub Actions workflow. Custom domain HansChundekad.com was unregistered as of 2026-10-22 and may be added later via a CNAME; nothing in the build should assume a subpath.

## Users

Tech recruiters and hiring managers evaluating Hans for software/engineering roles. They typically arrive from a resume, LinkedIn, or application link, skim for a short time, and decide whether Hans is worth an interview.

## Product Purpose

A personal portfolio that makes a strong first impression and quickly answers "who is this, what have they built, how do I reach them." Success = a recruiter remembers the site and clicks through to projects, resume, or contact.

## Capabilities and Constraints

- Signature motion the owner explicitly requested: on first load, the name is written out (handwriting/stroke draw) large on screen, then zooms out into its resting position, then the rest of the content pops in.
- A cursor light trail follows the pointer across the whole site.
- The intro must be skippable and must not delay access to content for repeat visitors; all motion must respect `prefers-reduced-motion`.
- Heavy effects (cursor trail) are pointer-device only; touch devices get a lighter experience.
- Content is sourced from the owner's resume (public/HansChundekadResume.pdf), GitHub (HansChundekad), and Devpost (hanschundekad). Undecided: profile photo, company logos for work tiles, spelling "TTickle" vs "Tickle".

## Brand Commitments

- Name: Hans Chundekad.
- Owner will supply reference screenshots of portfolios they like for layout and feel.

## Evidence on Hand

- Resume: UC Riverside B.S. Computer Science with Business Applications (expected June 2028); internships at TTickle (Engineers for Good, Jun–Sep 2026) and Luxcedia (embedded, Feb–Jun 2026); Xpert AI (founder, since Jul 2025).
- Projects: Xpert AI, ClineShield, Triage, TriNetra, TapRoot, Civic Estate; three hackathon prizes (UC Berkeley AI Hackathon 2026, DeveloperWeek 2026, RoseHack 2026) per Devpost.
- Project screenshots from Devpost in public/projects/; Triage and Xpert AI have none (authored covers are labeled "illustration").
- Writing sound: public/audio/writing.m4a, trimmed from the owner's freesound "writing on paper" clip.
- Do not fabricate metrics, employers, or testimonials beyond these sources.

## Product Principles

1. Recruiter-first: name, role, projects, and contact are reachable within seconds, even mid-animation.
2. Motion is the signature, not a gate: memorable on first visit, never in the way.
3. Real work only: every project and claim comes from the owner.
