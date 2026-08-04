# Yogesh Sahu — Website Trail of Thoughts

A chronological record of the last 10 commits, capturing what changed and why.

Generated: 2026-08-04

---

## `6dcad59` — fix: remove Binance from hero brand badges + enlarge GlyphPanel

**Files:** `GlyphPanel.tsx`, `LaunchDeck.tsx`, `MobileHome.tsx`

- Binance was showing as a hero brand badge (implying employment) but it's a trading API/tool, not an employer — removed from the brand-badge row on both desktop (LaunchDeck) and mobile home.
- GlyphPanel (left navigation portal) resized `min(44vw, 560px)` → `min(48vw, 620px)` and taller, so it visually balances against the LaunchDeck identity panel on the right.

---

## `74d16a3` — feat(anim): resources tab crossfade + card hover micro-anims + dock brand SVGs + glyph underline

**Files:** `Dock.tsx`, `GlyphPanel.tsx`, `CommunityList.tsx`, `ResourcesView.tsx`, `ToolkitList.tsx`

- **ResourcesView:** wrapped tab content in `AnimatePresence mode="wait"` — Founders/Builders hub toggle and sub-tabs now crossfade instead of hard-cutting.
- **ToolkitList + CommunityList:** cards/rows get a hover lift + soft border glow.
- **Dock:** replaced generic lucide `Globe`/`Building2` icons with custom SVG brand marks — a circle-with-C for CryptoPrism, a diamond-with-T for Trinetry.
- **GlyphPanel:** an accent underline draws (`scaleX 0→1`) under the hovered nav label.

---

## `caddd1e` — feat(anim): mobile section reveals + project detail stagger + responsive fix

**Files:** `log/[slug]/page.tsx`, `GlyphPanel.tsx`, `MobileHome.tsx`, `StaggeredBody.tsx`, `CaseStudyBlocks.tsx`, `LeadershipLens.tsx`, `ProjectGallery.tsx`

- **MobileHome:** the 4 content sections (Ventures, SelectedWork, WorkWithMe, ContactSection) now scroll-reveal via the `<Reveal>` component; NavStrip cells get `active:scale-[0.95]` tap feedback.
- **Log [slug]:** paragraph stagger via new `StaggeredBody` component — each paragraph reveals with a 0.04s delay cascade.
- **CaseStudyBlocks, LeadershipLens, ProjectGallery:** converted to client components wrapped in `<Reveal>`.
- **Responsive fix:** removed the `scale(1.25)` transform on GlyphPanel — this was the main cause of overflow/off-layout on MacBook/laptop screens; resized to `min(44vw, 560px)` / `min(56vh, 480px)`.

---

## `f64b2c4` — feat(anim): foundation Reveal component + reading progress + route transitions + work/log reveals

**Files:** `log/page.tsx`, `template.tsx`, `ReadingProgress.tsx`, `Reveal.tsx`, `CaseCard.tsx`, `ClusterSection.tsx`

- Created shared `<Reveal>` scroll-reveal wrapper — the reusable primitive that most subsequent reveals build on.
- Created `<ReadingProgress>` — a 2px accent bar that fills as you scroll.
- Added route transitions via `template.tsx` — every page navigation fades+rises instead of hard-cutting.
- **CaseCard:** image zooms 1.05× on hover inside the overflowing frame.
- **ClusterSection:** the divider line draws left→right on entering view.
- **Log page hero:** eyebrow → title → lede → RSS line stagger in with Reveal.

---

## `c163992` — feat(home): typewriter CTA + nav funnel order + fix subtext clipping

**Files:** `GlyphPanel.tsx`, `LaunchDeck.tsx`, `MobileHome.tsx`

- **Typewriter CTA:** the home CTA button now cycles through phrases ("Let's Talk" / "Work With Me" / "Deep Dive" / "Connect Now") with a blinking caret, on both desktop LaunchDeck and mobile home — same click behavior (opens Contact / scrolls to diagnostic).
- **Nav funnel order:** GlyphPanel reordered to Capabilities · Work · Resources · Log · Contact (conversion last).
- **Subtext fix:** dropped truncate+nowrap on nav subtexts, allowed wrap-to-content, shortened descs to fit.

---

## `c90dd03` — feat(work): add Backend & Internal Tools cluster with 7 recovered deep-dives

**Files:** 7 `public/projects/*.html`, `sitemap.ts`, `CaseCard.tsx`, `clusters.ts`, `projects.ts`

- New cluster D **"Backend & Internal Tools"** (archetype: Data Engineer) on `/work`.
- 7 internal tools restored from legacy HTML and added as projects: CryptoPrism DB, DB-H, Screener, Socials, Sentiment Backtest Engine, Forex Data Pipeline, ForexFactory Scraper.
- Cards link directly to the static HTML deep-dive in a new tab via a new `htmlHref` field; CaseCard branches to `motion.a` for external docs with an "Internal tool" badge.
- `news-fetcher.html` + `pratyaksha.html` stayed deleted (superseded by proper React pages).
- Sitemap grew to 39 URLs including the 7 deep-dives.

---

## `9cad3db` — fix: URL/sitemap audit — email consistency, private repo buttons, orphans, /investors redirect

**Files:** `investors/page.tsx`, `projects/[slug]/page.tsx`, `sitemap.ts`, `MenuBar.tsx`, `TerminalWindow.tsx`, `project-details.ts`, `projects.ts`, 9 deleted `public/projects/*.html`

- Standardized email to `yogesh.sahu@cryptoprism.io` everywhere (MenuBar + TerminalWindow previously used `yogesh@`).
- Hid "View Source" buttons for 3 private repos (cryptoprism-onchain, -api, -dashboard) via a `hideGithub` flag — those links 404'd publicly.
- Deleted 9 orphaned legacy `public/projects/*.html` files (later partially restored in `c90dd03`).
- `/investors` now redirects to `/resources` instead of re-exporting the whole hub with its own metadata; removed from sitemap.

---

## `ea0ba07` — rename /writing to /log + add diagnostic CTA

**Files:** 13 files — `log/*` routes, redirect pages, nav, sitemap, RSS

- Renamed the merged Thinking+Journal surface from "Writing" to **"Log"** (`/log`, `/log/[slug]`, `/log/rss.xml`).
- `/writing` now redirects to `/log` (back-compat).
- Updated nav labels, home cross-links, redirect pages (`/thinking`, `/journal`, `/journal/[slug]`), sitemap, and RSS feeds.
- Added a "Start a diagnostic to connect now" CTA to the bottom of `/log`.

---

## `530a88c` — feat(dock): add social + company external links

**Files:** `Dock.tsx`

- Added Instagram, LinkedIn, CryptoPrism, Trinetry links to the desktop dock after the windows, separated by a divider.
- Inline SVG brand marks for Instagram/LinkedIn (lucide-react removed brand icons), lucide `Globe`/`Building2` for the companies at this point.
- Matched DockItem hover/scale/tooltip behavior.

---

## `7f69dd6` — feat: merge Thinking + Journal into unified /writing with tag filters

**Files:** 15 files — `writing/*` routes, `posts.ts`, `journal.ts`, nav, sitemap, RSS

- New **/writing** surface: one thread for all 15 posts (12 architecture notes + 3 journal reflections), filterable by kind (Thinking/Journal) and by tag.
- Unified data model in `src/data/posts.ts` — every post has tags, kind, mood, excerpt, readTime; single source of truth.
- `/writing/[slug]` detail pages for all posts with prev/next navigation.
- `/writing/rss.xml` serves the unified feed; `/journal/rss.xml` kept for back-compat.
- `/thinking`, `/journal`, `/journal/[slug]` redirect to `/writing` (shared `RedirectClient` component).
- Nav: Thinking + Journal merged into one Writing item; sitemap updated.
