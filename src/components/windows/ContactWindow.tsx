"use client";

const MANDATE_TYPES = [
  {
    label: "FRACTIONAL CTO",
    body: "Architecture decisions, execution planning, hiring support, and technical due diligence.",
    color: "var(--ys-accent)",
  },
  {
    label: "DATA ENGINEERING",
    body: "Pipeline design, warehouse strategy, reliability hardening, and production observability.",
    color: "var(--ys-highlight)",
  },
  {
    label: "AI PRODUCT",
    body: "Model-assisted workflows, LLM integration, and finance-specific product shaping.",
    color: "var(--ys-text)",
  },
];

const LINKS = [
  { label: "EMAIL", content: "yogesh@cryptoprism.io", href: "mailto:yogesh@cryptoprism.io" },
  { label: "LINKEDIN", content: "linkedin.com/in/yogeshsahu", href: "https://linkedin.com/in/yogeshsahu" },
  { label: "GITHUB", content: "github.com/CryptoPrism-io", href: "https://github.com/CryptoPrism-io" },
];

export default function ContactWindow() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-7">
        <h2
          className="mb-3 text-[1.8rem] font-black italic leading-[1.1]"
          style={{ fontFamily: "var(--font-serif-display)", color: "var(--ys-text)" }}
        >
          Build with an
          <br />
          operator mindset.
        </h2>
        <p
          className="text-[13px] leading-[1.9]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          I take 2 to 3 mandates per quarter with a clear execution path: discovery, system plan, and delivery
          milestones that tie to measurable outcomes.
        </p>
      </div>

      <div className="mb-7 flex flex-col gap-3">
        {MANDATE_TYPES.map((item) => (
          <div key={item.label} className="border-l-2 py-1 pl-3" style={{ borderColor: item.color }}>
            <p
              className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: item.color, fontFamily: "var(--font-mono)" }}
            >
              {item.label}
            </p>
            <p className="text-[12px]" style={{ color: "var(--ys-text-soft)", fontFamily: "var(--font-body)" }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--ys-border)" }}>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            Contact
          </p>
        </div>
        {LINKS.map((item) => (
          <div
            key={item.label}
            className="border-b px-4 py-3 last:border-b-0"
            style={{ borderColor: "var(--ys-border)" }}
          >
            <p
              className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              {item.label}
            </p>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-[12px] hover:underline"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
            >
              {item.content}
            </a>
          </div>
        ))}
        <div
          className="border-t border-l-2 px-4 py-3"
          style={{ borderColor: "var(--ys-border)", borderLeftColor: "var(--ys-highlight)" }}
        >
          <p
            className="mb-1 text-[9px] font-bold uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            Current Availability
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full animate-heartbeat" style={{ background: "var(--ys-highlight)" }} />
            <span
              className="text-[11px] font-bold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              Open for Q2 2026 mandates
            </span>
          </div>
          <p className="mt-0.5 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}>
            Typical response time: 24 to 48 hours.
          </p>
        </div>
      </div>

      <a
        href="mailto:yogesh@cryptoprism.io?subject=Fractional%20CTO%20Mandate"
        className="block w-full rounded-lg py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
        style={{
          fontFamily: "var(--font-headline)",
          background: "var(--ys-text)",
          color: "var(--ys-surface)",
        }}
      >
        Start Discovery Call
      </a>
    </div>
  );
}
