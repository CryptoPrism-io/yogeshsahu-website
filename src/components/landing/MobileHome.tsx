"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Mail,
  Briefcase,
  FileText,
  Terminal,
  Award,
  FolderOpen,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import DiagnosticWindow from "@/components/windows/DiagnosticWindow";

const MONO = "var(--font-mono)";
const HEAD = "var(--font-headline)";
const BODY = "var(--font-body)";
const SERIF = "var(--font-serif-display)";
const EASE = "cubic-bezier(.16,.84,.44,1)";

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

/* ── navigation portal — wired to real in-page sections, not all → /work */
type NavItem = {
  idx: string;
  label: string;
  sub: string;
  href?: string;
  target?: string;
};

const NAV: NavItem[] = [
  { idx: "01", label: "WORK HUB", sub: "12 case studies · 3 leadership clusters", href: "/work" },
  { idx: "02", label: "ABOUT", sub: "Founder journey · CTO profile", target: "mobile-about" },
  { idx: "03", label: "PROJECTS", sub: "AI · Fintech · Enterprise systems", target: "mobile-projects" },
  { idx: "04", label: "WORK WITH ME", sub: "Diagnostic sprint · idea → shipped", target: "mobile-diagnostic" },
  { idx: "05", label: "EXPERIENCE", sub: "Times of India · Barclays · Isha", target: "mobile-experience" },
  { idx: "06", label: "CONTACT", sub: "Architecture mandates · Book a call", target: "mobile-contact" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── career highlights, from the design's mobile view ────────────────── */
function CareerHighlights() {
  const pb = useCountUp(72, " PB+", 1100, 120);
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-5 pt-9"
      style={{ background: "var(--ys-surface)" }}
    >
      <div className="mb-[18px] flex items-center justify-between">
        <span style={mono(10.5, "0.2em", "var(--ys-text-soft)")}>Founder Ventures</span>
        <span
          style={{
            ...mono(10.5, "0.12em", "var(--ys-text)"),
            border: "1px solid var(--ys-border)",
            padding: "5px 10px",
          }}
        >
          2× Founder
        </span>
      </div>

      <div style={{ borderTop: "1px solid var(--ys-surface-muted)", paddingTop: 16 }}>
        <div className="flex items-baseline justify-between">
          <span style={mono(10.5, "0.16em", "var(--ys-text-soft)")}>CryptoPrism</span>
          <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#c9ad97" }}>01</span>
        </div>
        <div
          ref={pb}
          style={{
            fontFamily: HEAD,
            fontWeight: 700,
            fontSize: "clamp(40px,12vw,52px)",
            color: "var(--ys-highlight)",
            lineHeight: 1,
            margin: "8px 0 10px",
            letterSpacing: "-0.02em",
          }}
        >
          0 PB+
        </div>
        <p style={{ fontFamily: BODY, fontSize: 14, lineHeight: 1.5, color: "var(--ys-text)" }}>
          Built a 72+ petabyte data pipeline and made it accessible to anyone through an NLP-to-SQL
          chat — query the entire crypto market in plain language.
        </p>
      </div>

      <div style={{ borderTop: "1px solid var(--ys-surface-muted)", marginTop: 18, paddingTop: 16 }}>
        <div className="flex items-baseline justify-between">
          <span style={mono(10, "0.14em", "var(--ys-text-soft)")}>Kari &amp; Lost Shrines</span>
          <span style={{ fontFamily: MONO, fontSize: 10, color: "#c9ad97" }}>02</span>
        </div>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 700,
            fontSize: 26,
            color: "var(--ys-accent)",
            margin: "6px 0",
            letterSpacing: "-0.02em",
          }}
        >
          2M+
        </div>
        <p style={{ fontFamily: BODY, fontSize: 13, lineHeight: 1.45, color: "var(--ys-text)" }}>
          50K+ downloads for Isha Foundation; 2M social reach in 2020.
        </p>
      </div>

      <div style={{ borderTop: "1px solid var(--ys-surface-muted)", marginTop: 18, paddingTop: 16 }}>
        <div className="flex items-baseline justify-between">
          <span style={mono(10, "0.14em", "var(--ys-text-soft)")}>Gamerz Nation</span>
          <span style={{ fontFamily: MONO, fontSize: 10, color: "#c9ad97" }}>03</span>
        </div>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 700,
            fontSize: 26,
            color: "var(--ys-accent)",
            margin: "6px 0",
            letterSpacing: "-0.02em",
          }}
        >
          100K+
        </div>
        <p style={{ fontFamily: BODY, fontSize: 13, lineHeight: 1.45, color: "var(--ys-text)" }}>
          First startup at 22 — 7 franchises and 100K+ revenue in its first year.
        </p>
      </div>
    </motion.section>
  );
}

/* ── content section (editorial header + expandable body) ─────────────── */
function MobileSection({
  id,
  num,
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  id?: string;
  num: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section id={id} className="scroll-mt-2 border-t" style={{ borderColor: "var(--ys-surface-muted)" }}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-[18px]"
        style={{ background: "var(--ys-surface)" }}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5">
          <span style={{ ...mono(10, "0.12em", "#c9ad97"), width: 18 }}>{num}</span>
          <span style={{ color: "var(--ys-text-soft)" }}>{icon}</span>
          <span
            className="text-[14px] font-bold uppercase tracking-[0.06em]"
            style={{ fontFamily: HEAD, color: "var(--ys-text)" }}
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
      {isOpen && <div style={{ background: "var(--ys-surface)" }}>{children}</div>}
    </section>
  );
}

export default function MobileHome() {
  const clock = useClock();
  const apps = useCountUp(6, "+", 900, 350);
  const loc = useCountUp(2, "M+", 950, 430);
  const dp = useCountUp(1, "B+", 1000, 510);
  const [arrow, setArrow] = useState(0);

  return (
    <div className="fixed inset-0 overflow-y-auto" style={{ background: "var(--ys-surface)" }}>
      {/* ============ HERO ============ */}
      <header className="relative overflow-hidden" style={{ background: "var(--ys-bg)" }}>
        {/* warm radial wash + grain, matching desktop */}
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

          {/* bio band */}
          <div
            className="px-[22px] py-6"
            style={{
              background: "var(--ys-bg-deep)",
              borderTop: "1px solid rgba(42,23,15,.2)",
              borderBottom: "1px solid rgba(42,23,15,.2)",
              animation: `ip-fade .8s ease .36s both`,
            }}
          >
            <p style={{ fontFamily: BODY, fontSize: 16.5, lineHeight: 1.5, color: "#fff8f1" }}>
              I build and ship AI-native B2B &amp; B2C products end-to-end — 6+ production-grade apps
              in 6 months,{" "}
              <em style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500, fontSize: 18.5, color: "#ffd9c2" }}>
                not MVPs.
              </em>
            </p>
            <div className="mt-[18px] flex gap-1.5">
              <span className="h-[3px] w-9" style={{ background: "#fff8f1" }} />
              <span className="h-[3px] w-[18px]" style={{ background: "rgba(255,248,241,.38)" }} />
              <span className="h-[3px] w-[18px]" style={{ background: "rgba(255,248,241,.38)" }} />
              <span className="h-[3px] w-[18px]" style={{ background: "rgba(255,248,241,.38)" }} />
            </div>
          </div>
        </div>
      </header>

      {/* ============ METRICS ============ */}
      <div className="mx-auto max-w-[480px]" style={{ background: "var(--ys-surface)" }}>
        <div className="grid grid-cols-3" style={{ gap: 1, background: "var(--ys-surface-muted)" }}>
          {[
            { ref: apps, zero: "0+", label: "Apps shipped" },
            { ref: loc, zero: "0M+", label: "Lines of code" },
            { ref: dp, zero: "0B+", label: "Datapoints / day" },
          ].map((m, i) => (
            <div key={i} className="px-4 py-5" style={{ background: "var(--ys-surface)" }}>
              <div
                ref={m.ref as RefObject<HTMLDivElement>}
                style={{
                  fontFamily: HEAD,
                  fontWeight: 700,
                  fontSize: "clamp(26px,8vw,32px)",
                  color: "var(--ys-accent)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {m.zero}
              </div>
              <div className="mt-[7px]" style={mono(9, "0.08em", "var(--ys-text-soft)")}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollToId("mobile-diagnostic")}
          onTouchStart={() => setArrow(6)}
          onTouchEnd={() => setArrow(0)}
          className="focus-ring flex w-full items-center justify-between px-[22px] py-[19px]"
          style={{ background: "var(--ys-highlight)", color: "#fff8f1", border: "none" }}
          aria-label="Start a diagnostic"
        >
          <span style={mono(13, "0.16em", "#fff8f1")}>Start a Diagnostic</span>
          <span
            style={{ fontSize: 16, display: "inline-block", transform: `translateX(${arrow}px)`, transition: `transform .25s ${EASE}` }}
          >
            →
          </span>
        </button>

        {/* ============ NAVIGATION PORTAL ============ */}
        <div className="px-[22px] pb-1.5 pt-[22px]" style={mono(10, "0.24em", "var(--ys-text-soft)")}>
          Navigation Portal
        </div>
        {NAV.map((n) => {
          const inner = (
            <>
              <span style={{ ...mono(10, "0", "var(--ys-text-soft)"), width: 22, flex: "none" }}>{n.idx}</span>
              <span className="min-w-0 flex-1">
                <span
                  className="block text-[22px] font-bold leading-[1.08]"
                  style={{ fontFamily: HEAD, color: "var(--ys-text)", letterSpacing: "-0.01em" }}
                >
                  {n.label}
                </span>
                <span className="mt-[3px] block text-[12.5px]" style={{ fontFamily: BODY, color: "var(--ys-text-soft)" }}>
                  {n.sub}
                </span>
              </span>
              <span style={{ fontFamily: HEAD, fontSize: 19, color: "var(--ys-text-soft)", flex: "none" }}>→</span>
            </>
          );
          const cls = "flex w-full items-center gap-3.5 border-t px-[22px] py-[17px] text-left active:bg-[var(--ys-surface-strong)]";
          const style = { borderColor: "var(--ys-surface-muted)", background: "var(--ys-surface)" } as CSSProperties;
          return n.href ? (
            <Link key={n.idx} href={n.href} className={cls} style={style}>
              {inner}
            </Link>
          ) : (
            <button key={n.idx} onClick={() => n.target && scrollToId(n.target)} className={cls} style={style}>
              {inner}
            </button>
          );
        })}
        <div style={{ borderTop: "1px solid var(--ys-surface-muted)" }} />
      </div>

      {/* ============ CAREER HIGHLIGHTS ============ */}
      <div className="mx-auto max-w-[480px]">
        <CareerHighlights />
      </div>

      {/* ============ CONTENT SECTIONS ============ */}
      <div className="mx-auto mt-9 max-w-[480px]">
        <MobileSection id="mobile-about" num="01" title="About" icon={<FileText size={16} />} defaultOpen>
          <AboutWindow hideHeader />
        </MobileSection>

        <MobileSection id="mobile-projects" num="02" title="Projects" icon={<FolderOpen size={16} />} defaultOpen>
          <ProjectsWindow />
        </MobileSection>

        <MobileSection id="mobile-diagnostic" num="03" title="Work With Me" icon={<Terminal size={16} />}>
          <DiagnosticWindow onStart={() => scrollToId("mobile-contact")} />
        </MobileSection>

        <MobileSection id="mobile-experience" num="04" title="Experience" icon={<Briefcase size={16} />}>
          <ExperienceWindow />
        </MobileSection>

        <MobileSection id="mobile-credentials" num="05" title="Credentials" icon={<Award size={16} />}>
          <CredentialsWindow />
        </MobileSection>

        <MobileSection id="mobile-contact" num="06" title="Contact" icon={<Mail size={16} />} defaultOpen>
          <ContactWindow />
        </MobileSection>
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
