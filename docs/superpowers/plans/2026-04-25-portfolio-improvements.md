# Portfolio Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up dead code, extract the page.tsx monolith, fix mobile UX, add SEO/accessibility, build dynamic project pages, and add keyboard navigation + guided tour.

**Architecture:** The site is a Next.js 16.2.3 static-export portfolio with a desktop OS metaphor (windowed UI, dock, custom cursor). The main page lives in `src/app/page.tsx` (1024 lines) with window content in `src/components/windows/` and desktop chrome in `src/components/desktop/`. Tailwind v4 for styling, Framer Motion for animation.

**Tech Stack:** Next.js 16.2.3, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12, Lucide React, static export (`output: "export"`)

---

## File Structure

### Files to delete
- `src/components/Hero.tsx` (unused v1)
- `src/components/About.tsx` (unused v1)
- `src/components/Contact.tsx` (unused v1)
- `src/components/ProjectsGrid.tsx` (unused v1)
- `src/components/Credentials.tsx` (unused v1)
- `src/components/ExpertisePillars.tsx` (unused v1)
- `src/components/Milestones.tsx` (unused v1)
- `src/components/BlogPreview.tsx` (unused v1)
- `src/components/MentalOS.tsx` (unused v1)
- `src/components/Nav.tsx` (unused v1)
- `src/components/Marquee.tsx` (unused v1)
- `src/components/Footer.tsx` (unused v1)
- `src/hooks/useCountUp.ts` (only used by deleted Hero.tsx)
- `src/lib/posts.ts` (only used by deleted BlogPreview.tsx)
- `public/portfolio-3d.html` through `public/portfolio-zenith.html` (14 exploration artifacts)

### Files to create
- `src/data/domain-graph.ts` — domain graph data, types, and detail constants
- `src/data/proofs.ts` — subdomain proof card data
- `src/data/window-configs.ts` — window configuration, icon map, content map
- `src/components/landing/GlyphPanel.tsx` — extracted from page.tsx
- `src/components/landing/LaunchDeck.tsx` — extracted from page.tsx
- `src/components/landing/MobileHome.tsx` — mobile-first card stack layout
- `src/components/landing/GuidedTour.tsx` — first-visit guided tour overlay
- `src/app/projects/[slug]/page.tsx` — dynamic project detail pages
- `src/data/project-details.ts` — rich project detail content for dynamic pages

### Files to modify
- `src/app/page.tsx` — reduce to ~80 lines, import extracted pieces, add mobile layout + tour
- `src/app/layout.tsx` — add OG image, Twitter card meta, JSON-LD Person schema
- `src/app/globals.css` — fix cursor scope, add CSS custom properties for inline rgba values, add tour styles
- `src/hooks/useWindowManager.ts` — add keyboard navigation support
- `src/components/desktop/Dock.tsx` — add keyboard support (Tab cycling, Enter to open)
- `src/components/desktop/Window.tsx` — add Escape to close, focus trap
- `src/components/desktop/MenuBar.tsx` — add skip-to-content link
- `src/components/windows/CapabilityGraphWindow.tsx` — replace inline rgba with CSS vars
- `src/components/windows/ContactWindow.tsx` — replace inline rgba with CSS vars
- `src/components/windows/DiagnosticWindow.tsx` — replace inline rgba with CSS vars
- `next.config.ts` — add image domains config (not needed for static but good practice)

---

### Task 1: Delete unused v1 components and exploration artifacts

**Files:**
- Delete: `src/components/Hero.tsx`
- Delete: `src/components/About.tsx`
- Delete: `src/components/Contact.tsx`
- Delete: `src/components/ProjectsGrid.tsx`
- Delete: `src/components/Credentials.tsx`
- Delete: `src/components/ExpertisePillars.tsx`
- Delete: `src/components/Milestones.tsx`
- Delete: `src/components/BlogPreview.tsx`
- Delete: `src/components/MentalOS.tsx`
- Delete: `src/components/Nav.tsx`
- Delete: `src/components/Marquee.tsx`
- Delete: `src/components/Footer.tsx`
- Delete: `src/hooks/useCountUp.ts`
- Delete: `src/lib/posts.ts`
- Delete: `public/portfolio-3d.html`
- Delete: `public/portfolio-architect.html`
- Delete: `public/portfolio-aurora.html`
- Delete: `public/portfolio-bold.html`
- Delete: `public/portfolio-cipher.html`
- Delete: `public/portfolio-editorial.html`
- Delete: `public/portfolio-flux.html`
- Delete: `public/portfolio-forge.html`
- Delete: `public/portfolio-meridian.html`
- Delete: `public/portfolio-monolith.html`
- Delete: `public/portfolio-nexus.html`
- Delete: `public/portfolio-prism.html`
- Delete: `public/portfolio-terminal.html`
- Delete: `public/portfolio-zenith.html`

- [ ] **Step 1: Verify no active imports reference these files**

Run: `grep -r "from.*@/components/Hero\|from.*@/components/About\|from.*@/components/Contact\b\|from.*@/components/ProjectsGrid\|from.*@/components/Credentials\|from.*@/components/ExpertisePillars\|from.*@/components/Milestones\|from.*@/components/BlogPreview\|from.*@/components/MentalOS\|from.*@/components/Nav\|from.*@/components/Marquee\|from.*@/components/Footer\|from.*@/hooks/useCountUp\|from.*@/lib/posts" src/`

Expected: No output (only docs reference these)

- [ ] **Step 2: Delete the 12 unused v1 components + useCountUp + posts.ts**

```bash
rm src/components/Hero.tsx src/components/About.tsx src/components/Contact.tsx src/components/ProjectsGrid.tsx src/components/Credentials.tsx src/components/ExpertisePillars.tsx src/components/Milestones.tsx src/components/BlogPreview.tsx src/components/MentalOS.tsx src/components/Nav.tsx src/components/Marquee.tsx src/components/Footer.tsx src/hooks/useCountUp.ts src/lib/posts.ts
```

- [ ] **Step 3: Delete 14 portfolio exploration HTML files**

```bash
rm public/portfolio-3d.html public/portfolio-architect.html public/portfolio-aurora.html public/portfolio-bold.html public/portfolio-cipher.html public/portfolio-editorial.html public/portfolio-flux.html public/portfolio-forge.html public/portfolio-meridian.html public/portfolio-monolith.html public/portfolio-nexus.html public/portfolio-prism.html public/portfolio-terminal.html public/portfolio-zenith.html
```

- [ ] **Step 4: Verify build still passes**

Run: `npx next build`
Expected: Successful build with no errors

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused v1 components and portfolio exploration HTML files"
```

---

### Task 2: Fix mobile cursor and add cursor CSS custom properties

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Fix the desktop-cursor CSS to use @media (hover: hover)**

In `src/app/globals.css`, replace the cursor block (lines 54-64):

```css
/* Custom cursor is scoped to the desktop shell only. */
.desktop-cursor,
.desktop-cursor * {
  cursor: none !important;
}
@media (max-width: 767px) {
  .desktop-cursor,
  .desktop-cursor * {
    cursor: auto !important;
  }
}
```

With:

```css
/* Custom cursor: only hide native cursor on devices with a fine pointer (mouse/trackpad). */
@media (hover: hover) and (pointer: fine) {
  .desktop-cursor,
  .desktop-cursor * {
    cursor: none !important;
  }
}
```

This is safer — if the custom cursor JS fails, touch devices and pen devices keep their native cursor.

- [ ] **Step 2: Add CSS custom properties for common inline rgba values**

Add these after the existing `:root` variables in `globals.css`:

```css
  --ys-glass-bg: rgba(122, 63, 42, 0.16);
  --ys-glass-border: rgba(255, 244, 233, 0.14);
  --ys-glass-text: rgba(255, 248, 241, 0.94);
  --ys-glass-text-soft: rgba(255, 239, 225, 0.72);
  --ys-glass-text-muted: rgba(255, 239, 225, 0.52);
  --ys-glass-text-faint: rgba(255, 239, 225, 0.48);
  --ys-glass-stroke: rgba(255, 244, 233, 0.08);
  --ys-glass-stroke-active: rgba(255, 244, 233, 0.42);
  --ys-card-bg: rgba(255, 244, 233, 0.84);
  --ys-card-border: rgba(215, 189, 168, 0.55);
  --ys-card-border-strong: rgba(215, 189, 168, 0.75);
  --ys-btn-accent-bg: rgba(207, 79, 39, 0.1);
  --ys-btn-accent-border: rgba(169, 61, 29, 0.35);
  --ys-btn-teal-bg: rgba(11, 141, 128, 0.1);
  --ys-btn-teal-border: rgba(11, 141, 128, 0.36);
```

- [ ] **Step 3: Verify build passes**

Run: `npx next build`
Expected: Successful build

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "fix: scope custom cursor to hover devices, add glass CSS custom properties"
```

---

### Task 3: Add SEO meta tags, OG/Twitter cards, and JSON-LD Person schema

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update the metadata export in layout.tsx**

Replace the existing `metadata` const (lines 30-42) with:

```tsx
export const metadata: Metadata = {
  title: "Yogesh Sahu — Fractional CTO & Solutions Architect",
  description:
    "Hands-On Chief Solutions Architect / Fractional CTO for AI, fintech, and data-heavy products. Discovery through delivery.",
  metadataBase: new URL("https://yogeshsahu.xyz"),
  openGraph: {
    title: "Yogesh Sahu — Fractional CTO & Solutions Architect",
    description:
      "I scope, architect, code, and lead client-facing AI, fintech, and data-heavy engagements from discovery through delivery.",
    url: "https://yogeshsahu.xyz",
    siteName: "yogeshsahu.xyz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogesh Sahu — Fractional CTO & Solutions Architect",
    description:
      "Hands-on architecture, AI, fintech, and data-heavy product leadership.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://yogeshsahu.xyz",
  },
};
```

- [ ] **Step 2: Add JSON-LD Person structured data inside the body**

Add a `<script>` tag inside the `<body>` before `{children}`:

```tsx
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yogesh Sahu",
    jobTitle: "Fractional CTO & Chief Solutions Architect",
    url: "https://yogeshsahu.xyz",
    sameAs: [
      "https://linkedin.com/in/yogeshsahu",
      "https://github.com/CryptoPrism-io",
    ],
    worksFor: {
      "@type": "Organization",
      name: "CryptoPrism",
      url: "https://cryptoprism.io",
    },
    knowsAbout: [
      "AI Integration",
      "FinTech Architecture",
      "Data Pipelines",
      "Solution Architecture",
      "Product Engineering",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Strathclyde",
    },
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `npx next build`
Expected: Successful build

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add OG/Twitter meta tags and JSON-LD Person structured data"
```

---

### Task 4: Extract data constants from page.tsx

**Files:**
- Create: `src/data/domain-graph.ts`
- Create: `src/data/proofs.ts`
- Create: `src/data/window-configs.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/data/domain-graph.ts`**

Extract `DOMAIN_GRAPH`, `DOMAIN_DETAILS`, and all related types from `page.tsx` (lines 120-220):

```tsx
export const DOMAIN_GRAPH = [
  {
    id: "finance",
    label: "FINANCE",
    x: 118,
    y: 112,
    tone: "var(--ys-accent)",
    subdomains: [
      { id: "markets", label: "MARKETS", x: 72, y: 238 },
      { id: "pricing", label: "PRICING", x: 118, y: 322 },
      { id: "signals", label: "SIGNALS", x: 164, y: 238 },
    ],
  },
  {
    id: "leadership",
    label: "LEADERSHIP",
    x: 280,
    y: 112,
    tone: "var(--ys-highlight)",
    subdomains: [
      { id: "discovery", label: "DISCOVERY", x: 234, y: 238 },
      { id: "alignment", label: "ALIGN", x: 280, y: 322 },
      { id: "delivery", label: "DELIVERY", x: 326, y: 238 },
    ],
  },
  {
    id: "technology",
    label: "TECHNOLOGY",
    x: 442,
    y: 112,
    tone: "var(--ys-text)",
    subdomains: [
      { id: "ai", label: "AI", x: 396, y: 238 },
      { id: "data", label: "DATA", x: 442, y: 322 },
      { id: "systems", label: "SYSTEMS", x: 488, y: 238 },
    ],
  },
] as const;

export type DomainId = (typeof DOMAIN_GRAPH)[number]["id"];
export type SubdomainId = (typeof DOMAIN_GRAPH)[number]["subdomains"][number]["id"];

export const DOMAIN_DETAILS: Record<
  DomainId,
  { summary: string; subdomains: Record<SubdomainId, string> }
> = {
  finance: {
    summary: "Market logic, pricing judgment, and decision systems built for actual financial workflows.",
    subdomains: {
      markets: "Live financial context and product behavior.",
      pricing: "Valuation and model-backed decision layers.",
      signals: "Indicators, scanning, and operator guidance.",
      discovery: "", alignment: "", delivery: "", ai: "", data: "", systems: "",
    },
  },
  leadership: {
    summary: "Discovery, alignment, and execution control when authority is fragmented and speed matters.",
    subdomains: {
      discovery: "Problem framing, scope control, and commercial definition.",
      alignment: "Stakeholder trust, technical alignment, and expectation management.",
      delivery: "Execution sequencing under real delivery pressure.",
      markets: "", pricing: "", signals: "", ai: "", data: "", systems: "",
    },
  },
  technology: {
    summary: "Hands-on architecture across AI, data, and production systems that have to survive contact with reality.",
    subdomains: {
      ai: "Applied AI integration and orchestration inside products.",
      data: "Pipelines, storage, movement, and analytical structure.",
      systems: "Architecture, APIs, reliability, and runtime behavior.",
      markets: "", pricing: "", signals: "", discovery: "", alignment: "", delivery: "",
    },
  },
};
```

- [ ] **Step 2: Create `src/data/proofs.ts`**

Extract `LandingProofCard`, `SUBDOMAIN_PROOFS`, and `PROOF_CARD_ANCHORS` from `page.tsx` (lines 162-436):

```tsx
import type { SubdomainId } from "./domain-graph";

export interface LandingProofCard {
  id: string;
  title: string;
  meta: string;
  note: string;
  href?: string;
  windowId?: string;
}

export const SUBDOMAIN_PROOFS: Record<SubdomainId, LandingProofCard[]> = {
  // ... copy all proof data verbatim from page.tsx lines 222-430
};

export const PROOF_CARD_ANCHORS = [
  { x: 122, y: 446 },
  { x: 280, y: 446 },
  { x: 438, y: 446 },
] as const;
```

Copy the full SUBDOMAIN_PROOFS object from page.tsx lines 222-430 exactly.

- [ ] **Step 3: Create `src/data/window-configs.ts`**

Extract `WINDOW_CONFIGS`, `ICON_MAP`, and `WINDOW_CONTENT` from `page.tsx` (lines 31-118):

```tsx
import type { ReactNode } from "react";
import type { WindowConfig } from "@/hooks/useWindowManager";
import {
  ArrowRight, Award, Briefcase, FileText, FolderOpen,
  GitBranch, Mail, Search, Terminal,
} from "lucide-react";
import AboutWindow from "@/components/windows/AboutWindow";
import CapabilityGraphWindow from "@/components/windows/CapabilityGraphWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import DiagnosticWindow from "@/components/windows/DiagnosticWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";

export const WINDOW_CONFIGS: WindowConfig[] = [
  // ... copy verbatim from page.tsx lines 31-96
];

export const ICON_MAP: Record<string, ReactNode> = {
  "capability-graph": <GitBranch size={18} strokeWidth={1.5} />,
  about: <FileText size={18} strokeWidth={1.5} />,
  projects: <FolderOpen size={18} strokeWidth={1.5} />,
  diagnostic: <Search size={18} strokeWidth={1.5} />,
  contact: <Mail size={18} strokeWidth={1.5} />,
  terminal: <Terminal size={18} strokeWidth={1.5} />,
  credentials: <Award size={18} strokeWidth={1.5} />,
  experience: <Briefcase size={18} strokeWidth={1.5} />,
};

export const WINDOW_CONTENT: Record<string, (onOpen: (id: string) => void) => ReactNode> = {
  "capability-graph": (onOpen) => <CapabilityGraphWindow onOpen={onOpen} />,
  about: () => <AboutWindow />,
  projects: () => <ProjectsWindow />,
  diagnostic: (onOpen) => <DiagnosticWindow onStart={() => onOpen("contact")} />,
  contact: () => <ContactWindow />,
  terminal: () => <TerminalWindow />,
  credentials: () => <CredentialsWindow />,
  experience: () => <ExperienceWindow />,
};
```

Copy the full WINDOW_CONFIGS array from page.tsx lines 31-96 exactly.

- [ ] **Step 4: Update page.tsx imports to use extracted data**

Replace the inline data in page.tsx with imports:

```tsx
import { DOMAIN_GRAPH, DOMAIN_DETAILS, type DomainId, type SubdomainId } from "@/data/domain-graph";
import { SUBDOMAIN_PROOFS, PROOF_CARD_ANCHORS, type LandingProofCard } from "@/data/proofs";
import { WINDOW_CONFIGS, ICON_MAP, WINDOW_CONTENT } from "@/data/window-configs";
```

Remove all deleted constants and types from page.tsx. Keep `GlyphPanel`, `LaunchDeck`, and `Home` functions.

- [ ] **Step 5: Verify build passes**

Run: `npx next build`
Expected: Successful build

- [ ] **Step 6: Commit**

```bash
git add src/data/ src/app/page.tsx
git commit -m "refactor: extract domain graph, proofs, and window configs from page.tsx"
```

---

### Task 5: Extract GlyphPanel and LaunchDeck components

**Files:**
- Create: `src/components/landing/GlyphPanel.tsx`
- Create: `src/components/landing/LaunchDeck.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/landing/GlyphPanel.tsx`**

Move the entire `GlyphPanel` function (page.tsx lines 438-809) into its own file. Add necessary imports:

```tsx
"use client";

import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { DOMAIN_GRAPH, DOMAIN_DETAILS, type DomainId, type SubdomainId } from "@/data/domain-graph";
import { SUBDOMAIN_PROOFS, PROOF_CARD_ANCHORS, type LandingProofCard } from "@/data/proofs";

export default function GlyphPanel({ onOpen }: { onOpen: (id: string) => void }) {
  // ... paste the entire GlyphPanel function body from page.tsx
}
```

Copy the full function body from page.tsx lines 439-809 exactly as-is.

- [ ] **Step 2: Create `src/components/landing/LaunchDeck.tsx`**

Move the entire `LaunchDeck` function (page.tsx lines 812-979) into its own file:

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, MOTION_DURATION, MOTION_EASE_QUICK } from "@/lib/motion";

export default function LaunchDeck({ onOpen }: { onOpen: (id: string) => void }) {
  // ... paste the entire LaunchDeck function body from page.tsx
}
```

Copy the full function body from page.tsx lines 813-979 exactly as-is.

- [ ] **Step 3: Update page.tsx to import the extracted components**

Replace the inline GlyphPanel/LaunchDeck definitions with imports. The resulting page.tsx should look roughly like:

```tsx
"use client";

import GlyphPanel from "@/components/landing/GlyphPanel";
import LaunchDeck from "@/components/landing/LaunchDeck";
import CustomCursor from "@/components/desktop/CustomCursor";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import Window from "@/components/desktop/Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { WINDOW_CONFIGS, ICON_MAP, WINDOW_CONTENT } from "@/data/window-configs";

export default function Home() {
  const {
    openWindows, dockWindows, openWindow, closeWindow,
    minimizeWindow, maximizeWindow, focusWindow, updatePosition,
  } = useWindowManager(WINDOW_CONFIGS);
  const topZIndex = openWindows.reduce((max, current) => Math.max(max, current.zIndex), 0);

  return (
    <div className="desktop-surface desktop-pattern desktop-cursor relative h-screen w-screen overflow-hidden">
      <CustomCursor />
      <MenuBar />

      <main className="absolute top-11 left-0 right-0 bottom-16 overflow-hidden">
        <LaunchDeck onOpen={openWindow} />
        <GlyphPanel onOpen={openWindow} />

        {openWindows.map((w) => (
          <Window
            key={w.id}
            state={{ ...w, icon: "" }}
            isFocused={w.zIndex === topZIndex}
            titleIcon={ICON_MAP[w.id]}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onMaximize={() => maximizeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            onDragEnd={(pos) => updatePosition(w.id, pos)}
          >
            {WINDOW_CONTENT[w.id](openWindow)}
          </Window>
        ))}
      </main>

      <Dock windows={dockWindows} iconMap={ICON_MAP} onOpen={openWindow} onFocus={focusWindow} />
    </div>
  );
}
```

- [ ] **Step 4: Verify build passes**

Run: `npx next build`
Expected: Successful build

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/ src/app/page.tsx
git commit -m "refactor: extract GlyphPanel and LaunchDeck from page.tsx"
```

---

### Task 6: Replace inline rgba styles with CSS custom properties

**Files:**
- Modify: `src/components/landing/GlyphPanel.tsx`
- Modify: `src/components/landing/LaunchDeck.tsx`
- Modify: `src/components/desktop/Dock.tsx`

- [ ] **Step 1: Update GlyphPanel.tsx inline styles**

Replace hardcoded `rgba(...)` values with the CSS custom properties added in Task 2. Key replacements:

| Old value | New CSS var |
|-----------|------------|
| `rgba(255,244,233,0.12)` / `rgba(255,244,233,0.14)` | `var(--ys-glass-border)` |
| `rgba(151, 79, 52, 0.14)` / `rgba(122, 63, 42, 0.16)` | `var(--ys-glass-bg)` |
| `rgba(255,248,241,0.94)` | `var(--ys-glass-text)` |
| `rgba(255,239,225,0.72)` | `var(--ys-glass-text-soft)` |
| `rgba(255,239,225,0.5)` / `rgba(255,239,225,0.52)` | `var(--ys-glass-text-muted)` |
| `rgba(255,239,225,0.48)` | `var(--ys-glass-text-faint)` |

Only replace values used in `style={{...}}` props. Leave SVG inline attributes (fill/stroke on SVG elements) as-is since those need exact opacity values for the animated graph.

- [ ] **Step 2: Update LaunchDeck.tsx inline styles**

Replace:
| Old value | New CSS var |
|-----------|------------|
| `rgba(215, 189, 168, 0.55)` | `var(--ys-card-border)` |
| `rgba(255, 244, 233, 0.84)` | `var(--ys-card-bg)` |
| `rgba(215, 189, 168, 0.75)` | `var(--ys-card-border-strong)` |
| `rgba(207, 79, 39, 0.1)` | `var(--ys-btn-accent-bg)` |
| `rgba(169, 61, 29, 0.35)` | `var(--ys-btn-accent-border)` |
| `rgba(11, 141, 128, 0.1)` | `var(--ys-btn-teal-bg)` |
| `rgba(11, 141, 128, 0.36)` | `var(--ys-btn-teal-border)` |

- [ ] **Step 3: Verify build passes**

Run: `npx next build`
Expected: Successful build

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/ src/components/desktop/Dock.tsx
git commit -m "refactor: replace inline rgba styles with CSS custom properties"
```

---

### Task 7: Build mobile-first layout

**Files:**
- Create: `src/components/landing/MobileHome.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create `src/components/landing/MobileHome.tsx`**

Build a vertical card stack layout that shows on mobile instead of the windowed desktop:

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Briefcase, FileText, Terminal, Award, FolderOpen } from "lucide-react";
import { fadeUp, MOTION_DURATION, MOTION_EASE_QUICK } from "@/lib/motion";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import DiagnosticWindow from "@/components/windows/DiagnosticWindow";
import { useState } from "react";

interface MobileSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function MobileSection({ title, icon, children, defaultOpen = false }: MobileSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.section
      className="border-b"
      style={{ borderColor: "var(--ys-card-border)" }}
      variants={fadeUp(0.04, 12)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-40px" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4"
        style={{ background: "var(--ys-surface)" }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: "var(--ys-text-soft)" }}>{icon}</span>
          <span
            className="text-[13px] font-bold uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {title}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--ys-text-soft)" }}
        >
          <ArrowRight size={16} />
        </motion.span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          style={{ background: "var(--ys-surface)", overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </motion.section>
  );
}

export default function MobileHome() {
  return (
    <div className="min-h-screen overflow-y-auto" style={{ background: "var(--ys-surface)" }}>
      {/* Hero card */}
      <motion.header
        className="px-5 pt-16 pb-6"
        style={{ background: "var(--ys-bg)" }}
        variants={fadeUp(0, 18)}
        initial="initial"
        animate="animate"
      >
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255,239,225,0.6)" }}
        >
          CHIEF SOLUTIONS ARCHITECT | FRACTIONAL CTO
        </p>
        <h1
          className="mb-3 text-[2rem] font-black uppercase leading-[0.95]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-surface)" }}
        >
          Yogesh Sahu
        </h1>
        <p
          className="mb-5 text-[13px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,239,225,0.82)" }}
        >
          I scope, architect, code, and lead client-facing AI, fintech, and data-heavy
          engagements from discovery through delivery.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "1B+", label: "data points/day" },
            { value: "99.9%", label: "uptime SLA" },
            { value: "23", label: "public repos" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border px-3 py-2.5"
              style={{
                borderColor: "rgba(255,244,233,0.18)",
                background: "rgba(255,248,241,0.12)",
              }}
            >
              <p
                className="text-[1rem] font-bold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-surface)" }}
              >
                {item.value}
              </p>
              <p
                className="text-[8px] uppercase tracking-[0.1em]"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(255,239,225,0.6)" }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.header>

      {/* Expandable sections */}
      <MobileSection title="About" icon={<FileText size={16} />} defaultOpen>
        <AboutWindow />
      </MobileSection>

      <MobileSection title="Projects" icon={<FolderOpen size={16} />} defaultOpen>
        <ProjectsWindow />
      </MobileSection>

      <MobileSection title="Experience" icon={<Briefcase size={16} />}>
        <ExperienceWindow />
      </MobileSection>

      <MobileSection title="Credentials" icon={<Award size={16} />}>
        <CredentialsWindow />
      </MobileSection>

      <MobileSection title="5-Day Diagnostic" icon={<Terminal size={16} />}>
        <DiagnosticWindow onStart={() => {
          const contactSection = document.getElementById("mobile-contact");
          contactSection?.scrollIntoView({ behavior: "smooth" });
        }} />
      </MobileSection>

      <div id="mobile-contact">
        <MobileSection title="Contact" icon={<Mail size={16} />} defaultOpen>
          <ContactWindow />
        </MobileSection>
      </div>

      {/* Footer */}
      <footer
        className="px-5 py-6 text-center"
        style={{ background: "var(--ys-surface-strong)" }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          yogeshsahu.xyz
        </p>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Update page.tsx to conditionally render mobile vs desktop**

Add a state for screen size detection and render `MobileHome` on small screens:

```tsx
"use client";

import { useEffect, useState } from "react";
import GlyphPanel from "@/components/landing/GlyphPanel";
import LaunchDeck from "@/components/landing/LaunchDeck";
import MobileHome from "@/components/landing/MobileHome";
import CustomCursor from "@/components/desktop/CustomCursor";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import Window from "@/components/desktop/Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { WINDOW_CONFIGS, ICON_MAP, WINDOW_CONTENT } from "@/data/window-configs";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const {
    openWindows, dockWindows, openWindow, closeWindow,
    minimizeWindow, maximizeWindow, focusWindow, updatePosition,
  } = useWindowManager(WINDOW_CONFIGS);
  const topZIndex = openWindows.reduce((max, current) => Math.max(max, current.zIndex), 0);

  if (isMobile) {
    return <MobileHome />;
  }

  return (
    <div className="desktop-surface desktop-pattern desktop-cursor relative h-screen w-screen overflow-hidden">
      <CustomCursor />
      <MenuBar />

      <main className="absolute top-11 left-0 right-0 bottom-16 overflow-hidden">
        <LaunchDeck onOpen={openWindow} />
        <GlyphPanel onOpen={openWindow} />

        {openWindows.map((w) => (
          <Window
            key={w.id}
            state={{ ...w, icon: "" }}
            isFocused={w.zIndex === topZIndex}
            titleIcon={ICON_MAP[w.id]}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onMaximize={() => maximizeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            onDragEnd={(pos) => updatePosition(w.id, pos)}
          >
            {WINDOW_CONTENT[w.id](openWindow)}
          </Window>
        ))}
      </main>

      <Dock windows={dockWindows} iconMap={ICON_MAP} onOpen={openWindow} onFocus={focusWindow} />
    </div>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `npx next build`
Expected: Successful build

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/MobileHome.tsx src/app/page.tsx
git commit -m "feat: add mobile-first card stack layout for small screens"
```

---

### Task 8: Add dynamic project pages

**Files:**
- Create: `src/data/project-details.ts`
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `src/data/project-details.ts`**

Build a rich data file that maps project slugs to detail content. This replaces the static HTML files in `public/projects/`:

```tsx
import { projects } from "@/lib/projects";

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
  sections: {
    title: string;
    content: string;
  }[];
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
      sections: [],
    },
  ])
);
```

- [ ] **Step 2: Create `src/app/projects/[slug]/page.tsx`**

```tsx
import { projects } from "@/lib/projects";
import { projectDetails } from "@/data/project-details";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projectDetails[params.slug];
  if (!project) {
    return { title: "Project Not Found — yogeshsahu.xyz" };
  }
  return {
    title: `${project.name} — yogeshsahu.xyz`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Yogesh Sahu`,
      description: project.tagline,
      url: `https://yogeshsahu.xyz/projects/${project.id}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails[slug];

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center" style={{ background: "var(--ys-surface)" }}>
        <div className="text-center">
          <h1
            className="mb-4 text-[2rem] font-black uppercase"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            Project Not Found
          </h1>
          <Link
            href="/"
            className="text-[13px] font-medium underline"
            style={{ color: "var(--ys-accent)" }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--ys-surface)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b px-5 py-3" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", backdropFilter: "blur(12px)" }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between">
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
            {project.language}
          </span>
        </div>
      </nav>

      <header className="mx-auto max-w-4xl px-5 pt-20 pb-10">
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          {project.tags.join(" / ")}
        </p>
        <h1
          className="mb-4 text-[clamp(1.8rem,5vw,3rem)] font-black uppercase leading-[0.95]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          {project.name}
        </h1>
        <p
          className="mb-6 max-w-[60ch] text-[15px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          {project.tagline}
        </p>

        <div className="flex items-center gap-4">
          <div
            className="rounded-xl border px-4 py-3"
            style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
          >
            <p
              className="text-[1.2rem] font-bold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
            >
              {project.stat}
            </p>
            <p
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              {project.statLabel}
            </p>
          </div>
          {project.githubHref && (
            <a
              href={project.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:opacity-80"
              style={{
                fontFamily: "var(--font-headline)",
                borderColor: "var(--ys-border)",
                color: "var(--ys-text)",
              }}
            >
              View Source
            </a>
          )}
        </div>
      </header>

      {project.sections.length > 0 && (
        <div className="mx-auto max-w-4xl px-5 pb-16">
          {project.sections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2
                className="mb-3 text-[14px] font-bold uppercase tracking-[0.1em]"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
              >
                {section.title}
              </h2>
              <p
                className="text-[14px] leading-[1.8]"
                style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
              >
                {section.content}
              </p>
            </section>
          ))}
        </div>
      )}

      <footer className="border-t px-5 py-8" style={{ borderColor: "var(--ys-border)" }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between">
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

- [ ] **Step 3: Update proof cards in `src/data/proofs.ts` to use new routes**

Replace `/projects/cryptoprism-db.html` references with `/projects/cryptoprism-db`, etc. Change all `.html` href suffixes in SUBDOMAIN_PROOFS to clean URLs.

- [ ] **Step 4: Update `ProjectsWindow.tsx` hrefs to use new routes**

Update any `href` values pointing to `/projects/*.html` to use `/projects/{id}` instead.

- [ ] **Step 5: Verify build passes**

Run: `npx next build`
Expected: Successful build with the new `/projects/[slug]` routes showing in the output

- [ ] **Step 6: Commit**

```bash
git add src/data/project-details.ts src/app/projects/ src/data/proofs.ts src/components/windows/ProjectsWindow.tsx
git commit -m "feat: add dynamic /projects/[slug] pages, replace static HTML project files"
```

---

### Task 9: Add keyboard navigation for windows

**Files:**
- Modify: `src/hooks/useWindowManager.ts`
- Modify: `src/components/desktop/Dock.tsx`
- Modify: `src/components/desktop/Window.tsx`
- Modify: `src/components/desktop/MenuBar.tsx`

- [ ] **Step 1: Add keyboard handlers to useWindowManager**

Add a `useEffect` in the `useWindowManager` hook that listens for keyboard shortcuts:

```tsx
import { useState, useCallback, useEffect } from "react";

// Inside useWindowManager, after the existing callbacks:
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      const topWindow = Object.values(windows)
        .filter((w) => w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex)[0];
      if (topWindow) {
        closeWindow(topWindow.id);
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [windows, closeWindow]);
```

Note: `windows` must be in the dependency array so the handler sees the latest state.

- [ ] **Step 2: Add keyboard navigation to Dock**

Update `Dock.tsx` to support keyboard navigation. Add `tabIndex={0}` to the dock container and handle arrow keys:

In the `DockItem` component, add proper keyboard handling:

```tsx
<motion.button
  ref={ref}
  onClick={() => (w.isOpen && !w.isMinimized ? onFocus(w.id) : onOpen(w.id))}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      w.isOpen && !w.isMinimized ? onFocus(w.id) : onOpen(w.id);
    }
  }}
  className="focus-ring group relative flex flex-col items-center"
  // ... rest unchanged
>
```

- [ ] **Step 3: Add skip-to-content link in MenuBar**

Add a visually-hidden skip link as the first child of the `<header>` in `MenuBar.tsx`:

```tsx
<header ...>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-1/2 focus:-translate-y-1/2 focus:z-[99999] focus:rounded-lg focus:px-3 focus:py-1.5 focus:text-[11px] focus:font-bold"
    style={{
      fontFamily: "var(--font-mono)",
      background: "var(--ys-surface)",
      color: "var(--ys-text)",
    }}
  >
    Skip to content
  </a>
  {/* ... rest of header */}
</header>
```

Also add `id="main-content"` to the `<main>` element in `page.tsx`.

- [ ] **Step 4: Add `sr-only` utility to globals.css**

Add if not already present:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

- [ ] **Step 5: Verify build passes**

Run: `npx next build`
Expected: Successful build

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useWindowManager.ts src/components/desktop/Dock.tsx src/components/desktop/Window.tsx src/components/desktop/MenuBar.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: add keyboard navigation (Esc to close, Tab through dock, skip-to-content)"
```

---

### Task 10: Add guided tour for first-time visitors

**Files:**
- Create: `src/components/landing/GuidedTour.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/landing/GuidedTour.tsx`**

Build a lightweight overlay that guides first-time visitors through the UI:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOUR_STEPS = [
  {
    title: "Welcome to YogeshOS",
    description: "This is an interactive desktop. Click windows in the dock below to explore my work, or use the launch deck on the right.",
    position: "center" as const,
  },
  {
    title: "Domain Map",
    description: "Hover the graph on the left to explore my expertise across Finance, Leadership, and Technology. Click any node to see proof.",
    position: "left" as const,
  },
  {
    title: "Launch Deck",
    description: "Quick access to projects, the 5-day diagnostic offer, and contact. Start here if you know what you're looking for.",
    position: "right" as const,
  },
];

const TOUR_KEY = "ys-tour-complete";

export default function GuidedTour({ onOpenWindow }: { onOpenWindow: (id: string) => void }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(TOUR_KEY)) {
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {
      // ignore
    }
  };

  const next = () => {
    if (step >= TOUR_STEPS.length - 1) {
      dismiss();
      onOpenWindow("about");
      return;
    }
    setStep(step + 1);
  };

  const currentStep = TOUR_STEPS[step];

  const positionClasses = {
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    left: "left-8 top-1/2 -translate-y-1/2 xl:left-12",
    right: "right-8 top-1/3 xl:right-12",
  };

  return (
    <AnimatePresence>
      {visible && currentStep && (
        <>
          <motion.div
            className="fixed inset-0 z-[99990]"
            style={{ background: "rgba(42, 23, 15, 0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />
          <motion.div
            className={`fixed z-[99991] w-[min(380px,calc(100%-32px))] rounded-2xl border p-6 ${positionClasses[currentStep.position]}`}
            style={{
              borderColor: "var(--ys-card-border)",
              background: "var(--ys-surface)",
              boxShadow: "0 24px 56px rgba(34, 18, 11, 0.35)",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            key={step}
          >
            <p
              className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              {step + 1} / {TOUR_STEPS.length}
            </p>
            <h3
              className="mb-2 text-[16px] font-bold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              {currentStep.title}
            </h3>
            <p
              className="mb-5 text-[13px] leading-[1.7]"
              style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
            >
              {currentStep.description}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={dismiss}
                className="text-[11px] font-medium uppercase tracking-[0.08em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                Skip tour
              </button>
              <button
                onClick={next}
                className="rounded-xl border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors hover:opacity-90"
                style={{
                  fontFamily: "var(--font-headline)",
                  borderColor: "var(--ys-btn-accent-border)",
                  background: "var(--ys-accent)",
                  color: "var(--ys-surface)",
                }}
              >
                {step >= TOUR_STEPS.length - 1 ? "Get Started" : "Next"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add GuidedTour to the desktop layout in page.tsx**

Import and render `GuidedTour` inside the desktop layout, after the `<Dock>`:

```tsx
import GuidedTour from "@/components/landing/GuidedTour";

// Inside the desktop return, after <Dock>:
<GuidedTour onOpenWindow={openWindow} />
```

Only render on desktop (it's already inside the `if (isMobile)` guard — the mobile layout has its own content-first approach that doesn't need a tour).

- [ ] **Step 3: Verify build passes**

Run: `npx next build`
Expected: Successful build

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/GuidedTour.tsx src/app/page.tsx
git commit -m "feat: add guided tour for first-time desktop visitors"
```

---

### Task 11: Final verification and cleanup

**Files:**
- All modified files

- [ ] **Step 1: Full build check**

Run: `npx next build`
Expected: Clean build with routes for `/` and `/projects/[slug]`

- [ ] **Step 2: Verify no unused imports remain**

Run: `npx next build 2>&1 | grep -i "warning\|error"`
Expected: No warnings about unused imports

- [ ] **Step 3: Verify recharts can be removed from dependencies**

Check if recharts is still imported anywhere:

```bash
grep -r "from.*recharts" src/
```

Expected: No results (ExpertisePillars.tsx was the only consumer and it's deleted).

If no results, remove it:

```bash
npm uninstall recharts
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: remove unused recharts dependency, final cleanup"
```
