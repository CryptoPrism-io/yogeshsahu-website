"use client";

const disciplines = [
  { label: "INFRA", color: "var(--ys-accent)", lines: ["GCP | PostgreSQL", "99.9% uptime SLA", "1B+ data points/day"] },
  { label: "PRODUCT", color: "var(--ys-highlight)", lines: ["React | FastAPI", "Real-time feeds", "23 public repos"] },
  { label: "FINANCE", color: "var(--ys-text)", lines: ["TimesFM | NLP", "Quant research", "MS FinTech"] },
];

const credentials = [
  { label: "STRATHCLYDE", body: "MS Financial Technology, merit, dissertation topper (82/100)." },
  { label: "UBISOFT", body: "Data engineering support for Assassin's Creed, For Honor, and Just Dance." },
  { label: "DPIIT STARTUP", body: "CryptoPrism recognised startup, pre-seed track for Q2 2026.", highlight: true },
];

const outcomes = [
  { value: "1B+", label: "data points/day" },
  { value: "99.9%", label: "production uptime" },
  { value: "23", label: "public repos" },
  { value: "50K", label: "game downloads" },
];

export default function AboutWindow() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-7 border-b pb-7" style={{ borderColor: "var(--ys-border)" }}>
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
          FRACTIONAL CTO | FOUNDER | FINTECH INFRASTRUCTURE | AI PRODUCT
        </p>
      </div>

      <p
        className="mb-7 max-w-lg text-[14px] leading-[1.9]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
      >
        I build operating systems for early and growth-stage fintech teams: data pipelines, live product layers,
        and technical direction that keeps teams shipping. I work as founder-operator at CryptoPrism and as a
        fractional CTO on focused mandates.
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
              className={`rounded-lg border p-4 ${item.highlight ? "border-l-2" : ""}`}
              style={{
                borderColor: "var(--ys-border)",
                borderLeftColor: item.highlight ? "var(--ys-accent)" : "var(--ys-border)",
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
