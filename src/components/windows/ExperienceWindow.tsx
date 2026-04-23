"use client";

const TIMELINE = [
  {
    period: "2025 - Present",
    role: "Founder & Director",
    company: "CryptoPrism / Trinetry Infotech",
    desc: "AI-powered crypto intelligence platform — 17 production repos, 1,000+ coins tracked, 130+ indicators, 3 PostgreSQL databases.",
    tags: ["GCP", "Python", "FastAPI", "PostgreSQL", "BigQuery"],
    active: true,
  },
  {
    period: "2024 - 2025",
    role: "Chief Tech Architect Consultant",
    company: "Times Internet",
    desc: "Led AI architecture and technical strategy for India's foundation database project. System design and delivery oversight.",
    tags: ["AI", "System Design", "Architecture"],
    active: false,
  },
  {
    period: "2023 - 2024",
    role: "Credit Card Product & AI/ML",
    company: "Tesco Bank → Barclays",
    desc: "Credit card product analytics and AI/ML pipelines serving 10,000+ customers at UK banking scale.",
    tags: ["SQL", "Python", "AI/ML", "Power BI"],
    active: false,
  },
  {
    period: "2022 - 2023",
    role: "MSc FinTech",
    company: "Strathclyde Business School, UK",
    desc: "Merit with dissertation topper (82/100). Applied TimesFM to crypto forecasting. Reduced AML false positives from 87% to 59%.",
    tags: ["TimesFM", "NLP", "Bloomberg", "AML"],
    active: false,
  },
  {
    period: "2020 - 2021",
    role: "Product Lead",
    company: "Isha Foundation",
    desc: "Shipped Kari & the Lost Shrines — 50K downloads across 110 countries with 2M digital reach. Zero marketing budget.",
    tags: ["Unity", "Product", "Mobile"],
    active: false,
  },
  {
    period: "2018 - 2020",
    role: "Founder & CEO",
    company: "Gamerz Nation Esports",
    desc: "Built 7 e-sports franchises. Rs 1.4 Cr Y1 revenue at 35% gross margin. First GeForce-certified gaming zone in India.",
    tags: ["Operations", "Esports", "Revenue"],
    active: false,
  },
  {
    period: "2016 - 2018",
    role: "QA Lead",
    company: "Ubisoft",
    desc: "Quality assurance across AAA titles — Assassin's Creed, For Honor, Just Dance. 250K first-day users.",
    tags: ["QA", "Gaming", "AAA Titles"],
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
