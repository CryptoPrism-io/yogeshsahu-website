# Redesign Brief — Right-Hand Identity Panel

> Hand this prompt + a screenshot of the right-hand panel to Claude's design tool (or Stitch).

## 1. What the section is

A floating "identity deck" pinned to the **top-right** of an OS-desktop-metaphor
portfolio (the page is a desktop: menu bar on top, a dock at the bottom, draggable
windows, terracotta canvas). The panel introduces the person at a glance and is the
single most important block on the landing screen. It is composed of two stacked
glass cards:

- **Hero card** — eyebrow role line, large name, one-line bio, a 3-up metrics row
  (6+ / 2M+ / 1B+), a "Start a Diagnostic" CTA, and a square B/W portrait on the right.
- **Career Highlights card** — section label + "2× Founder" badge, a wide marquee tile
  (72 PB+ CryptoPrism), and two venture tiles (Kari & Lost Shrines, Gamerz Nation).

## 2. Why it still reads "AI-generated" (the problems to fix)

1. **Card-in-card-in-card** — glass card → glass tiles → more tiles. "Bento soup."
2. **Uniform radii + even gaps everywhere** → no hierarchy, looks templated.
3. **Stat tiles look like a SaaS dashboard**; "1B+ datapoints/day" reads as filler.
4. **Safe symmetry** — the only tension is the photo split; otherwise everything is a
   centered, evenly-spaced box.
5. **Default component look** — two-tone pill button + pill chips.
6. **No editorial devices** — no hairline rules, no baseline grid, no real negative
   space, no type contrast beyond size.
7. Name wraps awkwardly ("YOGESH / SAHU") in a cramped column; portrait floats in a frame.

## 3. Design system to honor (the portfolio's actual tokens)

**Palette**
- Canvas: terracotta `#cc6842` (deep `#a84f2d`)
- Cream surfaces: `#fff8f1`, `#fff2e4`, muted `#f4dfcf`
- Ink: `#2a170f`; soft ink: `#6e5345`
- Accent (rust): `#cf4f27`; strong `#a93d1d`
- Secondary (teal): `#0b8d80`
- Warm border: `#d7bda8`
- Glass cards = cream at ~84% opacity + blur over terracotta

**Type**
- Display / headings: **Space Grotesk** (300–700, geometric sans)
- Body: **Work Sans**
- Labels / eyebrows: **JetBrains Mono**, uppercase, wide tracking
- Editorial accent (currently unused here): **Newsreader italic** — a serif you can
  introduce sparingly to break the "all-geometric-sans" AI feel

**Aesthetic:** Fractional Brutalist, light mode. Confident, editorial, intentional.

## 4. The redesign prompt (copy-paste)

> Redesign the identity panel from a founder/CTO portfolio (screenshot attached). The
> site is an OS-desktop-metaphor portfolio — menu bar, dock, draggable windows — on a
> burnt-terracotta canvas; this cream panel floats top-right and introduces the person.
> The current version works but reads templated and "AI-generated": too many nested
> glass cards, uniform rounded boxes, dashboard-style stat tiles, safe symmetry.
>
> Redesign it to feel **intentional, editorial, and "fractional brutalist"**: confident
> typographic hierarchy, a real grid, hairline rules instead of boxes-in-boxes,
> deliberate asymmetry and negative space, one clear focal path (portrait + name → proof
> → persistent CTA). Reduce the number of nested cards.
>
> **Palette (use exactly):** canvas `#cc6842`; cream `#fff8f1` / `#fff2e4` / `#f4dfcf`;
> ink `#2a170f`; soft ink `#6e5345`; accent rust `#cf4f27` (strong `#a93d1d`); teal
> `#0b8d80`; warm border `#d7bda8`.
>
> **Type:** Space Grotesk (display/headings), Work Sans (body), JetBrains Mono (uppercase
> eyebrow labels, wide tracking), Newsreader italic (editorial accent — use sparingly).
>
> **Content (verbatim):**
> - Eyebrow: FOUNDER | AI-NATIVE BUILDER | CTO
> - Name: Yogesh Sahu
> - Bio: "I build and ship AI-native B2B and B2C products end-to-end — 6+ production-grade
>   apps in 6 months, not MVPs."
> - B/W **square** headshot (1:1 — never crop or stretch it)
> - Primary CTA: "Start a Diagnostic →"
> - Metrics: 6+ apps shipped · 2M+ lines of code · 1B+ datapoints/day
> - Career highlights:
>   - **72 PB+ — CryptoPrism:** built a 72+ petabyte data pipeline, made queryable by
>     anyone via NLP-to-SQL chat
>   - **2M+ — Kari & Lost Shrines:** 2M social reach in 2020
>   - **100K+ — Gamerz Nation:** first startup at 22 — 7 franchises, 100K+ revenue in
>     year one
>   - Badge: 2× Founder
>
> **Avoid:** nested glass-card-in-card; identical corner radii everywhere; SaaS dashboard
> stat tiles; centered safe symmetry; generic pill buttons.
>
> **Deliver:** a single responsive panel ~560px wide on desktop, cream surfaces over the
> terracotta canvas, in React + Tailwind (or static HTML/CSS), with the exact tokens above.

## 5. Keep / flexible

- **Keep:** the OS-desktop context, the cream-on-terracotta palette, the four fonts, all
  copy and numbers (these are real — do not invent metrics), the square portrait.
- **Flexible:** layout, card count, where the CTA lives, how metrics are expressed
  (inline data vs. tiles), introducing the serif, hairline rules, asymmetry.
