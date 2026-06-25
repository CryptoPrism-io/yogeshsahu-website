# CapabilityGraphWindow Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild CapabilityGraphWindow with a single-state domain tab nav and static subdomain focus cards, removing all dead code and disproportionate UX complexity.

**Architecture:** Single `activeNode` state drives the entire content area. The second nav row (subdomain pills) is removed; the 3 subdomains become static info cards inside the content. Data is extracted to a dedicated file. Component drops from 438 lines to ~200.

**Tech Stack:** Next.js 14 App Router, React, Framer Motion (motion, AnimatePresence, LazyMotion already on page), Tailwind CSS, CSS variables (`--ys-*`)

## Global Constraints

- No dummy data — all content comes from existing CAPABILITIES object
- Framer Motion: use `motion` (NOT standalone `motion` import from top of file) since LazyMotion wraps the app — `m` is NOT used here; `motion` works fine under `LazyMotion domAnimation`
- Tailwind + inline styles pattern (follow existing windows)
- Font variables: `var(--font-mono)`, `var(--font-headline)`, `var(--font-body)`, `var(--font-serif-display)`
- Design tokens: `var(--ys-text)`, `var(--ys-text-soft)`, `var(--ys-surface)`, `var(--ys-surface-strong)`, `var(--ys-border)`, `var(--ys-accent)`, `var(--ys-accent-strong)`, `var(--ys-highlight)`
- Body text: `text-[15px] leading-[1.75]` (established in previous polish pass)
- No comments in code

---

## Sitemap Audit (reference)

### Click → Change matrix (BEFORE rebuild, broken)

| Click target | State changes | Visual changes |
|---|---|---|
| Domain tab | `activeNode` + `activeSubdomain` reset | title, summary, skills, subdomain pills, 1-sentence focus detail, proofs |
| Subdomain pill | `activeSubdomain` only | "Active Focus" section heading + 1 sentence |
| Proof card | none | `window.open` external URL or `onOpen("about")` via `#about` href hack |
| "Open projects" button | none | `onOpen("projects")` |
| "Open profile" button | none | `onOpen("about")` |
| `capability-focus` event | `activeNode` + `activeSubdomain` | (dead — mandala removed, event never fires) |

### Problems identified

1. **Dead event listener** — `capability-focus` custom event never fires; mandala was removed
2. **Subdomain nav has no weight** — full 2nd nav row (with AnimatePresence transition) for 1 sentence of content
3. **"Active Node" jargon** — vestigial graph visualization term; users don't know what it means
4. **Redundant badge pill** — "Finance" pill shown while Finance tab is already active
5. **"Related Windows" section** — navigation buttons buried at scroll bottom; vestigial from graph metaphor; main nav already handles window opening
6. **`#about` href hack** — proof card detected by `href === "#about"` string comparison
7. **Monolithic file** — data inline in component

### New architecture (AFTER rebuild)

Single state `activeNode: CapabilityId`. Content renders entirely from `CAPABILITIES[activeNode]`.

| Click target | State changes | Visual changes |
|---|---|---|
| Domain tab | `activeNode` | all content (title, summary, skills, subdomain cards, proofs) |
| Proof card | none | `window.open` or `onOpen(id)` via clean `openWindow` flag |

### New content layout

```
┌─────────────────────────────────────────┐
│  [● Finance] [● Leadership] [● Tech]    │  ← 1 row, domain tabs
├─────────────────────────────────────────┤
│  Domain Title Heading (large, black)    │
│  Summary paragraph (15px, soft)         │
│                                         │
│  CORE SKILLS ─────────────────────────  │
│  [FinTech] [Quant] [Pricing] [...]      │
│                                         │
│  FOCUS AREAS ─────────────────────────  │
│  ┌──────────┐  ┌──────────┐  ┌──────┐  │
│  │Markets   │  │Pricing   │  │Signal│  │
│  │1 sentence│  │1 sentence│  │1 sent│  │
│  └──────────┘  └──────────┘  └──────┘  │
│                                         │
│  PROOF LINKS ─────────────────────────  │
│  ┌───────────────────────────────────┐  │
│  │ On-chain Analytics           ↗    │  │
│  │ 1B+ datapoints/day via BigQuery   │  │
│  └───────────────────────────────────┘  │
│  [two more proof cards]                 │
└─────────────────────────────────────────┘
```

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/data/capabilities.ts` | **Create** | CAPABILITIES data + all TS types |
| `src/components/windows/CapabilityGraphWindow.tsx` | **Rewrite** | Simplified component using single state |

---

## Task 1: Extract capability data to dedicated file

**Files:**
- Create: `src/data/capabilities.ts`

**Interfaces:**
- Produces: `CapabilityId`, `SubdomainId`, `ProofLink`, `Subdomain`, `CapabilityConfig`, `CAPABILITIES`, `DOMAIN_ORDER` — all exported

- [ ] **Step 1: Create `src/data/capabilities.ts`**

```typescript
export type CapabilityId = "finance" | "leadership" | "technology";
export type SubdomainId =
  | "markets"
  | "pricing"
  | "signals"
  | "discovery"
  | "alignment"
  | "delivery"
  | "ai"
  | "data"
  | "systems";

export interface ProofLink {
  label: string;
  href: string;
  note: string;
  openWindow?: string;
}

export interface Subdomain {
  id: SubdomainId;
  label: string;
  detail: string;
}

export interface CapabilityConfig {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  subdomains: Subdomain[];
  color: string;
  proofs: ProofLink[];
}

export const CAPABILITIES: Record<CapabilityId, CapabilityConfig> = {
  finance: {
    name: "Finance",
    title: "FinTech and market systems under real operating pressure",
    summary:
      "This node covers financial systems, market context, pricing logic, signal design, and data products built for actual trading and analytical workflows.",
    skills: ["FinTech", "Quant Systems", "Pricing Logic", "Market Data", "Decision Tools"],
    subdomains: [
      { id: "markets", label: "Markets", detail: "Live market context, trading surfaces, and financial product logic." },
      { id: "pricing", label: "Pricing", detail: "Modeling decisions, valuation framing, and risk-aware system behavior." },
      { id: "signals", label: "Signals", detail: "Indicators, screening, and analytical workflows for operator decisions." },
    ],
    color: "var(--ys-accent)",
    proofs: [
      {
        label: "On-chain Analytics",
        href: "/projects/cryptoprism-onchain",
        note: "1B+ datapoints/day across 100+ coins via BigQuery pipeline.",
      },
      {
        label: "CryptoPrism API",
        href: "/projects/cryptoprism-api",
        note: "FastAPI microservices for analytics and trading endpoints.",
      },
      {
        label: "TimesFM Bot",
        href: "/projects/timesfm-trading-bot",
        note: "ML-powered trading signals across 100 coins.",
      },
    ],
  },
  leadership: {
    name: "Leadership",
    title: "Discovery, influence, and delivery ownership without waiting for formal authority",
    summary:
      "This is the consulting and operator layer: framing the problem, aligning stakeholders, leading discovery, and keeping execution commercially credible.",
    skills: ["Discovery", "SOW Thinking", "Stakeholder Alignment", "Execution Clarity", "Influence"],
    subdomains: [
      { id: "discovery", label: "Discovery", detail: "Problem framing, discovery sessions, and engagement definition." },
      { id: "alignment", label: "Align", detail: "Cross-functional trust, expectation management, and direction setting." },
      { id: "delivery", label: "Delivery", detail: "Execution pressure, sequencing, and keeping delivery commercially credible." },
    ],
    color: "var(--ys-highlight)",
    proofs: [
      {
        label: "Kari Mobile Game",
        href: "https://apps.apple.com/app/kari-and-the-lost-shrines",
        note: "Shipped on minimal budget through vision alignment and fast execution.",
      },
      {
        label: "CryptoPrism Platform",
        href: "https://cryptoprism.io",
        note: "Product direction, delivery judgment, and ongoing system ownership.",
      },
      {
        label: "Open Profile",
        href: "",
        openWindow: "about",
        note: "Leadership context, consulting fit, and working style.",
      },
    ],
  },
  technology: {
    name: "Technology",
    title: "Hands-on architecture, AI-native systems, and production-grade execution",
    summary:
      "This node is the technical core: architecture decisions, AI integration, APIs, data pipelines, and the ability to stay close to code while leading the system.",
    skills: ["Architecture", "AI Systems", "FastAPI", "PostgreSQL", "Cloud Data"],
    subdomains: [
      { id: "ai", label: "AI", detail: "Applied AI flows, orchestration, and product-level integration." },
      { id: "data", label: "Data", detail: "Pipelines, schemas, movement, and analytical system design." },
      { id: "systems", label: "Systems", detail: "Architecture, APIs, reliability, and production execution." },
    ],
    color: "var(--ys-text)",
    proofs: [
      {
        label: "Pratyaksha",
        href: "/projects/pratyaksha",
        note: "4-agent AI journaling pipeline in production.",
      },
      {
        label: "News Engine",
        href: "/projects/cryptoprism-news-fetcher",
        note: "AI-aware content and signal pipeline feeding spot trading.",
      },
      {
        label: "AI Bharatverse",
        href: "/projects/ai-bharatverse",
        note: "Interactive AI platform for Indian history. Built for Times of India.",
      },
    ],
  },
};

export const DOMAIN_ORDER: CapabilityId[] = ["finance", "leadership", "technology"];
```

- [ ] **Step 2: Verify file written correctly**

Check that file exists and exports are correct:
```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors from the new file (existing errors are fine if any).

- [ ] **Step 3: Commit**

```bash
git add src/data/capabilities.ts
git commit -m "feat(data): extract capability data and types to dedicated file"
```

---

## Task 2: Rebuild CapabilityGraphWindow component

**Files:**
- Modify: `src/components/windows/CapabilityGraphWindow.tsx` (full rewrite)

**Interfaces:**
- Consumes: `CAPABILITIES`, `DOMAIN_ORDER`, `CapabilityId`, `ProofLink` from `@/data/capabilities`
- Props: `onOpen: (id: string) => void` (unchanged, keep existing interface)

- [ ] **Step 1: Rewrite the component**

Replace the entire file with:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { CAPABILITIES, DOMAIN_ORDER, type CapabilityId, type ProofLink } from "@/data/capabilities";

interface CapabilityGraphWindowProps {
  onOpen: (id: string) => void;
}

export default function CapabilityGraphWindow({ onOpen }: CapabilityGraphWindowProps) {
  const [activeNode, setActiveNode] = useState<CapabilityId>("technology");
  const active = CAPABILITIES[activeNode];

  const openProof = (proof: ProofLink) => {
    if (proof.openWindow) {
      onOpen(proof.openWindow);
      return;
    }
    if (proof.href) {
      window.open(proof.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* Domain tabs */}
      <div
        className="mb-5 overflow-hidden rounded-xl border"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <div className="flex items-stretch">
          {DOMAIN_ORDER.map((id, i) => {
            const config = CAPABILITIES[id];
            const isActive = activeNode === id;
            return (
              <button
                key={id}
                onClick={() => setActiveNode(id)}
                className="focus-ring relative flex flex-1 items-center justify-center gap-2.5 px-4 py-3.5 transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--ys-text)" : "var(--ys-text-soft)",
                  background: isActive ? "var(--ys-surface)" : "transparent",
                  borderRight: i < DOMAIN_ORDER.length - 1 ? `1px solid var(--ys-border)` : "none",
                  borderBottom: isActive ? "2px solid var(--ys-accent)" : "2px solid transparent",
                }}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: config.color }}
                />
                {config.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area — animates on domain change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {/* Headline */}
          <div className="mb-5">
            <h3
              className="max-w-[30ch] text-[1.45rem] font-black leading-[1.08]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              {active.title}
            </h3>
          </div>

          {/* Summary */}
          <p
            className="mb-5 text-[15px] leading-[1.75]"
            style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
          >
            {active.summary}
          </p>

          {/* Core Skills */}
          <div
            className="mb-5 rounded-xl border p-4"
            style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
          >
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Core Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {active.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border px-2.5 py-1 text-[10px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderColor: "var(--ys-border)",
                    color: "var(--ys-text)",
                    background: "rgba(255,248,241,0.94)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Focus Areas — 3 subdomain cards in a row */}
          <div className="mb-5">
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Focus Areas
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {active.subdomains.map((subdomain) => (
                <div
                  key={subdomain.id}
                  className="rounded-xl border p-3.5"
                  style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
                >
                  <p
                    className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ fontFamily: "var(--font-mono)", color: active.color }}
                  >
                    {subdomain.label}
                  </p>
                  <p
                    className="text-[13px] leading-[1.65]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {subdomain.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proof Links */}
          <div>
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Proof Links
            </p>
            <div className="flex flex-col gap-2.5">
              {active.proofs.map((proof) => (
                <button
                  key={proof.label}
                  onClick={() => openProof(proof)}
                  className="focus-ring rounded-xl border p-4 text-left transition-colors"
                  style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p
                      className="text-[12px] font-bold uppercase tracking-[0.08em]"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                    >
                      {proof.label}
                    </p>
                    <ArrowUpRight size={14} strokeWidth={1.8} color="var(--ys-accent-strong)" />
                  </div>
                  <p
                    className="text-[14px] leading-[1.75]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {proof.note}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit 2>&1 | grep -i "CapabilityGraph\|capabilities"
```
Expected: no errors for these files.

- [ ] **Step 3: Start dev server and verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Click the Capabilities window from the nav. Verify:
- 3 domain tabs render with colored dots
- Clicking Finance/Leadership/Technology swaps all content with fade animation
- "Focus Areas" shows 3 cards in a row per domain
- "Proof Links" cards are clickable (open external or About window)
- No console errors about `capability-focus` event listener
- No "Active Node" label visible
- No "Related Windows" section
- No second subdomain pill row

- [ ] **Step 4: Commit**

```bash
git add src/components/windows/CapabilityGraphWindow.tsx
git commit -m "feat(capability): rebuild window with single-state nav, static focus cards, clean proof links"
```

---

## What was removed and why

| Removed | Reason |
|---|---|
| `useEffect` + `capability-focus` event listener | Dead code — mandala removed, event never fires |
| `activeSubdomain` state | 1 sentence of content doesn't justify 2-level nav |
| Row 2 subdomain pills + AnimatePresence transition | Replaced by static 3-card grid in content |
| "Active Node" label + badge pill | Jargon; domain name in heading suffices |
| "Related Windows" section | Vestigial from graph metaphor; main nav handles this |
| `#about` href hack in `openProof` | Replaced with `openWindow: string` field in data |
| `FileText`, `FolderOpen`, `User` icon imports | No longer used in content sections |

## What stays the same

- `onOpen: (id: string) => void` prop interface — unchanged, no parent changes needed
- Domain tab visual style (colored dot, mono font, terracotta underline active)
- Proof card visual style
- `fadeUp` and spring transition pattern
- All content data (moved to separate file, not changed)

---

## Self-Review

**Spec coverage:**
- ✅ Dead event listener removed
- ✅ "Active Node" jargon removed
- ✅ Subdomain nav collapsed to static cards
- ✅ `#about` hack replaced with `openWindow` field
- ✅ "Related Windows" removed
- ✅ Data extracted to dedicated file
- ✅ File drops from 438 → ~180 lines

**Placeholder scan:** None found.

**Type consistency:** `ProofLink.openWindow?: string` defined in Task 1, consumed in Task 2. `openProof` checks `proof.openWindow` first, then `proof.href`.
