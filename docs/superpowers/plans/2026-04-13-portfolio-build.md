# yogeshsahu.xyz Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build yogeshsahu.xyz as a premium Next.js 15 portfolio — Fractional CTO command centre + Founder brand hub — with scroll-driven Veo 3 hero, 12 sections, and Vercel deployment replacing the current static GitHub Pages site.

**Architecture:** Next.js 15 App Router. `app/page.tsx` is a Server Component that assembles all sections. Interactive sections (`Nav`, `HeroScroll`, `WorkGrid`, `AboutStats`) are `'use client'` Client Components. All content lives in TypeScript data files (`lib/projects.ts`, `lib/posts.ts`). Framer Motion handles scroll-reveal via `SectionWrapper`. The Canvas API drives the Veo 3 frame sequence via a `useScrollFrames` hook.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS v3 · Framer Motion · Canvas API · Cabinet Grotesk (Fontshare) + Inter + Playfair Display · Vercel

---

## File Map

**Create:**
```
src/
  app/
    layout.tsx                    — root layout, fonts, metadata
    page.tsx                      — home page, assembles all 12 sections
    projects/[slug]/page.tsx      — redirect to existing .html case studies
  components/
    Nav.tsx                       — sticky nav, transparent→solid, hamburger
    HeroScroll.tsx                — Veo 3 canvas scroll engine + hero layout
    Marquee.tsx                   — reusable ticker (gold + dark variants)
    SectionWrapper.tsx            — Framer Motion scroll-reveal HOC
    AboutStats.tsx                — manifesto + 4 animated counters
    ExpertisePillars.tsx          — 3-col light pillar section
    ProjectCard.tsx               — shared project card component
    ProjectsGrid.tsx              — light section, featured 6 cards
    WorkGrid.tsx                  — dark section, all 20 repos + filter tabs
    MentalOS.tsx                  — Marquee2 + 6 mental model cards
    ModelCard.tsx                 — individual mental model card
    Credentials.tsx               — 8 certification cards (light section)
    CredentialCard.tsx            — individual credential card
    Milestones.tsx                — 5 milestone cards (dark section)
    BlogPreview.tsx               — 3 post previews (light section)
    Contact.tsx                   — link cards, availability badge
    Footer.tsx                    — near-black footer
  lib/
    useScrollFrames.ts            — canvas frame loader + scroll driver hook
    projects.ts                   — typed data for all 20 GitHub repos
    posts.ts                      — typed blog post metadata
  styles/
    globals.css                   — CSS custom properties, Tailwind directives

__tests__/
  useScrollFrames.test.ts         — unit tests for getFrameIndex pure function

tailwind.config.ts
next.config.ts
jest.config.ts
jest.setup.ts
```

**Modify:** `.github/workflows/deploy.yml` — switch GitHub Pages → Vercel

**Rename:** `public/index.html` → `public/old-index.html` (prevents conflict with Next.js routing)

**Delete after Task 22:** `firebase.json`

**Keep as-is:** `public/projects/*.html` · `public/favicon.svg` · `public/CNAME`

---

## Task 1: Scaffold Next.js 15 + install dependencies

**Files:**
- Modify: `package.json` (updated by scaffold)
- Create: `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`

- [ ] **Step 1: Rename old index.html to avoid routing conflict**

```bash
mv public/index.html public/old-index.html
```

- [ ] **Step 2: Scaffold Next.js into the existing directory**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

When prompted:
- "A package.json already exists" → **Yes, overwrite**
- "Would you like to use Turbopack?" → **No**
- Accept all other defaults

- [ ] **Step 3: Install additional dependencies**

```bash
npm install framer-motion
npm install -D jest jest-environment-jsdom @types/jest ts-jest @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:3000`, default Next.js page visible.

- [ ] **Step 5: Replace next.config.ts**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project — replaces static HTML site"
```

---

## Task 2: Tailwind CSS configuration + global CSS custom properties

**Files:**
- Modify: `tailwind.config.ts`
- Create: `src/styles/globals.css`
- Modify: `src/app/globals.css` → delete it (we use `src/styles/globals.css`)

- [ ] **Step 1: Replace tailwind.config.ts**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--obsidian)',
        'obsidian-soft': 'var(--obsidian-soft)',
        gold: 'var(--gold)',
        'gold-dim': 'var(--gold-dim)',
        'gold-faint': 'var(--gold-faint)',
        light: 'var(--light)',
        'light-surface': 'var(--light-surface)',
        'light-border': 'var(--light-border)',
      },
      fontFamily: {
        cabinet: ['var(--font-cabinet)'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-hint': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(74,222,128,0.4)' },
          '50%': { boxShadow: '0 0 0 6px rgba(74,222,128,0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 35s linear infinite',
        'pulse-hint': 'pulse-hint 2s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Create src/styles/globals.css**

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700,800,900&display=swap');

:root {
  --obsidian: #080808;
  --obsidian-soft: #0d0d0d;
  --gold: #fbbf24;
  --gold-dim: #d97706;
  --gold-faint: rgba(251, 191, 36, 0.08);
  --gold-glow: rgba(251, 191, 36, 0.35);
  --light: #fafafa;
  --light-surface: #ffffff;
  --light-border: #e5e7eb;
  --text-primary: #ffffff;
  --text-body: #d1d5db;
  --text-muted: #6b7280;
  --text-dark: #111111;
  --text-dark-body: #374151;
  --font-cabinet: 'Cabinet Grotesk', 'Arial Black', sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--obsidian);
  color: var(--text-primary);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee,
  .animate-marquee-slow {
    animation-play-state: paused;
  }
}
```

- [ ] **Step 3: Delete src/app/globals.css**

```bash
rm src/app/globals.css
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css tailwind.config.ts
git commit -m "feat: configure Tailwind + CSS design tokens (obsidian/gold palette)"
```

---

## Task 3: Root layout + fonts

**Files:**
- Create/replace: `src/app/layout.tsx`

- [ ] **Step 1: Write layout.tsx**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yogesh Sahu — Fractional CTO · Founder, CryptoPrism',
  description:
    'Fractional CTO for fintech, data infrastructure, and AI/ML. Founder of CryptoPrism — AI-powered crypto intelligence, 1B+ data points daily. DPIIT recognised, raising pre-seed Q2 2026.',
  metadataBase: new URL('https://yogeshsahu.xyz'),
  openGraph: {
    title: 'Yogesh Sahu — Fractional CTO · Founder, CryptoPrism',
    description:
      'Fractional CTO for fintech, data infrastructure, and AI/ML. 1B+ data points daily. DPIIT recognised.',
    url: 'https://yogeshsahu.xyz',
    siteName: 'yogeshsahu.xyz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yogesh Sahu — Fractional CTO · Founder, CryptoPrism',
    description: 'Fractional CTO for fintech, data infrastructure, and AI/ML.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with Inter/Playfair fonts and OG metadata"
```

---

## Task 4: Jest setup + useScrollFrames hook (TDD)

**Files:**
- Create: `jest.config.ts`, `jest.setup.ts`
- Create: `__tests__/useScrollFrames.test.ts`
- Create: `src/lib/useScrollFrames.ts`

- [ ] **Step 1: Create jest.config.ts**

```typescript
// jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
}

export default config
```

- [ ] **Step 2: Create jest.setup.ts**

```typescript
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Write failing unit tests**

```typescript
// __tests__/useScrollFrames.test.ts
import { getFrameIndex } from '../src/lib/useScrollFrames'

describe('getFrameIndex', () => {
  it('returns 0 at scrollProgress 0', () => {
    expect(getFrameIndex(0, 180)).toBe(0)
  })

  it('returns last frame index at scrollProgress 1', () => {
    expect(getFrameIndex(1, 180)).toBe(179)
  })

  it('returns middle frame at scrollProgress 0.5', () => {
    expect(getFrameIndex(0.5, 180)).toBe(89)
  })

  it('clamps below 0 to frame 0', () => {
    expect(getFrameIndex(-0.5, 180)).toBe(0)
  })

  it('clamps above 1 to last frame', () => {
    expect(getFrameIndex(1.5, 180)).toBe(179)
  })

  it('works with different frame counts', () => {
    expect(getFrameIndex(0.5, 100)).toBe(49)
    expect(getFrameIndex(1, 60)).toBe(59)
  })
})
```

- [ ] **Step 4: Run tests — verify they FAIL**

```bash
npx jest __tests__/useScrollFrames.test.ts
```

Expected: `Cannot find module '../src/lib/useScrollFrames'`

- [ ] **Step 5: Implement useScrollFrames.ts**

```typescript
// src/lib/useScrollFrames.ts
'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

/** Pure function — exported for unit testing */
export function getFrameIndex(scrollProgress: number, totalFrames: number): number {
  const clamped = Math.max(0, Math.min(1, scrollProgress))
  return Math.floor(clamped * (totalFrames - 1))
}

interface UseScrollFramesOptions {
  frameCount: number
  frameDir: string
  scrollSectionRef: RefObject<HTMLElement | null>
}

interface UseScrollFramesResult {
  canvasRef: RefObject<HTMLCanvasElement | null>
  isLoading: boolean
}

export function useScrollFrames({
  frameCount,
  frameDir,
  scrollSectionRef,
}: UseScrollFramesOptions): UseScrollFramesResult {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const currentFrameRef = useRef(0)

  // Preload frames in batches using requestIdleCallback
  useEffect(() => {
    const frames: HTMLImageElement[] = new Array(frameCount)
    let loadedCount = 0
    const BATCH_SIZE = 20

    function loadBatch(startIndex: number) {
      const end = Math.min(startIndex + BATCH_SIZE, frameCount)
      for (let i = startIndex; i < end; i++) {
        const img = new Image()
        const padded = String(i + 1).padStart(4, '0')
        img.src = `${frameDir}/frame_${padded}.webp`
        img.onload = () => {
          loadedCount++
          if (loadedCount === frameCount) {
            framesRef.current = frames
            setIsLoading(false)
          }
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount === frameCount) {
            framesRef.current = frames
            setIsLoading(false)
          }
        }
        frames[i] = img
      }
      if (end < frameCount) {
        if (typeof requestIdleCallback !== 'undefined') {
          requestIdleCallback(() => loadBatch(end))
        } else {
          setTimeout(() => loadBatch(end), 0)
        }
      }
    }

    loadBatch(0)
  }, [frameCount, frameDir])

  // Draw frame on canvas
  function drawFrame(index: number) {
    const canvas = canvasRef.current
    const frame = framesRef.current[index]
    if (!canvas || !frame?.complete) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
  }

  // Scroll-driven frame playback
  useEffect(() => {
    if (isLoading) return

    function onScroll() {
      const section = scrollSectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const scrollableHeight = section.offsetHeight - window.innerHeight
      const scrolled = window.scrollY - sectionTop
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight))
      const frameIndex = getFrameIndex(progress, frameCount)
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex
        drawFrame(frameIndex)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // draw initial frame
    return () => window.removeEventListener('scroll', onScroll)
  }, [isLoading, frameCount, scrollSectionRef])

  return { canvasRef, isLoading }
}
```

- [ ] **Step 6: Run tests — verify they PASS**

```bash
npx jest __tests__/useScrollFrames.test.ts
```

Expected: 6 tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/lib/useScrollFrames.ts __tests__/useScrollFrames.test.ts jest.config.ts jest.setup.ts
git commit -m "feat: useScrollFrames hook with Canvas API scroll-driven frame playback (TDD)"
```

---

## Task 5: Nav component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Write Nav.tsx**

```typescript
// src/components/Nav.tsx
'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 transition-all duration-300"
      style={
        scrolled
          ? {
              background: 'rgba(8,8,8,0.92)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(251,191,36,0.1)',
            }
          : {}
      }
    >
      <a
        href="#"
        className="font-cabinet text-base font-black tracking-wide"
        style={{ color: 'var(--gold)' }}
      >
        YS //
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex gap-1">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-xs px-4 py-2 rounded transition-colors duration-200"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.02em' }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLAnchorElement).style.color = 'var(--text-primary)'
              ;(e.target as HTMLAnchorElement).style.background = 'var(--gold-faint)'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLAnchorElement).style.color = 'var(--text-muted)'
              ;(e.target as HTMLAnchorElement).style.background = 'transparent'
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-5 h-px transition-all duration-300"
          style={{
            background: 'var(--gold)',
            transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : '',
          }}
        />
        <span
          className="block w-5 h-px transition-all duration-300"
          style={{
            background: 'var(--gold)',
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-5 h-px transition-all duration-300"
          style={{
            background: 'var(--gold)',
            transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : '',
          }}
        />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="absolute top-16 left-0 right-0 py-6 flex flex-col items-center gap-2"
          style={{ background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)' }}
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm py-3 px-6 w-full text-center font-medium"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: Nav component — transparent/solid scroll transition, mobile hamburger"
```

---

## Task 6: SectionWrapper component

**Files:**
- Create: `src/components/SectionWrapper.tsx`

- [ ] **Step 1: Write SectionWrapper.tsx**

```typescript
// src/components/SectionWrapper.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function SectionWrapper({
  children,
  className = '',
  delay = 0,
}: SectionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SectionWrapper.tsx
git commit -m "feat: SectionWrapper — Framer Motion scroll-reveal HOC"
```

---

## Task 7: HeroScroll component

**Files:**
- Create: `src/components/HeroScroll.tsx`

- [ ] **Step 1: Write HeroScroll.tsx**

```typescript
// src/components/HeroScroll.tsx
'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollFrames } from '@/lib/useScrollFrames'

export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const { canvasRef, isLoading } = useScrollFrames({
    frameCount: 180,
    frameDir: '/frames',
    scrollSectionRef: sectionRef,
  })

  return (
    // Outer section: 600vh total — hero is sticky for 500vh of scroll
    <section
      ref={sectionRef}
      id="hero"
      style={{ position: 'relative', height: '600vh', background: 'var(--obsidian)' }}
    >
      {/* Sticky hero panel */}
      <div
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
        className="flex flex-col items-center justify-center px-6 lg:px-16"
      >
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(251,191,36,0.18) 0%, transparent 65%)',
          }}
        />

        {/* Canvas / avatar area */}
        <div className="relative z-10 mb-10" style={{ width: 340, height: 340 }}>
          {/* Placeholder shown while frames load */}
          {isLoading && (
            <div
              className="w-full h-full rounded-xl flex items-center justify-center"
              style={{
                border: '1.5px solid rgba(251,191,36,0.3)',
                background:
                  'linear-gradient(135deg, rgba(251,191,36,0.04) 0%, rgba(251,191,36,0.12) 50%, rgba(251,191,36,0.04) 100%)',
                boxShadow: '0 0 60px rgba(251,191,36,0.25), 0 0 120px rgba(251,191,36,0.08)',
              }}
            >
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  border: '2px solid var(--gold)',
                  background: 'rgba(251,191,36,0.08)',
                  boxShadow: '0 0 40px rgba(251,191,36,0.4)',
                }}
              >
                <span
                  className="font-cabinet font-black"
                  style={{ fontSize: '2.5rem', color: 'var(--gold)' }}
                >
                  Y
                </span>
              </div>
            </div>
          )}

          {/* Canvas — shown once frames are ready */}
          <canvas
            ref={canvasRef}
            width={680}
            height={680}
            className="w-full h-full rounded-xl transition-opacity duration-500"
            style={{
              opacity: isLoading ? 0 : 1,
              boxShadow: '0 0 60px rgba(251,191,36,0.2)',
              position: isLoading ? 'absolute' : 'relative',
              top: 0,
              left: 0,
            }}
          />
        </div>

        {/* Text content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--gold)', letterSpacing: '0.22em' }}
          >
            Fractional CTO &nbsp;·&nbsp; Founder, CryptoPrism &nbsp;·&nbsp; Pre-Seed Q2 2026
          </div>

          <h1
            className="font-cabinet font-black leading-none mb-2"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            YOGESH
            <br />
            <span className="font-playfair font-bold italic" style={{ color: 'var(--gold)' }}>
              Sahu
            </span>
          </h1>

          <div
            className="text-xs uppercase tracking-widest mb-10"
            style={{ color: 'var(--gold)', letterSpacing: '0.22em' }}
          >
            Fintech Infrastructure · AI · Data Engineering
          </div>

          <a
            href="#work"
            className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'var(--gold)',
              color: '#000',
              letterSpacing: '0.05em',
            }}
          >
            THE WORK →
          </a>

          <div
            className="mt-8 text-xs tracking-widest animate-pulse-hint"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
          >
            ↓ scroll
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroScroll.tsx
git commit -m "feat: HeroScroll — sticky 600vh section, Canvas API Veo3 frame playback, gold avatar placeholder"
```

---

## Task 8: Marquee component

**Files:**
- Create: `src/components/Marquee.tsx`

- [ ] **Step 1: Write Marquee.tsx**

```typescript
// src/components/Marquee.tsx

interface MarqueeProps {
  variant: 'gold' | 'dark'
}

const GOLD_CONTENT =
  'CRYPTOPRISM · DPIIT FOUNDER · STRATHCLYDE MS FINTECH · 23 GITHUB REPOS · 1B+ DATA POINTS DAILY · 50K GAME DOWNLOADS · 110 COUNTRIES · 21 STATES RIDDEN · BANSURI PLAYER · ISHA SADHANA · '

const DARK_CONTENT =
  'FIRST PRINCIPLES · INVERSION · OODA LOOP · ANTIFRAGILITY · BARBELL STRATEGY · CIRCLE OF COMPETENCE · SECOND-ORDER THINKING · MARGIN OF SAFETY · PARETO PRINCIPLE · REGRET MINIMIZATION · '

export default function Marquee({ variant }: MarqueeProps) {
  const content = variant === 'gold' ? GOLD_CONTENT : DARK_CONTENT
  const double = content + content

  const isGold = variant === 'gold'

  return (
    <div
      className="overflow-hidden py-2.5"
      style={{
        background: isGold ? 'var(--gold)' : 'var(--obsidian)',
        borderTop: isGold ? 'none' : '1px solid rgba(255,255,255,0.04)',
        borderBottom: isGold ? 'none' : '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        className={`inline-block whitespace-nowrap ${
          isGold ? 'animate-marquee' : 'animate-marquee-slow'
        }`}
      >
        {double.split(' · ').map((item, i) => (
          <span
            key={i}
            className="inline-block px-6 font-cabinet font-extrabold uppercase"
            style={{
              fontSize: isGold ? '0.72rem' : '0.65rem',
              color: isGold ? '#000' : 'rgba(251,191,36,0.35)',
              letterSpacing: isGold ? '0.12em' : '0.15em',
            }}
          >
            {item}
            <span style={{ color: isGold ? 'rgba(0,0,0,0.35)' : 'rgba(251,191,36,0.2)' }}>
              {' '}
              ·{' '}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Marquee.tsx
git commit -m "feat: Marquee component — gold credentials ticker + dark mental models ticker"
```

---

## Task 9: AboutStats component

**Files:**
- Create: `src/components/AboutStats.tsx`

- [ ] **Step 1: Write AboutStats.tsx**

```typescript
// src/components/AboutStats.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '1B+', label: 'Data Points Daily' },
  { value: '23', label: 'GitHub Repos' },
  { value: '50K', label: 'Game Downloads' },
  { value: '21', label: 'States Ridden' },
]

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!inView) return
    const numericPart = parseInt(value.replace(/\D/g, ''), 10)
    const suffix = value.replace(/[0-9]/g, '')
    if (isNaN(numericPart)) {
      setDisplayed(value)
      return
    }
    const duration = 1500
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * numericPart)
      setDisplayed(current.toLocaleString() + suffix)
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center rounded-lg px-5 py-6"
      style={{
        background: 'var(--gold-faint)',
        border: '1px solid rgba(251,191,36,0.15)',
      }}
    >
      <div
        className="font-cabinet font-black leading-none mb-2"
        style={{ fontSize: '2.2rem', color: 'var(--gold)' }}
      >
        {displayed}
      </div>
      <div
        className="text-xs uppercase tracking-widest"
        style={{ color: 'var(--text-muted)', letterSpacing: '0.15em' }}
      >
        {label}
      </div>
    </motion.div>
  )
}

export default function AboutStats() {
  return (
    <section
      id="about"
      className="py-24 px-6 lg:px-10"
      style={{
        background: 'var(--obsidian-soft)',
        borderTop: '1px solid rgba(251,191,36,0.08)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
          About
        </div>

        <div
          className="font-cabinet font-black mb-4 leading-tight"
          style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
            color: '#fff',
          }}
        >
          1B+ data points.
          <br />
          Processed daily.
          <br />
          <em className="font-playfair font-bold" style={{ color: 'var(--gold)' }}>
            One engineer.
          </em>
        </div>

        <p
          className="text-sm leading-relaxed mb-12 max-w-2xl"
          style={{ color: 'var(--text-body)', lineHeight: '1.8' }}
        >
          CryptoPrism is AI-powered crypto intelligence for independent traders — not institutions.
          Three-database GCP architecture processing over 1 billion data points daily across 1,000+
          coins, 130+ indicators, 99.9% uptime. DPIIT-recognised, raising pre-seed Q2 2026.
          <br />
          <br />
          Before that: Ubisoft. A mobile game to 110 countries in 21 days. An e-sports franchise
          network. MS FinTech at Strathclyde — dissertation topper, applied TimesFM to live crypto
          markets.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AboutStats.tsx
git commit -m "feat: AboutStats — manifesto, bio, 4 animated stat counters"
```

---

## Task 10: ExpertisePillars component

**Files:**
- Create: `src/components/ExpertisePillars.tsx`

- [ ] **Step 1: Write ExpertisePillars.tsx**

```typescript
// src/components/ExpertisePillars.tsx

const pillars = [
  {
    icon: '⚙️',
    iconBg: '#fef3c7',
    title: 'Infrastructure & Data',
    desc: 'Production systems at scale. 1B+ data points daily. Three-database GCP architectures, real-time pipelines, PostgreSQL optimisation, 99.9% uptime SLAs.',
    tags: ['GCP', 'PostgreSQL', 'Python', 'ETL', 'vectorbt', 'FastAPI'],
  },
  {
    icon: '🧠',
    iconBg: '#dbeafe',
    title: 'Product & AI',
    desc: 'Full-cycle product delivery — from problem definition to live deployment. AI integration, cognitive apps, React frontends, Firebase backends, mobile games.',
    tags: ['React', 'TypeScript', 'Firebase', 'Gemini AI', 'Unity', 'Streamlit'],
  },
  {
    icon: '📊',
    iconBg: '#dcfce7',
    title: 'Business & Finance',
    desc: 'Bloomberg-certified. Investment banking trained. PMI & CSPO qualified. Translates technical decisions into business outcomes — not just code reviews.',
    tags: ['Bloomberg', 'PMI', 'CSPO', 'Power BI', 'FinTech', 'DPIIT'],
  },
]

export default function ExpertisePillars() {
  return (
    <section
      className="py-24 px-6 lg:px-10"
      style={{ background: 'var(--light)', borderTop: '1px solid var(--light-border)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: 'var(--gold-dim)', letterSpacing: '0.2em' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold-dim)' }} />
          What I Bring
        </div>

        <h2
          className="font-cabinet font-black leading-tight mb-3"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--text-dark)',
            letterSpacing: '-0.02em',
          }}
        >
          Three disciplines.
          <br />
          <em className="font-playfair font-bold italic" style={{ color: 'var(--gold-dim)' }}>
            One operator.
          </em>
        </h2>

        <p className="text-sm mb-10" style={{ color: '#6b7280', maxWidth: 480 }}>
          Most technical consultants own one of these. Fractional CTO mandates require all three.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-xl p-8 transition-all duration-200 hover:-translate-y-1"
              style={{
                background: 'var(--light-surface)',
                border: '1px solid var(--light-border)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gold)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 4px 24px rgba(251,191,36,0.08)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--light-border)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-5"
                style={{ background: p.iconBg }}
              >
                {p.icon}
              </div>
              <h3
                className="text-base font-black mb-2"
                style={{ color: 'var(--text-dark)', letterSpacing: '-0.01em' }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#6b7280' }}>
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ background: '#f3f4f6', color: '#374151' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ExpertisePillars.tsx
git commit -m "feat: ExpertisePillars — 3-col light section, Infrastructure/Product/Finance pillars"
```

---

## Task 11: lib/projects.ts — all 20 repos

**Files:**
- Create: `src/lib/projects.ts`

- [ ] **Step 1: Write projects.ts**

```typescript
// src/lib/projects.ts

export type ProjectCategory = 'fintech' | 'quant' | 'ai' | 'web' | 'tools'

export interface Project {
  id: string
  name: string
  description: string
  stat: string
  tags: string[]
  category: ProjectCategory
  language: string
  featured: boolean
  href: string
  githubHref: string
}

export const projects: Project[] = [
  // ── FINTECH / CRYPTO ──
  {
    id: 'cryptoprism-db',
    name: 'CryptoPrism DB',
    description:
      'The backbone. Three databases, one GCP project, 99.9% uptime. Every CryptoPrism product runs on this.',
    stat: '1B+ data points/day · 130+ indicators',
    tags: ['GCP', 'PostgreSQL', 'Fintech'],
    category: 'fintech',
    language: 'Python',
    featured: true,
    href: '/projects/cryptoprism-db.html',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-DB',
  },
  {
    id: 'cryptoprism-db-h',
    name: 'CryptoPrism DB-H',
    description:
      'Multi-year OHLCV warehouse, vectorbt-ready. The historical layer underpinning strategy validation at CryptoPrism.',
    stat: 'Multi-year depth · vectorbt',
    tags: ['Quant', 'OHLCV', 'Backtesting'],
    category: 'fintech',
    language: 'Python',
    featured: true,
    href: '/projects/cryptoprism-db-h.html',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-DB-H',
  },
  {
    id: 'cryptoprism-db-backtest',
    name: 'CryptoPrism DB-Backtest',
    description:
      'Strategy backtesting engine. vectorbt-powered, crypto market validated at scale.',
    stat: 'vectorbt · 1,000+ coins',
    tags: ['Quant', 'Backtesting', 'Python'],
    category: 'fintech',
    language: 'Python',
    featured: false,
    href: '/projects/backtest.html',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-DB-Backtest',
  },
  {
    id: 'cryptoprism-db-monitor',
    name: 'CryptoPrism DB-Monitor',
    description:
      'Real-time health monitoring for the CryptoPrism data stack. Alerts, dashboards, uptime tracking.',
    stat: '99.9% uptime SLA',
    tags: ['Monitoring', 'GCP', 'Python'],
    category: 'fintech',
    language: 'Python',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-DB-Monitor',
  },
  {
    id: 'cryptoprism-db-utils',
    name: 'CryptoPrism DB-Utils',
    description: 'Shared utilities, helpers, and common modules for the CryptoPrism DB ecosystem.',
    stat: 'Shared across 8 repos',
    tags: ['Python', 'Utilities'],
    category: 'fintech',
    language: 'Python',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-DB-Utils',
  },
  {
    id: 'cryptoprism-news-fetcher',
    name: 'News Intelligence',
    description:
      'Gemini-scored crypto news. Multi-source, sub-minute latency. Feeds sentiment context into the signal stack.',
    stat: 'Multi-source · Sub-minute',
    tags: ['NLP', 'Gemini AI', 'Python'],
    category: 'fintech',
    language: 'Python',
    featured: true,
    href: '/projects/news-fetcher.html',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-News-Fetcher',
  },
  {
    id: 'cryptoprism-qa-system',
    name: 'CryptoPrism QA System',
    description:
      'Quality assurance layer ensuring data pipeline integrity. Automated validation, anomaly detection.',
    stat: 'Pipeline validated · FastAPI',
    tags: ['FastAPI', 'QA', 'Python'],
    category: 'fintech',
    language: 'Python',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-QA-System',
  },
  {
    id: 'cryptoprism-socials',
    name: 'CryptoPrism Socials',
    description:
      'Social signal aggregation — Twitter/Reddit sentiment scoring feeding the CryptoPrism signal stack.',
    stat: 'Reddit · Twitter · Live',
    tags: ['NLP', 'Sentiment', 'Python'],
    category: 'fintech',
    language: 'Python',
    featured: false,
    href: '/projects/cryptoprism-socials.html',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-Socials',
  },
  // ── QUANT ──
  {
    id: 'forex-pipeline',
    name: 'Forex Pipeline',
    description:
      'Live forex ingestion, normalisation, and storage on GCP. Feeds the quant layer without manual intervention.',
    stat: 'Live · GCP · PostgreSQL',
    tags: ['Python', 'GCP', 'Live'],
    category: 'quant',
    language: 'Python',
    featured: true,
    href: '/projects/forex-pipeline.html',
    githubHref: 'https://github.com/CryptoPrism-io/DataPipeLine-FX-APP',
  },
  {
    id: 'forexfactory-scraper',
    name: 'ForexFactory Scraper',
    description:
      'Automated economic calendar data extraction from ForexFactory. Structured, timestamped, pipeline-ready.',
    stat: 'Automated · Structured data',
    tags: ['Python', 'Scraping', 'Quant'],
    category: 'quant',
    language: 'Python',
    featured: false,
    href: '/projects/forexfactory-scraper.html',
    githubHref: 'https://github.com/CryptoPrism-io/ForexFactory-Calendar-Scraper',
  },
  {
    id: 'forex-session-dashboard',
    name: 'Forex Session Dashboard',
    description: 'Visual session analysis dashboard. Session overlaps, volume profiles, live data.',
    stat: 'Streamlit · Live',
    tags: ['Streamlit', 'Python', 'Quant'],
    category: 'quant',
    language: 'Python',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/Forex-Session-Dashboard',
  },
  // ── AI PRODUCTS ──
  {
    id: 'pratyaksha',
    name: 'Pratyaksha',
    description:
      'AI-powered document analysis and knowledge extraction. Cognitive search for structured and unstructured documents.',
    stat: 'Gemini AI · FastAPI',
    tags: ['AI', 'NLP', 'FastAPI'],
    category: 'ai',
    language: 'Python',
    featured: false,
    href: '/projects/pratyaksha.html',
    githubHref: 'https://github.com/CryptoPrism-io/pratyaksha',
  },
  {
    id: 'pratyaksha-website',
    name: 'Pratyaksha Website',
    description: 'Marketing and product site for the Pratyaksha AI document intelligence product.',
    stat: 'React · Firebase',
    tags: ['React', 'TypeScript', 'Firebase'],
    category: 'ai',
    language: 'TypeScript',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/pratyaksha-website',
  },
  {
    id: 'habit-tracker-aistudio',
    name: 'Habit Tracker AI',
    description:
      'AI-assisted habit tracking built with Google AI Studio. Personalised nudges, streak analytics.',
    stat: 'Gemini AI · Consumer app',
    tags: ['AI', 'React', 'Google AI Studio'],
    category: 'ai',
    language: 'TypeScript',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/habit-tracker-aistudio',
  },
  // ── WEB ──
  {
    id: 'cpio-website',
    name: 'CryptoPrism Website',
    description: 'Main company site for CryptoPrism — product showcase, investor-facing.',
    stat: 'Next.js · Deployed',
    tags: ['Next.js', 'TypeScript'],
    category: 'web',
    language: 'TypeScript',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/cpio-website',
  },
  {
    id: 'cryptoprism-tech-website',
    name: 'CryptoPrism Tech Docs',
    description: 'Technical documentation and developer portal for the CryptoPrism ecosystem.',
    stat: 'Next.js · MDX',
    tags: ['Next.js', 'MDX', 'Docs'],
    category: 'web',
    language: 'TypeScript',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/cryptoprism-tech-website',
  },
  {
    id: 'puneglobalgroup-website',
    name: 'Pune Global Group',
    description: 'Client website for Pune Global Group. Custom design, CMS integration.',
    stat: 'Client · Delivered',
    tags: ['React', 'Client Work'],
    category: 'web',
    language: 'TypeScript',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/puneglobalgroup-website',
  },
  {
    id: 'trinetryinfotech-website',
    name: 'Trinetry Infotech',
    description: 'Client website for Trinetry Infotech. Responsive design, business showcase.',
    stat: 'Client · Delivered',
    tags: ['React', 'Client Work'],
    category: 'web',
    language: 'TypeScript',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/trinetryinfotech-website',
  },
  {
    id: 'yogeshsahu-website',
    name: 'yogeshsahu.xyz',
    description: 'This portfolio. Next.js 15, Framer Motion, Canvas API, Veo 3 scroll animation.',
    stat: 'Next.js 15 · Vercel',
    tags: ['Next.js', 'Framer Motion', 'Canvas API'],
    category: 'web',
    language: 'TypeScript',
    featured: false,
    href: '/',
    githubHref: 'https://github.com/CryptoPrism-io/yogeshsahu-website',
  },
  // ── TOOLS ──
  {
    id: 'cryptoprism-db-d',
    name: 'CryptoPrism DB-D',
    description:
      'Diagnostic and debugging tooling for the CryptoPrism data infrastructure. Pipeline inspection, health queries.',
    stat: 'Internal tooling',
    tags: ['Python', 'Diagnostics'],
    category: 'tools',
    language: 'Python',
    featured: false,
    href: '#',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-DB-D',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category)
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/projects.ts
git commit -m "feat: projects data — all 20 repos typed with categories, stats, and GitHub links"
```

---

## Task 12: ProjectCard + ProjectsGrid (light, featured)

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectsGrid.tsx`

- [ ] **Step 1: Write ProjectCard.tsx**

```typescript
// src/components/ProjectCard.tsx
'use client'

import { motion } from 'framer-motion'
import { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  variant?: 'light' | 'dark'
}

export default function ProjectCard({ project, variant = 'light' }: ProjectCardProps) {
  const isLight = variant === 'light'
  return (
    <motion.a
      href={project.href}
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(251,191,36,0.12)' }}
      transition={{ duration: 0.2 }}
      className="block rounded-xl p-6 transition-colors duration-200 no-underline"
      style={{
        background: isLight ? 'var(--light-surface)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isLight ? 'var(--light-border)' : 'rgba(251,191,36,0.1)'}`,
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLAnchorElement).style.borderColor = isLight
          ? 'var(--light-border)'
          : 'rgba(251,191,36,0.1)'
      }}
    >
      <div
        className="text-xs font-bold uppercase tracking-wider mb-3"
        style={{ color: 'var(--gold-dim)', letterSpacing: '0.1em' }}
      >
        {project.tags.join(' · ')}
      </div>
      <h3
        className="font-cabinet font-black text-base mb-2 leading-tight"
        style={{ color: isLight ? 'var(--text-dark)' : 'var(--text-primary)' }}
      >
        {project.name}
      </h3>
      <p
        className="text-xs leading-relaxed mb-4"
        style={{ color: isLight ? '#9ca3af' : 'var(--text-body)' }}
      >
        {project.description}
      </p>
      <span
        className="inline-block text-xs font-semibold px-2.5 py-1 rounded"
        style={{
          color: 'var(--gold-dim)',
          background: isLight ? '#fef3c7' : 'rgba(251,191,36,0.08)',
        }}
      >
        {project.stat}
      </span>
    </motion.a>
  )
}
```

- [ ] **Step 2: Write ProjectsGrid.tsx**

```typescript
// src/components/ProjectsGrid.tsx
import { featuredProjects } from '@/lib/projects'
import ProjectCard from './ProjectCard'

export default function ProjectsGrid() {
  return (
    <section
      id="work"
      className="py-24 px-6 lg:px-10"
      style={{ background: 'var(--light)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--gold-dim)', letterSpacing: '0.2em' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold-dim)' }} />
              Selected Work
            </div>
            <h2
              className="font-cabinet font-black leading-tight"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                color: 'var(--text-dark)',
                letterSpacing: '-0.02em',
              }}
            >
              Built.
              <br />
              Running.
            </h2>
            <p className="text-sm mt-2" style={{ color: '#6b7280', maxWidth: 480 }}>
              No demos. No side projects. Everything here is in production or shipped to real users.
            </p>
          </div>
          <a
            href="#all-work"
            className="text-sm font-semibold flex items-center gap-1.5 transition-all duration-200"
            style={{ color: 'var(--gold-dim)' }}
          >
            All work →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="light" />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/ProjectsGrid.tsx
git commit -m "feat: ProjectCard + ProjectsGrid — featured 6 cards, light section"
```

---

## Task 13: WorkGrid component (dark, all 20 repos, filtered)

**Files:**
- Create: `src/components/WorkGrid.tsx`

- [ ] **Step 1: Write WorkGrid.tsx**

```typescript
// src/components/WorkGrid.tsx
'use client'

import { useState } from 'react'
import { projects, featuredProjects, getProjectsByCategory, ProjectCategory } from '@/lib/projects'
import ProjectCard from './ProjectCard'

type Tab = 'featured' | 'all' | ProjectCategory

const tabs: { id: Tab; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'all', label: 'All' },
  { id: 'fintech', label: 'Fintech / Crypto' },
  { id: 'quant', label: 'Quant' },
  { id: 'ai', label: 'AI Products' },
  { id: 'web', label: 'Web' },
  { id: 'tools', label: 'Tools' },
]

export default function WorkGrid() {
  const [activeTab, setActiveTab] = useState<Tab>('featured')

  const displayed =
    activeTab === 'featured'
      ? featuredProjects
      : activeTab === 'all'
      ? projects
      : getProjectsByCategory(activeTab as ProjectCategory)

  return (
    <section
      id="all-work"
      className="py-24 px-6 lg:px-10"
      style={{
        background: 'var(--obsidian)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
          All Work — {projects.length} Repos
        </div>

        <h2
          className="font-cabinet font-black leading-tight mb-10"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#fff',
            letterSpacing: '-0.02em',
          }}
        >
          The full stack.
        </h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="text-xs font-bold px-4 py-2 rounded transition-all duration-200"
              style={{
                background:
                  activeTab === tab.id ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? '#000' : 'var(--text-muted)',
                border: `1px solid ${
                  activeTab === tab.id ? 'var(--gold)' : 'rgba(255,255,255,0.08)'
                }`,
                letterSpacing: '0.05em',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((project) => (
            <ProjectCard key={project.id} project={project} variant="dark" />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/CryptoPrism-io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'transparent',
              border: '1px solid rgba(251,191,36,0.3)',
              color: 'var(--gold)',
            }}
          >
            View all on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WorkGrid.tsx
git commit -m "feat: WorkGrid — all 20 repos with filter tabs (Featured/All/Fintech/Quant/AI/Web/Tools)"
```

---

## Task 14: MentalOS section (ModelCard + MentalOS)

**Files:**
- Create: `src/components/ModelCard.tsx`
- Create: `src/components/MentalOS.tsx`

- [ ] **Step 1: Write ModelCard.tsx**

```typescript
// src/components/ModelCard.tsx
'use client'

import { motion } from 'framer-motion'

interface ModelCardProps {
  num: string
  name: string
  definition: string
  application: string
  tag: string
}

export default function ModelCard({ num, name, definition, application, tag }: ModelCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden p-7 transition-colors duration-200"
      style={{ background: 'var(--obsidian)', cursor: 'default' }}
      whileHover={{ background: '#0d0d0d' }}
    >
      {/* Animated gold left border on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5"
        style={{ background: 'var(--gold)', transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      <div
        className="text-xs font-bold tracking-widest mb-5"
        style={{ color: '#4b5563', letterSpacing: '0.15em' }}
      >
        {num}
      </div>

      <h3
        className="text-base font-black mb-2"
        style={{ color: '#fff', letterSpacing: '-0.01em' }}
      >
        {name}
      </h3>

      <p className="text-xs leading-relaxed mb-5" style={{ color: '#9ca3af', lineHeight: '1.7' }}>
        {definition}
      </p>

      <div
        className="pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: '#4b5563', letterSpacing: '0.12em' }}
        >
          Applied in client work
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--gold)', lineHeight: '1.65' }}>
          {application}
        </p>
      </div>

      <span
        className="inline-block mt-4 text-xs font-bold uppercase tracking-wide px-2 py-1 rounded"
        style={{
          background: 'rgba(251,191,36,0.07)',
          border: '1px solid rgba(251,191,36,0.15)',
          color: 'var(--gold-dim)',
          letterSpacing: '0.07em',
        }}
      >
        {tag}
      </span>
    </motion.div>
  )
}
```

- [ ] **Step 2: Write MentalOS.tsx**

```typescript
// src/components/MentalOS.tsx
import ModelCard from './ModelCard'

const models = [
  {
    num: '01',
    name: 'First Principles',
    definition:
      'Strip away assumptions until you reach the foundational truths that cannot be broken down further. Build from there.',
    application:
      "When a client says 'we need X tool' — ask why five times. The real constraint is usually three layers deeper and half the cost.",
    tag: 'Decision-making',
  },
  {
    num: '02',
    name: 'Inversion',
    definition:
      'Solve problems backwards. Instead of asking how to succeed, ask what would guarantee failure — then avoid it.',
    application:
      'Write the failure post-mortem before any architecture decision. Surfaces hidden risks before a line of code is written.',
    tag: 'Risk',
  },
  {
    num: '03',
    name: 'OODA Loop',
    definition:
      'Observe, Orient, Decide, Act — then repeat faster than the environment changes around you.',
    application:
      'Structure sprints around the OODA loop. Faster internal decision cycles mean clients ship before competitors can respond.',
    tag: 'Execution',
  },
  {
    num: '04',
    name: 'Antifragility',
    definition:
      'Systems that gain from disorder and volatility rather than merely surviving or breaking under stress.',
    application:
      'CryptoPrism DB was designed to handle 10× normal load. That redundancy became a feature, not a cost, during market spikes.',
    tag: 'Systems',
  },
  {
    num: '05',
    name: 'Circle of Competence',
    definition:
      'Know precisely what you know and what you do not know. Act within the first; be honest about the second.',
    application:
      'Take fintech, data infrastructure, and AI mandates. Decline e-commerce and hardware. Saying no to the wrong mandate protects both parties.',
    tag: 'Positioning',
  },
  {
    num: '06',
    name: 'Second-Order Thinking',
    definition:
      'Ask: "and then what?" First-order consequences are obvious. Second-order consequences are where decisions are actually won or lost.',
    application:
      'Migrating to microservices looks efficient (1st order). Increases operational complexity for a 10-person team (2nd order). Often the wrong call.',
    tag: 'Architecture',
  },
]

export default function MentalOS() {
  return (
    <section
      className="py-24 px-6 lg:px-10 relative overflow-hidden"
      style={{ background: 'var(--obsidian)' }}
    >
      {/* Subtle gold radial at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(251,191,36,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <div
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
          style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
          Mental OS
        </div>

        <h2
          className="font-cabinet font-black leading-tight mb-3"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            color: '#fff',
            letterSpacing: '-0.025em',
          }}
        >
          How I approach{' '}
          <em className="font-playfair font-bold italic" style={{ color: 'var(--gold)' }}>
            hard problems.
          </em>
        </h2>

        <p className="text-sm leading-relaxed mb-12" style={{ color: '#9ca3af', maxWidth: 560 }}>
          The frameworks that shape how I diagnose, decide, and build. Applied daily in client work,
          product decisions, and system design.
        </p>

        {/* 3×2 grid with shared border */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 12,
            overflow: 'hidden',
            gap: 1,
          }}
        >
          {models.map((model) => (
            <ModelCard key={model.num} {...model} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ModelCard.tsx src/components/MentalOS.tsx
git commit -m "feat: MentalOS section — 6 mental model cards with hover gold border animation"
```

---

## Task 15: Credentials section

**Files:**
- Create: `src/components/CredentialCard.tsx`
- Create: `src/components/Credentials.tsx`

- [ ] **Step 1: Write CredentialCard.tsx**

```typescript
// src/components/CredentialCard.tsx

interface CredentialCardProps {
  initials: string
  logoBg: string
  logoColor: string
  issuer: string
  name: string
  year: string
  badge: string
  badgeStyle: React.CSSProperties
}

export default function CredentialCard({
  initials,
  logoBg,
  logoColor,
  issuer,
  name,
  year,
  badge,
  badgeStyle,
}: CredentialCardProps) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: 'var(--light)', border: '1px solid var(--light-border)' }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = '#d97706'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(217,119,6,0.08)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--light-border)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black"
        style={{ background: logoBg, color: logoColor }}
      >
        {initials}
      </div>
      <div>
        <div
          className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: '#9ca3af', letterSpacing: '0.12em' }}
        >
          {issuer}
        </div>
        <div className="text-sm font-bold leading-tight" style={{ color: '#111' }}>
          {name}
        </div>
        <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>
          {year}
        </div>
      </div>
      <span
        className="self-start text-xs font-bold uppercase tracking-wide px-2 py-1 rounded"
        style={{ fontSize: '0.55rem', letterSpacing: '0.07em', ...badgeStyle }}
      >
        {badge}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Write Credentials.tsx**

```typescript
// src/components/Credentials.tsx
import CredentialCard from './CredentialCard'

const credentials = [
  {
    initials: 'BB',
    logoBg: '#1a1a2e',
    logoColor: '#fbbf24',
    issuer: 'Bloomberg',
    name: 'Bloomberg Market Concepts & ESG',
    year: '2023',
    badge: 'Finance',
    badgeStyle: { background: '#fef3c7', color: '#b45309' },
  },
  {
    initials: 'LI',
    logoBg: '#1e3a5f',
    logoColor: '#fff',
    issuer: 'LIBF, London',
    name: 'Investment Banking Diploma',
    year: '2023',
    badge: 'Finance',
    badgeStyle: { background: '#fef3c7', color: '#b45309' },
  },
  {
    initials: 'SC',
    logoBg: '#fbbf24',
    logoColor: '#000',
    issuer: 'Scrum Alliance',
    name: 'CSPO — Certified Scrum Product Owner',
    year: '2022',
    badge: 'Product',
    badgeStyle: { background: '#dcfce7', color: '#16a34a' },
  },
  {
    initials: 'PM',
    logoBg: '#1e3a5f',
    logoColor: '#fff',
    issuer: 'PMI',
    name: 'Project Management Professional',
    year: '2022',
    badge: 'Management',
    badgeStyle: { background: '#dcfce7', color: '#16a34a' },
  },
  {
    initials: 'PB',
    logoBg: '#f59e0b',
    logoColor: '#fff',
    issuer: 'Microsoft',
    name: 'Power BI PL-300',
    year: '2023',
    badge: 'Data',
    badgeStyle: { background: '#ede9fe', color: '#6d28d9' },
  },
  {
    initials: 'GC',
    logoBg: '#4285f4',
    logoColor: '#fff',
    issuer: 'Google',
    name: 'Google Cloud Certified',
    year: '2023',
    badge: 'Cloud',
    badgeStyle: { background: '#dbeafe', color: '#1d4ed8' },
  },
  {
    initials: 'MS',
    logoBg: '#003087',
    logoColor: '#fff',
    issuer: 'Strathclyde Business School',
    name: 'MS Financial Technology — Merit',
    year: '2024',
    badge: 'FinTech',
    badgeStyle: { background: '#fef3c7', color: '#b45309' },
  },
  {
    initials: 'DP',
    logoBg: '#FF9933',
    logoColor: '#fff',
    issuer: 'Govt. of India',
    name: 'DPIIT Recognised Startup',
    year: '2024',
    badge: 'Recognised',
    badgeStyle: { background: '#dcfce7', color: '#16a34a' },
  },
]

export default function Credentials() {
  return (
    <section
      className="py-24 px-6 lg:px-10"
      style={{ background: '#ffffff', borderTop: '1px solid var(--light-border)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: 'var(--gold-dim)', letterSpacing: '0.2em' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold-dim)' }} />
          Credentials
        </div>

        <h2
          className="font-cabinet font-black leading-tight mb-3"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--text-dark)',
            letterSpacing: '-0.02em',
          }}
        >
          The proof behind{' '}
          <em className="font-playfair font-bold italic" style={{ color: 'var(--gold-dim)' }}>
            the pitch.
          </em>
        </h2>

        <p className="text-sm mb-10" style={{ color: '#6b7280', maxWidth: 480 }}>
          Bloomberg to Strathclyde. Finance to cloud. Every credential answers a different client
          objection.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {credentials.map((c) => (
            <CredentialCard key={c.name} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CredentialCard.tsx src/components/Credentials.tsx
git commit -m "feat: Credentials wall — 8 certification cards (Bloomberg, LIBF, CSPO, PMI, Power BI, Google, Strathclyde, DPIIT)"
```

---

## Task 16: Milestones component

**Files:**
- Create: `src/components/Milestones.tsx`

- [ ] **Step 1: Write Milestones.tsx**

```typescript
// src/components/Milestones.tsx
'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    icon: '🎮',
    title: 'Kari & the Lost Shrines',
    desc: '21 days. Zero marketing. 50K downloads across 110 countries — and a personal note from Sadhguru.',
    badge: 'Sadhguru Appreciation',
  },
  {
    icon: '🏍',
    title: 'Solo. 21 States. No Support.',
    desc: 'Crossed 21 Indian states on a motorbike, alone. What most people plan for years — executed.',
    badge: '21 States · Solo',
  },
  {
    icon: '🎓',
    title: 'Strathclyde MS FinTech',
    desc: 'Dissertation topper — 82/100. Applied Google\'s TimesFM to live crypto price forecasting. Cohort first.',
    badge: 'Merit · Cohort Topper',
  },
  {
    icon: '🎮',
    title: 'Ubisoft',
    desc: 'Worked across Assassin\'s Creed, For Honor, and Just Dance. Consumer gaming at global scale.',
    badge: 'AAA Titles',
  },
  {
    icon: '🏆',
    title: 'Gamerz Nation',
    desc: 'Co-founded 7 e-sports franchises. Built the first GeForce-certified gaming zone in India.',
    badge: 'First in India',
  },
]

export default function Milestones() {
  return (
    <section
      className="py-24 px-6 lg:px-10"
      style={{
        background: 'var(--obsidian)',
        borderTop: '1px solid rgba(251,191,36,0.06)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
          Milestones
        </div>

        <h2
          className="font-cabinet font-black leading-tight mb-12"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff',
            letterSpacing: '-0.02em',
          }}
        >
          Not just{' '}
          <em className="font-playfair font-bold italic" style={{ color: 'var(--gold)' }}>
            code.
          </em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl p-7 flex gap-5 items-start transition-all duration-200 hover:cursor-default"
              style={{
                background: 'rgba(251,191,36,0.04)',
                border: '1px solid rgba(251,191,36,0.12)',
              }}
              whileHover={{
                background: 'rgba(251,191,36,0.07)',
                borderColor: 'rgba(251,191,36,0.3)',
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(251,191,36,0.08)' }}
              >
                {m.icon}
              </div>
              <div>
                <h3
                  className="font-cabinet font-black text-base mb-1.5 leading-tight"
                  style={{ color: '#fff' }}
                >
                  {m.title}
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-body)' }}>
                  {m.desc}
                </p>
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wide px-2 py-1 rounded"
                  style={{
                    color: 'var(--gold)',
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.07em',
                  }}
                >
                  {m.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Milestones.tsx
git commit -m "feat: Milestones — 5 cards (Kari, Moto, Strathclyde, Ubisoft, Gamerz Nation)"
```

---

## Task 17: lib/posts.ts + BlogPreview component

**Files:**
- Create: `src/lib/posts.ts`
- Create: `src/components/BlogPreview.tsx`

- [ ] **Step 1: Write posts.ts**

```typescript
// src/lib/posts.ts

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  href: string
}

export const posts: Post[] = [
  {
    slug: 'three-databases-instead-of-one',
    title: 'Why I Used Three Databases Instead of One',
    excerpt:
      'The architecture decision behind CryptoPrism DB — tradeoffs, costs, and what I\'d do differently at scale.',
    date: 'Mar 2026',
    href: '#',
  },
  {
    slug: 'timesfm-on-live-crypto',
    title: 'TimesFM on Live Crypto: Honest Results',
    excerpt:
      "Google's foundation model applied to price forecasting. The numbers, the caveats, and where it actually outperforms baselines.",
    date: 'Feb 2026',
    href: '#',
  },
  {
    slug: 'retail-crypto-data-problem',
    title: 'Retail Crypto Doesn\'t Have a Signal Problem. It Has a Data Problem.',
    excerpt:
      'Most platforms pile on indicators. The actual constraint is data quality and latency. Here\'s what that looks like in practice.',
    date: 'Jan 2026',
    href: '#',
  },
]
```

- [ ] **Step 2: Write BlogPreview.tsx**

```typescript
// src/components/BlogPreview.tsx
import { posts } from '@/lib/posts'

export default function BlogPreview() {
  return (
    <section
      id="blog"
      className="py-24 px-6 lg:px-10"
      style={{ background: '#ffffff', borderTop: '1px solid var(--light-border)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--gold-dim)', letterSpacing: '0.2em' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold-dim)' }} />
              Writing
            </div>
            <h2
              className="font-cabinet font-black"
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                color: 'var(--text-dark)',
                letterSpacing: '-0.02em',
              }}
            >
              Thinking out loud.
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-semibold"
            style={{ color: 'var(--gold-dim)' }}
          >
            All posts →
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={post.href}
              className="block pt-6 no-underline group"
              style={{ borderTop: '2px solid var(--light-border)' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderTopColor = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderTopColor = 'var(--light-border)'
              }}
            >
              <div
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: '#9ca3af', letterSpacing: '0.08em' }}
              >
                {post.date}
              </div>
              <h3
                className="font-cabinet font-black text-base leading-tight mb-2"
                style={{ color: 'var(--text-dark)' }}
              >
                {post.title}
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: '#6b7280' }}>
                {post.excerpt}
              </p>
              <span
                className="text-xs font-bold flex items-center gap-1.5"
                style={{ color: 'var(--gold-dim)' }}
              >
                Read →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/posts.ts src/components/BlogPreview.tsx
git commit -m "feat: BlogPreview — 3 practitioner blog post previews (light section)"
```

---

## Task 18: Contact component

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1: Write Contact.tsx**

```typescript
// src/components/Contact.tsx

const contactLinks = [
  {
    icon: 'GH',
    label: 'GitHub',
    value: 'CryptoPrism-io',
    href: 'https://github.com/CryptoPrism-io',
  },
  {
    icon: 'in',
    label: 'LinkedIn',
    value: 'yogeshsahu-',
    href: 'https://linkedin.com/in/yogeshsahu-',
  },
  {
    icon: '✉',
    label: 'Email',
    value: 'yogesh.sahu@cryptoprism.io',
    href: 'mailto:yogesh.sahu@cryptoprism.io',
  },
  {
    icon: 'CP',
    label: 'CryptoPrism',
    value: 'cryptoprism.io',
    href: 'https://cryptoprism.io',
  },
  {
    icon: '📅',
    label: 'Book a Call',
    value: '30-min intro · Cal.com',
    href: 'https://cal.com/yogeshsahu',
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 lg:px-10"
      style={{
        background: 'var(--obsidian-soft)',
        borderTop: '1px solid rgba(251,191,36,0.08)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8"
          style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
          Contact
        </div>

        <h2
          className="font-cabinet font-black leading-tight mb-3"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: '#fff',
            letterSpacing: '-0.02em',
          }}
        >
          Available.
          <br />
          <em className="font-playfair font-bold italic" style={{ color: 'var(--gold)' }}>
            Selectively.
          </em>
        </h2>

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: 'var(--text-muted)', maxWidth: 480 }}
        >
          Open to Fractional CTO engagements — fintech, data infrastructure, AI/ML. I take on two
          to three clients at a time. Simultaneously raising pre-seed for CryptoPrism, Q2 2026.
        </p>

        {/* Availability badge */}
        <div
          className="inline-flex items-center gap-2 text-xs mb-10"
          style={{ color: '#4ade80', letterSpacing: '0.08em' }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse-green"
            style={{ background: '#4ade80' }}
          />
          Accepting Fractional CTO mandates
        </div>

        {/* Contact links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 rounded-lg transition-all duration-200 no-underline hover:translate-x-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(251,191,36,0.15)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'rgba(251,191,36,0.4)'
                ;(e.currentTarget as HTMLAnchorElement).style.background =
                  'rgba(251,191,36,0.06)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'rgba(251,191,36,0.15)'
                ;(e.currentTarget as HTMLAnchorElement).style.background =
                  'rgba(255,255,255,0.03)'
              }}
            >
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{
                  background: 'rgba(251,191,36,0.08)',
                  border: '1px solid rgba(251,191,36,0.15)',
                  color: 'var(--gold)',
                }}
              >
                {link.icon}
              </div>
              <div>
                <span
                  className="block text-xs uppercase tracking-wider mb-0.5"
                  style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', fontSize: '0.58rem' }}
                >
                  {link.label}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.value}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: Contact — 5 link cards, Fractional CTO framing, pulsing availability badge"
```

---

## Task 19: Footer component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Write Footer.tsx**

```typescript
// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer
      className="px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4"
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <p className="text-xs" style={{ color: '#374151' }}>
        <span style={{ color: 'var(--gold)' }}>yogeshsahu.xyz</span> · © 2026 Yogesh Sahu · Built
        with Next.js
      </p>
      <div className="flex gap-3">
        {[
          { href: 'https://github.com/CryptoPrism-io', label: 'GH' },
          { href: 'https://linkedin.com/in/yogeshsahu-', label: 'in' },
        ].map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#6b7280',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)'
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                'rgba(255,255,255,0.08)'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#6b7280'
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: Footer — near-black, copyright, social icons"
```

---

## Task 20: Home page assembly (app/page.tsx)

**Files:**
- Create/replace: `src/app/page.tsx`

- [ ] **Step 1: Write page.tsx**

```typescript
// src/app/page.tsx
import Nav from '@/components/Nav'
import HeroScroll from '@/components/HeroScroll'
import Marquee from '@/components/Marquee'
import SectionWrapper from '@/components/SectionWrapper'
import AboutStats from '@/components/AboutStats'
import ExpertisePillars from '@/components/ExpertisePillars'
import ProjectsGrid from '@/components/ProjectsGrid'
import WorkGrid from '@/components/WorkGrid'
import MentalOS from '@/components/MentalOS'
import Credentials from '@/components/Credentials'
import Milestones from '@/components/Milestones'
import BlogPreview from '@/components/BlogPreview'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />

      {/* 1. Hero — dark, 600vh sticky scroll zone */}
      <HeroScroll />

      {/* 2. Marquee 1 — gold, credentials ticker */}
      <Marquee variant="gold" />

      {/* 3. About — dark */}
      <SectionWrapper>
        <AboutStats />
      </SectionWrapper>

      {/* 4. Expertise Pillars — light */}
      <SectionWrapper>
        <ExpertisePillars />
      </SectionWrapper>

      {/* 5. Featured Projects — light */}
      <SectionWrapper>
        <ProjectsGrid />
      </SectionWrapper>

      {/* 6. All Work / Work Grid — dark */}
      <SectionWrapper>
        <WorkGrid />
      </SectionWrapper>

      {/* 7. Marquee 2 — dark, mental models */}
      <Marquee variant="dark" />

      {/* 8. Mental OS — dark */}
      <SectionWrapper>
        <MentalOS />
      </SectionWrapper>

      {/* 9. Credentials — light */}
      <SectionWrapper>
        <Credentials />
      </SectionWrapper>

      {/* 10. Milestones — dark */}
      <SectionWrapper>
        <Milestones />
      </SectionWrapper>

      {/* 11. Blog — light */}
      <SectionWrapper>
        <BlogPreview />
      </SectionWrapper>

      {/* 12. Contact — dark */}
      <SectionWrapper>
        <Contact />
      </SectionWrapper>

      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run full build**

```bash
npm run build
```

Expected: build succeeds with 0 errors. Note any warnings about image optimisation or missing files — these are expected.

- [ ] **Step 3: Start dev server and do a visual spot check**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Nav is visible at top (transparent)
- Hero section renders with gold "Y" avatar placeholder (no frames loaded yet)
- "YOGESH / Sahu" heading renders in Cabinet Grotesk
- Gold marquee ticker scrolls
- About stats section renders
- All sections render in correct order
- Page scrolls through all 12 sections

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble home page — all 12 sections in correct dark/light order"
```

---

## Task 21: Project case study redirect routes

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Write the project route**

This creates clean URLs like `/projects/cryptoprism-db` that redirect to the existing static HTML files.

```typescript
// src/app/projects/[slug]/page.tsx
import { redirect } from 'next/navigation'
import { projects } from '@/lib/projects'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // Map slug to existing HTML file
  const htmlMap: Record<string, string> = {
    'cryptoprism-db': 'cryptoprism-db',
    'cryptoprism-db-h': 'cryptoprism-db-h',
    'cryptoprism-db-backtest': 'backtest',
    'cryptoprism-news-fetcher': 'news-fetcher',
    'cryptoprism-socials': 'cryptoprism-socials',
    'forex-pipeline': 'forex-pipeline',
    'forexfactory-scraper': 'forexfactory-scraper',
    pratyaksha: 'pratyaksha',
  }

  const htmlFile = htmlMap[params.slug]
  if (htmlFile) {
    redirect(`/projects/${htmlFile}.html`)
  }

  // For repos without a case study page, redirect to GitHub
  const project = projects.find((p) => p.id === params.slug)
  if (project) {
    redirect(project.githubHref)
  }

  redirect('/#all-work')
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/
git commit -m "feat: project case study routes — redirect clean URLs to existing HTML pages"
```

---

## Task 22: Vercel deployment + GitHub Actions CI

**Files:**
- Create: `vercel.json`
- Modify: `.github/workflows/deploy.yml`
- Delete: `firebase.json`

- [ ] **Step 1: Create vercel.json**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

- [ ] **Step 2: Replace .github/workflows/deploy.yml**

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [master]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npx jest

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

- [ ] **Step 3: Set up Vercel project (one-time manual step)**

```
1. Go to vercel.com → Add New Project → Import from GitHub
2. Select: CryptoPrism-io/yogeshsahu-website
3. Framework: Next.js (auto-detected)
4. Deploy once from the Vercel dashboard

5. From the project settings, copy:
   - VERCEL_ORG_ID (Settings → General → Team ID)
   - VERCEL_PROJECT_ID (Settings → General → Project ID)

6. Add to GitHub repo secrets (Settings → Secrets → Actions):
   - VERCEL_TOKEN: (from vercel.com/account/tokens)
   - VERCEL_ORG_ID
   - VERCEL_PROJECT_ID

7. Update DNS at your domain registrar:
   - Add CNAME: yogeshsahu.xyz → cname.vercel-dns.com
   - Or: A record → 76.76.21.21
```

- [ ] **Step 4: Delete firebase.json**

```bash
rm firebase.json
```

- [ ] **Step 5: Final build + tests pass**

```bash
npm run build && npx jest
```

Expected: build succeeds, 6 tests pass.

- [ ] **Step 6: Final commit**

```bash
git add vercel.json .github/workflows/deploy.yml
git rm firebase.json
git commit -m "feat: Vercel deployment — GitHub Actions CI, remove Firebase config"
```

- [ ] **Step 7: Push to trigger first Vercel deploy**

```bash
git push origin master
```

Expected: GitHub Actions runs, Vercel deploys, site live at yogeshsahu.xyz.

---

## Post-build: Add Veo 3 Frames

Once you generate the Veo 3 video with Google Flow:

```bash
# Extract 180 WebP frames at 30fps
ffmpeg -i avatar.mp4 \
  -vf "fps=30,scale=1080:-1" \
  -q:v 85 \
  public/frames/frame_%04d.webp

# Verify frame count
ls public/frames/ | wc -l
# Expected: 180
```

Then commit:
```bash
git add public/frames/
git commit -m "feat: add Veo 3 animation frames (180 WebP)"
git push
```

The hero canvas will automatically start playing once `public/frames/frame_0001.webp` through `frame_0180.webp` exist.

---

## Self-Review Checklist

**Spec coverage:**
- [x] Hero — Veo 3 canvas, sticky 600vh, gold avatar placeholder, name/role, CTA
- [x] Marquee 1 — gold, credentials ticker
- [x] About — dark, manifesto, bio, 4 animated counters
- [x] Expertise Pillars — light, 3-col, Infrastructure/Product/Finance
- [x] Featured Projects — light, 6 cards with exact preview copy
- [x] Work Grid — dark, all 20 repos, 7 filter tabs
- [x] Marquee 2 — dark, mental models ticker
- [x] Mental OS — dark, 6 model cards with gold left-border hover
- [x] Credentials — light, 8 certs (Bloomberg, LIBF, CSPO, PMI, Power BI, Google, Strathclyde, DPIIT)
- [x] Milestones — dark, 5 cards (Kari, Moto, Strathclyde, Ubisoft, Gamerz Nation)
- [x] Blog — light, 3 practitioner-voice posts
- [x] Contact — dark, "Available. Selectively.", 5 link cards, pulsing green dot
- [x] Nav — transparent→solid scroll, hamburger
- [x] Footer — near-black, copyright, socials
- [x] Vercel deployment + CI
- [x] useScrollFrames tested (6 unit tests)
- [x] All 20 repos in projects.ts

**No placeholders found.**

**Type consistency:** `Project` type defined in Task 11, used consistently in Tasks 12, 13, 21. `Post` type defined in Task 17, used in BlogPreview. `getFrameIndex` exported in Task 4, tested in same task.
