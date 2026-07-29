# Yogesh Sahu — Portfolio Site Knowledge Base

## Overview

Next.js 16.2.3 app (App Router) — macOS-themed desktop portfolio.
Tech: React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, D3.js v7, LazyMotion (m), lucide-react.
Runtime: Node.js 22+. Build: `npm run build`.

---

## Routes

| Path | Component | Section |
|---|---|---|
| `/` | `page.tsx` → `LaunchDeck` + `GlyphPanel` + `Window` manager | Desktop home, window manager, dock |
| `/work` | `work/page.tsx` → `WorkPageHeader` + `ClusterSection` × 3 | 12 case studies in 3 clusters |
| `/investors` | alias → renders `ResourcesPage` from `/resources` | Same as /resources, different metadata |
| `/resources` | `resources/page.tsx` → `ResourcesView` | Investors DB, Pitch Decks, Playbooks, Toolkit |
| `/projects/[slug]` | `projects/[slug]/page.tsx` → dynamic detail page | Full case study per slug |

---

## Component Tree

### `src/components/desktop/`
- `Dock.tsx` — macOS dock for open windows
- `DesktopIcon.tsx` — icon + label button
- `MenuBar.tsx` — orphaned (removed from page.tsx but file on disk)
- `Window.tsx` — draggable/resizable window, z-index management

### `src/components/landing/`
- `LaunchDeck.tsx` — identity panel: photo, metrics, highlights, CTA (maxHeight: 90vh)
- `GlyphPanel.tsx` — 7-item nav portal (fixed `min(78vh,680px)`, flex:1 items, text-scale hover, .38 dim)
- `MobileHome.tsx` — full mobile page (hero, ventures, track record, contact)

### `src/components/windows/`
- `AboutWindow.tsx` — bio, ventures, career highlights, Barclays SVG
- `CapabilityGraphWindow.tsx` — 3 domain tabs with skills + proofs
- `ContactWindow.tsx` — mandate types, links, CTA
- `CredentialsWindow.tsx` — 4 categories, 16 credentials, 5 brand SVGs
- `DiagnosticWindow.tsx` — paid diagnostic offer
- `ExperienceWindow.tsx` — 8-entry timeline with brand SVGs + tech tags
- `ProjectsWindow.tsx` — 3 featured project cards
- `ResourcesWindow.tsx` — wraps ResourcesView
- `TerminalWindow.tsx` — interactive terminal (9 commands)

### `src/components/work/`
- `WorkPageHeader.tsx` — /work hub header
- `ClusterSection.tsx` — cluster group + grid of CaseCards
- `CaseCard.tsx` — project card (image, tags, stats, hover lift)
- `CaseStudyBlocks.tsx` — renders 6 block types (stats, flow, table, callout, prose, tags)
- `LeadershipLens.tsx` — 2-column 6-slot lens grid
- `ProjectGallery.tsx` — image + caption gallery

### `src/components/resources/`
- `ResourcesView.tsx` — 4-tab container
- `InvestorPool.tsx` — searchable/filterable investor DB (25/page, CSV/Excel export)
- `InvestorDashboard.tsx` — D3.js charts (donut, treemap, bubbles, heatmap)

### `src/components/ui/`
- `ImagePlaceholder.tsx` — missing image fallback

---

## Data Files

| File | Contains |
|---|---|
| `src/lib/projects.ts` | 12 projects (id, name, tags, language, category, featured, href, githubHref, cluster) |
| `src/lib/motion.ts` | Framer Motion animation presets |
| `src/lib/exportUtils.ts` | CSV + Excel export for investor DB |
| `src/data/capabilities.ts` | 3 domains × skills × subdomains × proof links |
| `src/data/clusters.ts` | 3 cluster definitions (A, B, C) |
| `src/data/domain-graph.ts` | Graph coordinates for capability viz |
| `src/data/project-details.ts` | Merged project + case study content |
| `src/data/proofs.ts` | 27 proof-of-work cards |
| `src/data/window-configs.tsx` | 9 window configs (id, icon, pos, size) |
| `src/data/investors.json` | 161K-line investor database |
| `src/data/case-studies/*.ts` | 12 case study content files |

---

## Brand SVG Status

### Already using theSVG CDN (`cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/{slug}/default.svg`)

| Component | Slugs |
|---|---|
| CredentialsWindow | `google-cloud`, `amazon-web-services`, `microsoft-azure`, `microsoft`, `scrum-alliance` |
| AboutWindow | `barclays` |
| ExperienceWindow | `barclays`, `ubisoft` |

### No local SVGs — all brand logos from remote CDN only. All other icons are lucide-react.

---

## Key Patterns

- **Styling**: Tailwind CSS with `cn()` utility, custom CSS on `:root`, glass morphism (`backdrop-blur-xl bg-white/5`), dark scheme
- **Animation**: Framer Motion `motion.div` with presets from `src/lib/motion.ts` (fadeUp, stagger, rhythmDelays)
- **Window State**: `useWindowManager()` hook — z-index, maximize, minimize, close, `36` removed from max height calc
- **Brand SVG pattern**: `<img src={\`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/\${slug}/default.svg\`} alt={name} className="h-3.5 w-3.5 object-contain" />`
- **Slug convention**: lowercase-kebab using `thesvg` skill's `normalizeSlug()`: "Google Cloud" → `google-cloud`, "AWS" → `amazon-web-services`, "Microsoft Azure" → `microsoft-azure`, "Scrum Alliance" → `scrum-alliance`, "Barclays" → `barclays`, "Ubisoft" → `ubisoft`
- **theSVG skill file**: `.claude/skills/thesvg/SKILL.md` — provides 6,030+ brand slugs and lookup instructions
