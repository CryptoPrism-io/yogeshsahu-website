# Mobile Redesign Brief — yogeshsahu.xyz

Companion to `redesign-all-pages-brief.md`. Feed this + the screenshots in
`screenshots/mobile-2026-06-30/` into Claude Design (slides mode works well —
one slide per page). Captured at **390 × 844, DSR 3, iOS Safari UA**.

> The little dark **"N" badge** bottom-left in every shot is the Next.js dev
> overlay — it does NOT ship to production. Ignore it.

## House style (must carry over from desktop — do not restyle the brand)
- Palette: terracotta `#c0573a` / cream `#f7efe4` surfaces, ink `#2a170f` text,
  teal accent `#2f7d6e`, hairline borders `#e9d3bf`/`#d7bda8`.
- Fonts: Space Grotesk (headlines), Work Sans (body), JetBrains Mono
  (eyebrows/labels), Newsreader italic (serif accent — the cursive "Yogesh").
- Motifs: sharp 4–5px corners, 1px hairlines, long low drop shadow, registration
  corner ticks, film grain, count-up metrics, live IST clock.
- This is a *responsive refinement*, not a rebrand. Keep all real copy/data.

## Per-page mobile briefs

### 00 — Home (`/`)  · `00-home.png`
The desktop "OS-desktop" metaphor collapses to a clean single-column stack:
hero (index eyebrow + portrait + cursive Yogesh / SAHU + role line), the `6+`
metric strip with a 4-segment slider, then stacked nav rows (/WORK HUB, ABOUT…).
- Mobile asks: the metric strip's dot-slider feels desktop-residual — consider a
  static 4-up metric row or swipeable cards. The `6+ PRODUCTION APPS` block sits
  tight against the role line; give it breathing room.
- Nav rows (folder / file icons + chevrons) read well — keep as the primary IA.
- Consider a sticky bottom action bar (Work · About · Work-With-Me) for thumbs.

### 01 — Work hub (`/work`)  · `01-work.png`
Header (eyebrow / WORK / serif tagline) then clusters stack single-column with
full-width case cards (180px media + body + stat footer).
- Cards are tall on mobile — that's fine, but the cluster thesis paragraph runs
  long; consider clamping to 3 lines with the rest on the detail page.
- The top nav (BACK | YS. … WORK) is solid. Keep.

### 02–14 — Project detail (`/projects/[slug]`)  · `02-…` → `14-…`
Header (tags / TITLE / tagline / stat chip + action buttons) → hero image →
gallery → Leadership Lens → case-study blocks → footer.
- Action buttons (Live App / View Source / Deep Dive) wrap to their own rows and
  look good full-width; keep the equal-height treatment on mobile.
- Long tag strings (`PYTHON / FASTAPI / CLOUD RUN / POSTGRESQL / REDIS`) wrap to
  two lines — acceptable, but could become a horizontal scroll chip row.
- Hero screenshots are dense; on a 390px screen they're barely legible. Consider
  a "tap to expand" lightbox or a mobile-cropped variant.

## Slides-mode instructions for Claude Design
1. Import these 15 PNGs, one per slide, named as in the folder.
2. Keep the house style above; only adjust *layout, spacing, tap targets, and
   information density* for a 390px viewport.
3. Output mobile-first component specs I can port to the existing Next.js
   components (`CaseCard`, `ClusterSection`, `work/page.tsx`,
   `projects/[slug]/page.tsx`, the landing panels).
4. Do NOT invent new copy, metrics, or projects — all data is real.
