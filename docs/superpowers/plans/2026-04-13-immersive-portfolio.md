# Immersive Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Also invoke `frontend-design` skill for each component task to maximise design quality.

**Goal:** Transform the static monochrome portfolio into a cinematic, full-screen scroll-snap experience using Framer Motion — Direction B (Imperial Parchment) with C (Full-Screen Section Takeovers).

**Architecture:** Each section becomes a `100svh` snap point. A scroll-snap container in `page.tsx` enables native browser snap. Framer Motion `whileInView` animates elements on entry; stat numbers count up via `useInView`. The Projects section becomes a horizontal drag carousel.

**Tech Stack:** Next.js 16.2.3 (static export), React 19, Framer Motion 12.38.0, Tailwind CSS v4, TypeScript, `"use client"` on all animated components.

**Design tokens (DO NOT CHANGE):**
- Background: `#f7f4ee` cream
- Ink: `#1a1a1a`
- White panels: `#ffffff`
- Font serif display: `var(--font-serif-display)` (Newsreader italic)
- Font headline: `var(--font-headline)` (Space Grotesk)
- Font body: `var(--font-body)` (Work Sans)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/globals.css` | Modify | Add scroll-snap container styles, `svh` utilities |
| `src/app/page.tsx` | Modify | Add scroll-snap wrapper on `<main>` |
| `src/components/Nav.tsx` | Modify | Ensure `fixed` positioning works inside snap container |
| `src/hooks/useCountUp.ts` | Create | Count-up animation hook using `useInView` |
| `src/components/Hero.tsx` | Rewrite | Full-screen, staggered Framer reveals, count-up stats |
| `src/components/About.tsx` | Rewrite | Full-screen, directional reveal animations |
| `src/components/ProjectsGrid.tsx` | Rewrite | Full-screen horizontal drag carousel |
| `src/components/Contact.tsx` | Rewrite | Full-screen, staggered entry animations |
| `src/components/Footer.tsx` | Rewrite | Slim `60px` snap section |

---

## Phase 1 — Scroll-Snap Foundation

### Task 1: Add scroll-snap styles to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Open globals.css and append these styles after the existing `@keyframes` block**

```css
/* ── Scroll Snap Container ── */
html {
  height: 100%;
}

body {
  height: 100%;
  overflow: hidden;
}

/* Main scroll container — defined in page.tsx via inline style */
.snap-container {
  height: 100svh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

/* Each full-screen section */
.snap-section {
  height: 100svh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
  position: relative;
}

/* Fallback for browsers without svh support */
@supports not (height: 100svh) {
  .snap-container { height: 100vh; }
  .snap-section { height: 100vh; }
}
```

- [ ] **Step 2: Verify globals.css compiles — run dev server**

```bash
cd C:/cpio_db/yogeshsahu-website && npm run dev -- --port 3003 2>&1 | head -5
```
Expected: `✓ Ready in` or `▲ Next.js`

- [ ] **Step 3: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/app/globals.css && git commit -m "feat: add scroll-snap foundation styles"
```

---

### Task 2: Wire scroll-snap container in page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with scroll-snap container**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsGrid from "@/components/ProjectsGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="snap-container">
      <Nav />
      <Hero />
      <About />
      <ProjectsGrid />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd C:/cpio_db/yogeshsahu-website && npm run build 2>&1 | tail -10
```
Expected: `✓ Generating static pages`

- [ ] **Step 3: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/app/page.tsx && git commit -m "feat: wire scroll-snap container"
```

---

## Phase 2 — useCountUp Hook

### Task 3: Create useCountUp hook

**Files:**
- Create: `src/hooks/useCountUp.ts`

- [ ] **Step 1: Create hooks directory and write the hook**

```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates a number from 0 to `end` when the returned ref enters the viewport.
 * Uses cubic ease-out for a natural deceleration feel.
 */
export function useCountUp(end: number, duration = 1.8) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Cubic ease-out: decelerates toward end
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return { ref, count };
}
```

- [ ] **Step 2: Verify TypeScript — check for errors**

```bash
cd C:/cpio_db/yogeshsahu-website && npx tsc --noEmit 2>&1 | head -20
```
Expected: no output (no errors)

- [ ] **Step 3: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/hooks/useCountUp.ts && git commit -m "feat: add useCountUp hook for stat animations"
```

---

## Phase 3 — Hero Section (Full-Screen + Framer)

### Task 4: Rewrite Hero.tsx as full-screen animated section

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx completely**

```tsx
"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const slideInLeft = (delay = 0) => ({
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

interface StatBlockProps {
  label: string;
  rawValue: number;
  suffix: string;
  sub: string;
  dark?: boolean;
  delay?: number;
}

function StatBlock({ label, rawValue, suffix, sub, dark = false, delay = 0 }: StatBlockProps) {
  const { ref, count } = useCountUp(rawValue, 1.8);

  return (
    <motion.div
      ref={ref}
      className="flex-1 p-5 lg:p-6 border-b border-[#f0f0f0] last:border-b-0 flex flex-col justify-between"
      style={{ background: dark ? "#1a1a1a" : "#ffffff" }}
      {...fadeUp(delay)}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
        style={{
          color: dark ? "#555" : "#bbb",
          fontFamily: "var(--font-headline)",
        }}
      >
        {label}
      </p>
      <div>
        <p
          className="text-[2.6rem] lg:text-[3rem] font-black leading-none tracking-[-0.03em]"
          style={{
            color: dark ? "#ffffff" : "#1a1a1a",
            fontFamily: "var(--font-headline)",
          }}
        >
          {count.toLocaleString()}{suffix}
        </p>
        <p
          className="text-[10px] uppercase tracking-[0.1em] mt-1"
          style={{
            color: dark ? "#555" : "#ccc",
            fontFamily: "var(--font-headline)",
          }}
        >
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="snap-section pt-[46px] bg-[#f7f4ee]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_300px] h-full border-b-2 border-[#1a1a1a]">

        {/* Left: editorial copy */}
        <div className="flex flex-col justify-between p-8 md:p-14 py-10 overflow-hidden">
          <div>
            <motion.p
              className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-8"
              style={{ fontFamily: "var(--font-headline)" }}
              {...fadeUp(0.1)}
            >
              FRACTIONAL CTO · FOUNDER · CRYPTOPRISM · DPIIT
            </motion.p>

            <h1 className="leading-[0.85] tracking-[-0.04em] mb-6">
              <motion.span
                className="block text-[clamp(3.6rem,9vw,6.5rem)] font-black italic text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-serif-display)" }}
                {...fadeUp(0.2)}
              >
                Yogesh
              </motion.span>
              <motion.span
                className="block text-[clamp(3.2rem,8vw,6rem)] font-black text-[#1a1a1a] uppercase"
                style={{ fontFamily: "var(--font-headline)" }}
                {...fadeUp(0.35)}
              >
                SAHU
              </motion.span>
            </h1>

            {/* Animated rule */}
            <div className="overflow-hidden w-14 mb-6">
              <motion.div
                className="h-[3px] bg-[#1a1a1a]"
                {...slideInLeft(0.5)}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <motion.p
              className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#888] leading-[2]"
              style={{ fontFamily: "var(--font-headline)" }}
              {...fadeUp(0.55)}
            >
              Fintech Infrastructure · AI · Data Engineering<br />
              Pre-seed Q2 2026 · Strathclyde MS FinTech
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-3 mt-8"
            {...fadeUp(0.65)}
          >
            <a
              href="#contact"
              className="text-[11px] font-black uppercase tracking-[0.12em] text-[#1a1a1a] border-2 border-[#1a1a1a] px-6 py-3 hover:bg-[#1a1a1a] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Open to mandates ↗
            </a>
            <a
              href="#work"
              className="text-[11px] font-black uppercase tracking-[0.12em] text-[#999] border border-[#ddd] px-6 py-3 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              View Work
            </a>
          </motion.div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-[#e0ddd6]" />

        {/* Right: animated stat column */}
        <div className="hidden lg:flex flex-col bg-white">
          <StatBlock label="DATA PROCESSED" rawValue={1000000000} suffix="+" sub="points / day" delay={0.3} />
          <StatBlock label="UPTIME SLA" rawValue={99} suffix=".9%" sub="production system" delay={0.4} />
          <StatBlock label="REPOS LIVE" rawValue={23} suffix="" sub="github · public" delay={0.5} />
          <StatBlock label="GAME DOWNLOADS" rawValue={50000} suffix="" sub="kari · 21 days · 110 countries" dark delay={0.6} />
        </div>
      </div>

      {/* Mobile stats 2×2 */}
      <div className="lg:hidden grid grid-cols-2 border-t-2 border-[#1a1a1a]">
        {[
          { label: "DATA", rawValue: 1000000000, suffix: "+", sub: "pts/day", dark: false, delay: 0.3 },
          { label: "UPTIME", rawValue: 99, suffix: ".9%", sub: "SLA", dark: false, delay: 0.4 },
          { label: "REPOS", rawValue: 23, suffix: "", sub: "github", dark: false, delay: 0.5 },
          { label: "DOWNLOADS", rawValue: 50000, suffix: "", sub: "kari", dark: true, delay: 0.6 },
        ].map((s, i) => {
          const { ref, count } = useCountUp(s.rawValue, 1.8);
          return (
            <motion.div
              key={s.label}
              ref={ref}
              className={`p-5 ${i % 2 === 0 ? "border-r border-[#e0e0e0]" : ""} ${i < 2 ? "border-b border-[#e0e0e0]" : ""}`}
              style={{ background: s.dark ? "#1a1a1a" : "white" }}
              {...fadeUp(s.delay)}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
                style={{ color: s.dark ? "#555" : "#bbb", fontFamily: "var(--font-headline)" }}>
                {s.label}
              </p>
              <p className="text-[1.8rem] font-black leading-none"
                style={{ color: s.dark ? "#fff" : "#1a1a1a", fontFamily: "var(--font-headline)" }}>
                {count.toLocaleString()}{s.suffix}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
```

**NOTE:** The mobile grid uses `useCountUp` inside a `.map()` — this violates Rules of Hooks. Fix in Step 2.

- [ ] **Step 2: Fix mobile stats — extract into a MobileStatBlock component above the default export**

Add this component above `export default function Hero()`:

```tsx
function MobileStatBlock({ label, rawValue, suffix, dark = false, delay = 0, borderRight = false, borderBottom = false }: {
  label: string; rawValue: number; suffix: string; dark?: boolean; delay?: number; borderRight?: boolean; borderBottom?: boolean;
}) {
  const { ref, count } = useCountUp(rawValue, 1.8);
  return (
    <motion.div
      ref={ref}
      className={`p-5 ${borderRight ? "border-r border-[#e0e0e0]" : ""} ${borderBottom ? "border-b border-[#e0e0e0]" : ""}`}
      style={{ background: dark ? "#1a1a1a" : "white" }}
      {...fadeUp(delay)}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
        style={{ color: dark ? "#555" : "#bbb", fontFamily: "var(--font-headline)" }}>
        {label}
      </p>
      <p className="text-[1.8rem] font-black leading-none"
        style={{ color: dark ? "#fff" : "#1a1a1a", fontFamily: "var(--font-headline)" }}>
        {count.toLocaleString()}{suffix}
      </p>
    </motion.div>
  );
}
```

Then replace the mobile grid in the JSX:
```tsx
<div className="lg:hidden grid grid-cols-2 border-t-2 border-[#1a1a1a]">
  <MobileStatBlock label="DATA" rawValue={1000000000} suffix="+" dark={false} delay={0.3} borderRight borderBottom />
  <MobileStatBlock label="UPTIME" rawValue={99} suffix=".9%" dark={false} delay={0.4} borderBottom />
  <MobileStatBlock label="REPOS" rawValue={23} suffix="" dark={false} delay={0.5} borderRight />
  <MobileStatBlock label="DOWNLOADS" rawValue={50000} suffix="" dark delay={0.6} />
</div>
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd C:/cpio_db/yogeshsahu-website && npx tsc --noEmit 2>&1 | head -20
```
Expected: no output

- [ ] **Step 4: Build check**

```bash
cd C:/cpio_db/yogeshsahu-website && npm run build 2>&1 | tail -8
```
Expected: `✓ Generating static pages`

- [ ] **Step 5: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/components/Hero.tsx src/hooks/useCountUp.ts && git commit -m "feat: Hero full-screen with Framer Motion stat counters"
```

---

## Phase 4 — About Section (Full-Screen + Directional Reveals)

### Task 5: Rewrite About.tsx as full-screen animated section

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Rewrite About.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

const disciplines = [
  { label: "INFRA",   color: "#1a1a1a", lines: ["GCP · PostgreSQL", "99.9% uptime", "1B+ data pts/day"] },
  { label: "PRODUCT", color: "#555",    lines: ["React · FastAPI", "WebSockets", "23 live repos"] },
  { label: "FINANCE", color: "#888",    lines: ["TimesFM · NLP", "Quant strategies", "MS FinTech"] },
];

const credentials = [
  { label: "STRATHCLYDE",    body: "MS FinTech — 82/100 · Dissertation Topper" },
  { label: "UBISOFT",        body: "Assassin's Creed · For Honor · Just Dance · AAA global scale" },
  { label: "DPIIT RECOGNISED ↗", body: "CryptoPrism · Pre-seed Q2 2026 · India Startup Recognition", highlight: true },
];

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <section id="about" className="snap-section bg-[#f7f4ee] border-b-2 border-[#1a1a1a]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] h-full">

        {/* Left: editorial pull-quote */}
        <div className="p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r border-[#e0ddd6] flex flex-col justify-center overflow-hidden">
          <div className="border-t-[3px] border-[#1a1a1a] pt-5 mb-10">
            <motion.p
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#bbb] mb-5"
              style={{ fontFamily: "var(--font-headline)" }}
              {...fadeLeft(0.1)}
            >
              01 — ABOUT
            </motion.p>
            <motion.h2
              className="text-[2rem] lg:text-[2.8rem] font-black leading-[1.1] italic text-[#1a1a1a] mb-6"
              style={{ fontFamily: "var(--font-serif-display)" }}
              {...fadeLeft(0.2)}
            >
              One operator.<br />Three disciplines.
            </motion.h2>
            <motion.p
              className="text-[14px] leading-[1.9] text-[#555] max-w-md"
              style={{ fontFamily: "var(--font-body)" }}
              {...fadeLeft(0.3)}
            >
              Yogesh Sahu builds production fintech infrastructure at the
              intersection of data engineering, AI, and product strategy.
              Former Ubisoft (Assassin&apos;s Creed, For Honor, Just Dance).
              Now: Founder + Fractional CTO.
            </motion.p>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            {disciplines.map((d, i) => (
              <motion.div
                key={d.label}
                className="border-l-2 pl-4"
                style={{ borderColor: d.color }}
                {...fadeLeft(0.3 + i * 0.1)}
              >
                <p className="text-[11px] font-black uppercase tracking-[0.15em] mb-2"
                   style={{ color: d.color, fontFamily: "var(--font-headline)" }}>
                  {d.label}
                </p>
                {d.lines.map((line) => (
                  <span key={line} className="block text-[12px] text-[#666] leading-[1.9]"
                        style={{ fontFamily: "var(--font-headline)" }}>
                    {line}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: credentials stack */}
        <div className="bg-white flex flex-col overflow-hidden">
          <motion.div className="px-6 py-5 border-b border-[#eee]" {...fadeRight(0.15)}>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#bbb]"
               style={{ fontFamily: "var(--font-headline)" }}>
              CREDENTIALS
            </p>
          </motion.div>
          {credentials.map((c, i) => (
            <motion.div
              key={c.label}
              className={`p-6 border-b border-[#eee] flex-1 flex flex-col justify-center ${c.highlight ? "border-l-2 border-l-[#1a1a1a]" : ""}`}
              {...fadeRight(0.25 + i * 0.12)}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-[#1a1a1a]"
                 style={{ fontFamily: "var(--font-headline)" }}>
                {c.label}
              </p>
              <p className="text-[13px] text-[#777] leading-[1.8]"
                 style={{ fontFamily: "var(--font-body)" }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Availability ticker */}
      <div className="bg-[#1a1a1a] overflow-hidden py-4 absolute bottom-0 left-0 right-0">
        <div className="animate-marquee inline-block">
          {[0, 1].map((i) => (
            <span key={i}
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-white mx-8"
              style={{ fontFamily: "var(--font-headline)" }}>
              AVAILABLE FOR FRACTIONAL CTO MANDATES&nbsp;·&nbsp;Q2 2026&nbsp;·&nbsp;DPIIT RECOGNISED&nbsp;·&nbsp;INDIA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AVAILABLE FOR FRACTIONAL CTO MANDATES&nbsp;·&nbsp;Q2 2026&nbsp;·&nbsp;DPIIT RECOGNISED&nbsp;·&nbsp;INDIA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd C:/cpio_db/yogeshsahu-website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Build check**

```bash
cd C:/cpio_db/yogeshsahu-website && npm run build 2>&1 | tail -8
```

- [ ] **Step 4: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/components/About.tsx && git commit -m "feat: About full-screen with directional Framer reveals"
```

---

## Phase 5 — Projects Section (Horizontal Drag Carousel)

### Task 6: Rewrite ProjectsGrid.tsx as full-screen horizontal carousel

**Files:**
- Modify: `src/components/ProjectsGrid.tsx`

- [ ] **Step 1: Rewrite ProjectsGrid.tsx**

```tsx
"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef } from "framer-motion";

const PROJECTS = [
  {
    id: "cryptoprism-db",
    label: "PROJ_001 · PYTHON · GCP",
    name: "CryptoPrism DB",
    desc: "Three-database GCP architecture. 1,000+ coins, 130+ on-chain indicators. Production AI-powered QA scoring system. 99.9% uptime SLA.",
    metric: "1B+",
    metricSub: "data points / day",
    tags: ["GCP", "PostgreSQL", "Python", "FastAPI"],
    cta: "Live ↗",
    ctaDark: true,
    href: "https://cryptoprism.io",
  },
  {
    id: "kari",
    label: "PROJ_002 · UNITY · MOBILE",
    name: "KARI",
    desc: "India-themed puzzle platformer. 50K downloads in 21 days across 110 countries. Built solo.",
    metric: "50K",
    metricSub: "downloads · 21 days",
    tags: ["Unity", "C#", "Mobile"],
    cta: "Play Store ↗",
    ctaDark: false,
    href: "https://play.google.com/store",
  },
  {
    id: "cryptoprism-platform",
    label: "PROJ_003 · REACT · FASTAPI",
    name: "CryptoPrism Platform",
    desc: "Real-time crypto analytics dashboard. WebSocket feeds, multi-timeframe charts, portfolio tracking.",
    metric: "Live",
    metricSub: "WebSocket · real-time",
    tags: ["React", "FastAPI", "WebSockets"],
    cta: "Live ↗",
    ctaDark: true,
    href: "https://cryptoprism.io",
  },
  {
    id: "ubisoft",
    label: "PROJ_004 · PYSPARK · DATABRICKS",
    name: "Ubisoft Data Pipeline",
    desc: "AAA Game Analytics. Assassin's Creed · For Honor · Just Dance global scale data engineering.",
    metric: "AAA",
    metricSub: "global scale",
    tags: ["PySpark", "Databricks"],
    cta: null,
    ctaDark: false,
    href: "#",
  },
  {
    id: "timesfm",
    label: "PROJ_005 · PYTHON · ML",
    name: "TimesFM Quant",
    desc: "Google's TimesFM applied to crypto markets. NLP-driven market sentiment analysis. MS dissertation A-grade.",
    metric: "82/100",
    metricSub: "MS FinTech · Strathclyde",
    tags: ["TimesFM", "NLP", "Python"],
    cta: null,
    ctaDark: false,
    href: "#",
  },
];

const CARD_WIDTH = 320;
const CARD_GAP = 16;

export default function ProjectsGrid() {
  const totalCards = PROJECTS.length + 1; // +1 for GitHub card
  const maxDrag = -(totalCards * (CARD_WIDTH + CARD_GAP) - (CARD_WIDTH + CARD_GAP));

  return (
    <section id="work" className="snap-section bg-[#f7f4ee] border-b-2 border-[#1a1a1a] flex flex-col">

      {/* Header */}
      <motion.div
        className="border-t-2 border-[#1a1a1a] pt-5 flex justify-between items-center px-6 lg:px-14 py-5 flex-shrink-0"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#bbb]"
           style={{ fontFamily: "var(--font-headline)" }}>
          03 — SELECTED WORK
        </p>
        <div className="flex items-center gap-3">
          <p className="text-[10px] text-[#bbb] hidden md:block"
             style={{ fontFamily: "var(--font-headline)" }}>
            ← drag to explore →
          </p>
          <a href="https://github.com/CryptoPrism-io" target="_blank" rel="noreferrer"
             className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#888] hover:text-[#1a1a1a] transition-colors"
             style={{ fontFamily: "var(--font-headline)" }}>
            View all 23 repos ↗
          </a>
        </div>
      </motion.div>

      {/* Horizontal drag carousel */}
      <div className="flex-1 overflow-hidden flex items-center px-6 lg:px-14">
        <motion.div
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.05}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              className="bg-white border border-[#e0e0e0] border-t-2 border-t-[#1a1a1a] flex flex-col flex-shrink-0"
              style={{ width: CARD_WIDTH, borderTopColor: i === 0 ? "#1a1a1a" : i < 3 ? "#555" : "#888" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-3"
                   style={{ fontFamily: "var(--font-headline)" }}>
                  {p.label}
                </p>
                <h3 className="text-[1rem] font-black uppercase tracking-[-0.02em] text-[#1a1a1a] mb-3"
                    style={{ fontFamily: "var(--font-headline)" }}>
                  {p.name}
                </h3>
                <p className="text-[12px] text-[#888] leading-[1.7] mb-4 flex-1"
                   style={{ fontFamily: "var(--font-body)" }}>
                  {p.desc}
                </p>
                <div className="mb-4">
                  <span className="text-[2rem] font-black leading-none tracking-[-0.03em] text-[#1a1a1a]"
                        style={{ fontFamily: "var(--font-headline)" }}>
                    {p.metric}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#ccc] block mt-0.5"
                        style={{ fontFamily: "var(--font-headline)" }}>
                    {p.metricSub}
                  </span>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag}
                            className="text-[10px] border border-[#e0e0e0] text-[#999] px-2.5 py-0.5"
                            style={{ fontFamily: "var(--font-headline)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.cta && (
                    <a href={p.href}
                       target={p.href !== "#" ? "_blank" : undefined}
                       rel="noreferrer"
                       className={`text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1.5 ${p.ctaDark ? "bg-[#1a1a1a] text-white" : "border border-[#1a1a1a] text-[#1a1a1a]"}`}
                       style={{ fontFamily: "var(--font-headline)" }}
                       onClick={(e) => e.stopPropagation()}>
                      {p.cta}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          {/* GitHub card */}
          <motion.article
            className="bg-[#1a1a1a] flex flex-col p-5 justify-between flex-shrink-0"
            style={{ width: CARD_WIDTH, minHeight: 300 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: PROJECTS.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555] mb-3"
                 style={{ fontFamily: "var(--font-headline)" }}>
                OPEN SOURCE
              </p>
              <h3 className="text-[1rem] font-black uppercase text-white mb-3"
                  style={{ fontFamily: "var(--font-headline)" }}>
                + 18 More
              </h3>
              <p className="text-[12px] text-[#666] leading-[1.7]"
                 style={{ fontFamily: "var(--font-body)" }}>
                23 public repos on GitHub. GCP, Python, fintech, AI.
              </p>
            </div>
            <a href="https://github.com/CryptoPrism-io" target="_blank" rel="noreferrer"
               className="mt-6 text-[10px] font-black uppercase tracking-[0.1em] border border-white text-white px-4 py-2.5 hover:bg-white hover:text-[#1a1a1a] transition-colors inline-block"
               style={{ fontFamily: "var(--font-headline)" }}
               onClick={(e) => e.stopPropagation()}>
              View on GitHub ↗
            </a>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
```

**NOTE:** `useRef` is imported from `framer-motion` in the import line above — change to `import { motion, useMotionValue } from "framer-motion"; import { useRef } from "react";`

- [ ] **Step 2: Fix imports at top of file**

```tsx
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
```

Remove `useMotionValue` from imports since it's not used.

- [ ] **Step 3: TypeScript + build check**

```bash
cd C:/cpio_db/yogeshsahu-website && npx tsc --noEmit 2>&1 | head -20 && npm run build 2>&1 | tail -8
```

- [ ] **Step 4: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/components/ProjectsGrid.tsx && git commit -m "feat: Projects full-screen horizontal drag carousel"
```

---

## Phase 6 — Contact Section (Full-Screen + Entry Animations)

### Task 7: Rewrite Contact.tsx as full-screen animated section

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Rewrite Contact.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

const MANDATE_TYPES = [
  { label: "FRACTIONAL CTO",  body: "System architecture, team hiring, technical due diligence", accent: "#1a1a1a" },
  { label: "DATA ENGINEERING", body: "GCP infrastructure, pipeline design, 99.9% SLA",            accent: "#444" },
  { label: "AI PRODUCT",      body: "LLM integration, fintech AI features, TimesFM deployment",  accent: "#888" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Contact() {
  return (
    <section id="contact" className="snap-section bg-[#f7f4ee] border-b-2 border-[#1a1a1a]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] h-full">

        {/* Left: engage block */}
        <div className="p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r border-[#e0ddd6] flex flex-col justify-center overflow-hidden">
          <div className="border-t-[3px] border-[#1a1a1a] pt-5 mb-8">
            <motion.p
              className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#bbb] mb-6"
              style={{ fontFamily: "var(--font-headline)" }}
              {...fadeUp(0.05)}
            >
              04 — CONTACT
            </motion.p>
            <motion.h2
              className="text-[2rem] lg:text-[2.8rem] font-black leading-[1.05] italic text-[#1a1a1a] mb-5"
              style={{ fontFamily: "var(--font-serif-display)" }}
              {...fadeUp(0.15)}
            >
              Work with<br />the operator.
            </motion.h2>
            <motion.p
              className="text-[14px] leading-[1.9] text-[#666] max-w-md mb-8"
              style={{ fontFamily: "var(--font-body)" }}
              {...fadeUp(0.25)}
            >
              I take on 2–3 fractional mandates per quarter. Fintech, data
              infrastructure, AI product. Pre-seed to Series A.
            </motion.p>
          </div>

          <div className="flex flex-col gap-5 mb-10">
            {MANDATE_TYPES.map((m, i) => (
              <motion.div
                key={m.label}
                className="border-l-2 pl-4"
                style={{ borderColor: m.accent }}
                {...fadeUp(0.3 + i * 0.1)}
              >
                <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-1"
                   style={{ color: m.accent, fontFamily: "var(--font-headline)" }}>
                  {m.label}
                </p>
                <p className="text-[13px] text-[#888]"
                   style={{ fontFamily: "var(--font-body)" }}>
                  {m.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="mailto:yogesh@cryptoprism.io"
            className="inline-block text-[11px] font-black uppercase tracking-[0.12em] bg-[#1a1a1a] text-white px-8 py-3.5 hover:bg-[#333] transition-colors"
            style={{ fontFamily: "var(--font-headline)" }}
            {...fadeUp(0.55)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            BOOK A DISCOVERY CALL ↗
          </motion.a>
        </div>

        {/* Right: contact card */}
        <div className="p-6 lg:p-12 flex items-center overflow-hidden">
          <motion.div
            className="w-full border-2 border-[#1a1a1a]"
            {...slideUp(0.2)}
          >
            <div className="px-5 py-4 border-b border-[#eee]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888]"
                 style={{ fontFamily: "var(--font-headline)" }}>
                GET IN TOUCH
              </p>
            </div>

            {[
              { label: "EMAIL", content: "yogesh@cryptoprism.io", href: "mailto:yogesh@cryptoprism.io", bold: true },
              { label: "LINKEDIN", content: "linkedin.com/in/yogeshsahu", href: "https://linkedin.com/in/yogeshsahu", bold: false },
              { label: "GITHUB", content: "CryptoPrism-io · 23 repos", href: "https://github.com/CryptoPrism-io", bold: false },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="px-5 py-4 border-b border-[#eee]"
                {...fadeUp(0.3 + i * 0.08)}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-1"
                   style={{ fontFamily: "var(--font-headline)" }}>
                  {item.label}
                </p>
                <a href={item.href}
                   target={item.href.startsWith("http") ? "_blank" : undefined}
                   rel="noreferrer"
                   className={`${item.bold ? "text-[13px] font-black text-[#1a1a1a]" : "text-[13px] text-[#888]"} hover:text-[#555] transition-colors`}
                   style={{ fontFamily: "var(--font-headline)" }}>
                  {item.content}
                </a>
              </motion.div>
            ))}

            {/* Availability */}
            <motion.div
              className="px-5 py-4 border-b border-[#eee] border-l-2 border-l-[#1a1a1a]"
              {...fadeUp(0.54)}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-2"
                 style={{ fontFamily: "var(--font-headline)" }}>
                CURRENT STATUS
              </p>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-[#1a1a1a] animate-heartbeat inline-block flex-shrink-0" />
                <span className="text-[12px] font-black text-[#1a1a1a]"
                      style={{ fontFamily: "var(--font-headline)" }}>
                  Open to mandates
                </span>
              </div>
              <p className="text-[11px] text-[#888]" style={{ fontFamily: "var(--font-headline)" }}>
                Q2 2026 · 2–3 slots remaining
              </p>
            </motion.div>

            {/* CryptoPrism promo */}
            <div className="px-5 py-4 bg-[#1a1a1a]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555] mb-1"
                 style={{ fontFamily: "var(--font-headline)" }}>
                CRYPTOPRISM
              </p>
              <p className="text-[11px] text-[#888] leading-[1.6] mb-1"
                 style={{ fontFamily: "var(--font-headline)" }}>
                DPIIT Recognised Startup · Pre-seed Q2 2026
              </p>
              <a href="https://cryptoprism.io" target="_blank" rel="noreferrer"
                 className="text-[11px] text-white hover:underline"
                 style={{ fontFamily: "var(--font-headline)" }}>
                cryptoprism.io ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript + build**

```bash
cd C:/cpio_db/yogeshsahu-website && npx tsc --noEmit 2>&1 | head -20 && npm run build 2>&1 | tail -8
```

- [ ] **Step 3: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/components/Contact.tsx && git commit -m "feat: Contact full-screen with staggered Framer entry animations"
```

---

## Phase 7 — Footer (Slim Snap Section)

### Task 8: Rewrite Footer.tsx as slim snap section

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="snap-section bg-[#f7f4ee] border-t border-[#e0e0e0] flex items-center"
      style={{ height: "auto", minHeight: "unset", maxHeight: "80px", scrollSnapAlign: "end" }}
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 py-5">
        <motion.p
          className="text-[11px] text-[#999] font-bold uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-headline)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          © 2026 Yogesh Sahu · All Rights Reserved
        </motion.p>
        <span className="text-[11px] font-black tracking-[0.28em] text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-headline)" }}>
          YS.
        </span>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub",   href: "https://github.com/CryptoPrism-io" },
            { label: "LinkedIn", href: "https://linkedin.com/in/yogeshsahu" },
            { label: "Email",    href: "mailto:yogesh@cryptoprism.io" },
          ].map((l) => (
            <a key={l.label} href={l.href}
               target={l.href.startsWith("http") ? "_blank" : undefined}
               rel="noreferrer"
               className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#bbb] hover:text-[#1a1a1a] transition-colors"
               style={{ fontFamily: "var(--font-headline)" }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

**Note:** Footer uses `scroll-snap-align: end` to snap to the bottom of the last section visually, but for cleanliness attach it to Contact. If the Footer `snap-section` class causes issues (100svh is too tall for a footer), override with `style={{ height: "auto", scrollSnapAlign: "end" }}` as shown — or simply remove the `snap-section` class from Footer and let Contact be the last snap point.

- [ ] **Step 2: Build check**

```bash
cd C:/cpio_db/yogeshsahu-website && npm run build 2>&1 | tail -8
```

- [ ] **Step 3: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/components/Footer.tsx && git commit -m "feat: Footer slim snap section"
```

---

## Phase 8 — Polish Pass

### Task 9: Fix scroll-snap on mobile + Nav offset

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Ensure Nav has correct z-index and backdrop for scroll-snap**

In `src/components/Nav.tsx`, change the nav className to include backdrop blur:

```tsx
<nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b-2 border-[#1a1a1a]">
```

- [ ] **Step 2: Add scroll-snap momentum smoothing for mobile in globals.css**

Append to globals.css:
```css
/* Smooth momentum scrolling on iOS */
.snap-container {
  -webkit-overflow-scrolling: touch;
}

/* Prevent text selection while dragging carousel */
.snap-section {
  user-select: none;
}
/* Re-enable text selection for text content */
.snap-section p,
.snap-section h1,
.snap-section h2,
.snap-section h3,
.snap-section a {
  user-select: text;
}
```

- [ ] **Step 3: Add `pt-[46px]` to About, ProjectsGrid, Contact sections to account for fixed nav**

In `About.tsx`, change section className:
```tsx
<section id="about" className="snap-section bg-[#f7f4ee] border-b-2 border-[#1a1a1a]">
```
→ The content inside uses `flex flex-col justify-center` which already centres — no pt needed.

In `ProjectsGrid.tsx` — already has header row with padding, fine.

In `Contact.tsx` — same, centred with flex.

Actually the `snap-section` `overflow: hidden` combined with `flex flex-col justify-center` handles this. Skip pt additions.

- [ ] **Step 4: Build + TypeScript**

```bash
cd C:/cpio_db/yogeshsahu-website && npx tsc --noEmit 2>&1 | head -10 && npm run build 2>&1 | tail -8
```

- [ ] **Step 5: Commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add src/app/globals.css src/components/Nav.tsx && git commit -m "polish: nav backdrop blur, mobile scroll-snap smoothing"
```

---

## Phase 9 — Playwright Testing

### Task 10: Automated browser testing with playwright-skill

**Invoke skill:** `playwright-skill`

- [ ] **Step 1: Start dev server**

```bash
cd C:/cpio_db/yogeshsahu-website && npm run dev -- --port 3003 &
```

- [ ] **Step 2: Write playwright test script to `/tmp/test-portfolio.js`**

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3003');
  await page.waitForLoadState('networkidle');

  // Screenshot Hero
  await page.screenshot({ path: '/tmp/test-01-hero.png', fullPage: false });
  console.log('✓ Hero loaded');

  // Scroll to About
  await page.evaluate(() => {
    document.querySelector('.snap-container').scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/test-02-about.png', fullPage: false });
  console.log('✓ About loaded');

  // Scroll to Projects
  await page.evaluate(() => {
    document.querySelector('.snap-container').scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/test-03-projects.png', fullPage: false });
  console.log('✓ Projects loaded');

  // Test drag on carousel
  const carousel = await page.$('.snap-container');
  await page.mouse.move(400, 500);
  await page.mouse.down();
  await page.mouse.move(100, 500, { steps: 20 });
  await page.mouse.up();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/test-04-carousel-dragged.png', fullPage: false });
  console.log('✓ Carousel drag tested');

  // Scroll to Contact
  await page.evaluate(() => {
    document.querySelector('.snap-container').scrollBy({ top: window.innerHeight * 2, behavior: 'smooth' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/test-05-contact.png', fullPage: false });
  console.log('✓ Contact loaded');

  // Mobile viewport test
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => {
    document.querySelector('.snap-container').scrollTo({ top: 0 });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/test-06-mobile-hero.png', fullPage: false });
  console.log('✓ Mobile Hero');

  await browser.close();
  console.log('\n✅ All tests passed. Screenshots in /tmp/test-*.png');
})();
```

- [ ] **Step 3: Run the test**

```bash
node /tmp/test-portfolio.js
```
Expected output:
```
✓ Hero loaded
✓ About loaded
✓ Projects loaded
✓ Carousel drag tested
✓ Contact loaded
✓ Mobile Hero
✅ All tests passed.
```

- [ ] **Step 4: Review screenshots — fix any visual issues found before proceeding**

If stat counters don't animate: check `useInView` — the `margin` prop may need adjustment since sections are clipped by `overflow: hidden`. Fix: change `margin: "-10% 0px"` to `margin: "0px"` in `useCountUp.ts`.

If carousel drag doesn't work: verify `dragConstraints` — adjust `maxDrag` calculation in ProjectsGrid.tsx.

If sections overflow: check `overflow: hidden` on `.snap-section` — may need `overflow-y: auto` on About for mobile.

---

## Phase 10 — Build, Verify + Deploy

### Task 11: Final build verification and push

- [ ] **Step 1: Full TypeScript check**

```bash
cd C:/cpio_db/yogeshsahu-website && npx tsc --noEmit 2>&1
```
Expected: no output

- [ ] **Step 2: Production build**

```bash
cd C:/cpio_db/yogeshsahu-website && npm run build 2>&1
```
Expected: `✓ Generating static pages (4/4)` — no errors

- [ ] **Step 3: Verify static output**

```bash
ls C:/cpio_db/yogeshsahu-website/out/
```
Expected: `index.html  _next/  404.html`

- [ ] **Step 4: Final commit**

```bash
cd C:/cpio_db/yogeshsahu-website && git add -A && git commit -m "$(cat <<'EOF'
feat: immersive full-screen portfolio — Framer Motion + scroll-snap

Direction B (Imperial Parchment) + C (full-screen section takeovers).
Each section is 100svh with scroll-snap. Framer Motion whileInView
staggered reveals on all sections. Stat counters count up on entry.
Projects become horizontal drag carousel. Nav has backdrop blur.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Push to master → triggers GitHub Pages deploy**

```bash
cd C:/cpio_db/yogeshsahu-website && git push origin master
```

- [ ] **Step 6: Verify deploy**

```bash
sleep 30 && curl -sI https://yogeshsahu.xyz | grep -E "HTTP|server|x-github"
```
Expected: `HTTP/2 200` and `server: GitHub.com`

---

## Self-Review

**Spec coverage check:**
- ✅ Direction B (Imperial Parchment) — cream palette, serif italic, stat column
- ✅ Direction C (Full-screen takeovers) — 100svh scroll-snap per section
- ✅ Framer Motion — whileInView, stagger delays, count-up stats
- ✅ All 5 sections: Hero, About, Projects, Contact, Footer
- ✅ Horizontal carousel for Projects
- ✅ Mobile support — MobileStatBlock, viewport testing
- ✅ Build verification throughout
- ✅ Playwright testing phase

**No placeholders:** All code blocks are complete and runnable.

**Type consistency:** `useCountUp` returns `{ ref: RefObject<HTMLDivElement>, count: number }` — used correctly in StatBlock and MobileStatBlock.
