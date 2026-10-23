---
name: Hans Chundekad
description: A signed page. A white, quiet column that gets written on by hand.
colors:
  paper: "#fff"
  paper-raised: "#fff"
  ink: "oklch(14% 0 0)"
  ink-2: "oklch(34% 0 0)"
  ink-3: "oklch(48% 0 0)"
  rule: "oklch(90% 0 0)"
  rule-soft: "oklch(94% 0 0)"
  chip: "oklch(96.5% 0 0)"
  link-dot: "oklch(60% 0 0)"
  pen-orange: "oklch(66% 0.18 45)"
  go: "oklch(55% 0.15 150)"
  go-bg: "oklch(93% 0.05 150)"
  go-ink: "oklch(32% 0.08 150)"
  gold: "oklch(66% 0.14 78)"
  gold-bg: "oklch(95% 0.05 88)"
  gold-ink: "oklch(40% 0.09 70)"
  hl-sun: "oklch(91% 0.13 95)"
  hl-iris: "oklch(84% 0.09 295)"
  hl-mint: "oklch(87% 0.1 185)"
  hl-peach: "oklch(86% 0.1 55)"
  hl-rose: "oklch(83% 0.11 15)"
  night: "#000"
  night-raised: "oklch(15% 0 0)"
  night-ink: "oklch(96% 0 0)"
  night-ink-2: "oklch(80% 0 0)"
  night-ink-3: "oklch(64% 0 0)"
  night-rule: "oklch(26% 0 0)"
  night-rule-soft: "oklch(18% 0 0)"
  night-chip: "oklch(17% 0 0)"
  name-gold: "oklch(84% 0.13 82)"
  pen-gold: "oklch(76% 0.15 65)"
  night-gold: "oklch(80% 0.13 85)"
  night-gold-ink: "oklch(90% 0.08 88)"
  night-go-bg: "oklch(30% 0.06 150)"
  night-go-ink: "oklch(90% 0.08 150)"
  night-hl-sun: "oklch(52% 0.11 90)"
  night-hl-iris: "oklch(45% 0.13 295)"
  night-hl-mint: "oklch(47% 0.08 185)"
  night-hl-peach: "oklch(50% 0.11 50)"
  night-hl-rose: "oklch(46% 0.13 15)"
typography:
  signature:
    fontFamily: "Satisfy, cursive"
    fontSize: "clamp(2.6rem, 7.4vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0"
  headline:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5.6vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  tile-name:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.2rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  nav-large:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 3.4vw, 1.85rem)"
    fontWeight: 450
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 680
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'ss01'"
  date:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 400
    fontFeature: "'tnum'"
  label:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
rounded:
  focus: "4px"
  card: "0.9rem"
  pill: "999px"
  circle: "50%"
spacing:
  column: "min(100% - 2rem, 58rem)"
  section-top: "clamp(5rem, 12vw, 8rem)"
  section-body: "clamp(2rem, 5vw, 3rem)"
  grid-row: "clamp(2.5rem, 5vw, 3.5rem)"
  grid-col: "clamp(1.25rem, 3vw, 2rem)"
  card-head: "1.25rem"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.25rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.25rem"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.circle}"
    size: "2.5rem"
  icon-button-hover:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.ink}"
  pill-status:
    backgroundColor: "{colors.go-bg}"
    textColor: "{colors.go-ink}"
    rounded: "{rounded.pill}"
    padding: "0.3em 0.85em"
  card-media:
    backgroundColor: "{colors.chip}"
    rounded: "{rounded.card}"
  work-tile-mint:
    backgroundColor: "{colors.hl-mint}"
    textColor: "{colors.ink}"
    typography: "{typography.tile-name}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
  work-tile-sun:
    backgroundColor: "{colors.hl-sun}"
    textColor: "{colors.ink}"
    typography: "{typography.tile-name}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
---

# Design System: Hans Chundekad

## Overview

**Creative North Star: "The Signed Page"**

A clean white sheet that someone has gone over by hand. The ground is pure paper (#fff light, #000 dark) with near-black neutral ink in one grotesk, and three handmade marks sit on top of it. The name and the sign-off are written in a single-stroke script. Five highlighter colors are swiped behind key words. One pen color underlines titles and circles dates. Everything typeset stays quiet and neutral so the hand marks carry the personality.

The layout is a single centered column read from top to bottom: identity, Work, Projects, Awards, then the sign-off. Density is relaxed. The sections are separated by generous top padding and hairline rules, not by panels or background bands. Depth comes from soft ambient shadows on media cards and nowhere else.

Motion follows one rule: things are written, drawn, or rise into place, in reading order. The intro writes a greeting large, the greeting settles into the name slot, the content rises, the greeting is erased, and the full name is written in its place. Each section then reveals in its own way as it scrolls in. The page avoids the dark-hero-with-gradient developer template.

**Key Characteristics:**
- Pure paper grounds: #fff light, #000 dark. No tint, no gradient.
- Neutral achromatic ink ramp in three steps. Color lives only in the hand marks, the status/award accents, and the work tiles.
- Script is reserved for the signature: the name, the "Thanks!" sign-off, and the avatar monogram placeholder.
- The name and sign-off turn gold in dark mode. The pen changes from orange to gold.
- Hand marks are drawn on, never just shown: markers sweep in left to right, pen strokes draw along their paths, and the script is written stroke by stroke.

## Colors

The palette is achromatic paper and ink plus a small set of hand-applied pigments. Every pigment has a dark-mode twin, set under `[data-theme='dark']` and `prefers-color-scheme: dark`.

### Primary
- **Pen Orange** (pen-orange): the single pen hand in light mode. Used for wavy underlines under card titles and loose loops around dates. Nothing else uses it.
- **Pen Gold** (pen-gold): the same pen in dark mode.
- **Signature Gold** (name-gold): the written name, the top-bar name, and the sign-off in dark mode. In light mode the signature uses ink.

### Secondary
- **The Five Markers** (hl-sun, hl-iris, hl-mint, hl-peach, hl-rose): highlighter swipes behind key words in the hero bullets. The arrival marker under a section title uses the section's own marker (Work mint, Projects peach, Awards iris). Sun is also the text-selection color. In dark mode each marker drops to a deep, saturated twin (night-hl-*) so that white text stays legible on top of it.

### Tertiary
- **Status Green** (go-bg / go-ink): the only status pill, e.g. "Launching soon".
- **Trophy Gold** (gold / gold-ink): trophy icons and award lines on cards and award rows.

### Neutral
- **Paper** (#fff) / **Night** (#000): the page ground. Raised surfaces are the same as paper in light mode and oklch(15% 0 0) in dark mode, used only by the floating intro-skip pill.
- **Ink / Ink 2 / Ink 3**: headings and strong text / body and bullets / meta, dates, stack lines, and inactive nav.
- **Rule / Rule Soft**: hairlines under the hero nav, between award rows, and above the footer fine print. Rule Soft sits under the frosted sticky header.
- **Chip** (chip): media placeholder fill and icon-button hover wash.
- **Link Dot** (link-dot): the dotted underline on inline prose links.

### Named Rules
**The Paper Rule.** The ground is pure #fff or pure #000. No off-white, no tinted dark, and no section background bands.

**The One Pen Rule.** There is exactly one pen color per theme (orange in light, gold in dark), and it is used only for title underlines and date loops.

**The Marker Pairing Rule.** Each marker has a light value and a dark value. Never reuse a light marker value under white dark-mode text.

## Typography

**Display Font:** Satisfy, drawn as Vara single-stroke paths (with cursive fallback)
**Body Font:** Hanken Grotesk Variable (with ui-sans-serif, system-ui)

**Character:** A neutral, slightly warm variable grotesk does all of the reading. The script appears only where a person would actually sign the page. Grotesk weights are set in fine variable steps (420, 450, 540, 550, 560, 600, 650, 680, 700, 800) rather than a coarse 400/700 pair.

### Hierarchy
- **Signature** (Satisfy 400, clamp(2.6rem, 7.4vw, 4.6rem), 1.15): the hero name, the top-bar name (1.6rem), and the footer "Thanks!". It renders as SVG strokes that are written on. The live text stays available to screen readers.
- **Headline** (700, clamp(2.2rem, 5.6vw, 3.4rem), 1.05, -0.035em): section titles Work / Projects / Awards.
- **Tile Name** (800, clamp(2rem, 5vw, 3.2rem), 1, -0.04em): the company name set large inside a work tile.
- **Nav Large** (450, clamp(1.4rem, 3.4vw, 1.85rem), -0.015em): the hero section nav.
- **Lead** (600, clamp(1.4rem, 3.6vw, 2rem), 1.25, max 30ch): the footer hiring line.
- **Title** (680, 1.3rem, -0.015em): card titles. Award events use 650 at clamp(1.2rem, 2.8vw, 1.55rem).
- **Body** (400, 1.0625rem, 1.6, ss01): prose. Card taglines are capped at 52ch and the hero bullets run at clamp(1.02rem, 2vw, 1.18rem).
- **Date** (1.08rem, tabular numerals, ink-3): short lowercase dates such as "summer '26", "feb '26", and "since jul '25". The full range goes in the title attribute.
- **Label** (0.8 to 0.95rem): stack lines (0.88rem, ink-3), card event lines, pills, the fine print, and the "illustration" cover label (0.75rem, 560, 0.02em, cover ink at 0.85 opacity).

### Named Rules
**The Signature-Only Script Rule.** Satisfy is used only for the name, the sign-off, and the avatar monogram placeholder. Never use it for headings, labels, or decoration.

**The Lowercase Date Rule.** Dates are short and lowercase with an apostrophe year ("spring '26"). They are circled by the pen and never shown as a numeric range in the visible text.

## Layout

A single centered column (min(100% - 2rem, 58rem)) carries everything. The hero opens with a circular avatar left of the name (auto / 1fr grid). Under it sit the degree line, five dotted bullets, a plain seeking sentence, a dot-separated contact row, and a large text nav closed off by a hairline rule. Sections open with clamp(5rem, 12vw, 8rem) of top padding and keep a 4.5rem scroll margin so jumps clear the sticky header. Work and Projects use a two-column card grid (row gap clamp(2.5rem, 5vw, 3.5rem), column gap clamp(1.25rem, 3vw, 2rem)). Awards are full-width rows (icon / text / year) between hairlines.

The sticky header is a fixed 4rem bar laid out as a 1fr / auto / 1fr grid (name / section nav / tools). It stays invisible until the hero nav scrolls past, then frosts in (82% paper, blur 14px) with the name, nav, and icon links sliding down. The sound and theme tools are always visible.

Responsive: at 760px and below, the card grid collapses to one column, the header nav and the award year are hidden. At 480px and below, the avatar stacks above the name, the contact-row separators drop out, and the header icon links are hidden.

## Elevation & Depth

The system is flat paper with a soft lift reserved for media. Text, rows, and sections never cast shadows. Media cards rest on a two-layer ambient shadow and lift on hover. Dark mode uses the same shapes with heavier alpha. The frosted sticky header provides depth through blur rather than shadow.

### Shadow Vocabulary
- **Rest** (`0 1px 2px oklch(0% 0 0 / 0.06), 0 8px 24px -8px oklch(0% 0 0 / 0.14)`): card media at rest, the avatar, the intro-skip pill, and hovered outline buttons.
- **Lift** (`0 2px 4px oklch(0% 0 0 / 0.06), 0 18px 40px -12px oklch(0% 0 0 / 0.22)`): card media on hover, paired with a -4px rise.

### Named Rules
**The Media-Only Shadow Rule.** Only images, tiles, the avatar, and floating controls get a shadow. Work tiles are the exception: they are flat color blocks with no shadow.

## Shapes

Rounded but not soft. Media cards use 0.9rem corners (the reveal clip uses 14px). Every control (buttons, pills, the skip pill) is a full pill (999px). The avatar and icon buttons are circles. Hairlines are 1px. The hand marks deliberately break this geometry: highlighters are rough hand-drawn polygons applied as an SVG mask (two alternating outlines, rotated -0.6deg), pen strokes are wavy cubic paths in three variants with round caps at 2.2 stroke width, and the arrival marker is a skewed, unevenly rounded bar (0.1em 0.3em 0.15em 0.25em, -1deg).

## Components

### Buttons
- **Shape:** full pill (999px), 1px rule border, 0.8rem × 1.25rem, 560 weight, a leading 1.05rem icon.
- **Ink:** ink fill with paper text. This is the primary "Email me" button, and there is only one per group.
- **Outline:** transparent with a rule border.
- **Hover:** rises 2px, picks up the Rest shadow, and the border darkens to ink-3.
- **Icon Button:** a 2.5rem circle in ink-2 that gets a chip wash on hover. Used for header links, sound, and theme.

### Chips
- **Status Pill:** go-bg / go-ink pill at 0.8rem inside the card event line. Status only. Stacks are never chips.

### Cards / Containers
- **Media:** 16:10, 0.9rem corners, chip fill, Rest shadow. Screenshots are anchored top left. Hover lifts the card (-4px, Lift shadow) and zooms the image to 1.035.
- **Work Tile:** the media slot of a work card, filled with a light marker color (mint, sun) in both themes. The company name is set center in Tile Name at a fixed near-black. It is flat, and the name scales to 1.04 on hover.
- **Authored Cover:** when a project has no screenshot, an illustrated mock UI fills the slot. It carries an "illustration" label at the top left in its own cover ink.
- **Head:** the title, with its pen underline, sits on the baseline opposite the looped date. Below come the event line (ink-3), tagline (ink-2), award line (trophy plus gold-ink, 540), stack line, and links.
- **Stack Line:** plain text with " · " separators, 0.88rem, ink-3.
- **Card Links:** underlined 550-weight text with an arrow-up-right icon that nudges 2px up and right on hover.

### Navigation
- **Hero Nav:** large 450-weight words. On hover an ink underline wipes in from the left and exits to the right (0.45s).
- **Header Nav:** 0.98rem ink-3 links. The current section turns ink, driven by scroll position.
- **Arrival Pop:** clicking a jump link smooth-scrolls (Lenis, 1.3s). The target title scales to 1.07 and back, and its section marker sweeps in underneath, holds for about 1.3s, and fades.

### Highlighter Mark
An inline word carrying a marker swipe. The marker sits behind the text as a rough polygon mask with a slight skew. It draws left to right (0.7s, staggered 140ms per mark) once the intro finishes. On hover, linked marks swell slightly (scale 1.04 / 1.12).

### Pen Marks
Inline SVG strokes in the pen color: a wavy underline under card titles and a loose loop around dates, with three variants rotated across cards. They draw on (dashoffset 1→0) as each card reveals and redraw when the card is hovered.

### Inline Link
Prose links use a 1.5px dotted link-dot underline at a 0.28em offset. On hover the underline turns solid ink.

### Motion Grammar
- **Easing:** cubic-bezier(0.16, 1, 0.3, 1) for CSS and expo.out for GSAP. Overshoot (back.out / elastic) is reserved for the avatar, trophies, and card pops.
- **Intro (first visit per session):** the greeting "Hey, it's Hans" is written large and centered (up to 3.4×, 2.4s, with optional scribble sound), then settles into the name slot (1.2s expo.inOut). The avatar pops in, the remaining content rises 26px in reading order (85ms stagger), and the markers draw. After 2s the greeting is erased in reverse stroke order and "Hans Chundekad" is written in its place. Esc, the skip pill, or any scroll attempt during the opening ends the intro immediately. A 9s failsafe un-hides the content.
- **Section reveals:** title characters rise and rotate in (yPercent 110, rotate 6, 35ms stagger). Card media unclip from the bottom while the card text rises and the pen strokes draw, with cards staggered by 120ms. Award rows slide in from the left as their trophies spin and pop. The sign-off is written when it scrolls into view.
- **Cursor Light Trail:** a tapering ribbon that fades within 520ms. In light mode it cycles through hues with a multiply blend. In dark mode it is a gold sparkler with a screen blend. Fine-pointer devices only.
- **Reduced motion:** no intro, no Lenis, no reveals, no pop, and no trail. The name and sign-off appear fully drawn, and every CSS transition collapses to 0.01ms.

## Do's and Don'ts

### Do:
- **Do** keep grounds at pure #fff / #000 and let color enter only through markers, pen, status, trophy, and tiles.
- **Do** write the signature: render Satisfy as Vara strokes animated in pen order, with the plain text kept for screen readers.
- **Do** pick markers from the five-color set. Use the light value behind ink and the dark value behind white text.
- **Do** use one pen per theme (orange / gold) for title underlines and date loops only.
- **Do** write dates short and lowercase ("feb '26", "since jul '25"), circled by the pen.
- **Do** set tech stacks as plain " · "-separated ink-3 text.
- **Do** label authored covers "illustration" wherever a real screenshot is missing.
- **Do** give every motion a reduced-motion end state that shows the content in full.

### Don't:
- **Don't** use Satisfy for headings, labels, or ornament.
- **Don't** render tech stacks as chips or pills. The pill is reserved for status.
- **Don't** add a second pen color or use the pen for fills, icons, or text.
- **Don't** tint the ground, add gradient heroes, or band sections with background color.
- **Don't** put shadows on text, rows, or work tiles.
- **Don't** block content behind the intro: it must be skippable and shown once per session.
