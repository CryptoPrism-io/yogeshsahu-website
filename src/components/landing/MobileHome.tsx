"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { featuredProjects } from "@/lib/projects";

const MONO = "var(--font-mono)";
const HEAD = "var(--font-headline)";
const BODY = "var(--font-body)";
const SERIF = "var(--font-serif-display)";
const EASE = "cubic-bezier(.16,.84,.44,1)";
const REVEAL = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 } };
const REVEAL_T = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

/* ── count-up, ported from the desktop identity panel ────────────────── */
const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

function useCountUp(target: number, suffix: string, dur: number, delay: number) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = target + suffix;
      return;
    }
    let raf = 0;
    const id = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(easeOutExpo(p) * target) + suffix;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, dur, delay]);
  return ref;
}

/* ── live IST clock, ported from the desktop deck ────────────────────── */
function useClock() {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const fmt = () => {
      try {
        const t = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        });
        setClock(`${t} IST`);
      } catch {
        /* noop */
      }
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return clock;
}

const mono = (size: number, spacing: string, color: string): CSSProperties => ({
  fontFamily: MONO,
  fontSize: size,
  letterSpacing: spacing,
  color,
  textTransform: "uppercase",
});

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── rotating pitch — four angles on who I am, then the diagnostic CTA ── */
const PITCH: { lead: string; em: string }[] = [
  {
    lead: "I build and ship AI-native B2B & B2C products end-to-end — six production-grade apps in six months,",
    em: "not MVPs.",
  },
  {
    lead: "Two companies founded, products in market. When I consult I bring founder-level ownership —",
    em: "not slide decks.",
  },
  {
    lead: "A 72-petabyte pipeline you can query in plain language — 1B+ datapoints a day across",
    em: "100+ coins.",
  },
  {
    lead: "Times of India · Barclays · Isha · Strathclyde — enterprise rigor at",
    em: "founder speed.",
  },
];
const PITCH_MS = 3900;

function RotatingPitch() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % PITCH.length), PITCH_MS);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const active = PITCH[i];

  return (
    <div
      className="px-[22px] py-6"
      style={{
        background: "var(--ys-bg-deep)",
        borderTop: "1px solid rgba(42,23,15,.2)",
        borderBottom: "1px solid rgba(42,23,15,.2)",
        animation: `ip-fade .8s ease .36s both`,
      }}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
    >
      <div style={{ minHeight: 108 }} className="flex items-start">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.42, ease: [0.16, 0.84, 0.44, 1] }}
            style={{ fontFamily: BODY, fontSize: 16.5, lineHeight: 1.5, color: "#fff8f1" }}
          >
            {active.lead}{" "}
            <em
              style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 18.5, color: "#ffd9c2" }}
            >
              {active.em}
            </em>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* progress segments — fill on the active statement, bright once seen */}
      <div className="mt-[18px] flex gap-1.5" role="tablist" aria-label="About Yogesh">
        {PITCH.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            role="tab"
            aria-selected={idx === i}
            aria-label={`Statement ${idx + 1} of ${PITCH.length}`}
            className="h-[4px] flex-1 overflow-hidden"
            style={{ background: "rgba(255,248,241,.24)" }}
          >
            {idx < i && <span className="block h-full w-full" style={{ background: "rgba(255,248,241,.7)" }} />}
            {idx === i &&
              (reduce ? (
                <span className="block h-full w-full" style={{ background: "#fff8f1" }} />
              ) : (
                <motion.span
                  key={i}
                  className="block h-full"
                  style={{ background: "#fff8f1" }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: PITCH_MS / 1000, ease: "linear" }}
                />
              ))}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── editorial section header ────────────────────────────────────────── */
function SectionHead({ num, kicker, title }: { num: string; kicker: string; title: string }) {
  return (
    <motion.div
      {...REVEAL}
      viewport={{ once: true, margin: "-60px" }}
      transition={REVEAL_T}
      className="flex items-start justify-between border-t px-[22px] pb-5 pt-8"
      style={{ borderColor: "var(--ys-surface-muted)" }}
    >
      <div>
        <div style={mono(9.5, "0.2em", "var(--ys-text-soft)")}>{kicker}</div>
        <h2
          className="mt-2 text-[27px] font-bold leading-[1.02]"
          style={{ fontFamily: HEAD, color: "var(--ys-text)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
      </div>
      <span style={{ fontFamily: MONO, fontSize: 11, color: "#c9ad97" }}>{num}</span>
    </motion.div>
  );
}

/* ── merged ventures + track record (each fact appears once) ──────────── */
const VENTURES: { name: string; role: string; metric: string; metricColor: string; body: string }[] = [
  {
    name: "CryptoPrism",
    role: "Founder & CTO",
    metric: "72 PB+",
    metricColor: "var(--ys-highlight)",
    body: "Full-stack crypto intelligence — on-chain analytics, ML trading signals via TimesFM, and a 72-petabyte pipeline queryable in plain language.",
  },
  {
    name: "Trinetry Infotech",
    role: "Managing Director",
    metric: "Agentic AI",
    metricColor: "var(--ys-accent)",
    body: "Technology consultancy building AI-powered SaaS and fractional-CTO consulting — replacing manual SME workflows with agentic AI.",
  },
];

const TRACK: { k: string; v: string; d: string }[] = [
  { k: "Kari · Isha Foundation", v: "2M+ reach", d: "50K+ downloads; 2M social reach in 2020." },
  { k: "Gamerz Nation", v: "100K+", d: "First startup at 22 — 7 franchises, 100K+ first-year revenue." },
  { k: "Times of India", v: "Chief Architect", d: "Built AI Bharatverse — interactive AI history platform." },
  { k: "Barclays", v: "ML · Fraud", d: "ML pipelines for credit-card fraud detection at scale." },
  { k: "Strathclyde", v: "MSc FinTech", d: "Merit, dissertation topper (82/100). AML false positives 87% → 59%." },
];

function VenturesSection() {
  return (
    <section id="mobile-ventures">
      <SectionHead num="01" kicker="Founder · 2× Company" title="Ventures" />
      <motion.p
        {...REVEAL}
        viewport={{ once: true, margin: "-60px" }}
        transition={REVEAL_T}
        className="px-[22px] pb-2"
        style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.6, color: "var(--ys-text-soft)" }}
      >
        Builder first. Two companies founded, products shipped to market — operating at the
        intersection of AI, fintech, and data infrastructure.
      </motion.p>

      {VENTURES.map((v) => (
        <motion.div
          key={v.name}
          {...REVEAL}
          viewport={{ once: true, margin: "-50px" }}
          transition={REVEAL_T}
          className="border-t px-[22px] pb-6 pt-5"
          style={{ borderColor: "var(--ys-surface-muted)" }}
        >
          <div className="flex items-baseline justify-between">
            <span style={mono(11, "0.14em", "var(--ys-text)")}>{v.name}</span>
            <span style={mono(9.5, "0.12em", "var(--ys-text-soft)")}>{v.role}</span>
          </div>
          <div
            style={{
              fontFamily: HEAD,
              fontWeight: 700,
              fontSize: "clamp(34px,10.5vw,46px)",
              color: v.metricColor,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              margin: "10px 0 12px",
            }}
          >
            {v.metric}
          </div>
          <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.55, color: "var(--ys-text)" }}>{v.body}</p>
        </motion.div>
      ))}

      {/* track record — one line each, no cards */}
      <div className="border-t px-[22px] pb-2 pt-6" style={{ borderColor: "var(--ys-surface-muted)" }}>
        <div style={mono(9.5, "0.2em", "var(--ys-text-soft)")}>Track Record</div>
      </div>
      {TRACK.map((t) => (
        <motion.div
          key={t.k}
          {...REVEAL}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="px-[22px] py-[15px]"
          style={{ borderTop: "1px solid var(--ys-surface-muted)" }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <span
              className="text-[14px] font-bold"
              style={{ fontFamily: HEAD, color: "var(--ys-text)", letterSpacing: "-0.01em" }}
            >
              {t.k}
            </span>
            <span className="shrink-0" style={mono(10, "0.1em", "var(--ys-accent)")}>
              {t.v}
            </span>
          </div>
          <p className="mt-1 text-[12.5px]" style={{ fontFamily: BODY, lineHeight: 1.5, color: "var(--ys-text-soft)" }}>
            {t.d}
          </p>
        </motion.div>
      ))}
    </section>
  );
}

/* ── selected work — 3 featured projects as editorial rows ────────────── */
function SelectedWork() {
  const reel = featuredProjects.slice(0, 3);
  return (
    <section id="mobile-work">
      <SectionHead num="02" kicker="12 Case Studies · 3 Clusters" title="Selected Work" />
      <motion.p
        {...REVEAL}
        viewport={{ once: true, margin: "-60px" }}
        transition={REVEAL_T}
        className="px-[22px] pb-2"
        style={{ fontFamily: BODY, fontSize: 15, lineHeight: 1.6, color: "var(--ys-text-soft)" }}
      >
        A few highlights. The full set lives in the Work hub.
      </motion.p>

      {reel.map((p, idx) => (
        <motion.div
          key={p.id}
          {...REVEAL}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/projects/${p.id}`}
            className="block border-t px-[22px] py-[18px] active:bg-[var(--ys-surface-strong)]"
            style={{ borderColor: "var(--ys-surface-muted)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-baseline gap-2.5">
                <span style={mono(10, "0.1em", "#c9ad97")}>{String(idx + 1).padStart(2, "0")}</span>
                <h3
                  className="text-[17px] font-bold leading-[1.15]"
                  style={{ fontFamily: HEAD, color: "var(--ys-text)", letterSpacing: "-0.01em" }}
                >
                  {p.name}
                </h3>
              </div>
              <span
                className="shrink-0 whitespace-nowrap px-2 py-1"
                style={{
                  ...mono(9, "0.08em", "var(--ys-accent-strong)"),
                  border: "1px solid rgba(169,61,29,.28)",
                  background: "rgba(207,79,39,.08)",
                }}
              >
                {p.stat} {p.statLabel}
              </span>
            </div>
            <p className="mt-2 text-[13px]" style={{ fontFamily: BODY, lineHeight: 1.55, color: "var(--ys-text-soft)" }}>
              {p.description}
            </p>
          </Link>
        </motion.div>
      ))}

      <Link
        href="/work"
        className="focus-ring flex items-center justify-between border-t px-[22px] py-[19px]"
        style={{ borderColor: "var(--ys-surface-muted)", background: "var(--ys-text)", color: "var(--ys-surface)" }}
      >
        <span style={mono(12, "0.14em", "var(--ys-surface)")}>See all 12 case studies</span>
        <span style={{ fontFamily: HEAD, fontSize: 18 }}>→</span>
      </Link>
    </section>
  );
}

/* ── work with me — condensed diagnostic ─────────────────────────────── */
const MANDATES: { label: string; body: string; color: string }[] = [
  {
    label: "AI Integration",
    body: "Move from level-zero experimentation to product and enterprise rollout without overbuilding the stack.",
    color: "var(--ys-accent)",
  },
  {
    label: "Architecture Clarity",
    body: "Make the technical tradeoffs obvious so product pressure turns into execution instead of confusion.",
    color: "var(--ys-highlight)",
  },
  {
    label: "Stakeholder Alignment",
    body: "Bring product, engineering, and leadership onto one execution path even when authority is fragmented.",
    color: "var(--ys-text)",
  },
];

function WorkWithMe() {
  return (
    <section id="mobile-diagnostic" className="scroll-mt-2">
      <SectionHead num="03" kicker="Paid Entry Offer" title="Work With Me" />
      <motion.div
        {...REVEAL}
        viewport={{ once: true, margin: "-60px" }}
        transition={REVEAL_T}
        className="px-[22px]"
      >
        <h3
          className="text-[1.7rem] font-black italic leading-[1.08]"
          style={{ fontFamily: SERIF, color: "var(--ys-text)" }}
        >
          Solutions architecture for teams moving faster than their systems.
        </h3>
        <p className="mt-3 text-[14.5px]" style={{ fontFamily: BODY, lineHeight: 1.6, color: "var(--ys-text-soft)" }}>
          A hands-on chief solutions architect who shapes the work before it&apos;s built. The goal is a next
          90 days that&apos;s executable, scoped, and commercially credible.
        </p>

        {/* entry offer facts */}
        <div
          className="mt-5 flex items-stretch"
          style={{ border: "1px solid var(--ys-border)", background: "var(--ys-surface-strong)" }}
        >
          {[
            { v: "5 days", l: "fixed scope" },
            { v: "USD 999", l: "flat fee" },
            { v: "90-day", l: "execution plan" },
          ].map((f, idx) => (
            <div
              key={f.l}
              className="flex-1 px-3 py-4"
              style={idx > 0 ? { borderLeft: "1px solid var(--ys-border)" } : undefined}
            >
              <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 18, color: "var(--ys-text)" }}>{f.v}</div>
              <div className="mt-1" style={mono(8.5, "0.08em", "var(--ys-text-soft)")}>
                {f.l}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* mandate types */}
      <div className="mt-6">
        {MANDATES.map((m) => (
          <motion.div
            key={m.label}
            {...REVEAL}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="border-t px-[22px] py-[15px]"
            style={{ borderColor: "var(--ys-surface-muted)" }}
          >
            <div className="border-l-2 pl-3" style={{ borderColor: m.color }}>
              <div style={mono(9.5, "0.18em", m.color)}>{m.label}</div>
              <p className="mt-1 text-[13.5px]" style={{ fontFamily: BODY, lineHeight: 1.55, color: "var(--ys-text)" }}>
                {m.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => scrollToId("mobile-contact")}
        className="focus-ring flex w-full items-center justify-between border-t px-[22px] py-[19px]"
        style={{ borderColor: "var(--ys-surface-muted)", background: "var(--ys-highlight)", color: "#fff8f1", border: "none" }}
      >
        <span style={mono(13, "0.14em", "#fff8f1")}>Start a Diagnostic</span>
        <span style={{ fontSize: 16 }}>→</span>
      </button>
    </section>
  );
}

/* ── contact ─────────────────────────────────────────────────────────── */
const MAILTO =
  "mailto:yogesh.sahu@cryptoprism.io?subject=5-day%20CTO%20Diagnostic&body=Hi%20Yogesh%2C%0A%0AI%20want%20to%20explore%20the%205-day%20CTO%20diagnostic.%20The%20main%20issue%20we%20are%20dealing%20with%20is%3A%20%0A%0ACompany%3A%20%0AStage%3A%20%0ACurrent%20pressure%3A%20";

const CONTACT_LINKS: { label: string; content: string; href: string }[] = [
  { label: "Email", content: "yogesh.sahu@cryptoprism.io", href: MAILTO },
  { label: "LinkedIn", content: "linkedin.com/in/yogeshsahu-", href: "https://linkedin.com/in/yogeshsahu-" },
  { label: "GitHub", content: "github.com/CryptoPrism-io", href: "https://github.com/CryptoPrism-io" },
];

function ContactSection() {
  return (
    <section id="mobile-contact" className="scroll-mt-2">
      <SectionHead num="04" kicker="Architecture Mandates" title="Contact" />
      {CONTACT_LINKS.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target={c.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="flex items-center justify-between border-t px-[22px] py-[15px] active:bg-[var(--ys-surface-strong)]"
          style={{ borderColor: "var(--ys-surface-muted)" }}
        >
          <div>
            <div style={mono(9, "0.14em", "var(--ys-text-soft)")}>{c.label}</div>
            <div className="mt-1 text-[14px]" style={{ fontFamily: HEAD, color: "var(--ys-accent)" }}>
              {c.content}
            </div>
          </div>
          <ArrowUpRight size={16} style={{ color: "var(--ys-text-soft)" }} />
        </a>
      ))}

      {/* availability */}
      <div
        className="border-t border-l-2 px-[22px] py-4"
        style={{ borderColor: "var(--ys-surface-muted)", borderLeftColor: "var(--ys-highlight)" }}
      >
        <div style={mono(9, "0.14em", "var(--ys-text-soft)")}>Current Availability</div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full animate-heartbeat" style={{ background: "var(--ys-highlight)" }} />
          <span className="text-[13px] font-bold" style={{ fontFamily: HEAD, color: "var(--ys-text)" }}>
            Open for May 2026 architecture mandates
          </span>
        </div>
        <p className="mt-1" style={mono(10, "0.02em", "var(--ys-text-soft)")}>
          Best fit: consulting, regulated, and fast-moving teams.
        </p>
      </div>

      <a
        href={MAILTO}
        className="focus-ring flex items-center justify-between border-t px-[22px] py-[19px]"
        style={{ borderColor: "var(--ys-surface-muted)", background: "var(--ys-text)", color: "var(--ys-surface)" }}
      >
        <span style={mono(12, "0.14em", "var(--ys-surface)")}>Start architecture diagnostic</span>
        <span style={{ fontFamily: HEAD, fontSize: 18 }}>→</span>
      </a>
    </section>
  );
}

/* ── slim utility nav — the only off-page jumps ──────────────────────── */
function NavStrip() {
  const cell = "flex flex-col items-center justify-center gap-1 py-[15px] active:bg-[var(--ys-surface-strong)]";
  const label: CSSProperties = mono(10.5, "0.14em", "var(--ys-text)");
  const sub: CSSProperties = mono(8, "0.1em", "var(--ys-text-soft)");
  return (
    <div className="grid grid-cols-3" style={{ background: "var(--ys-surface-muted)", gap: 1 }}>
      <Link href="/work" className={cell} style={{ background: "var(--ys-surface)" }}>
        <span style={label}>Work Hub</span>
        <span style={sub}>12 studies</span>
      </Link>
      <a href="/yogesh-sahu-cv.pdf" target="_blank" rel="noreferrer" className={cell} style={{ background: "var(--ys-surface)" }}>
        <span style={label}>CV ↓</span>
        <span style={sub}>View · PDF</span>
      </a>
      <button onClick={() => scrollToId("mobile-contact")} className={cell} style={{ background: "var(--ys-surface)" }}>
        <span style={label}>Contact</span>
        <span style={sub}>Book a call</span>
      </button>
    </div>
  );
}

/* ── metric cell ─────────────────────────────────────────────────────── */
function Metric({ mref, zero, label }: { mref: RefObject<HTMLDivElement>; zero: string; label: ReactNode }) {
  return (
    <div className="px-4 py-5" style={{ background: "var(--ys-surface)" }}>
      <div
        ref={mref}
        style={{
          fontFamily: HEAD,
          fontWeight: 700,
          fontSize: "clamp(24px,7.5vw,30px)",
          color: "var(--ys-accent)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {zero}
      </div>
      <div className="mt-2" style={mono(8.5, "0.06em", "var(--ys-text-soft)")}>
        {label}
      </div>
    </div>
  );
}

export default function MobileHome() {
  const clock = useClock();
  const apps = useCountUp(6, "+", 900, 350);
  const loc = useCountUp(2, "M+", 950, 430);
  const dp = useCountUp(1, "B+", 1000, 510);

  return (
    <div className="fixed inset-0 overflow-y-auto" style={{ background: "var(--ys-surface)" }}>
      {/* ============ HERO ============ */}
      <header className="relative overflow-hidden" style={{ background: "var(--ys-bg)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 50% at 92% 0%,rgba(255,242,228,.12),transparent 55%),radial-gradient(120% 45% at 0% 100%,rgba(168,79,45,.5),transparent 55%)",
          }}
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-multiply"
          aria-hidden
        >
          <filter id="m-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#m-grain)" />
        </svg>

        <div className="relative z-[2] mx-auto max-w-[480px]">
          {/* slim top bar */}
          <div
            className="flex h-[52px] items-center justify-between px-[22px]"
            style={{ borderBottom: "1px solid rgba(42,23,15,.16)", animation: `ip-fade .6s ease both` }}
          >
            <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", color: "#fff8f1" }}>
              YS.
            </span>
            <span className="flex items-center gap-[7px]" style={mono(10, "0.14em", "rgba(255,248,241,.74)")}>
              <span
                className="inline-block h-[6px] w-[6px] rounded-full"
                style={{ background: "var(--ys-highlight)", animation: "ip-pulse 2.4s ease-in-out infinite" }}
              />
              <span suppressHydrationWarning>OPEN · {clock || "—"}</span>
            </span>
          </div>

          {/* hero block */}
          <div className="px-[22px] pb-[30px] pt-[26px]">
            <div className="flex items-start justify-between gap-4">
              <div style={{ animation: `ip-rise .8s ${EASE} .05s both` }}>
                <p style={{ ...mono(10.5, "0.2em", "rgba(255,248,241,.72)"), lineHeight: 1.75 }}>
                  INDEX № 01
                  <br />
                  PORTFOLIO — 2026
                </p>
                <div className="mt-3 h-px w-[52px]" style={{ background: "rgba(255,248,241,.42)" }} />
              </div>

              {/* headshot + teal registration arc */}
              <div className="relative h-[116px] w-[116px] shrink-0" style={{ animation: `ip-rise .9s ${EASE} .1s both` }}>
                <span
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    inset: -7,
                    border: "2px solid transparent",
                    borderTopColor: "var(--ys-highlight)",
                    borderRightColor: "var(--ys-highlight)",
                  }}
                />
                <div
                  className="relative h-[116px] w-[116px] overflow-hidden rounded-full"
                  style={{ border: "1px solid rgba(255,248,241,.5)" }}
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Yogesh Sahu"
                    width={116}
                    height={116}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* name lockup */}
            <h1 className="mt-6">
              <span
                className="block italic"
                style={{
                  fontFamily: SERIF,
                  fontWeight: 500,
                  fontSize: "clamp(62px,19vw,104px)",
                  lineHeight: 0.82,
                  letterSpacing: "-0.01em",
                  color: "#fff8f1",
                  textShadow: "3px 4px 0 rgba(42,23,15,.22)",
                  animation: `ip-line .9s ${EASE} .12s both`,
                }}
              >
                Yogesh
              </span>
              <span className="-mt-px flex justify-end">
                <span
                  className="uppercase"
                  style={{
                    fontFamily: HEAD,
                    fontWeight: 700,
                    fontSize: "clamp(42px,12.5vw,72px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                    color: "#fff8f1",
                    textShadow: "2px 3px 0 rgba(42,23,15,.18)",
                    animation: `ip-line .9s ${EASE} .2s both`,
                  }}
                >
                  Sahu
                </span>
              </span>
            </h1>
            <p
              className="mt-5"
              style={{ ...mono(11, "0.16em", "rgba(255,248,241,.84)"), animation: `ip-fade .8s ease .3s both` }}
            >
              —&nbsp; Founder · AI-Native Builder · CTO
            </p>
          </div>

          {/* rotating pitch */}
          <RotatingPitch />
        </div>
      </header>

      {/* ============ METRICS + CTA + NAV ============ */}
      <div className="mx-auto max-w-[480px]" style={{ background: "var(--ys-surface)" }}>
        <div className="grid grid-cols-3" style={{ gap: 1, background: "var(--ys-surface-muted)" }}>
          <Metric mref={apps as RefObject<HTMLDivElement>} zero="0+" label="Apps shipped" />
          <Metric mref={loc as RefObject<HTMLDivElement>} zero="0M+" label="Lines of code" />
          <Metric mref={dp as RefObject<HTMLDivElement>} zero="0B+" label={<>Datapoints&nbsp;/&nbsp;day</>} />
        </div>

        <button
          onClick={() => scrollToId("mobile-diagnostic")}
          className="focus-ring flex w-full items-center justify-between px-[22px] py-[19px]"
          style={{ background: "var(--ys-highlight)", color: "#fff8f1", border: "none" }}
          aria-label="Start a diagnostic"
        >
          <span style={mono(13, "0.16em", "#fff8f1")}>Start a Diagnostic</span>
          <span style={{ fontSize: 16 }}>→</span>
        </button>

        <NavStrip />

        {/* ============ CONTENT ============ */}
        <VenturesSection />
        <SelectedWork />
        <WorkWithMe />
        <ContactSection />
      </div>

      {/* ============ FOOTER ============ */}
      <footer className="px-[22px] pb-10 pt-8" style={{ background: "var(--ys-surface)" }}>
        <div
          style={{
            borderTop: "1px solid var(--ys-border)",
            paddingTop: 20,
            ...mono(10, "0.14em", "var(--ys-text-soft)"),
            lineHeight: 1.9,
          }}
        >
          © 2026 YOGESH SAHU
          <br />
          OPEN TO ARCHITECTURE MANDATES
        </div>
      </footer>
    </div>
  );
}
