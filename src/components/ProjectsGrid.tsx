const PROJECTS = [
  {
    id: "cryptoprism-db",
    label: "PROJ_001 · PYTHON · GCP",
    name: "CryptoPrism DB",
    desc: "Three-database GCP architecture. 1,000+ coins, 130+ on-chain indicators. Production AI-powered QA scoring system. 99.9% uptime SLA.",
    metric: "1B+",
    metricSub: "data points / day",
    metricColor: "#b8960a",
    accent: "#b8960a",
    tags: ["GCP", "PostgreSQL", "Python", "FastAPI", "Redis"],
    cta: "Live ↗",
    ctaLime: true,
    href: "https://cryptoprism.io",
  },
  {
    id: "kari",
    label: "PROJ_002 · UNITY · MOBILE",
    name: "KARI",
    desc: "India-themed puzzle platformer. 50K downloads in 21 days across 110 countries. Built solo.",
    metric: "50K",
    metricSub: "downloads · 21 days",
    metricColor: "#1a1a1a",
    accent: "#1a1a1a",
    tags: ["Unity", "C#", "Mobile"],
    cta: "Play Store ↗",
    ctaLime: false,
    href: "https://play.google.com/store",
  },
  {
    id: "cryptoprism-platform",
    label: "PROJ_003 · REACT · FASTAPI",
    name: "CryptoPrism Platform",
    desc: "Real-time crypto analytics dashboard. WebSocket feeds, multi-timeframe charts, portfolio tracking.",
    metric: "Live",
    metricSub: "WebSocket · real-time feeds",
    metricColor: "#2a7a2a",
    accent: "#c8f59a",
    tags: ["React", "FastAPI", "WebSockets", "PostgreSQL"],
    cta: "Live ↗",
    ctaLime: true,
    href: "https://cryptoprism.io",
  },
  {
    id: "ubisoft",
    label: "PROJ_004 · PYSPARK · DATABRICKS",
    name: "Ubisoft Data Pipeline",
    desc: "AAA Game Analytics. Assassin's Creed · For Honor · Just Dance global scale data engineering.",
    metric: "AAA",
    metricSub: "global scale",
    metricColor: "#b8960a",
    accent: "#b8960a",
    tags: ["PySpark", "Databricks"],
    cta: null,
    ctaLime: false,
    href: "#",
  },
  {
    id: "timesfm",
    label: "PROJ_005 · PYTHON · ML",
    name: "TimesFM Quant",
    desc: "Google's TimesFM applied to crypto markets. NLP-driven market sentiment analysis. MS dissertation A-grade.",
    metric: "82/100",
    metricSub: "MS FinTech · Strathclyde",
    metricColor: "#2a7a2a",
    accent: "#2a7a2a",
    tags: ["TimesFM", "NLP", "Python"],
    cta: null,
    ctaLime: false,
    href: "#",
  },
];

export default function ProjectsGrid() {
  return (
    <section id="work" className="bg-[#f7f4ee] border-b-2 border-[#1a1a1a] py-14 lg:py-20 px-6 lg:px-14">
      {/* Section header */}
      <div className="border-t-2 border-[#1a1a1a] pt-5 flex justify-between items-center mb-10">
        <p
          className="text-[7px] font-bold uppercase tracking-[0.35em] text-[#bbb]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          03 — SELECTED WORK
        </p>
        <a
          href="https://github.com/CryptoPrism-io"
          target="_blank"
          rel="noreferrer"
          className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#888] hover:text-[#1a1a1a] transition-colors"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          View all 23 repos ↗
        </a>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((p) => (
          <article
            key={p.id}
            className="bg-white border border-[#e0e0e0] flex flex-col"
            style={{ borderTop: `2px solid ${p.accent}` }}
          >
            <div className="p-6 flex-1 flex flex-col">
              <p
                className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#bbb] mb-3"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {p.label}
              </p>
              <h3
                className="text-[1rem] font-black uppercase tracking-[-0.02em] text-[#1a1a1a] mb-3"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {p.name}
              </h3>
              <p
                className="text-[8px] text-[#999] leading-[1.7] mb-5 flex-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {p.desc}
              </p>

              {/* Metric */}
              <div className="mb-4">
                <span
                  className="text-[2.2rem] font-black leading-none tracking-[-0.03em]"
                  style={{ color: p.metricColor, fontFamily: "var(--font-headline)" }}
                >
                  {p.metric}
                </span>
                <span
                  className="text-[7px] uppercase tracking-[0.1em] text-[#ccc] block mt-0.5"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {p.metricSub}
                </span>
              </div>

              {/* Tags + CTA */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[7px] border border-[#e0e0e0] text-[#aaa] px-2 py-0.5"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {p.cta && (
                  <a
                    href={p.href}
                    target={p.href !== "#" ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`text-[7px] font-black uppercase tracking-[0.1em] px-3 py-1.5 ${
                      p.ctaLime
                        ? "bg-[#1a1a1a] text-[#c8f59a]"
                        : "border border-[#1a1a1a] text-[#1a1a1a]"
                    }`}
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {p.cta}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* GitHub closer card */}
        <article className="bg-[#1a1a1a] flex flex-col p-6 justify-between min-h-[200px]">
          <div>
            <p
              className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#555] mb-3"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              OPEN SOURCE
            </p>
            <h3
              className="text-[1rem] font-black uppercase text-white mb-3"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              + 18 More
            </h3>
            <p
              className="text-[8px] text-[#666] leading-[1.7]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              23 public repos on GitHub. GCP, Python, fintech, AI.
            </p>
          </div>
          <a
            href="https://github.com/CryptoPrism-io"
            target="_blank"
            rel="noreferrer"
            className="mt-6 text-[8px] font-black uppercase tracking-[0.1em] border border-white text-white px-4 py-2.5 hover:bg-white hover:text-[#1a1a1a] transition-colors inline-block"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            View on GitHub ↗
          </a>
        </article>
      </div>
    </section>
  );
}
