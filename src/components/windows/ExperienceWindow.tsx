"use client";

const TIMELINE = [
  {
    period: "2025 - Present",
    role: "Managing Director",
    company: "Trinetry Infotech Pvt Ltd",
    desc: "Founded technology consultancy building AI-powered SaaS products (Pratyaksha, GyanMarg). Providing fractional CTO consulting and replacing manual SME workflows with agentic AI.",
    tags: ["Python", "React", "TypeScript", "Firebase", "AI/Agents", "LangChain"],
    active: true,
  },
  {
    period: "2025 - 2025",
    role: "Chief Technological Architect",
    company: "Times of India",
    desc: "6-month fractional engagement. Architected and built AI Bharatverse — an interactive AI-powered platform for exploring the history of India.",
    tags: ["React", "LangChain", "Python", "AI/LLM"],
    active: false,
  },
  {
    period: "2024 - Present",
    role: "Founder & CTO",
    company: "CryptoPrism",
    desc: "Full-stack crypto intelligence platform — on-chain analytics, ML trading signals via TimesFM, and automated spot trading bots. 1B+ datapoints across 100+ coins.",
    tags: ["Python", "FastAPI", "BigQuery", "Cloud Run", "Binance API", "TimesFM"],
    active: true,
  },
  {
    period: "2023 - 2024",
    role: "ML Engineer, Fraud Analytics",
    company: "Barclays",
    desc: "ML pipelines for credit card fraud detection. Fine-tuned models for real-time transaction anomaly detection on large-scale financial datasets.",
    tags: ["Python", "ML", "Data Pipelines", "SQL"],
    active: false,
  },
  {
    period: "2022 - 2023",
    role: "MSc FinTech",
    company: "Strathclyde Business School",
    desc: "Merit with dissertation topper (82/100). Applied TimesFM to crypto forecasting. Reduced AML false positives from 87% to 59%.",
    tags: ["TimesFM", "NLP", "Bloomberg", "AML"],
    active: false,
  },
  {
    period: "2020 - 2021",
    role: "Project Manager",
    company: "Isha Foundation",
    desc: "Led Kari and the Lost Shrines — 50K+ downloads, 4.5+ rating. Built Mandala Support for Sadhguru app — 4.2M engagements from 120 countries in 42 days.",
    tags: ["Unity", "Flutter", "Mobile", "Product"],
    active: false,
  },
  {
    period: "2017 - 2019",
    role: "Co-Founder",
    company: "Gamerz Nation Esports",
    desc: "Scaled to 7 franchises in 18 months. $100K turnover in inaugural year. Break-even within 12 months. First GeForce-certified gaming zone in India.",
    tags: ["Operations", "Esports", "Revenue"],
    active: false,
  },
  {
    period: "2016 - 2017",
    role: "Feature Specialist",
    company: "Ubisoft",
    desc: "Feature management and QA for AAA titles — Just Dance 2017, For Honor, Far Cry 5, Assassin's Creed Odyssey.",
    tags: ["QA", "Gaming", "Unity", "Unreal Engine"],
    active: false,
  },
];

export default function ExperienceWindow() {
  return (
    <div className="p-6">
      <p
        className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
      >
        Experience Timeline
      </p>

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "var(--ys-border)" }} />

        <div className="flex flex-col gap-5">
          {TIMELINE.map((item) => (
            <article key={`${item.company}-${item.period}`} className="flex gap-4">
              <div className="mt-1.5 shrink-0">
                <div
                  className={`h-[15px] w-[15px] rounded-full border-2 ${item.active ? "" : ""}`}
                  style={{
                    borderColor: item.active ? "var(--ys-accent)" : "var(--ys-border)",
                    background: item.active ? "rgba(207, 79, 39, 0.2)" : "var(--ys-surface-strong)",
                  }}
                />
              </div>

              <div className="flex-1 rounded-lg border p-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
                <div className="mb-1 flex items-center justify-between">
                  <p
                    className="text-[10px] uppercase tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
                  >
                    {item.period}
                  </p>
                  {item.active && (
                    <span
                      className="rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        background: "rgba(11, 141, 128, 0.15)",
                        color: "var(--ys-highlight)",
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>

                <p className="text-[13px] font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>
                  {item.role}
                </p>
                <p className="mb-2 text-[11px]" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}>
                  {item.company}
                </p>
                <p className="mb-3 text-[12px] leading-[1.7]" style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}>
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border px-2 py-0.5 text-[9px]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        borderColor: "var(--ys-border)",
                        color: "var(--ys-text-soft)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
