const disciplines = [
  {
    label: "INFRA",
    color: "#b8960a",
    lines: ["GCP · PostgreSQL", "99.9% uptime", "1B+ data pts/day"],
  },
  {
    label: "PRODUCT",
    color: "#1a1a1a",
    lines: ["React · FastAPI", "WebSockets", "23 live repos"],
  },
  {
    label: "FINANCE",
    color: "#2a7a2a",
    lines: ["TimesFM · NLP", "Quant strategies", "MS FinTech"],
  },
];

const credentials = [
  {
    label: "STRATHCLYDE",
    body: "MS FinTech — 82/100 · Dissertation Topper",
    accent: "#b8960a",
  },
  {
    label: "UBISOFT",
    body: "Assassin's Creed · For Honor · Just Dance · AAA global scale",
    accent: "#b8960a",
  },
  {
    label: "DPIIT RECOGNISED ↗",
    body: "CryptoPrism · Pre-seed Q2 2026 · India Startup Recognition",
    accent: "#c8f59a",
    lime: true,
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#f7f4ee] border-b-2 border-[#1a1a1a]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px]">

        {/* Left: editorial pull-quote */}
        <div className="p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r border-[#e0ddd6]">
          <div className="border-t-[3px] border-[#1a1a1a] pt-5 mb-10">
            <p
              className="text-[7px] font-bold uppercase tracking-[0.3em] text-[#bbb] mb-5"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              01 — ABOUT
            </p>
            <h2
              className="text-[2rem] lg:text-[2.8rem] font-black leading-[1.1] italic text-[#1a1a1a] mb-6"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              One operator.<br />Three disciplines.
            </h2>
            <p
              className="text-[10px] leading-[1.9] text-[#666] max-w-md"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Yogesh Sahu builds production fintech infrastructure at the
              intersection of data engineering, AI, and product strategy.
              Former Ubisoft (Assassin&apos;s Creed, For Honor, Just Dance).
              Now: Founder + Fractional CTO.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            {disciplines.map((d) => (
              <div key={d.label} className="border-l-2 pl-3" style={{ borderColor: d.color }}>
                <p
                  className="text-[7px] font-black uppercase tracking-[0.15em] mb-2"
                  style={{ color: d.color, fontFamily: "var(--font-headline)" }}
                >
                  {d.label}
                </p>
                {d.lines.map((line) => (
                  <span
                    key={line}
                    className="block text-[8px] text-[#666] leading-[1.9]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right: credentials stack */}
        <div className="bg-white">
          <div className="px-6 py-4 border-b border-[#eee]">
            <p
              className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#bbb]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              CREDENTIALS
            </p>
          </div>
          {credentials.map((c) => (
            <div
              key={c.label}
              className={`p-6 border-b border-[#eee] ${c.lime ? "border-l-2 border-l-[#c8f59a]" : ""}`}
            >
              <p
                className="text-[7px] font-black uppercase tracking-[0.2em] mb-2"
                style={{ color: c.accent, fontFamily: "var(--font-headline)" }}
              >
                {c.label}
              </p>
              <p
                className="text-[10px] text-[#888] leading-[1.8]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Availability ticker */}
      <div className="bg-[#1a1a1a] border-t-2 border-[#1a1a1a] overflow-hidden py-3.5">
        <div className="animate-marquee inline-block">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[8px] font-bold uppercase tracking-[0.25em] text-white mx-8"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              AVAILABLE FOR FRACTIONAL CTO MANDATES&nbsp;·&nbsp;Q2 2026&nbsp;·&nbsp;DPIIT RECOGNISED&nbsp;·&nbsp;INDIA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AVAILABLE FOR FRACTIONAL CTO MANDATES&nbsp;·&nbsp;Q2 2026&nbsp;·&nbsp;DPIIT RECOGNISED&nbsp;·&nbsp;INDIA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
