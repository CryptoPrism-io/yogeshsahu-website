"use client";

const MANDATE_TYPES = [
  {
    label: "AI INTEGRATION",
    body: "Move from level-zero experimentation to product and enterprise rollout without overbuilding the stack.",
    color: "var(--ys-accent)",
  },
  {
    label: "ARCHITECTURE CLARITY",
    body: "Make the technical tradeoffs obvious so product pressure turns into execution instead of confusion.",
    color: "var(--ys-highlight)",
  },
  {
    label: "STAKEHOLDER ALIGNMENT",
    body: "Bring product, engineering, and leadership onto one execution path even when authority is fragmented.",
    color: "var(--ys-text)",
  },
];

const LINKS = [
  {
    label: "EMAIL",
    content: "yogesh@cryptoprism.io",
    href: "mailto:yogesh@cryptoprism.io?subject=5-day%20CTO%20Diagnostic&body=Hi%20Yogesh%2C%0A%0AI%20want%20to%20explore%20the%205-day%20CTO%20diagnostic.%20The%20main%20issue%20we%20are%20dealing%20with%20is%3A%20%0A%0ACompany%3A%20%0AStage%3A%20%0ACurrent%20pressure%3A%20",
  },
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
          Hands-on architecture
          <br />
          leadership without fixed-cost regret.
        </h2>
        <p
          className="text-[13px] leading-[1.9]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          Built for clients who need a hands-on chief solutions architect, not a slide-deck architect.
          I step in when discovery, architecture, delivery, and stakeholder confidence all need to hold
          together in the same engagement.
        </p>
      </div>

      <div
        className="mb-7 rounded-lg border p-4"
        style={{
          borderColor: "rgba(11, 141, 128, 0.24)",
          background: "rgba(11, 141, 128, 0.08)",
        }}
      >
        <p
          className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Entry Offer
        </p>
        <p className="text-[12px] leading-[1.8]" style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}>
          5 business days. Fixed scope. Discovery, architecture review, delivery risks, and a practical 90-day execution plan.
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
              Open for May 2026 architecture mandates
            </span>
          </div>
          <p className="mt-0.5 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}>
            Best fit: consulting, regulated, and fast-moving teams.
          </p>
        </div>
      </div>

      <a
        href="mailto:yogesh@cryptoprism.io?subject=5-day%20CTO%20Diagnostic&body=Hi%20Yogesh%2C%0A%0AI%20want%20to%20explore%20the%205-day%20CTO%20diagnostic.%20The%20main%20issue%20we%20are%20dealing%20with%20is%3A%20%0A%0ACompany%3A%20%0AStage%3A%20%0ACurrent%20pressure%3A%20"
        className="block w-full rounded-lg py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
        style={{
          fontFamily: "var(--font-headline)",
          background: "var(--ys-text)",
          color: "var(--ys-surface)",
        }}
      >
        Start architecture diagnostic
      </a>
    </div>
  );
}
