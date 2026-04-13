export default function Hero() {
  const stats = [
    { label: "DATA PROCESSED", value: "1B+",   sub: "points / day",           color: "#b8960a", bg: "white"   },
    { label: "UPTIME SLA",     value: "99.9%",  sub: "production system",      color: "#2a7a2a", bg: "white"   },
    { label: "REPOS LIVE",     value: "23",     sub: "github · public",        color: "#1a1a1a", bg: "white"   },
    { label: "GAME DOWNLOADS", value: "50K",    sub: "kari · 21 days · 110 countries", color: "#c8f59a", bg: "#1a1a1a" },
  ];

  return (
    <section id="hero" className="pt-[46px] bg-[#f7f4ee]">
      {/* Main hero grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_300px] min-h-[calc(100svh-46px)] border-b-2 border-[#1a1a1a]">

        {/* Left: editorial copy */}
        <div className="flex flex-col justify-between p-8 md:p-12 py-14">
          <div>
            <p
              className="text-[7px] font-bold uppercase tracking-[0.35em] text-[#aaa] mb-8"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              FRACTIONAL CTO · FOUNDER · CRYPTOPRISM · DPIIT
            </p>

            <h1 className="leading-[0.85] tracking-[-0.04em] mb-6">
              <span
                className="block text-[clamp(3.6rem,9vw,6.5rem)] font-black italic text-[#b8960a]"
                style={{ fontFamily: "var(--font-serif-display)" }}
              >
                Yogesh
              </span>
              <span
                className="block text-[clamp(3.2rem,8vw,6rem)] font-black text-[#1a1a1a] uppercase"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                SAHU
              </span>
            </h1>

            <div className="w-12 h-[3px] bg-[#1a1a1a] mb-5" />

            <p
              className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#888] leading-[2.2]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Fintech Infrastructure · AI · Data Engineering<br />
              Pre-seed Q2 2026 · Strathclyde MS FinTech
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-12">
            <a
              href="#contact"
              className="text-[8px] font-black uppercase tracking-[0.15em] text-[#1a1a1a] border-2 border-[#1a1a1a] px-5 py-3 hover:bg-[#1a1a1a] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Open to mandates ↗
            </a>
            <a
              href="#work"
              className="text-[8px] font-black uppercase tracking-[0.15em] text-[#999] border border-[#ddd] px-5 py-3 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              View Work
            </a>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-[#e0ddd6]" />

        {/* Right: stat column — desktop */}
        <div className="hidden lg:flex flex-col bg-white">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex-1 p-6 border-b border-[#f0f0f0] last:border-b-0"
              style={{ background: s.bg }}
            >
              <p
                className="text-[7px] font-bold uppercase tracking-[0.25em] mb-2"
                style={{
                  color: s.bg === "#1a1a1a" ? "#555" : "#bbb",
                  fontFamily: "var(--font-headline)",
                }}
              >
                {s.label}
              </p>
              <p
                className="text-[2.4rem] font-black leading-none tracking-[-0.03em]"
                style={{ color: s.color, fontFamily: "var(--font-headline)" }}
              >
                {s.value}
              </p>
              <p
                className="text-[7px] uppercase tracking-[0.12em] mt-1"
                style={{
                  color: s.bg === "#1a1a1a" ? "#555" : "#ccc",
                  fontFamily: "var(--font-headline)",
                }}
              >
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: 2×2 stat grid */}
      <div className="lg:hidden grid grid-cols-2 border-t-2 border-[#1a1a1a]">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`p-5 ${i % 2 === 0 ? "border-r border-[#e0e0e0]" : ""} ${i < 2 ? "border-b border-[#e0e0e0]" : ""}`}
            style={{ background: s.bg }}
          >
            <p
              className="text-[6px] font-bold uppercase tracking-[0.2em] mb-1"
              style={{
                color: s.bg === "#1a1a1a" ? "#555" : "#bbb",
                fontFamily: "var(--font-headline)",
              }}
            >
              {s.label}
            </p>
            <p
              className="text-[1.8rem] font-black leading-none"
              style={{ color: s.color, fontFamily: "var(--font-headline)" }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
