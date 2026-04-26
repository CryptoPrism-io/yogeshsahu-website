"use client";

import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const ventures = [
  {
    label: "TRINETRY INFOTECH PVT LTD",
    role: "Managing Director",
    color: "var(--ys-accent)",
    body: "Founded technology consultancy building AI-powered SaaS products and providing fractional CTO consulting. Replacing manual SME workflows with agentic AI.",
    products: ["Pratyaksha — 4-agent AI journaling", "GyanMarg — EdTech platform", "ERP/CRM with agentic AI"],
  },
  {
    label: "CRYPTOPRISM",
    role: "Founder & CTO",
    color: "var(--ys-highlight)",
    body: "Full-stack crypto intelligence platform — on-chain analytics, ML trading signals via TimesFM, and automated spot trading bots processing 1B+ datapoints across 100+ coins.",
    products: ["On-chain analytics pipeline", "TimesFM 100-coin trading bot", "News sentiment trading signals"],
  },
];

const careerHighlights = [
  { label: "TIMES OF INDIA", body: "Chief Technological Architect. Built AI Bharatverse — interactive AI platform for Indian history exploration." },
  { label: "BARCLAYS", body: "ML Engineer, Fraud Analytics. Built ML pipelines for credit card fraud detection at scale." },
  { label: "ISHA FOUNDATION", body: "Shipped Kari — 50K+ downloads. Mandala Support — 4.2M engagements across 120 countries." },
  { label: "STRATHCLYDE", body: "MSc FinTech, merit, dissertation topper (82/100). AML false positives 87% → 59%." },
];

const outcomes = [
  { value: "2", label: "companies founded" },
  { value: "1B+", label: "datapoints/day" },
  { value: "100+", label: "coins tracked" },
  { value: "50K+", label: "game downloads" },
];

export default function AboutWindow() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-7 border-b pb-7" style={{ borderColor: "var(--ys-border)" }}>
        <div className="flex items-start gap-5">
          <ImagePlaceholder
            variant="profile"
            className="h-28 w-28 shrink-0 rounded-2xl"
          />
          <div>
            <h1 className="mb-3 leading-[0.9] tracking-[-0.04em]">
              <span
                className="block text-[clamp(2.6rem,5.6vw,4.2rem)] font-black italic"
                style={{ fontFamily: "var(--font-serif-display)", color: "var(--ys-accent)" }}
              >
                Yogesh
              </span>
              <span
                className="block text-[clamp(2.3rem,4.8vw,3.8rem)] font-bold uppercase"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
              >
                Sahu
              </span>
            </h1>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              FOUNDER | MANAGING DIRECTOR | CTO
            </p>
          </div>
        </div>
      </div>

      <p
        className="mb-7 max-w-lg text-[14px] leading-[1.9]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
      >
        Builder first. I founded two companies, shipped products to market, and operate at the
        intersection of AI, fintech, and data infrastructure. When I consult, I bring
        founder-level ownership — not slide decks.
      </p>

      <div className="mb-7">
        <p
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          What I&apos;m Building
        </p>
        <div className="flex flex-col gap-4">
          {ventures.map((v) => (
            <div
              key={v.label}
              className="rounded-lg border-l-2 border p-4"
              style={{
                borderColor: "var(--ys-border)",
                borderLeftColor: v.color,
                background: "var(--ys-surface-strong)",
              }}
            >
              <div className="mb-1 flex items-center gap-2">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ fontFamily: "var(--font-mono)", color: v.color }}
                >
                  {v.label}
                </p>
                <span
                  className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "rgba(11, 141, 128, 0.12)",
                    color: "var(--ys-highlight)",
                  }}
                >
                  {v.role}
                </span>
              </div>
              <p
                className="mb-2 text-[12px] leading-[1.8]"
                style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
              >
                {v.body}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {v.products.map((p) => (
                  <span
                    key={p}
                    className="rounded border px-2 py-0.5 text-[9px]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      borderColor: "var(--ys-border)",
                      color: "var(--ys-text-soft)",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6" style={{ borderColor: "var(--ys-border)" }}>
        <p
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Career Highlights
        </p>
        <div className="mb-7 flex flex-col gap-3">
          {careerHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border p-4"
              style={{
                borderColor: "var(--ys-border)",
                background: "var(--ys-surface-strong)",
              }}
            >
              <p
                className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text)" }}
              >
                {item.label}
              </p>
              <p
                className="text-[12px] leading-[1.8]"
                style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t pt-6 sm:grid-cols-4" style={{ borderColor: "var(--ys-border)" }}>
        {outcomes.map((item) => (
          <div key={item.label} className="text-center">
            <p
              className="text-[1.45rem] font-bold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
            >
              {item.value}
            </p>
            <p
              className="text-[9px] uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
