"use client";

import { useEffect } from "react";
import {
  ArrowDown,
  ArrowRight,
  Download,
  MessageSquareText,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import CopyBox from "./CopyBox";
import {
  SNIPPET,
  HELPER,
  EVENTS_GUIDE,
  GOALS_SQL,
  VERIFY,
  FULL_PROMPT,
  MAILTO_SUBJECT,
  MAILTO_BODY,
} from "@/data/analytics-offer";

const MAILTO = `mailto:yogesh.sahu@cryptoprism.io?subject=${encodeURIComponent(
  MAILTO_SUBJECT
)}&body=${encodeURIComponent(MAILTO_BODY)}`;

const FOUNDER_QUESTIONS = [
  "Why aren't people signing up?",
  "Did last week's launch actually work?",
  "If I change one thing this week, what should it be?",
];

const STEPS = [
  {
    n: "01",
    title: "CONNECT",
    line: "Paste one cookieless tracking snippet. No consent banners, no third-party data.",
  },
  {
    n: "02",
    title: "ASK",
    line: "Ask anything about traffic, conversion, launches and drop-offs — in plain language.",
  },
  {
    n: "03",
    title: "ACT",
    line: "Get one evidence-backed recommendation and a metric to test it against.",
  },
];

export default function AnalyticsOffer() {
  useEffect(() => {
    trackEvent("analytics_view");
  }, []);

  const handlePartnerCta = () => {
    trackEvent("contact_click", { source: "design-partner" });
  };

  return (
    <div className="space-y-10 pb-4">
      {/* ── 1. OUTCOME ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          <Sparkles size={12} className="inline mr-1.5" />
          Offering · AI Product Analyst
        </p>
        <h2
          className="font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
            fontSize: "clamp(30px, 4.5vw, 56px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          Your analytics tell you what happened.
          <br />
          <span style={{ color: "var(--ys-accent)" }}>This tells you what to do next.</span>
        </h2>
        <p
          className="max-w-[62ch] text-[15px] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          A lightweight AI product analyst for founders. One tracking snippet → ask
          questions about your product → get a weekly memo with the single
          highest-value experiment to run next.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#design-partner"
            onClick={handlePartnerCta}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-mono font-bold transition-transform hover:translate-y-[-1px]"
            style={{ background: "var(--ys-accent)", color: "var(--ys-surface)" }}
          >
            Try it on my product
            <ArrowRight size={15} />
          </a>
          <a
            href="#builder"
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-mono font-semibold transition-all"
            style={{
              borderColor: "var(--ys-border)",
              color: "var(--ys-text-soft)",
              background: "var(--ys-surface-muted)",
            }}
          >
            Install the toolkit yourself
            <ArrowDown size={15} />
          </a>
        </div>
      </section>

      {/* ── 2. PROOF ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-highlight)" }}
        >
          What founders actually ask
        </p>
        <div className="flex flex-wrap gap-2">
          {FOUNDER_QUESTIONS.map((q) => (
            <span
              key={q}
              className="rounded-full border px-4 py-2 text-[12.5px] font-mono"
              style={{
                borderColor: "var(--ys-border)",
                color: "var(--ys-text)",
                background: "var(--ys-surface-muted)",
              }}
            >
              “{q}”
            </span>
          ))}
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border p-5 md:p-7"
          style={{
            borderColor: "var(--ys-border)",
            background:
              "linear-gradient(135deg, var(--ys-surface-strong) 0%, var(--ys-surface-muted) 100%)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareText size={14} style={{ color: "var(--ys-accent)" }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              A real answer · from the live analyst · running on this site&apos;s own data
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--ys-highlight)" }}>
                Biggest opportunity
              </p>
              <p className="text-[13.5px] leading-[1.6]" style={{ color: "var(--ys-text)" }}>
                Instrument conversion events (contact clicks, downloads, project opens)
                so intent can be told apart from casual visits — today&apos;s data can&apos;t
                measure who the target audience is.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--ys-highlight)" }}>
                Recommended experiment
              </p>
              <p className="text-[13.5px] leading-[1.6]" style={{ color: "var(--ys-text)" }}>
                Add one prominent homepage CTA to /work and track its click-through
                rate for 7 days.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--ys-highlight)" }}>
                Success metric
              </p>
              <p className="text-[13.5px] leading-[1.6]" style={{ color: "var(--ys-text)" }}>
                CTA click-through rate ≥ 30% of homepage visitors.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--ys-highlight)" }}>
                Confidence
              </p>
              <p className="text-[13.5px] leading-[1.6]" style={{ color: "var(--ys-text)" }}>
                Low — the analyst said so itself. Two visitors aren&apos;t a sample, they&apos;re
                an anecdote. Measurement first, conclusions later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ────────────────────────────────────── */}
      <section className="space-y-4">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-highlight)" }}
        >
          How it works
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-muted)" }}
            >
              <p
                className="text-[11px] font-bold"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
              >
                {s.n}
              </p>
              <p
                className="mt-1 text-sm font-bold tracking-wide"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
              >
                {s.title}
              </p>
              <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "var(--ys-text-soft)" }}>
                {s.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. DESIGN PARTNER CTA ──────────────────────────────── */}
      <section
        id="design-partner"
        className="scroll-mt-24 rounded-2xl border p-6 md:p-8"
        style={{
          borderColor: "var(--ys-border)",
          background:
            "linear-gradient(135deg, rgba(207, 79, 39, 0.08) 0%, var(--ys-surface-muted) 100%)",
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          The offer
        </p>
        <h3
          className="mt-2 text-2xl font-bold uppercase"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          Looking for 3 design partners
        </h3>
        <p
          className="mt-3 max-w-[58ch] text-[14px] leading-[1.7]"
          style={{ color: "var(--ys-text-soft)" }}
        >
          I&apos;ll set this up on your product and run the AI Product Analyst with you for
          3 weeks. No charge while I&apos;m validating it. In return, I want honest feedback
          and permission to learn from how you use it.
        </p>
        <ul className="mt-4 space-y-1.5 text-[13px]" style={{ color: "var(--ys-text-soft)" }}>
          <li>· A 3-week concierge pilot on your product</li>
          <li>· A weekly product memo — what changed, why, and one experiment to run</li>
          <li>· Ask anything, any time — plain language, no dashboard required</li>
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={MAILTO}
            onClick={handlePartnerCta}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-mono font-bold transition-transform hover:translate-y-[-1px]"
            style={{ background: "var(--ys-accent)", color: "var(--ys-surface)" }}
          >
            Become a design partner
            <ArrowRight size={15} />
          </a>
          <span className="text-[11.5px] font-mono" style={{ color: "var(--ys-text-soft)" }}>
            3 spots · 3 weeks · zero cost while validating
          </span>
        </div>
        <p className="mt-4 text-[11.5px]" style={{ color: "var(--ys-text-soft)" }}>
          Your data stays yours — cookieless tracking, self-hosted, no third-party data.
        </p>
      </section>

      {/* ── 5. BUILDER — install it yourself ───────────────────── */}
      <section id="builder" className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-2">
          <Target size={14} style={{ color: "var(--ys-accent)" }} />
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
          >
            Build it yourself
          </p>
        </div>
        <h3
          className="text-2xl font-bold uppercase"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          Want to build it yourself?
        </h3>
        <p
          className="max-w-[62ch] text-[14px] leading-[1.7]"
          style={{ color: "var(--ys-text-soft)" }}
        >
          The complete toolkit — prompt, skill file, and snippets. Works with any AI
          coding agent (Claude, Cursor, Copilot). Paste the full prompt into your
          agent, or download the skill and drop it into <span style={{ fontFamily: "var(--font-mono)" }}>.claude/skills/</span>.
        </p>

        <div className="grid gap-3 lg:grid-cols-2">
          <CopyBox label="01 · Tracking snippet" code={SNIPPET} piece="snippet" />
          <CopyBox label="02 · trackEvent helper (TS)" code={HELPER} piece="helper" />
          <CopyBox label="03 · Event naming guidance" code={EVENTS_GUIDE} piece="events" />
          <CopyBox label="04 · Register conversion Goals" code={GOALS_SQL} piece="goals" />
          <div className="lg:col-span-2">
            <CopyBox label="05 · Verify it works" code={VERIFY} piece="verify" />
          </div>
          <div className="lg:col-span-2">
            <CopyBox
              label="06 · Full prompt — paste into any agent"
              code={FULL_PROMPT}
              piece="full"
              maxHeight={380}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <a
            href="/skills/plausible-analytics.zip"
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-mono font-semibold transition-all hover:translate-y-[-1px]"
            style={{
              borderColor: "var(--ys-border)",
              color: "var(--ys-text)",
              background: "var(--ys-surface-muted)",
            }}
          >
            <Download size={15} />
            Download the toolkit (.zip) — README · SKILL.md · snippets
          </a>
          <span className="text-[11.5px] font-mono" style={{ color: "var(--ys-text-soft)" }}>
            Replace YOUR-DOMAIN with your product&apos;s domain.
          </span>
        </div>
      </section>

      {/* footer line */}
      <p
        className="pt-2 text-[11.5px] leading-[1.6]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
      >
        Built on a self-hosted, cookieless stack — no consent banners, no third-party
        data, no dark patterns. <span style={{ color: "var(--ys-highlight)" }}>Stop reading dashboards. Ask what happened, why it
        matters, and what to change next.</span>
      </p>
    </div>
  );
}
