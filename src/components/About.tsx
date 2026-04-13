"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const disciplines = [
  { label: "INFRA",   color: "#1a1a1a", lines: ["GCP · PostgreSQL", "99.9% uptime", "1B+ data pts/day"] },
  { label: "PRODUCT", color: "#555",    lines: ["React · FastAPI", "WebSockets", "23 live repos"] },
  { label: "FINANCE", color: "#888",    lines: ["TimesFM · NLP", "Quant strategies", "MS FinTech"] },
];

const credentials = [
  { label: "STRATHCLYDE",    body: "MS FinTech — 82/100 · Dissertation Topper" },
  { label: "UBISOFT",        body: "Assassin's Creed · For Honor · Just Dance · AAA global scale" },
  { label: "DPIIT RECOGNISED ↗", body: "CryptoPrism · Pre-seed Q2 2026 · India Startup Recognition", highlight: true },
];

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

export default function About() {
  return (
    <section id="about" className="snap-section bg-[#f7f4ee] border-b-2 border-[#1a1a1a]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] h-full">

        {/* Left: editorial pull-quote */}
        <div className="p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r border-[#e0ddd6] flex flex-col justify-center overflow-hidden">
          <div className="border-t-[3px] border-[#1a1a1a] pt-5 mb-10">
            <motion.p
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#bbb] mb-5"
              style={{ fontFamily: "var(--font-headline)" }}
              {...fadeLeft(0.1)}
            >
              01 — ABOUT
            </motion.p>
            <motion.h2
              className="text-[2rem] lg:text-[2.8rem] font-black leading-[1.1] italic text-[#1a1a1a] mb-6"
              style={{ fontFamily: "var(--font-serif-display)" }}
              {...fadeLeft(0.2)}
            >
              One operator.<br />Three disciplines.
            </motion.h2>
            <motion.p
              className="text-[14px] leading-[1.9] text-[#555] max-w-md"
              style={{ fontFamily: "var(--font-body)" }}
              {...fadeLeft(0.3)}
            >
              Yogesh Sahu builds production fintech infrastructure at the
              intersection of data engineering, AI, and product strategy.
              Former Ubisoft (Assassin&apos;s Creed, For Honor, Just Dance).
              Now: Founder + Fractional CTO.
            </motion.p>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            {disciplines.map((d, i) => (
              <motion.div
                key={d.label}
                className="border-l-2 pl-4"
                style={{ borderColor: d.color }}
                {...fadeLeft(0.3 + i * 0.1)}
              >
                <p className="text-[11px] font-black uppercase tracking-[0.15em] mb-2"
                   style={{ color: d.color, fontFamily: "var(--font-headline)" }}>
                  {d.label}
                </p>
                {d.lines.map((line) => (
                  <span key={line} className="block text-[12px] text-[#666] leading-[1.9]"
                        style={{ fontFamily: "var(--font-headline)" }}>
                    {line}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: credentials stack */}
        <div className="bg-white flex flex-col overflow-hidden">
          <motion.div className="px-6 py-5 border-b border-[#eee]" {...fadeRight(0.15)}>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#bbb]"
               style={{ fontFamily: "var(--font-headline)" }}>
              CREDENTIALS
            </p>
          </motion.div>
          {credentials.map((c, i) => (
            <motion.div
              key={c.label}
              className={`p-6 border-b border-[#eee] flex-1 flex flex-col justify-center ${c.highlight ? "border-l-2 border-l-[#1a1a1a]" : ""}`}
              {...fadeRight(0.25 + i * 0.12)}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-[#1a1a1a]"
                 style={{ fontFamily: "var(--font-headline)" }}>
                {c.label}
              </p>
              <p className="text-[13px] text-[#777] leading-[1.8]"
                 style={{ fontFamily: "var(--font-body)" }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Availability ticker */}
      <div className="bg-[#1a1a1a] overflow-hidden py-4 absolute bottom-0 left-0 right-0">
        <div className="animate-marquee inline-block whitespace-nowrap">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-white mx-8"
            style={{ fontFamily: "var(--font-headline)" }}>
            AVAILABLE FOR FRACTIONAL CTO MANDATES&nbsp;·&nbsp;Q2 2026&nbsp;·&nbsp;DPIIT RECOGNISED&nbsp;·&nbsp;INDIA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AVAILABLE FOR FRACTIONAL CTO MANDATES&nbsp;·&nbsp;Q2 2026&nbsp;·&nbsp;DPIIT RECOGNISED&nbsp;·&nbsp;INDIA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </section>
  );
}
