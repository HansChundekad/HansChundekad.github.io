---
target: whole home page
total_score: 19
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/hanschundekad/PersonalPortfolioWebsite/src/pages/index.astro"
target_fingerprint: "sha256:011ca04f8fb2e4d87f983472b90cd414cae18920fbd090c3072991e84e9ea564"
target_path: /Users/hanschundekad/PersonalPortfolioWebsite/src/pages/index.astro
timestamp: 2026-10-26T23-47-19Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Nav arrival pop + sticky active state work; name slot sits half-drawn ~6–10s, esp. mobile |
| 2 | Match System / Real World | 3 | Lowercase dates read naturally; Xpert "stack" line lists features, breaking the tech-line convention |
| 3 | User Control and Freedom | 2 | Owner-pinned unskippable intro (3–4s scroll lock) is the main control cost; "Click" hint on touch |
| 4 | Consistency and Standards | 2 | Pen underline on linked job titles AND unlinked project names; highlight links lack link affordance |
| 5 | Error Prevention | 3 | Little to get wrong; mailto + target=_blank can open an empty tab |
| 6 | Recognition Rather Than Recall | 3 | Clear labels; awards stated three times |
| 7 | Flexibility and Efficiency | n/a | Portfolio, no expert workflows |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined column/type; five unrelated marker colors; white TTickle tile glows in dark mode |
| 9 | Error Recovery | n/a | No forms or errors |
| 10 | Help and Documentation | n/a | Portfolio needs none |
| **Total** | | **19/28** | **Acceptable (68%), edge of Good** |

## Design Specificity Verdict
LLM: hero is authored (handwriting, named highlights, pen loops, gold dark name, Thanks sign-off); live ClineShield/Triage covers are the most specific thing on the page. Work cards and the 2-col project grid revert to stock portfolio template. ~6.5/10.
Deterministic: CLI 0 findings. Overlay 16: 15 low-contrast inside aria-hidden illustration covers (excluded per owner), 1 nested-cards on Xpert cover fake window (false positive). 0 runtime errors, no overflow at 390/1440; 7 inline prose links 21–22px tall (WCAG inline exception).

## Priority Issues
1. [P1] Work cards carry the least evidence on the page (owner removed bullets deliberately). Fix: one impact line per card, not bullets. clarify.
2. [P1] Resume is a 14px gray 4th link in the hero; only button treatment is in the footer. Fix: promote in hero + topbar. bolder.
3. [P1] Link affordances inconsistent: a.hl has no hover/link cue; project names carry pen underline but aren't links; covers/titles not clickable. Fix: link project title+cover to Devpost, hl hover state. harden.
4. [P2] Mobile intro: "Click anywhere" on touch, ~110px dead space above avatar, small name. adapt.

## Persona Red Flags
Recruiter skimming: clicks TTickle expecting proof, gets logo + "Website". Casey: scroll locked, "Click" verb, resume last in wrapped contact row. Sam: hl links colour-only; locked scroll during intro. Jordan: two navs, two toggles; doesn't know highlights are clickable.

## Minor Observations
Pen loop may clip "since jul '25"; Xpert cover chat sentence reads like a spec; white TTickle tile brightest object in dark mode; PRODUCT.md still says intro must be skippable (doc drift); "in any season" slightly awkward; ClineShield zoom crops line 12 at top.

## Questions
Which single card should a recruiter remember? Should Luxcedia get a live cover like ClineShield? Should repeat visits in a session get a shorter signature?
