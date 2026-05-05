# Portfolio Leadership Reframe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port 12 case studies from `C:\cpio_db\portfolio\` into the Next.js site, organised into three leadership clusters (Fintech Engineering, Enterprise Operations, Consumer & AI), with a uniform six-slot **Leadership Lens** module on every case page and a new `/work` cluster hub.

**Architecture:** Extend the existing `lib/projects.ts` + `data/project-details.ts` data layer with cluster + leadership-lens fields and structured content blocks. Add a small `src/components/work/` module of presentation components (LeadershipLens, CaseStudyBlocks, ClusterSection, CaseCard). Introduce one new route `/work` for the cluster hub; reuse the existing `/projects/[slug]` route with the Leadership Lens injected at the top.

**Tech Stack:** Next.js 16 (static export), React 19, TypeScript 5, Tailwind 4, Framer Motion. No test runner installed — verification gates are `npx tsc --noEmit`, `npm run build`, `npm run lint`, and manual visual checks via `npm run dev`.

**Spec:** `docs/superpowers/specs/2026-05-05-portfolio-leadership-reframe-design.md`

**Source content:** `C:\cpio_db\portfolio\case-*.html` (12 files) and `C:\cpio_db\portfolio\index.html`.

---

## Final slug map

The destination route for each static portfolio file. Existing live URLs preserved; three new slugs added.

| Static portfolio file | Cluster | Canonical Next.js slug | Status |
|---|---|---|---|
| `case-cryptoprism-onchain.html` | A | `cryptoprism-onchain` | exists |
| `case-cryptoprism-api.html` | A | `cryptoprism-api` | exists |
| `case-cryptoprism-ml-signals.html` | A | `cryptoprism-news-fetcher` | exists (ml-signals = news-fetcher pipeline) |
| `case-timesfm-bot.html` | A | `timesfm-trading-bot` | exists |
| `case-fxsaarthi.html` | A | `fxsaarthi` | **new** |
| `case-pgg-erp.html` | B | `pgg-erp` | **new** |
| `case-pgg-crm.html` | B | `pgg-crm` | **new** |
| `case-trinetry-erp.html` | B | `trinetry-erp` | exists |
| `case-gyanmarg.html` | C | `gyanmarg` | exists |
| `case-ai-bharatverse.html` | C | `ai-bharatverse` | exists |
| `case-pratyaksha.html` | C | `pratyaksha` | exists |
| `case-kari-game.html` | C | `kari` | exists |

`cryptoprism-dashboard` (existing slug, not in static portfolio) stays in the project list without a Leadership Lens — out of scope for this plan.

---

## File map

**Created:**
- `src/data/clusters.ts` — cluster metadata + helpers
- `src/data/case-studies/types.ts` — content-block + Leadership Lens types
- `src/data/case-studies/cryptoprism-onchain.ts` — first canonical case (Task 7)
- `src/data/case-studies/{slug}.ts` — one file per remaining case (Task 8 batches)
- `src/data/case-studies/index.ts` — barrel + lookup helpers
- `src/components/work/LeadershipLens.tsx`
- `src/components/work/CaseStudyBlocks.tsx`
- `src/components/work/CaseCard.tsx`
- `src/components/work/ClusterSection.tsx`
- `src/app/work/page.tsx` — `/work` cluster hub

**Modified:**
- `src/lib/projects.ts` — add `cluster` field + 3 new project entries + `getProjectsByCluster` helper
- `src/data/project-details.ts` — wire case-study content into the existing `ProjectDetail` shape
- `src/app/projects/[slug]/page.tsx` — render LeadershipLens + CaseStudyBlocks above the existing tail
- `src/components/windows/ProjectsWindow.tsx` — switch local hardcoded list to cluster-grouped view sourced from `lib/projects.ts`
- `src/components/landing/LaunchDeck.tsx` — surface `/work` tile
- `src/components/landing/MobileHome.tsx` — surface `/work` and clusters

**Untouched:** `public/projects/*.html` (legacy), reports under `public/reports/`, automation scripts, design system tokens.

---

## Task 1: Cluster metadata

**Files:**
- Create: `src/data/clusters.ts`

- [ ] **Step 1: Create `src/data/clusters.ts`**

```ts
export type ClusterId = 'A' | 'B' | 'C';

export interface ClusterMeta {
  id: ClusterId;
  slug: string;
  name: string;
  archetype: string;
  thesis: string;
  order: number;
}

export const CLUSTERS: Record<ClusterId, ClusterMeta> = {
  A: {
    id: 'A',
    slug: 'fintech-engineering',
    name: 'Fintech Engineering',
    archetype: 'Founder-Operator',
    thesis:
      'Treated $800/mo Glassnode-class market data as a founder build-vs-buy problem — shipped equivalent intelligence at $30/mo and a live execution layer on top.',
    order: 1,
  },
  B: {
    id: 'B',
    slug: 'enterprise-operations',
    name: 'Enterprise Operations',
    archetype: 'Solution Architect',
    thesis:
      'Owned the architecture and rollout of ERP/CRM systems that real businesses run on — scope, schema, deployment, sign-off.',
    order: 2,
  },
  C: {
    id: 'C',
    slug: 'consumer-and-ai',
    name: 'Consumer & AI Products',
    archetype: 'Product Visionary',
    thesis:
      'Made consumer bets across edtech, cultural AI, civic tech and gaming — chose the audience, the format, and the metric of success.',
    order: 3,
  },
};

export const CLUSTER_ORDER: ClusterId[] = ['A', 'B', 'C'];

export function getClusterMeta(id: ClusterId): ClusterMeta {
  return CLUSTERS[id];
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/data/clusters.ts
git commit -m "feat(work): add cluster metadata for leadership reframe"
```

---

## Task 2: Extend Project schema with cluster, add new entries, add helpers

**Files:**
- Modify: `src/lib/projects.ts`

- [ ] **Step 1: Add cluster to Project interface and add 3 new entries**

In `src/lib/projects.ts`, change the `Project` interface to add `cluster?: ClusterId` and add the import. Then add `cluster: 'A'`/`'B'`/`'C'` to every existing entry per the slug map at the top of this plan, and append three new entries (`fxsaarthi`, `pgg-erp`, `pgg-crm`).

```ts
import type { ClusterId } from '@/data/clusters';

export type Category = 'fintech' | 'ai' | 'quant' | 'web' | 'tools';

export interface Project {
  id: string;
  name: string;
  description: string;
  stat: string;
  statLabel: string;
  tags: string[];
  category: Category[];
  language: string;
  featured: boolean;
  href: string;
  githubHref: string;
  image?: string;
  reportHref?: string;
  reports?: { label: string; href: string }[];
  cluster?: ClusterId;
}
```

For existing entries, add `cluster: 'A'` / `'B'` / `'C'` per the slug map. Existing `cryptoprism-dashboard` gets no `cluster` field (out of scope).

Append three new entries — fill `description`, `stat`, `statLabel`, `tags`, `language`, `image`, and `href`/`githubHref` from the corresponding case-study HTML in `C:\cpio_db\portfolio\`. If a value is unknown, set `href: ''` / `githubHref: ''` and a placeholder image; the implementer must extract the live values from the case study source. Do NOT invent metric values — pull them from the case study file or leave the existing `stat` / `statLabel` shape consistent with sibling entries:

```ts
{
  id: 'fxsaarthi',
  name: 'FxSaarthi',
  description: 'Professional forex session dashboard tracking the four major sessions (Sydney, Tokyo, London, NY) with real-time pair coverage and session overlap analytics.',
  stat: '28',
  statLabel: 'forex pairs',
  tags: ['Python', 'OANDA API', 'TypeScript', 'React'],
  category: ['fintech', 'tools'],
  language: 'TypeScript',
  featured: false,
  href: '',
  githubHref: '',
  cluster: 'A',
},
{
  id: 'pgg-erp',
  name: 'PGG ERP',
  description: 'Enterprise resource planning system for a manufacturing operation. Inventory, production scheduling, vendor reconciliation, and finance close.',
  stat: 'Live',
  statLabel: 'production system',
  tags: ['Python', 'PostgreSQL', 'React'],
  category: ['tools'],
  language: 'Python',
  featured: false,
  href: '',
  githubHref: '',
  cluster: 'B',
},
{
  id: 'pgg-crm',
  name: 'PGG CRM',
  description: 'Customer relationship and outreach platform built alongside the ERP — pipeline tracking, automated client communication, and deal-stage analytics.',
  stat: 'Live',
  statLabel: 'sales platform',
  tags: ['Python', 'PostgreSQL', 'React'],
  category: ['tools'],
  language: 'Python',
  featured: false,
  href: '',
  githubHref: '',
  cluster: 'B',
},
```

The descriptions/stats above are starting points — the implementer must verify by skimming the corresponding case-study HTML and adjust if the file states something more specific. **Do not invent metrics that aren't in the source.**

- [ ] **Step 2: Add `getProjectsByCluster` helper**

At the bottom of `src/lib/projects.ts`:

```ts
import { CLUSTER_ORDER } from '@/data/clusters';

export function getProjectsByCluster(cluster: ClusterId): Project[] {
  return projects.filter((p) => p.cluster === cluster);
}

export function getAllClusteredProjects(): Array<{ cluster: ClusterId; projects: Project[] }> {
  return CLUSTER_ORDER.map((cluster) => ({
    cluster,
    projects: getProjectsByCluster(cluster),
  }));
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Build sanity check**

Run: `npm run build`
Expected: build succeeds. New slugs (`fxsaarthi`, `pgg-erp`, `pgg-crm`) generate via `generateStaticParams` in `[slug]/page.tsx` since that already iterates `projects.map((p) => ({ slug: p.id }))`. Pages will render the existing minimal layout — that's expected; rich content lands in Task 7+.

- [ ] **Step 5: Commit**

```bash
git add src/lib/projects.ts
git commit -m "feat(work): add cluster field and 3 new project entries (fxsaarthi, pgg-erp, pgg-crm)"
```

---

## Task 3: Case-study content types

**Files:**
- Create: `src/data/case-studies/types.ts`

- [ ] **Step 1: Create the types file**

```ts
import type { ClusterId } from '@/data/clusters';

export type Tone =
  | 'navy'
  | 'blue'
  | 'green'
  | 'gold'
  | 'purple'
  | 'cyan'
  | 'red';

export interface LeadershipLens {
  call: string;       // The strategic decision (and the option rejected)
  bet: string;        // What I committed to with incomplete info
  tradeoff: string;   // What I deliberately sacrificed
  outcome: string;    // Business / user impact
  coordinated: string; // Team / stakeholders led or aligned
  nextStep: string;   // Forward-looking roadmap
}

export interface StatItem {
  label: string;
  value: string;
  sub?: string;
  tone?: Tone;
}

export interface StatBlock {
  type: 'stats';
  cols?: 2 | 3 | 4 | 5 | 6;
  items: StatItem[];
}

export interface FlowNode {
  label: string;
  sublabel?: string;
  tone?: Tone | 'light';
}

export interface FlowBlock {
  type: 'flow';
  title?: string;
  // Each row is a sequence of nodes that get rendered with arrows between them.
  rows: FlowNode[][];
}

export interface TableBlock {
  type: 'table';
  headers: { label: string; align?: 'left' | 'right' }[];
  rows: { value: string; mono?: boolean; bold?: boolean; tone?: Tone }[][];
}

export interface CalloutBlock {
  type: 'callout';
  tone?: 'gold' | 'green' | 'blue' | 'purple';
  title?: string;
  body: string;
}

export interface ProseBlock {
  type: 'prose';
  heading?: string;
  body: string; // plain text; line breaks become paragraphs
}

export interface TagsBlock {
  type: 'tags';
  items: { label: string; tone?: Tone }[];
}

export type CaseStudyBlock =
  | StatBlock
  | FlowBlock
  | TableBlock
  | CalloutBlock
  | ProseBlock
  | TagsBlock;

export interface CaseStudySection {
  number?: string; // e.g. "01", "02"
  eyebrow?: string; // small uppercase label
  title: string;
  blocks: CaseStudyBlock[];
}

export interface CaseStudyContent {
  slug: string;
  cluster: ClusterId;
  archetype: string;          // e.g. "Founder-Operator"
  oneLineTagline: string;     // shown on /work card and detail header
  leadershipLens: LeadershipLens;
  sections: CaseStudySection[];
  sourceFile: string;         // pointer to the static portfolio HTML
}
```

- [ ] **Step 2: Create the index/barrel with empty registry**

Create `src/data/case-studies/index.ts`:

```ts
import type { CaseStudyContent } from './types';
import type { ClusterId } from '@/data/clusters';

// Cases get registered here as they're ported (Tasks 7 & 8).
export const caseStudies: Record<string, CaseStudyContent> = {};

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return caseStudies[slug];
}

export function getCaseStudiesByCluster(cluster: ClusterId): CaseStudyContent[] {
  return Object.values(caseStudies).filter((c) => c.cluster === cluster);
}

export type { CaseStudyContent } from './types';
export type {
  LeadershipLens,
  CaseStudyBlock,
  CaseStudySection,
  StatBlock,
  FlowBlock,
  TableBlock,
  CalloutBlock,
  ProseBlock,
  TagsBlock,
  Tone,
} from './types';
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/data/case-studies/types.ts src/data/case-studies/index.ts
git commit -m "feat(work): add case-study content types and registry skeleton"
```

---

## Task 4: LeadershipLens component

**Files:**
- Create: `src/components/work/LeadershipLens.tsx`

- [ ] **Step 1: Create the component**

```tsx
import type { LeadershipLens as LensData } from "@/data/case-studies/types";

const SLOTS: { key: keyof LensData; eyebrow: string; label: string }[] = [
  { key: 'call', eyebrow: '01', label: 'The Call' },
  { key: 'bet', eyebrow: '02', label: 'The Bet' },
  { key: 'tradeoff', eyebrow: '03', label: 'The Trade-off' },
  { key: 'outcome', eyebrow: '04', label: 'The Outcome' },
  { key: 'coordinated', eyebrow: '05', label: 'Coordinated' },
  { key: 'nextStep', eyebrow: '06', label: 'Where this goes next' },
];

export default function LeadershipLens({ lens }: { lens: LensData }) {
  return (
    <section
      aria-label="Leadership Lens"
      className="mx-auto mb-12 max-w-4xl rounded-2xl border px-5 py-6 sm:px-7 sm:py-8"
      style={{
        borderColor: "var(--ys-border)",
        background: "var(--ys-surface-strong)",
      }}
    >
      <p
        className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--ys-accent-strong)",
        }}
      >
        Leadership Lens
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {SLOTS.map((slot) => (
          <div key={slot.key}>
            <p
              className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ys-text-soft)",
              }}
            >
              <span style={{ color: "var(--ys-accent)" }}>{slot.eyebrow}</span>
              {"  "}
              {slot.label}
            </p>
            <p
              className="text-[13.5px] leading-[1.7]"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--ys-text)",
              }}
            >
              {lens[slot.key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/work/LeadershipLens.tsx
git commit -m "feat(work): add LeadershipLens component (six-slot decision spine)"
```

---

## Task 5: CaseStudyBlocks component

**Files:**
- Create: `src/components/work/CaseStudyBlocks.tsx`

- [ ] **Step 1: Create the renderer**

This component takes a `CaseStudySection[]` and renders each block. Tone-to-colour maps to the existing `--ys-*` design tokens; for case-study tones (`navy`/`gold`/etc. — which come from the static portfolio's palette), map onto the closest token in the brutalist palette.

```tsx
import type {
  CaseStudySection,
  StatBlock,
  FlowBlock,
  TableBlock,
  CalloutBlock,
  ProseBlock,
  TagsBlock,
  Tone,
} from "@/data/case-studies/types";

const TONE_BORDER: Record<Tone | 'light', string> = {
  navy: "var(--ys-text)",
  blue: "var(--ys-highlight)",
  green: "var(--ys-accent-strong)",
  gold: "var(--ys-accent)",
  purple: "var(--ys-accent-strong)",
  cyan: "var(--ys-highlight)",
  red: "#c0392b",
  light: "var(--ys-border)",
};

const COLS_CLASS: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
};

function StatsBlockView({ block }: { block: StatBlock }) {
  const cols = block.cols ?? 4;
  return (
    <div className={`grid gap-3 ${COLS_CLASS[cols]}`}>
      {block.items.map((item, i) => (
        <div
          key={i}
          className="border-l-2 pl-3 py-1"
          style={{ borderColor: TONE_BORDER[item.tone ?? 'navy'] }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            {item.label}
          </p>
          <p
            className="text-[1.6rem] font-bold leading-tight"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {item.value}
          </p>
          {item.sub && (
            <p
              className="text-[10px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              {item.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function FlowBlockView({ block }: { block: FlowBlock }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
    >
      {block.title && (
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          {block.title}
        </p>
      )}
      <div className="flex flex-col gap-3">
        {block.rows.map((row, ri) => (
          <div key={ri} className="flex flex-wrap items-center gap-2">
            {row.map((node, ni) => (
              <div key={ni} className="flex items-center gap-2">
                <div
                  className="rounded-md border px-3 py-2 text-[12px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderColor: TONE_BORDER[node.tone ?? 'light'],
                    background: "var(--ys-surface)",
                    color: "var(--ys-text)",
                  }}
                >
                  <span className="font-bold">{node.label}</span>
                  {node.sublabel && (
                    <span
                      className="ml-2 text-[10px]"
                      style={{ color: "var(--ys-text-soft)" }}
                    >
                      {node.sublabel}
                    </span>
                  )}
                </div>
                {ni < row.length - 1 && (
                  <span
                    aria-hidden
                    className="text-[14px]"
                    style={{ color: "var(--ys-text-soft)" }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TableBlockView({ block }: { block: TableBlock }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr>
            {block.headers.map((h, i) => (
              <th
                key={i}
                className={`border-b px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] ${
                  h.align === "right" ? "text-right" : "text-left"
                }`}
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--ys-text-soft)",
                  borderColor: "var(--ys-border)",
                }}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`border-b px-3 py-2 ${
                    block.headers[ci]?.align === "right" ? "text-right" : "text-left"
                  } ${cell.mono ? "font-mono" : ""} ${cell.bold ? "font-bold" : ""}`}
                  style={{
                    borderColor: "var(--ys-border)",
                    color:
                      cell.tone === "green"
                        ? "var(--ys-accent-strong)"
                        : cell.tone === "red"
                        ? "#c0392b"
                        : "var(--ys-text)",
                    fontFamily: cell.mono ? "var(--font-mono)" : "var(--font-body)",
                  }}
                >
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalloutBlockView({ block }: { block: CalloutBlock }) {
  const accent =
    block.tone === "green"
      ? "var(--ys-accent-strong)"
      : block.tone === "blue" || block.tone === "purple"
      ? "var(--ys-highlight)"
      : "var(--ys-accent)";
  return (
    <div
      className="rounded-xl border-l-4 px-4 py-3"
      style={{
        borderLeftColor: accent,
        background: "var(--ys-surface-strong)",
        borderTopColor: "var(--ys-border)",
        borderRightColor: "var(--ys-border)",
        borderBottomColor: "var(--ys-border)",
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
      }}
    >
      {block.title && (
        <p
          className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-mono)", color: accent }}
        >
          {block.title}
        </p>
      )}
      <p
        className="text-[13px] leading-[1.7]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text)" }}
      >
        {block.body}
      </p>
    </div>
  );
}

function ProseBlockView({ block }: { block: ProseBlock }) {
  const paragraphs = block.body.split(/\n\n+/);
  return (
    <div>
      {block.heading && (
        <h3
          className="mb-2 text-[14px] font-bold uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          {block.heading}
        </h3>
      )}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mb-3 text-[14px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function TagsBlockView({ block }: { block: TagsBlock }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {block.items.map((tag, i) => (
        <span
          key={i}
          className="rounded border px-2 py-0.5 text-[10px]"
          style={{
            fontFamily: "var(--font-mono)",
            borderColor: TONE_BORDER[tag.tone ?? 'light'] === 'var(--ys-border)' ? "var(--ys-border)" : TONE_BORDER[tag.tone ?? 'light'],
            color: "var(--ys-text-soft)",
          }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

export default function CaseStudyBlocks({ sections }: { sections: CaseStudySection[] }) {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-16">
      {sections.map((section, si) => (
        <section key={si} className="mb-12">
          {(section.number || section.eyebrow) && (
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
            >
              {section.number ? `${section.number}  ` : ""}
              {section.eyebrow}
            </p>
          )}
          <h2
            className="mb-5 text-[22px] font-bold uppercase tracking-[0.02em]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {section.title}
          </h2>
          <div className="flex flex-col gap-5">
            {section.blocks.map((block, bi) => {
              switch (block.type) {
                case "stats":
                  return <StatsBlockView key={bi} block={block} />;
                case "flow":
                  return <FlowBlockView key={bi} block={block} />;
                case "table":
                  return <TableBlockView key={bi} block={block} />;
                case "callout":
                  return <CalloutBlockView key={bi} block={block} />;
                case "prose":
                  return <ProseBlockView key={bi} block={block} />;
                case "tags":
                  return <TagsBlockView key={bi} block={block} />;
              }
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/work/CaseStudyBlocks.tsx
git commit -m "feat(work): add CaseStudyBlocks renderer (stats, flow, table, callout, prose, tags)"
```

---

## Task 6: Wire LeadershipLens + CaseStudyBlocks into the detail page

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/data/project-details.ts`

- [ ] **Step 1: Update `project-details.ts` to expose case-study content**

Replace the file with:

```ts
import { projects } from "@/lib/projects";
import { caseStudies } from "@/data/case-studies";
import type { CaseStudyContent } from "@/data/case-studies/types";

export interface ProjectDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stat: string;
  statLabel: string;
  tags: string[];
  language: string;
  href: string;
  githubHref: string;
  image?: string;
  reportHref?: string;
  reports?: { label: string; href: string }[];
  caseStudy?: CaseStudyContent;
}

export const projectDetails: Record<string, ProjectDetail> = Object.fromEntries(
  projects.map((p) => [
    p.id,
    {
      id: p.id,
      name: p.name,
      tagline: p.description,
      description: p.description,
      stat: p.stat,
      statLabel: p.statLabel,
      tags: p.tags,
      language: p.language,
      href: p.href,
      githubHref: p.githubHref,
      image: p.image,
      reportHref: p.reportHref,
      reports: p.reports,
      caseStudy: caseStudies[p.id],
    },
  ])
);
```

- [ ] **Step 2: Update `[slug]/page.tsx` to render the Lens and Blocks**

In `src/app/projects/[slug]/page.tsx`, add imports and render `LeadershipLens` immediately after the hero `<header>` block (after the existing image area, before the `Deep Dives` block), and replace the existing `project.sections.length > 0` rendering block with `CaseStudyBlocks` driven from the case study.

Imports to add at the top:

```tsx
import LeadershipLens from "@/components/work/LeadershipLens";
import CaseStudyBlocks from "@/components/work/CaseStudyBlocks";
```

Replace the trailing rendering block — the section that currently renders `project.sections` — with:

```tsx
{project.caseStudy && (
  <div className="mx-auto max-w-4xl px-5 pt-2">
    <LeadershipLens lens={project.caseStudy.leadershipLens} />
  </div>
)}

{project.caseStudy && project.caseStudy.sections.length > 0 && (
  <CaseStudyBlocks sections={project.caseStudy.sections} />
)}
```

Remove the old `project.sections.length > 0` block — `sections` no longer exists on `ProjectDetail`. Old projects without a `caseStudy` simply skip these blocks and render only the existing hero + reports tiles + footer.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Build sanity check**

Run: `npm run build`
Expected: build succeeds. All 13 project slugs build (12 in scope + `cryptoprism-dashboard`). None have a `caseStudy` yet — pages render as before, just without the now-removed `sections` block (which was always empty).

- [ ] **Step 5: Commit**

```bash
git add src/app/projects/[slug]/page.tsx src/data/project-details.ts
git commit -m "feat(work): wire LeadershipLens and CaseStudyBlocks into /projects/[slug]"
```

---

## Task 7: Port the canonical first case study (cryptoprism-onchain)

This task establishes the pattern for all 12. Subsequent cases follow this structure verbatim.

**Files:**
- Create: `src/data/case-studies/cryptoprism-onchain.ts`
- Modify: `src/data/case-studies/index.ts`
- Source: `C:\cpio_db\portfolio\case-cryptoprism-onchain.html`

- [ ] **Step 1: Read the source case study**

Open `C:\cpio_db\portfolio\case-cryptoprism-onchain.html`. Identify each section (eyebrow + title + content), and extract every stat, flow row, table, callout, and tag list into the typed structure. **Do not invent metrics or claims** — every value must trace back to the source HTML.

- [ ] **Step 2: Draft the Leadership Lens slots from the source prose**

For the six slots (Call · Bet · Trade-off · Outcome · Coordinated · Where this goes next), draft each from existing source language. Keep each slot to one or two tight sentences. **These are personal claims about Yogesh's decisions — surface the draft to the user for red-line before committing this task.**

Reference draft for the Lens (the user must edit / approve each line):

```ts
leadershipLens: {
  call: 'Chose to build the on-chain analytics layer on Google BigQuery public datasets rather than reselling Glassnode or paying for a commercial API.',
  bet: 'Bet that 17 hand-engineered SQL pipelines across six chains would deliver Glassnode-class signal at <1/25th the unit cost — and committed to launching only after $12 of total BigQuery validation proved the model.',
  tradeoff: 'Slower onboarding for new chains (each requires a fresh SQL pipeline and schema audit) in exchange for $30/month all-in cost vs. $800+/month for the commercial alternative.',
  outcome: '17 production endpoints, 1B+ datapoints/day across BTC/ETH/LTC/MATIC/OP/TRX, p99 <50ms via Cloud Run + Redis, and the on-chain layer that powers the rest of the CryptoPrism stack.',
  coordinated: 'Sole engineer-of-record; coordinated GCP project provisioning, BigQuery cost controls, and Cloud SQL schema with the CryptoPrism product roadmap.',
  nextStep: 'Extend to L2 rollups (Arbitrum, Base) and add holder-cohort segmentation to the existing whale-transaction endpoint, feeding directly into the ML signal pipeline.',
},
```

- [ ] **Step 3: Create the case-study file**

Create `src/data/case-studies/cryptoprism-onchain.ts`:

```ts
import type { CaseStudyContent } from "./types";

export const cryptoprismOnchain: CaseStudyContent = {
  slug: 'cryptoprism-onchain',
  cluster: 'A',
  archetype: 'Founder-Operator',
  oneLineTagline:
    'BigQuery-powered on-chain analytics across six chains — Glassnode-class intelligence at $30/mo.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-cryptoprism-onchain.html',
  leadershipLens: {
    // ... approved Lens content from Step 2
  },
  sections: [
    {
      number: '01',
      eyebrow: 'Context',
      title: 'The build-vs-buy call',
      blocks: [
        {
          type: 'prose',
          body:
            'Glassnode and similar on-chain analytics providers charge $800+/month for the kind of intelligence — active addresses, whale transactions, NVT, MVRV, exchange flow — that a CryptoPrism subscription needs to deliver at $29/month. That gap defined the build-or-die problem.',
        },
        // ... all stats, flows, tables, callouts, tags from the source HTML
      ],
    },
    // ... remaining sections
  ],
};
```

The implementer reads the source HTML and fills in **every** block. No placeholders. If the source has a stat the implementer doesn't understand, copy it verbatim and flag it for user review — do not guess.

- [ ] **Step 4: Register the case in the index**

In `src/data/case-studies/index.ts`, add the import and registry entry:

```ts
import { cryptoprismOnchain } from './cryptoprism-onchain';

export const caseStudies: Record<string, CaseStudyContent> = {
  'cryptoprism-onchain': cryptoprismOnchain,
};
```

- [ ] **Step 5: Type-check + build**

Run: `npx tsc --noEmit && npm run build`
Expected: PASS.

- [ ] **Step 6: Visual check on dev server**

Run: `npm run dev`
Open: `http://localhost:3000/projects/cryptoprism-onchain`
Expected: hero + image render as before, then the Leadership Lens block (six slots, two-column on wider viewports), then numbered case sections rendering all blocks correctly. Test on mobile width (DevTools mobile emulation) — Lens slots stack to one column; flow rows wrap; table scrolls horizontally.

- [ ] **Step 7: User review checkpoint**

Surface to the user: "First case study (cryptoprism-onchain) is rendered. Please red-line the Leadership Lens (six slots) and skim the section content for any metric that doesn't match your understanding."

Wait for user approval before proceeding to Task 8.

- [ ] **Step 8: Commit**

```bash
git add src/data/case-studies/cryptoprism-onchain.ts src/data/case-studies/index.ts
git commit -m "feat(work): port cryptoprism-onchain case study with Leadership Lens"
```

---

## Task 8: Port remaining 11 cases

Repeat the Task 7 pattern for each remaining case. Execute in **three batches** with user review between each. Each case = its own file, its own commit, its own user red-line on the Leadership Lens.

**Batch 8a — Cluster A remainder (4 cases):** `cryptoprism-api`, `cryptoprism-news-fetcher`, `timesfm-trading-bot`, `fxsaarthi`
**Batch 8b — Cluster B (3 cases):** `pgg-erp`, `pgg-crm`, `trinetry-erp`
**Batch 8c — Cluster C (4 cases):** `gyanmarg`, `ai-bharatverse`, `pratyaksha`, `kari`

For each case, repeat:

- [ ] **Step 1: Read source `C:\cpio_db\portfolio\case-<slug>.html`** (or for slug-renamed cases: `case-cryptoprism-ml-signals.html` → `cryptoprism-news-fetcher`, `case-timesfm-bot.html` → `timesfm-trading-bot`, `case-kari-game.html` → `kari`).

- [ ] **Step 2: Create `src/data/case-studies/<slug>.ts`** following the Task 7 file shape — `cluster`, `archetype` (matching the cluster's archetype), `oneLineTagline`, `sourceFile`, `leadershipLens` (six slots drafted from source prose), `sections` (every stat/flow/table/callout/prose/tags block from the source).

- [ ] **Step 3: Register in `src/data/case-studies/index.ts`**.

- [ ] **Step 4: Type-check + build**: `npx tsc --noEmit && npm run build`. Expected: PASS.

- [ ] **Step 5: Visual check** at `http://localhost:3000/projects/<slug>` on dev server. Lens renders, sections render, mobile stacks correctly.

- [ ] **Step 6: Surface Leadership Lens to user for red-line.** **Do not commit the case until the user has approved the Lens text.** The Lens is the only personal-claim surface in this work; everything else is sourced from the static HTML.

- [ ] **Step 7: Commit**: `git commit -m "feat(work): port <slug> case study with Leadership Lens"`.

**Between batches:** stop. Surface to user: "Batch 8<a/b/c> complete — N cases ported. Skim each Lens before I start the next batch?" Wait for approval.

---

## Task 9: CaseCard + ClusterSection components

**Files:**
- Create: `src/components/work/CaseCard.tsx`
- Create: `src/components/work/ClusterSection.tsx`

- [ ] **Step 1: Create `CaseCard.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function CaseCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-xl border p-4 transition-colors hover:opacity-90"
      style={{
        borderColor: "var(--ys-border)",
        background: "var(--ys-surface-strong)",
      }}
    >
      {project.image && (
        <Image
          src={project.image}
          alt={project.name}
          width={700}
          height={250}
          className="mb-3 w-full rounded-lg object-cover"
        />
      )}
      <p
        className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
      >
        {project.tags.slice(0, 3).join(" / ")}
      </p>
      <h3
        className="mb-2 text-[15px] font-bold"
        style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
      >
        {project.name}
      </h3>
      <p
        className="mb-3 text-[12px] leading-[1.7]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
      >
        {project.description}
      </p>
      <div className="flex items-center justify-between">
        <span
          className="text-[1rem] font-bold"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
        >
          {project.stat}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          {project.statLabel}
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create `ClusterSection.tsx`**

```tsx
import type { ClusterMeta } from "@/data/clusters";
import type { Project } from "@/lib/projects";
import CaseCard from "./CaseCard";

export default function ClusterSection({
  cluster,
  projects,
}: {
  cluster: ClusterMeta;
  projects: Project[];
}) {
  return (
    <section className="mb-16">
      <p
        className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
      >
        Cluster {cluster.id} · {cluster.archetype}
      </p>
      <h2
        className="mb-3 text-[clamp(1.4rem,3vw,2rem)] font-bold uppercase leading-[1.05]"
        style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
      >
        {cluster.name}
      </h2>
      <p
        className="mb-7 max-w-[68ch] text-[14px] leading-[1.8]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
      >
        {cluster.thesis}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <CaseCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/work/CaseCard.tsx src/components/work/ClusterSection.tsx
git commit -m "feat(work): add CaseCard and ClusterSection components"
```

---

## Task 10: `/work` cluster hub page

**Files:**
- Create: `src/app/work/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { CLUSTERS, CLUSTER_ORDER } from "@/data/clusters";
import { getProjectsByCluster } from "@/lib/projects";
import ClusterSection from "@/components/work/ClusterSection";

export const metadata: Metadata = {
  title: "Work — Yogesh Sahu",
  description:
    "Twelve case studies across fintech engineering, enterprise operations, and consumer & AI products. Founder-operator portfolio.",
  openGraph: {
    title: "Work — Yogesh Sahu",
    description:
      "Twelve case studies across fintech engineering, enterprise operations, and consumer & AI products.",
    url: "https://yogeshsahu.xyz/work",
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--ys-surface)" }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b px-5 py-3"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-[12px] font-bold uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            YS.
          </Link>
          <span
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            Work
          </span>
        </div>
      </nav>

      <header className="mx-auto max-w-5xl px-5 pt-20 pb-10">
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Twelve case studies / three leadership clusters
        </p>
        <h1
          className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.95]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          Work
        </h1>
        <p
          className="max-w-[60ch] text-[15px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          Each case opens with a decision, a bet, and an outcome — engineering depth in support, not in the lead.
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-5 pb-16">
        {CLUSTER_ORDER.map((id) => (
          <ClusterSection
            key={id}
            cluster={CLUSTERS[id]}
            projects={getProjectsByCluster(id)}
          />
        ))}
      </div>

      <footer
        className="border-t px-5 py-8"
        style={{ borderColor: "var(--ys-border)" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-[11px] font-bold uppercase tracking-[0.1em] underline"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
          >
            Back to Home
          </Link>
          <span
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            yogeshsahu.xyz
          </span>
        </div>
      </footer>
    </main>
  );
}
```

- [ ] **Step 2: Type-check + build**

Run: `npx tsc --noEmit && npm run build`
Expected: PASS. Build output should include `/work` in the static export.

- [ ] **Step 3: Visual check**

Run: `npm run dev`
Open: `http://localhost:3000/work`
Expected: three cluster sections (A, B, C), each with eyebrow + name + thesis + grid of case cards. Cards link to `/projects/[slug]`. Mobile (narrow viewport) collapses grid to single column.

- [ ] **Step 4: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "feat(work): add /work cluster hub page"
```

---

## Task 11: ProjectsWindow → cluster-grouped view

**Files:**
- Modify: `src/components/windows/ProjectsWindow.tsx`

The current ProjectsWindow has a hardcoded local `PROJECTS` constant of 5 entries that's drifted from `lib/projects.ts`. Switch it to read from the shared source and group by cluster.

- [ ] **Step 1: Replace the file**

Rewrite `ProjectsWindow.tsx` to:
- Import `getAllClusteredProjects` from `@/lib/projects` and `CLUSTERS` from `@/data/clusters`
- Render the existing intro card (unchanged copy)
- Replace the flat list with three cluster blocks, each showing cluster name + thesis (truncated to ~120 chars) + a grid of project cards
- Each card links to `/projects/<id>` (Next.js `Link`), not the external `href`
- Add a "View all" link at the top right pointing to `/work`

Keep the existing visual language — borders, mono labels, fade animations. The card structure already in place (image, name, description, tags) translates fine.

```tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { getAllClusteredProjects } from "@/lib/projects";
import { CLUSTERS } from "@/data/clusters";

export default function ProjectsWindow() {
  const clustered = getAllClusteredProjects();

  return (
    <div className="p-6">
      <motion.div
        className="mb-4 rounded-xl border p-4"
        variants={fadeUp(0, 10)}
        initial="initial"
        animate="animate"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <p
          className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Selected Work
        </p>
        <p
          className="text-[12px] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          Twelve case studies across three leadership clusters. Each opens with a decision, a bet, and an outcome — engineering depth in support.
        </p>
      </motion.div>

      <div className="mb-5 flex items-center justify-between">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          By Cluster
        </p>
        <Link
          href="/work"
          className="text-[10px] hover:underline"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-highlight)" }}
        >
          Open /work hub →
        </Link>
      </div>

      {clustered.map(({ cluster, projects }, ci) => (
        <motion.div
          key={cluster}
          variants={fadeUp(ci * 0.05, 10)}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
          >
            Cluster {cluster} · {CLUSTERS[cluster].archetype}
          </p>
          <h3
            className="mb-3 text-[14px] font-bold uppercase tracking-[0.04em]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {CLUSTERS[cluster].name}
          </h3>
          <div className="flex flex-col gap-3">
            {projects.map((project, pi) => (
              <motion.div
                key={project.id}
                variants={fadeUp(pi * 0.03, 8)}
                initial="initial"
                animate="animate"
                whileHover={{ y: -2 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="block rounded-lg border p-4 transition-colors"
                  style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={700}
                      height={250}
                      className="mb-3 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <ImagePlaceholder
                      variant="screenshot"
                      label={project.name}
                      className="mb-3 aspect-video w-full"
                    />
                  )}
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h4
                      className="text-[14px] font-bold"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                    >
                      {project.name}
                    </h4>
                    <span
                      className="rounded border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--ys-accent-strong)",
                        borderColor: "rgba(169, 61, 29, 0.28)",
                        background: "rgba(207, 79, 39, 0.1)",
                      }}
                    >
                      {project.stat} {project.statLabel}
                    </span>
                  </div>
                  <p
                    className="mb-3 text-[12px] leading-[1.75]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border px-2 py-0.5 text-[9px]"
                        style={{
                          fontFamily: "var(--font-mono)",
                          borderColor: "var(--ys-border)",
                          color: "var(--ys-text-soft)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Type-check + build**

Run: `npx tsc --noEmit && npm run build`
Expected: PASS.

- [ ] **Step 3: Visual check**

Run: `npm run dev`
Open the homepage and click into the Projects window. Expected: three cluster blocks (A/B/C), each titled with archetype + name, then case cards linking to `/projects/<slug>`. The "Open /work hub →" link routes to `/work`.

- [ ] **Step 4: Commit**

```bash
git add src/components/windows/ProjectsWindow.tsx
git commit -m "feat(work): switch ProjectsWindow to cluster-grouped view from shared projects source"
```

---

## Task 12: Surface `/work` in LaunchDeck and MobileHome

**Files:**
- Modify: `src/components/landing/LaunchDeck.tsx`
- Modify: `src/components/landing/MobileHome.tsx`

LaunchDeck and MobileHome are both window-based (the desktop OS metaphor) — buttons open windows in place via `onOpen("projects")`. The `/work` hub is a separate route surface. The fix is **additive**: keep existing window buttons; add one route-link tile that navigates to `/work`.

- [ ] **Step 1: Add `next/link` import to LaunchDeck**

In `src/components/landing/LaunchDeck.tsx`, add to the imports at the top:

```tsx
import Link from "next/link";
```

- [ ] **Step 2: Add `/work` route-link below the button grid in LaunchDeck**

Inside the same outer card `<div>`, immediately after the closing `</div>` of the button grid (the one that contains the five `<motion.button>` elements), insert:

```tsx
<Link
  href="/work"
  className="mt-3 flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors hover:opacity-90"
  style={{
    borderColor: "var(--ys-card-border-strong)",
    background: "var(--ys-card-bg)",
    color: "var(--ys-text)",
    fontFamily: "var(--font-headline)",
  }}
>
  <div>
    <span className="mb-0.5 block text-[12px] font-bold uppercase tracking-[0.08em]">
      /work hub
    </span>
    <span
      className="block text-[9px] uppercase tracking-[0.12em]"
      style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
    >
      12 case studies · 3 leadership clusters
    </span>
  </div>
  <ArrowRight size={14} />
</Link>
```

(`ArrowRight` is already imported from `lucide-react` at the top of the file.)

- [ ] **Step 3: Add `next/link` import to MobileHome**

In `src/components/landing/MobileHome.tsx`, add to the imports at the top:

```tsx
import Link from "next/link";
```

- [ ] **Step 4: Add `/work` route-link in MobileHome**

After the closing `</motion.header>` and **before** the first `<MobileSection title="About" ...>`, insert a flat (non-collapsible) section that promotes `/work`:

```tsx
<section
  className="border-b"
  style={{ borderColor: "var(--ys-card-border)" }}
>
  <Link
    href="/work"
    className="flex w-full items-center justify-between px-5 py-4"
    style={{ background: "var(--ys-surface)" }}
  >
    <div className="flex items-center gap-3">
      <span style={{ color: "var(--ys-accent)" }}>
        <FolderOpen size={16} />
      </span>
      <div>
        <span
          className="block text-[13px] font-bold uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          /work hub
        </span>
        <span
          className="block text-[10px] uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          12 case studies · 3 clusters
        </span>
      </div>
    </div>
    <span style={{ color: "var(--ys-text-soft)" }}>
      <ArrowRight size={16} />
    </span>
  </Link>
</section>
```

(`ArrowRight` and `FolderOpen` are already imported from `lucide-react`.)

- [ ] **Step 5: Type-check + build**

Run: `npx tsc --noEmit && npm run build`
Expected: PASS.

- [ ] **Step 6: Visual check (desktop + mobile)**

Run: `npm run dev`
Open homepage on desktop: LaunchDeck card shows the `/work hub` tile beneath the existing buttons; clicking routes to `/work`.
Open homepage on mobile width (390px): MobileHome shows a `/work hub` row above the About section; tapping routes to `/work`.
Both routes back via "Back to Home" in the `/work` footer.

- [ ] **Step 7: Commit**

```bash
git add src/components/landing/LaunchDeck.tsx src/components/landing/MobileHome.tsx
git commit -m "feat(work): surface /work hub in LaunchDeck and MobileHome"
```

---

## Task 13: Final QA

- [ ] **Step 1: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS, no errors.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS or only pre-existing warnings (compare against `git stash` of pre-task state if anything new appears).

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: PASS. Static export generates `/work` and all 13 `/projects/<slug>` pages including the three new ones (`fxsaarthi`, `pgg-erp`, `pgg-crm`).

- [ ] **Step 4: Manual nav walk-through**

Run: `npm run dev`. Walk through:

1. Home → click "Work" tile in LaunchDeck → lands on `/work`.
2. `/work` → click each cluster's case cards in turn → each lands on `/projects/<slug>` and renders Leadership Lens above case sections.
3. Each `/projects/<slug>` → "Back to Home" link returns to `/`.
4. Resize to mobile width (390px). Re-walk: MobileHome surfaces `/work`; cluster cards stack to one column; Leadership Lens slots stack to one column; tables scroll horizontally; flow diagrams wrap.
5. Click into Projects window from desktop → cluster groups render; "Open /work hub →" link routes correctly.

- [ ] **Step 5: Internal link audit**

From `/work`, every case card href must resolve to a real page (no 404s). Run through all 12 slugs once.

- [ ] **Step 6: User review**

Surface to user: "All 12 cases ported, /work hub live, nav surfaces updated. Build, type-check, and lint all pass. Ready to push to origin/master and deploy preview?"

Wait for explicit approval before pushing.

- [ ] **Step 7: Push (after approval)**

```bash
git push origin master
```

---

## Notes for the implementer

- **Never invent metrics or claims.** Every stat, table value, callout body, and Leadership Lens slot must trace to either (a) the source HTML in `C:\cpio_db\portfolio\case-*.html`, (b) `src/lib/projects.ts` existing values, or (c) explicit user input. If a slot can't be filled from those sources, surface it to the user — don't fabricate.
- **Preserve existing live URLs.** All existing `/projects/<slug>` URLs are kept. New slugs (`fxsaarthi`, `pgg-erp`, `pgg-crm`) are additive.
- **Trust the existing design tokens.** No new colours, fonts, or spacing tokens. Map portfolio palette tones (`navy`, `gold`, `green`, etc.) onto the existing `--ys-*` tokens — close enough is correct.
- **Commit after every task.** Don't batch.
- **Pause at every user-review checkpoint.** Tasks 7 and 8 each have an explicit Lens-review gate. Do not proceed past those gates without user approval.
