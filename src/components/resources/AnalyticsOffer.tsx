"use client";

import { useEffect } from "react";
import {
  ArrowDown,
  ArrowRight,
  Download,
  MessageSquareText,
  Target,
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
  "What's the one thing I should change this week?",
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
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-2)" }}
        >
          Resources / AI Product Analyst
        </p>
        <h2
          className="font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--color-ink)",
            fontSize: "clamp(30px, 4.5vw, 56px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          Your analytics tell you what happened.
          <br />
          <span style={{ color: "var(--color-accent)" }}>This tells you what to do next.</span>
        </h2>
        <p
          className="max-w-[62ch] text-[15px] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-ink-2)" }}
        >
          A lightweight AI product analyst that turns product behaviour into an
          evidence-backed action to take next.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#design-partner"
            onClick={handlePartnerCta}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-mono font-bold transition-transform hover:translate-y-[-1px]"
            style={{ background: "var(--color-accent-strong)", color: "var(--color-paper)" }}
          >
            Become a design partner
            <ArrowRight size={15} />
          </a>
          <a
            href="#builder"
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-mono font-semibold transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:translate-y-[-1px]"
            style={{
              borderColor: "var(--color-rule)",
              color: "var(--color-ink-2)",
              background: "var(--color-paper-muted)",
            }}
          >
            Build it yourself
            <ArrowDown size={15} />
          </a>
        </div>
      </section>

      {/* ── 2. PROOF ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent-strong)" }}
        >
          What founders actually ask
        </p>
        <div className="flex flex-wrap gap-2">
          {FOUNDER_QUESTIONS.map((q) => (
            <span
              key={q}
              className="rounded-full border px-4 py-2 text-[13px] font-mono"
              style={{
                borderColor: "var(--color-rule)",
                color: "var(--color-ink)",
                background: "var(--color-paper-muted)",
              }}
            >
              “{q}”
            </span>
          ))}
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border p-5 md:p-7"
          style={{
            borderColor: "var(--color-rule)",
            background:
              "linear-gradient(135deg, var(--color-paper-2) 0%, var(--color-paper-muted) 100%)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareText size={14} style={{ color: "var(--color-accent)" }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-2)" }}
            >
              What an answer looks like · illustrative example, not live data
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-accent-strong)" }}>
                Biggest opportunity
              </p>
              <p className="text-[15px] leading-[1.6]" style={{ color: "var(--color-ink)" }}>
                Mobile conversion is 38% below desktop.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-accent-strong)" }}>
                Recommended experiment
              </p>
              <p className="text-[15px] leading-[1.6]" style={{ color: "var(--color-ink)" }}>
                Move the primary CTA above the comparison table.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-accent-strong)" }}>
                Success metric
              </p>
              <p className="text-[15px] leading-[1.6]" style={{ color: "var(--color-ink)" }}>
                Mobile signup conversion &gt; 4.5%.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-accent-strong)" }}>
                Confidence
              </p>
              <p className="text-[15px] leading-[1.6]" style={{ color: "var(--color-ink)" }}>
                Medium — hypotheses clearly separated from facts, never causality
                from correlation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ────────────────────────────────────── */}
      <section className="space-y-4">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent-strong)" }}
        >
          How it works
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--color-rule)", background: "var(--color-paper-muted)" }}
            >
              <p
                className="text-[11px] font-bold"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-2)" }}
              >
                {s.n}
              </p>
              <p
                className="mt-1 text-sm font-bold tracking-wide"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
              >
                {s.title}
              </p>
              <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>
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
          borderColor: "var(--color-rule)",
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--color-accent) 8%, transparent) 0%, var(--color-paper-muted) 100%)",
        }}
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent-strong)" }}
        >
          The offer
        </p>
        <h3
          className="mt-2 text-2xl font-bold uppercase"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
        >
          Looking for 3 design partners
        </h3>
        <p
          className="mt-3 max-w-[58ch] text-[14px] leading-[1.7]"
          style={{ color: "var(--color-ink-2)" }}
        >
          I&apos;ll set this up on your product and run the AI Product Analyst with you for
          3 weeks. No charge while I&apos;m validating it. In return, I want honest feedback
          and to understand the questions you actually want your analytics to answer.
        </p>
        <ul className="mt-4 space-y-1.5 text-[13px]" style={{ color: "var(--color-ink-2)" }}>
          <li>· A 3-week concierge pilot on your product</li>
          <li>· A weekly product memo — what changed, why, and one experiment to run</li>
          <li>· Ask anything, any time — plain language, no dashboard required</li>
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={MAILTO}
            onClick={handlePartnerCta}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-mono font-bold transition-transform hover:translate-y-[-1px]"
            style={{ background: "var(--color-accent-strong)", color: "var(--color-paper)" }}
          >
            Try it on my product
            <ArrowRight size={15} />
          </a>
          <span className="text-[11.5px] font-mono" style={{ color: "var(--color-ink-2)" }}>
            3 spots · 3 weeks · zero cost while validating
          </span>
        </div>
        <p className="mt-4 text-[11.5px]" style={{ color: "var(--color-ink-2)" }}>
          Your data stays yours — cookieless tracking, self-hosted, no third-party data.
        </p>
      </section>

      {/* ── 5. BUILDER — install it yourself ───────────────────── */}
      <section id="builder" className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-2">
          <Target size={14} style={{ color: "var(--color-accent)" }} />
          <p
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-2)" }}
          >
            Build it yourself
          </p>
        </div>
        <h3
          className="text-2xl font-bold uppercase"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
        >
          Want to build it yourself?
        </h3>
        <p
          className="max-w-[62ch] text-[14px] leading-[1.7]"
          style={{ color: "var(--color-ink-2)" }}
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
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-mono font-semibold transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:translate-y-[-1px]"
            style={{
              borderColor: "var(--color-rule)",
              color: "var(--color-ink)",
              background: "var(--color-paper-muted)",
            }}
          >
            <Download size={15} />
            Download the toolkit (.zip) — README · SKILL.md · snippets
          </a>
          <span className="text-[11.5px] font-mono" style={{ color: "var(--color-ink-2)" }}>
            Replace YOUR-DOMAIN with your product&apos;s domain.
          </span>
        </div>
      </section>

      {/* footer line */}
      <p
        className="pt-2 text-[11.5px] leading-[1.6]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-2)" }}
      >
        Built on a self-hosted, cookieless stack — no consent banners, no third-party
        data, no dark patterns. <span style={{ color: "var(--color-accent-strong)" }}>Stop reading dashboards. Ask what happened, why it
        matters, and what to change next.</span>
      </p>
    </div>
  );
}
