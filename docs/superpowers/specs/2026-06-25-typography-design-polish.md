# Typography Overhaul + Design Polish
**Date:** 2026-06-25  
**Status:** Approved

---

## Scope

Full-site typography upgrade (sizes, weights, line-height) plus six design-polish techniques: grain overlay, layered shadows, spring physics, LazyMotion bundle cut, sibling-dim nav interaction, and cursor text morph.

---

## 1. Typography System

### Font Loading (`src/app/layout.tsx`)
- `Space_Grotesk`: add weights `800`, `900` (currently capped at 700)
- `Work_Sans`: add weight `700` (currently capped at 600)
- No new font families introduced

### Global Defaults (`src/app/globals.css`)
- `body`: set `font-weight: 500` (was implicitly 400 — Work Sans 400 reads wispy)
- `font-optical-sizing: auto` on `html` — improves rendering at all sizes
- All existing utility classes (`font-system`, `font-display`) stay unchanged

### Size Scale

| Context | Current | Target |
|---|---|---|
| Window body paragraphs | `13px` | `15px` |
| Window small subtext / notes | `12px` | `13px` |
| Mono caps labels | `9–10px` | `11px` |
| LaunchDeck bio paragraph | `12px` | `14px` |
| LaunchDeck stat values | `18px` | `22px` |
| Nav portal right-side desc | `10px` | `11px` |

Apply by editing inline `font-size` values in each component. Do not introduce new CSS classes — keep the current inline-style pattern used throughout the codebase.

### Line-height + Tracking
- Long body paragraphs (`leading-[1.85]`): change to `leading-[1.75]`
- Display headings above 40px: add `letterSpacing: "-0.02em"` where missing
- Mono labels: keep existing tracking (already tight at 0.12–0.28em)

### Files with type size changes
- `src/components/windows/AboutWindow.tsx`
- `src/components/windows/CapabilityGraphWindow.tsx`
- `src/components/windows/ContactWindow.tsx`
- `src/components/windows/CredentialsWindow.tsx`
- `src/components/windows/DiagnosticWindow.tsx`
- `src/components/windows/ExperienceWindow.tsx`
- `src/components/windows/ProjectsWindow.tsx`
- `src/components/windows/TerminalWindow.tsx` (skip — terminal has intentional small mono text)
- `src/components/landing/LaunchDeck.tsx`
- `src/components/landing/GlyphPanel.tsx`

---

## 2. Visual Polish

### Grain Overlay (`src/app/globals.css` + `src/app/page.tsx`)
- Add an `<svg>` with `feTurbulence` + `feColorMatrix` to `page.tsx`, rendered as a fixed full-screen overlay (`pointer-events-none`, `z-[1]`, below windows)
- `baseFrequency: 0.65`, `numOctaves: 4`, opacity `0.04` (4%)
- Gives the terracotta surface a tactile, printed-paper quality

### Vignette (`src/app/globals.css`)
- Extend `.desktop-surface` gradient: deepen the existing bottom-right radial from `rgba(160,58,24,0.35)` → `rgba(130,42,14,0.48)` and top warm glow from `rgba(255,232,214,0.5)` → `rgba(255,228,208,0.62)`
- No new DOM element needed — pure CSS tweak

### Layered Shadow on LaunchDeck (`src/components/landing/LaunchDeck.tsx`)
Replace single `box-shadow` with 4-level stack:
```
0 1px 2px rgba(31,17,11,0.06),
0 4px 8px rgba(31,17,11,0.10),
0 16px 32px rgba(31,17,11,0.14),
0 48px 80px rgba(31,17,11,0.18)
```

---

## 3. Motion

### Spring Physics (`src/lib/motion.ts`)
Add two new exports alongside the existing `fadeUp`:

```ts
export const springFadeUp = (delay = 0, distance = 14): Variants => ({
  initial: { opacity: 0, y: distance },
  animate: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 380, damping: 32, delay },
  },
})

export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
}
```

`fadeUp` is kept unchanged for backward compatibility. New springs used in GlyphPanel and window entry going forward.

### LazyMotion Bundle Cut (`src/app/layout.tsx`)
Wrap `{children}` with `<LazyMotion features={domAnimation}>`. Import `LazyMotion`, `domAnimation` from `framer-motion`. Reduces bundle ~28kb.

Change all `motion.*` in affected files to `m.*` (aliased import from `framer-motion`) only if needed — `LazyMotion` with `features={domAnimation}` is compatible with existing `motion.*` usage, so no rename required.

---

## 4. Micro-interactions

### Sibling Dim on Nav (`src/components/landing/GlyphPanel.tsx`)
- Add `hoveredIndex` state (number | null) on parent div
- On `onMouseEnter` of each item: set `hoveredIndex = i`
- On `onMouseLeave` of parent div: set `hoveredIndex = null`
- Each item: `opacity` = `hoveredIndex !== null && hoveredIndex !== i ? 0.38 : 1`, animated with `type: "spring", stiffness: 300, damping: 28`

### Cursor Text Morph (`src/components/desktop/CustomCursor.tsx`)
- Add a `<span>` inside the ring div, absolutely centered
- Font: 8px `var(--font-mono)`, cream, `letter-spacing: 0.12em`, `text-transform: uppercase`
- Text source: read `data-cursor` attribute from hovered element (or its closest ancestor)
- Default hover text: `"OPEN"` — show when `hovering === true` and no `data-cursor` attribute found
- Opacity: `0` when not hovering, `1` when hovering (CSS transition 150ms)
- Ring size when text visible: 52px (was 40px on hover) to give text breathing room
- Dot hides (`opacity: 0`) when hovering to avoid clutter inside the larger ring

---

## 5. Out of Scope

- Magnetic hover (requires per-element JS offset binding — deferred, too invasive for this pass)
- Scroll-weight variable font (Space Grotesk is variable-weight but requires scroll listener on every page — separate task)
- `useScroll` parallax (requires section-level refactor — separate task)
- TerminalWindow font sizes (intentionally small mono, unchanged)

---

## Acceptance Criteria

- [ ] All window body text renders at 15px, weight 500
- [ ] Mono labels at 11px minimum
- [ ] LaunchDeck bio at 14px, stat values at 22px
- [ ] Grain overlay visible at 4% on desktop surface
- [ ] LaunchDeck card has 4-level shadow
- [ ] Nav portal dims siblings on hover
- [ ] Cursor ring shows "OPEN" text on hover, expands to 52px
- [ ] `LazyMotion` wrapper present in layout.tsx
- [ ] No regressions on mobile (MobileHome unaffected)
- [ ] No TerminalWindow text size changes
