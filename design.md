# Design — yogeshsahu.xyz

A locked design system for this portfolio. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
atmospheric

## Macrostructure family
- Home page: **OS metaphor** — custom desktop macrostructure with draggable windows, dock, menu bar
- Work page: **Portfolio grid** — card grid with leadership clusters, varies hero + footer archetype
- Project detail: **Narrative workflow** — full-width narrative with gallery blocks, leadership lens
- Resources page: **Catalogue** — table/index of investor directory entries

Pages within a family share the family's shape; they vary only in component archetypes.

## Theme
- `--color-paper`:        oklch(0.978 0.011 77)   /* #FCF7F0 */
- `--color-paper-2`:      oklch(0.981 0.010 73)   /* #FDF8F2 */
- `--color-paper-muted`:  oklch(0.935 0.022 68)   /* #F4E7DA */
- `--color-ink`:          oklch(0.218 0.029 49)   /* #25160E */
- `--color-ink-2`:        oklch(0.398 0.043 54)   /* #5A4131 */
- `--color-rule`:         oklch(0.861 0.035 65)   /* #E2CDBA */
- `--color-accent`:       oklch(0.577 0.158 39)   /* #C45026 — display/large only */
- `--color-accent-strong`: oklch(0.479 0.146 38)  /* #9E3611 — small text + button fills */
- `--color-focus`:        oklch(0.577 0.158 39)

> **Contrast rule (V4 "Soft Amber", 2026-08-07):** small text/labels use `ink-2` or
> `accent-strong`; `accent` is reserved for display-size text and tints; button
> fills use `accent-strong` with `paper` text. Verified WCAG AA on every pair.

## Typography
- Display: Newsreader, weight 700, style normal (not italic)
- Headline: Sora, weight 700-900, uppercase
- Body: Work Sans, weight 400
- Mono: JetBrains Mono, weight 400-600
- Display letter-spacing: normal (not tracking)
- Type scale anchor: `--text-display` = `clamp(3.25rem, 8vw, 6.75rem)`

## Spacing
4-point named scale. Pages must use named tokens (`var(--space-md)`), never raw values.

- `--space-3xs`: 0.25rem
- `--space-2xs`: 0.5rem
- `--space-xs`: 0.75rem
- `--space-sm`: 1rem
- `--space-md`: 1.5rem
- `--space-lg`: 2rem
- `--space-xl`: 3rem
- `--space-2xl`: 4.5rem
- `--space-3xl`: 7rem

## Motion
- Easings: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in: cubic-bezier(0.7, 0, 0.84, 0)`
- Reveal pattern: one orchestrated entrance on the hero only; no scroll-triggered reveals below the fold
- Reduced-motion fallback: opacity-only, ≤ 150 ms, no spatial transforms
- Spring physics reserved for physical interactions only (drag release)

## Microinteractions stance
- Silent success: no celebratory toasts
- No cursor followers
- Hover delay 800 ms, focus delay 0 ms
- All transitions on opacity/transform only — never layout properties
- No `transition-all`
- No bounce/overshoot easings on UI state

## CTA voice
- Primary CTA: fill style, rounded-xl, uses accent colour
- Secondary CTA: outline style, rounded-xl, pill or ghost

## Per-page allowances
- Home page MAY use enrichment (atmospheric OS metaphor — dock spring, window drag, grain texture)
- Work / Resources / Project detail pages MUST NOT use enrichment — function carries the page

## What pages MUST share
- The "YS." wordmark / logotype
- The accent colour and its placement (≤ 5% per viewport)
- The display + body fonts
- The CTA voice (button shape, border-radius, padding rhythm)
- The motion system (eases, durations, reveal pattern)
- The spacing scale

## What pages MAY differ on
- Macrostructure within the page-type family
- Hero archetype (within the family's allowance)
- Nav archetype (home uses menu bar; sub-pages use floating pill)
- Footer archetype (home uses dock; sub-pages use statement or letter-close)