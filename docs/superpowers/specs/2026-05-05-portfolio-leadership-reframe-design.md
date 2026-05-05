# Portfolio Leadership Reframe — Design

**Date:** 2026-05-05
**Owner:** Yogesh Sahu
**Source content:** `C:\cpio_db\portfolio\` (12 case-study HTMLs + index)
**Destination:** `C:\cpio_db\yogeshsahu-website\` (Next.js, deploys to yogeshsahu.xyz)

## 1. Goal

Port the 12 fresh case studies from the static portfolio into the live Next.js site, organised into three leadership clusters, with a uniform six-slot **Leadership Lens** module attached to every case.

The site today reads as an engineer's portfolio. After this work it reads as a founder-operator's portfolio: every case opens with a decision, a bet, and an outcome — with engineering depth supporting that lead, not displacing it.

## 2. Categorisation — three clusters

Replace the flat project list with three named clusters, each carrying a one-line leadership thesis.

### Cluster A — Fintech Engineering (5 cases)

**Archetype:** Founder-Operator (CEO of CryptoPrism, owns full stack)

**Thesis:** "Treated $800/mo Glassnode-class market data as a founder build-vs-buy problem — shipped equivalent intelligence at $30/mo and a live execution layer on top."

**Cases (flat, no sub-label):**
1. `cryptoprism-onchain` — On-chain analytics engine (BigQuery + FastAPI)
2. `cryptoprism-ml-signals` — News fetcher + ML signal pipeline (FinBERT + LightGBM)
3. `cryptoprism-api` — FastAPI microservices on Cloud Run
4. `timesfm-bot` — TimesFM 100-coin trading bot
5. `fxsaarthi` — Professional forex session dashboard

### Cluster B — Enterprise Operations (3 cases)

**Archetype:** Solution Architect (delivered for stakeholders, owned scope through sign-off)

**Thesis:** "Owned the architecture and rollout of ERP/CRM systems that real businesses run on — scope, schema, deployment, sign-off."

**Cases:**
1. `pgg-erp` — PGG ERP
2. `pgg-crm` — PGG CRM
3. `trinetry-erp` — Trinetry ERP

### Cluster C — Consumer & AI Products (4 cases)

**Archetype:** Product Visionary (chose audience, format, and metric of success)

**Thesis:** "Made consumer bets across edtech, cultural AI, civic tech and gaming — chose the audience, the format, and the metric of success."

**Cases:**
1. `gyanmarg` — Edtech (React/Firebase)
2. `ai-bharatverse` — Cultural AI
3. `pratyaksha` — Civic tech
4. `kari-game` — Unity game

## 3. Leadership Lens — six-slot spine

Every case study renders a Leadership Lens module **above** the existing What/Why/How content. Six slots, fixed order, every case fills every slot:

| # | Slot | What goes here |
|---|---|---|
| 1 | **The Call** | The strategic decision I made — and the option I rejected. |
| 2 | **The Bet** | What I committed to with incomplete information. |
| 3 | **The Trade-off** | What I deliberately sacrificed. |
| 4 | **The Outcome** | Business / user impact, not tech output. |
| 5 | **Coordinated** | Team, stakeholders, vendors, partners I led or aligned. |
| 6 | **Where this goes next** | Forward-looking roadmap or thesis extension. |

The Lens is **always six slots, always in this order, always above the body.** This consistency is the differentiator — a reader scanning three case studies sees the same shape three times and pattern-matches "this person leads."

## 4. Site IA changes (Next.js)

### 4.1 New routes

- **`/work`** — cluster hub. Three cluster sections, each with thesis + case cards. Becomes the canonical case-studies entry point. Linked from the desktop "Projects" window and mobile nav.

### 4.2 Modified routes

- **`/projects/[slug]`** — existing dynamic route. Add Leadership Lens module at the top. Render the rich blocks (stats grids, flow diagrams, tables, callouts, tags) that the static reports already use.

URLs unchanged for existing projects. `/work` is purely additive.

### 4.3 File-level changes

| File | Change |
|---|---|
| `src/data/project-details.ts` | Extend schema: `cluster: 'A'\|'B'\|'C'`, `archetype: string`, `leadershipLens: { call, bet, tradeoff, outcome, coordinated, nextStep }`, plus structured content blocks (`stats[]`, `flows[]`, `tables[]`, `callouts[]`, `tags[]`). All 12 cases populated. |
| `src/lib/projects.ts` | Add `getProjectsByCluster(cluster)` and `getClusterMeta(cluster)` helpers. |
| `src/app/work/page.tsx` *(new)* | Cluster hub page, server component, reads from `project-details.ts`. |
| `src/app/projects/[slug]/page.tsx` | Render Leadership Lens block above existing content blocks. |
| `src/components/work/LeadershipLens.tsx` *(new)* | The 6-slot module — fixed visual shape, used on every detail page. |
| `src/components/work/ClusterSection.tsx` *(new)* | Used on `/work` for each cluster's thesis + case cards. |
| `src/components/work/CaseStudyBlocks.tsx` *(new)* | Renders stats grids, flow diagrams, tables, callouts from the structured schema. |
| `src/components/windows/ProjectsWindow.tsx` | Switch from flat list to cluster view; default tab = Cluster A. |
| `src/components/landing/LaunchDeck.tsx` | Surface `/work` as a primary launch tile. |
| `src/components/landing/MobileHome.tsx` | Same — surface `/work` and the three clusters. |

### 4.4 What stays untouched

- `public/projects/*.html` — legacy hand-authored pages remain on disk as fallbacks; not linked from new IA.
- `automation/`, reports under `public/reports/` — out of scope.
- `C:\cpio_db\portfolio\generate-pdfs.py` — out of scope for this pass; future work can point it at the same content schema for single-source PDF parity.

## 5. Visual treatment

The case studies live inside the existing **Fractional Brutalist light-mode** site (per the 2026 redesign). The Leadership Lens should:

- Render as a distinct block (likely a bordered card with the six slots as labelled rows).
- Use the same type system as the rest of the site — no new fonts, no new accent colours.
- Stay readable on mobile (six slots stack vertically on narrow viewports).
- Be exportable to print (so when we later wire up PDF generation, the lens carries through cleanly).

Detailed visual design happens in the implementation phase, not here.

## 6. Phasing

| Phase | Output | Gate |
|---|---|---|
| **0. Spec** | This document | User approves |
| **1. Schema + slug reconciliation** | `project-details.ts` schema extended; types added; one case (cryptoprism-onchain) ported as proof. Decide canonical slugs where the static portfolio filename and the existing Next.js route differ (e.g. static `case-timesfm-bot.html` vs existing route `/projects/timesfm-trading-bot`; static `case-kari-game.html` vs existing route `/projects/kari`). Default rule: keep existing live URLs unchanged where a route already exists, add new slugs for cases not yet in the site. Document the final slug map in the implementation plan. | Type-checks; user reviews shape and slug map |
| **2. Content port** | Remaining 11 cases ported into the new schema; Leadership Lens drafted per case from existing static-portfolio prose | User signs off case-by-case (or in batches of 3–4); leadership lens prose is yours, drafted by Claude, red-lined by you |
| **3. UI** | `LeadershipLens` + `CaseStudyBlocks` + `ClusterSection` components built; `/work` hub page live; detail pages render new blocks | Renders cleanly desktop + mobile |
| **4. Nav** | `ProjectsWindow`, `LaunchDeck`, `MobileHome` updated to surface clusters and `/work` | Manual nav walk-through |
| **5. QA & deploy** | Type-check, build, visual regression, Vercel preview | User reviews preview before promoting |

## 7. What changes for the user, in plain terms

| Today | After |
|---|---|
| Flat project list, hard to pattern-match | Three named clusters, three theses — recruiter places you in 5 seconds |
| Cases lead with stack and metrics | Cases lead with **The Call · Bet · Trade-off · Outcome · Coordinated · Where next** |
| Engineering portfolio | Founder-operator portfolio with engineering depth in support |
| Content lives in two places (static HTML + Next.js blurbs) — drifts | Single source of truth in `project-details.ts`; static portfolio remains a print artefact |
| No "I led people / aligned stakeholders" surface | Explicit `Coordinated` slot on every case |
| No forward-looking signal | Explicit `Where this goes next` slot on every case |

## 8. Risks and mitigations

- **Risk:** Leadership Lens prose feels formulaic if filled in mechanically.
  **Mitigation:** Draft slots from existing prose first, then rewrite naturally. User red-lines every "Call" / "Bet" line — those are personal claims Claude must not invent.
- **Risk:** Content surface is large (12 deep cases).
  **Mitigation:** Phase 2 batched in 3–4 case chunks, user reviews each batch before next starts. Single shared schema means no per-case UI work.
- **Risk:** Cluster B (enterprise) cases (`pgg-*`, `trinetry-erp`) may have less colourful metrics than Cluster A.
  **Mitigation:** Lean harder on `Coordinated` and `Outcome` slots for B — that's where these projects shine.
- **Risk:** `/work` and `/projects/[slug]` IA changes ripple into nav and landing components.
  **Mitigation:** Phase 3 (UI) is gated on Phase 1 (schema) — schema lands first, UI gets clean inputs.

## 9. Out of scope for this spec

- PDF parity (regenerating `C:\cpio_db\portfolio\pdf\` from the new schema).
- LinkedIn carousel export.
- Reordering or rewriting the existing landing page sections (About, Hero, Mental OS, etc.).
- Changing the visual design system of the site.
- SEO / OG / sitemap work for the new routes (will follow standard Next.js defaults; sharpen later).

## 10. Definition of done

- All 12 cases live at `/projects/[slug]` with Leadership Lens populated.
- `/work` hub page lists three clusters with theses and case cards.
- Desktop "Projects" window and mobile nav route into `/work`.
- User has reviewed and approved every Leadership Lens entry.
- Site builds, deploys to preview, and passes a manual nav + content walk-through on desktop and mobile.
