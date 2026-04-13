const MANDATE_TYPES = [
  {
    label: "FRACTIONAL CTO",
    body: "System architecture, team hiring, technical due diligence",
    accent: "#1a1a1a",
  },
  {
    label: "DATA ENGINEERING",
    body: "GCP infrastructure, pipeline design, 99.9% SLA",
    accent: "#444",
  },
  {
    label: "AI PRODUCT",
    body: "LLM integration, fintech AI features, TimesFM deployment",
    accent: "#888",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-[#f7f4ee] border-b-2 border-[#1a1a1a]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">

        {/* Left: engage block */}
        <div className="p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r border-[#e0ddd6]">
          <div className="border-t-[3px] border-[#1a1a1a] pt-5 mb-8">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#bbb] mb-6"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              04 — CONTACT
            </p>
            <h2
              className="text-[2rem] lg:text-[2.8rem] font-black leading-[1.05] italic text-[#1a1a1a] mb-5"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              Work with
              <br />
              the operator.
            </h2>
            <p
              className="text-[14px] leading-[1.9] text-[#666] max-w-md mb-8"
              style={{ fontFamily: "var(--font-body)" }}
            >
              I take on 2–3 fractional mandates per quarter. Fintech, data
              infrastructure, AI product. Pre-seed to Series A.
            </p>
          </div>

          <div className="flex flex-col gap-5 mb-10">
            {MANDATE_TYPES.map((m) => (
              <div
                key={m.label}
                className="border-l-2 pl-4"
                style={{ borderColor: m.accent }}
              >
                <p
                  className="text-[11px] font-black uppercase tracking-[0.2em] mb-1"
                  style={{ color: m.accent, fontFamily: "var(--font-headline)" }}
                >
                  {m.label}
                </p>
                <p
                  className="text-[13px] text-[#888]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {m.body}
                </p>
              </div>
            ))}
          </div>

          <a
            href="mailto:yogesh@cryptoprism.io"
            className="inline-block text-[11px] font-black uppercase tracking-[0.12em] bg-[#1a1a1a] text-white px-8 py-3.5 hover:bg-[#333] transition-colors"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            BOOK A DISCOVERY CALL ↗
          </a>
        </div>

        {/* Right: contact card */}
        <div className="p-6 lg:p-12 flex items-start">
          <div className="w-full border-2 border-[#1a1a1a]">
            <div className="px-5 py-4 border-b border-[#eee]">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888]"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                GET IN TOUCH
              </p>
            </div>

            <div className="px-5 py-4 border-b border-[#eee]">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-1"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                EMAIL
              </p>
              <a
                href="mailto:yogesh@cryptoprism.io"
                className="text-[13px] font-black text-[#1a1a1a] hover:text-[#555] transition-colors"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                yogesh@cryptoprism.io
              </a>
            </div>

            <div className="px-5 py-4 border-b border-[#eee]">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-1"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                LINKEDIN
              </p>
              <a
                href="https://linkedin.com/in/yogeshsahu"
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-[#888] hover:text-[#1a1a1a] transition-colors"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                linkedin.com/in/yogeshsahu
              </a>
            </div>

            <div className="px-5 py-4 border-b border-[#eee]">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-1"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                GITHUB
              </p>
              <a
                href="https://github.com/CryptoPrism-io"
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-[#888] hover:text-[#1a1a1a] transition-colors"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                CryptoPrism-io · 23 repos
              </a>
            </div>

            {/* Availability block */}
            <div className="px-5 py-4 border-b border-[#eee] border-l-2 border-l-[#1a1a1a]">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                CURRENT STATUS
              </p>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-[#1a1a1a] animate-heartbeat inline-block flex-shrink-0" />
                <span
                  className="text-[12px] font-black text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Open to mandates
                </span>
              </div>
              <p
                className="text-[11px] text-[#888]"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Q2 2026 · 2–3 slots remaining
              </p>
            </div>

            {/* CryptoPrism promo */}
            <div className="px-5 py-4 bg-[#1a1a1a]">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555] mb-1"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                CRYPTOPRISM
              </p>
              <p
                className="text-[11px] text-[#888] leading-[1.6] mb-1"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                DPIIT Recognised Startup · Pre-seed Q2 2026
              </p>
              <a
                href="https://cryptoprism.io"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-white hover:underline"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                cryptoprism.io ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
