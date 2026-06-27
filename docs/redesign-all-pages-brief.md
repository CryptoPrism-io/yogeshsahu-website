# Redesign Brief — All Pages (Claude Design)

> Paste this prompt into Claude's design tool. Works two ways:
> - **One page:** attach a single page screenshot.
> - **Bulk (slides mode):** load all page screenshots as slides and paste this once —
>   each slide is one page; they must all share ONE design system.

---

## COPY-PASTE PROMPT

> You are redesigning a **founder/CTO portfolio** for Yogesh Sahu — a 2× founder,
> AI-native builder, and fractional Chief Solutions Architect. The site is an
> **OS-desktop-metaphor** portfolio rendered on a burnt-terracotta canvas: a top menu
> bar, a floating bottom dock, draggable windows, and a cream "identity panel" pinned
> top-right. It already has a strong, intentional **"fractional brutalist," light-mode,
> editorial** language on the identity panel — I want that SAME language applied
> consistently across every page. Keep it confident, typographic, and un-templated.
>
> **If multiple screenshots / slides are provided:** treat each slide as a separate
> page of the SAME product. Produce one shared design system, then apply it per page.
> Do NOT invent a different style per page — consistency across slides is the point.
> Keep each page's existing structure and all copy/numbers; elevate layout, hierarchy,
> type, spacing, and the editorial motifs below.
>
> **Design system to honor exactly:**
>
> - **Palette:** canvas terracotta `#cc6842` (deep `#a84f2d`); cream surfaces `#fff8f1`,
>   `#fff2e4`, muted `#f4dfcf`; ink `#2a170f`, soft ink `#6e5345`; accent rust `#cf4f27`
>   (strong `#a93d1d`); teal `#0b8d80`; warm border `#d7bda8`. Cards = cream over the
>   terracotta canvas.
> - **Type (four fonts):** Space Grotesk (display / headings), Work Sans (body),
>   JetBrains Mono (uppercase eyebrows / labels, wide tracking), Newsreader italic
>   (editorial accent — use sparingly to break the geometric-sans feel).
> - **Editorial motifs (the house style — use these, not generic cards):**
>   sharp 4–5px corners (never big pill radii); 1px hairline borders; a long, low drop
>   shadow (`0 24px 56px -32px rgba(42,23,15,.55)`); accent registration ticks/corner
>   marks; hairline horizontal rules instead of nested boxes; subtle film grain on cream
>   surfaces; mono uppercase eyebrow labels; one Newsreader-italic accent per view.
> - **Aesthetic:** deliberate asymmetry, real negative space, clear focal path, type
>   contrast beyond size. AVOID: nested glass-card-in-card "bento soup," identical radii
>   everywhere, SaaS-dashboard stat tiles, centered safe symmetry, default pill buttons.
>
> **Pages to redesign (one per slide):**
>
> 1. **Home — the desktop.** Burnt-terracotta canvas with a top menu bar (left wordmark
>    "YS.", role line, right side shows OPEN status + live IST clock), a floating bottom
>    dock of app icons, and the cream **identity panel** top-right (eyebrow role line,
>    big "YOGESH SAHU", one-line bio with a serif accent, 3 count-up metrics, a teal
>    "Start a Diagnostic" CTA, and a Career Highlights block: 72 PB+ CryptoPrism,
>    2M+ Kari & Lost Shrines, 100K+ Gamerz Nation, "2× Founder"). A left vertical nav
>    lists: Projects, Work Hub, Capabilities, Work With Me, About, Contact. Keep the
>    OS-desktop metaphor; make the canvas feel intentional, not empty.
> 2. **/work — the case-study hub.** Sticky top nav (← Back · YS. · "Work"), an editorial
>    page header, then three "leadership cluster" sections, each with a row of case cards
>    (project name, one stat, short description, tags). 12 case studies total.
> 3. **/projects/[slug] — case-study detail.** Sticky top nav (← Back · YS. · language),
>    a header (mono tag line, big project name, tagline, a stat chip, and Live App /
>    View Source / Deep Dive buttons), a hero image, an optional screenshot gallery, a
>    "Leadership Lens" block, long-form case-study sections, and a footer. Make the long
>    read scannable and editorial.
> 4. *(If included)* In-desktop **windows** (Projects teaser, Capability Graph, Diagnostic
>    offer, About, Contact): cream windows with a title bar; apply the same sharp-corner,
>    hairline, registration-tick chrome.
>
> **Content rules:** all names and numbers are REAL — keep them verbatim, never invent
> metrics. Keep the square B/W headshot 1:1 (never crop or stretch). Use the exact tokens
> above.
>
> **Deliver:** responsive layouts in React + Tailwind (or static HTML/CSS) using the exact
> palette, the four fonts, and the editorial motifs — visually consistent across all pages.

---

## Page → screenshot map (for slides order)

| Slide | Page | File |
|------|------|------|
| 1 | Home (desktop) | `00-home.png` |
| 2 | Work hub | `01-work.png` |
| 3–15 | Project detail ×13 | `02-project-…` → `14-project-…` |

> Note: screenshots in `screenshots/subpages-2026-06-27/`. Re-shoot from the live site
> (yogeshsahu.xyz) if the set is stale.
