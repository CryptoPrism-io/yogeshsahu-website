"use client";

const TIMELINE = [
  {
    period: "2024 - Present",
    role: "Founder and CEO",
    company: "CryptoPrism",
    desc: "Built an AI-powered crypto intelligence platform with 1B+ daily points and production-grade GCP architecture.",
    tags: ["GCP", "Python", "FastAPI", "PostgreSQL"],
    active: true,
  },
  {
    period: "2024 - Present",
    role: "Credit Cards Analyst",
    company: "Tesco Bank",
    desc: "Credit risk analytics and pipeline ownership for the credit card business at UK scale.",
    tags: ["SQL", "Python", "Power BI"],
    active: true,
  },
  {
    period: "2023 - 2024",
    role: "Data Engineering",
    company: "Ubisoft",
    desc: "Delivered data engineering support for global game analytics and high-volume telemetry workloads.",
    tags: ["PySpark", "Databricks", "Azure"],
    active: false,
  },
  {
    period: "2022 - 2023",
    role: "MS Financial Technology",
    company: "Strathclyde Business School",
    desc: "Merit with dissertation topper score (82/100), focused on TimesFM and crypto market research.",
    tags: ["TimesFM", "NLP", "Bloomberg"],
    active: false,
  },
  {
    period: "2018 - 2022",
    role: "Co-Founder",
    company: "Gamerz Nation",
    desc: "Scaled an esports and events operation with multiple game franchises and platform execution.",
    tags: ["React", "Node.js", "Operations"],
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
