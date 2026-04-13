# Portfolio Design Spec — yogeshsahu.xyz
**Date:** 2026-04-13  
**Author:** Yogesh Sahu  
**Status:** Approved — ready for implementation

---

## 1. Goal

Rebuild yogeshsahu.xyz as a premium personal brand hub that serves four audiences simultaneously:

1. **Investors / VCs** — CryptoPrism pre-seed targeting Q2 2026
2. **Recruiters / employers** — career opportunities
3. **Developer / builder community** — GitHub credibility, open source
4. **General public** — personal brand, human story

The site must make an immediate, memorable first impression that communicates "serious founder + deep builder + interesting human" in a single scroll.

---

## 2. Approach: The Architect

Alternating dark/light sections for visual rhythm. Dark hero with scroll-driven Veo 3 video centrepiece. Gold accent throughout. Structurally inspired by sujalbuild.in but with Yogesh's identity — fintech, crypto, DPIIT, and a rich human story.

**What this is NOT:** a dev resume, a terminal hacker aesthetic, or a template. It is a founder's brand book that happens to also show code.

---

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server Components, `next/image`, MDX blog, API routes |
| Styling | Tailwind CSS v4 | Utility-first, CSS variables for theming |
| Animation | Framer Motion | Scroll reveals, stat counters, hover states |
| Hero animation | Canvas API + custom hook | Scroll-driven Veo 3 frame sequence |
| Fonts | Cabinet Grotesk (display) + Inter (body) | Fontshare (Cabinet Grotesk, free) + Google Fonts (Inter, Playfair Display) |
| Deployment | Vercel | Zero-config Next.js, custom domain, free tier |
| Content | TypeScript data files | No CMS needed at launch |

**Replaces:** current pure HTML/CSS/JS site on Firebase Hosting.

---

## 4. Visual Identity

### Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--obsidian` | `#080808` | Dark section backgrounds |
| `--obsidian-soft` | `#0d0d0d` | Card/surface in dark sections |
| `--gold` | `#fbbf24` | Primary accent — CTAs, borders, glows, marquee bg |
| `--gold-dim` | `#d97706` | Hover states, secondary gold |
| `--gold-faint` | rgba(251,191,36,0.08) | Subtle backgrounds in dark sections |
| `--light` | `#fafafa` | Light section backgrounds |
| `--light-surface` | `#ffffff` | Cards in light sections |
| `--light-border` | `#e5e7eb` | Borders in light sections |
| `--text-primary` | `#ffffff` | Headings on dark |
| `--text-body` | `#d1d5db` | Body text on dark |
| `--text-muted` | `#6b7280` | Labels, captions |
| `--text-dark` | `#111111` | Headings on light |
| `--text-dark-body` | `#374151` | Body text on light |

### Typography

- **Display:** Cabinet Grotesk — weight 800/900, used for section headings and hero name. Available free at [Fontshare](https://www.fontshare.com/fonts/cabinet-grotesk). Mix with italic serif (**Playfair Display** from Google Fonts) for accent words (same technique as sujalbuild.in).
- **Body:** Inter — 0.875rem (14px) base, line-height 1.75
- **Labels:** Inter, 0.65rem, weight 700, uppercase, letter-spacing 0.15em
- **Code:** JetBrains Mono — used sparingly for stat labels and technical captions

### Section Contrast Pattern

```
Nav       → Dark (sticky)
Hero      → Dark + gold glow radial
Marquee   → Solid gold background
About     → Dark
Projects  → Light
Milestones→ Dark
Blog      → Light
Contact   → Dark
Footer    → Near-black (#050505)
```

---

## 5. Veo 3 Scroll Animation

### Generation

Generate a 6–10 second cinematic video using Google Veo 3 / Flow. Prompt should produce a panoramic, high-quality sequence of Yogesh (or avatar) — slow movement, cinematic lighting, neutral background that blends with the obsidian site background.

### Frame Extraction

```bash
ffmpeg -i avatar.mp4 \
  -vf "fps=30,scale=1080:-1" \
  -q:v 85 \
  public/frames/frame_%04d.webp
```

Target: ~180 frames at 30fps for a 6-second clip. Each frame ~25–35KB WebP. Total payload: ~5–6MB.

### Scroll Mechanic

- Hero section is `position: sticky; top: 0; height: 100vh`
- A transparent spacer div of `500vh` sits below the hero, creating the scroll zone
- `useScrollFrames` hook calculates frame index from scroll position:

```typescript
const frameIndex = Math.floor(
  (scrollProgress) * (totalFrames - 1)
);
```

- Frames are preloaded in batches of 20 using `requestIdleCallback`
- Canvas renders at `window.devicePixelRatio * 0.5` on mobile for performance
- Fallback: static poster image (`/frames/frame_0090.webp`) if frames fail to load or JS is disabled

### `useScrollFrames` Hook Contract

```typescript
const { canvasRef, isLoading } = useScrollFrames({
  frameCount: 180,
  frameDir: '/frames',
  scrollZoneSelector: '#hero-scroll-zone',
});
```

---

## 6. Page Sections

### 6.1 Navigation

- Fixed top, `z-index: 1000`
- **Transparent** over hero, transitions to `rgba(8,8,8,0.92)` + `backdrop-filter: blur(12px)` on scroll past 80vh
- Logo: `YS //` in gold, Cabinet Grotesk weight 800
- Links: Work · About · Blog · Contact — Inter, 0.78rem
- Active link: gold underline
- Mobile: hamburger → full-screen dark overlay menu
- No CTA button in nav (intentional — avoids visual noise over the hero)

### 6.2 Hero

- Full viewport (`100vh`), dark background
- Veo 3 canvas animation: large cinematic panel (min 480px tall on desktop, full-width on mobile), centred in the viewport. The canvas shows the full video frame — not cropped circular.
- **Pre-load / fallback state:** while frames are loading, a circular gold-ring avatar placeholder is shown (`width: 120px, border: 2px solid #fbbf24, box-shadow: 0 0 40px rgba(251,191,36,0.4)`). Once frames are ready the canvas fades in over it.
- Name: `YOGESH SAHU` — Cabinet Grotesk, 900 weight, `clamp(3rem, 8vw, 6rem)`, white
- Role line: `Founder · Engineer · Builder · Human` — gold, 0.72rem, uppercase, letter-spacing 0.2em
- CTA: `VIEW MY WORK →` — gold background, black text, 0.875rem, weight 700
- Scroll hint: `↓ scroll to animate` — muted, 0.65rem, pulsing opacity
- Gold radial gradient glow behind avatar
- Entrance: name and role fade up on mount (Framer Motion, 0.6s)

### 6.3 Marquee Strip

- Full-bleed gold background (`#fbbf24`)
- White text, Cabinet Grotesk 700, 0.75rem, uppercase, letter-spacing 0.1em
- Content: `CRYPTOPRISM · DPIIT FOUNDER · STRATHCLYDE MS FINTECH · 23 GITHUB REPOS · 2.26M DB RECORDS · 50K GAME DOWNLOADS · 110 COUNTRIES · 21 STATES RIDDEN · BANSURI PLAYER · UPSC TOP 2%`
- Two copies concatenated for seamless loop
- Pure CSS `@keyframes` translateX — no JS
- Pauses on `prefers-reduced-motion`

### 6.4 About

- Dark background (`#0d0d0d`), left gold border (`3px solid rgba(251,191,36,0.3)`)
- Section label: `· About` in gold
- Manifesto line: _"I build systems that move markets — and stories that move people."_ — Cabinet Grotesk italic, 1.4rem, white
- 4 stat counters (animate up from 0 on viewport entry, Framer Motion, 1.5s ease-out):
  - `2.26M` — DB Records
  - `23` — GitHub Repos
  - `50K` — Game Downloads
  - `21` — States Ridden
- Short bio paragraph (2–3 sentences) below stats
- "Read full story →" link to a dedicated `/about` page (Phase 2)

### 6.5 Featured Projects

- Light background (`#fafafa`)
- Section label: `· Featured Work` in gold-dim
- 2-column responsive grid (1-col on mobile)
- Show top 6 projects (prioritise CryptoPrism DB, Kari game, Forex Pipeline, CP Screener, CryptoPrism DB-H, Pratyaksha)
- Each `ProjectCard`:
  - White background, `1px solid #e5e7eb`, border-radius 8px
  - Category tag (e.g. `FINTECH · AI`) — gold-dim, uppercase, 0.65rem
  - Project title — weight 700, 1rem
  - 1-line description
  - Key stat (e.g. "2.26M records · 130+ indicators")
  - Hover: gold border, 4px lift, subtle gold box-shadow (Framer Motion `whileHover`)
  - Links to existing `/projects/[slug]` case study pages
- "View all projects →" link below grid

### 6.6 Milestones

- Dark background (`#080808`)
- Section label: `· Milestones` in gold
- Heading: `Beyond the code.` — Cabinet Grotesk 800
- 2×2 grid of achievement cards (dark surface, gold accent):
  - 🏛 UPSC Civil Services Prelims — Top 2% of 500,000
  - 🎮 Kari & the Lost Shrines — Sadhguru appreciation, 50K downloads, 110 countries
  - 🏍 Solo motorbike ride — 21 states of India
  - 🎓 Strathclyde MS FinTech — Merit, AI/ML Dissertation Topper (82/100)
- Each card: gold icon top, bold number/award, short description
- Framer Motion stagger reveal on scroll (0.15s between each card)

### 6.7 Blog Preview

- Light background (`#ffffff`)
- Section label: `· Writing` in gold-dim
- 3 post previews, vertically stacked or 3-col on desktop
- Each post: gold bullet, title, 1-line excerpt, date, "Read →" link
- Placeholder posts at launch (real posts added in Phase 2):
  1. "Building CryptoPrism: From Idea to 2.26M Records"
  2. "What UPSC taught me about shipping products"
  3. "AI/ML in Fintech: Lessons from my Dissertation"
- "Read all posts →" links to `/blog`

### 6.8 Contact

- Dark background (`#0d0d0d`)
- Headline: `Let's build something.` — Cabinet Grotesk 800, white
- Subline: `Open to conversations — investors, collaborators, opportunities.`
- 4 link cards (gold border, dark surface):
  - GitHub — github.com/CryptoPrism-io
  - LinkedIn — linkedin.com/in/yogeshsahu-
  - Email — yogesh.sahu@cryptoprism.io
  - CryptoPrism — cryptoprism.io
- No contact form at launch — reduces attack surface and friction
- Availability badge: `● Available for select collaborations` — pulsing green dot

### 6.9 Footer

- Near-black (`#050505`)
- `yogeshsahu.xyz · © 2026 Yogesh Sahu · Built with Next.js`
- Social icon row (minimal, 16px icons)

---

## 7. Component File Structure

```
src/
  app/
    layout.tsx          — root layout, fonts, metadata, OG tags
    page.tsx            — assembles all sections
    projects/[slug]/
      page.tsx          — individual project case study
    blog/[slug]/
      page.tsx          — MDX blog post
  components/
    Nav.tsx             — sticky nav, transparent→solid, hamburger
    HeroScroll.tsx      — Veo 3 canvas scroll engine + layout
    Marquee.tsx         — gold ticker strip
    AboutStats.tsx      — manifesto + 4 animated counters
    ProjectCard.tsx     — reusable card with hover state
    ProjectsGrid.tsx    — light section, responsive grid
    Milestones.tsx      — dark section, 2×2 achievement grid
    BlogPreview.tsx     — light section, 3 post previews
    Contact.tsx         — dark section, link grid
    SectionWrapper.tsx  — Framer Motion scroll-reveal HOC
  lib/
    useScrollFrames.ts  — canvas frame loader + scroll driver hook
    projects.ts         — project data (migrated from existing HTML)
    posts.ts            — blog post metadata
  styles/
    globals.css         — CSS custom properties, base reset
```

---

## 8. Animation Inventory

| # | Animation | Engine | Trigger |
|---|---|---|---|
| 1 | Hero Veo 3 frame playback | Canvas API + scroll | User scrolls in hero zone |
| 2 | Section fade-up reveal | Framer Motion | Viewport entry (once) |
| 3 | Stat counters (0 → value) | Framer Motion animate | About section enters viewport |
| 4 | Marquee scroll | CSS @keyframes | Always on, pauses on reduced-motion |
| 5 | Project card hover | Framer Motion whileHover | Mouse hover |
| 6 | Nav background transition | CSS transition | Scroll past 80vh |
| 7 | Hero name/role entrance | Framer Motion | On mount |

---

## 9. Deployment

- **Host:** Vercel (free tier)
- **Domain:** yogeshsahu.xyz — update DNS A/CNAME records to point to Vercel
- **CI:** GitHub Actions → `vercel deploy --prod` on push to `master`
- **Current Firebase setup:** `firebase.json`, `.firebaserc` removed after migration
- **Existing project case study HTML pages:** migrated to Next.js routes under `app/projects/[slug]/`
- **Environment variables:** none required at launch

---

## 10. Out of Scope (Phase 1)

The following are explicitly deferred to Phase 2 to keep Phase 1 buildable and shippable:

- Full `/about` page (separate route)
- Real blog posts (MDX content)
- Contact form (server action + email)
- Dark mode toggle
- CryptoPrism live data widgets
- Analytics integration
- i18n

---

## 11. Success Criteria

A visitor landing on yogeshsahu.xyz should:

1. Immediately understand who Yogesh is from the hero alone (name, role, CTA visible within 2 seconds)
2. Feel the Veo 3 animation is smooth and cinematic (no jank, no layout shift)
3. Find CryptoPrism DB prominently featured in the projects section
4. Leave knowing both the builder and the human (projects + milestones both visible without scrolling to a separate page)
5. Have at least one frictionless contact path (GitHub, LinkedIn, or email)
