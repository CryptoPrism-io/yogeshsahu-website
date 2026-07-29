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
- `--color-paper`:        oklch(0.97 0.015 75)
- `--color-paper-2`:      oklch(0.98 0.010 75)
- `--color-paper-muted`:  oklch(0.90 0.020 70)
- `--color-ink`:          oklch(0.05 0.010 30)
- `--color-ink-2`:        oklch(0.37 0.040 45)
- `--color-rule`:         oklch(0.85 0.020 65)
- `--color-accent`:       oklch(0.58 0.110 38)
- `--color-accent-strong`: oklch(0.50 0.120 36)
- `--color-focus`:        oklch(0.58 0.110 38)

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