"use client";

import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const disciplines = [
  { label: "AI", color: "var(--ys-accent)", lines: ["Vertex AI | Together.ai", "From workflow to enterprise rollout", "Cost-aware integration"] },
  { label: "ARCHITECTURE", color: "var(--ys-highlight)", lines: ["GCP | PostgreSQL", "99.9% uptime SLA", "1B+ data points/day"] },
  { label: "LEADERSHIP", color: "var(--ys-text)", lines: ["Product x engineering alignment", "Stakeholder management", "Founder empathy"] },
];

const credentials = [
  { label: "STRATHCLYDE", body: "MSc FinTech, merit, dissertation topper (82/100). AML false positives reduced from 87% to 59%." },
  { label: "BARCLAYS / TIMES INTERNET", body: "Credit card product & AI/ML at Barclays (10K+ customers). Chief Tech Architect at Times Internet (India foundation DB)." },
  { label: "UBISOFT", body: "QA Lead across Assassin's Creed, For Honor, and Just Dance. 250K first-day users." },
];

const outcomes = [
  { value: "17", label: "production repos" },
  { value: "99.9%", label: "pipeline uptime" },
  { value: "130+", label: "indicators" },
  { value: "50K", label: "game downloads" },
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
              HANDS-ON CHIEF SOLUTIONS ARCHITECT | FRACTIONAL CTO
            </p>
          </div>
        </div>
      </div>

      <p
        className="mb-7 max-w-lg text-[14px] leading-[1.9]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
      >
        I step in when teams need more than another senior engineer and less risk than the wrong
        full-time CTO hire. My work sits at the intersection of consulting discovery, architecture
        direction, and hands-on delivery. I help clients move from ambiguity to scoped, buildable,
        and commercially credible execution plans.
      </p>

      <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {disciplines.map((discipline) => (
          <div key={discipline.label} className="border-l-2 pl-3" style={{ borderColor: discipline.color }}>
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--font-mono)", color: discipline.color }}
            >
              {discipline.label}
            </p>
            {discipline.lines.map((line) => (
              <span
                key={line}
                className="block text-[11px] leading-[1.9]"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text-soft)" }}
              >
                {line}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t pt-6" style={{ borderColor: "var(--ys-border)" }}>
        <p
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Credibility
        </p>
        <div className="mb-7 flex flex-col gap-3">
          {credentials.map((item) => (
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
