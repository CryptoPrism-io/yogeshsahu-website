"use client";

import { motion } from "framer-motion";

const models = [
  {
    num: "01",
    tag: "Decision-making",
    name: "First Principles",
    definition: '"Strip away assumptions until you reach foundational truths."',
    application:
      "When a client says 'we need X tool' — ask why five times. The real constraint is usually three layers deeper and half the cost.",
  },
  {
    num: "02",
    tag: "Risk",
    name: "Inversion",
    definition: '"Solve problems backwards. Ask what would guarantee failure — then avoid it."',
    application:
      "Write the failure post-mortem before any architecture decision. Surfaces hidden risks before a line of code is written.",
  },
  {
    num: "03",
    tag: "Execution",
    name: "OODA Loop",
    definition: '"Observe, Orient, Decide, Act — then repeat faster than the environment changes."',
    application:
      "Structure sprints around OODA. Faster internal decision cycles mean clients ship before competitors can respond.",
  },
  {
    num: "04",
    tag: "Systems",
    name: "Antifragility",
    definition: '"Systems that gain from disorder rather than merely surviving stress."',
    application:
      "CryptoPrism DB was designed to handle 10× normal load. That redundancy became a feature during market spikes.",
  },
  {
    num: "05",
    tag: "Positioning",
    name: "Circle of Competence",
    definition: '"Know precisely what you know. Act within it; be honest about the rest."',
    application:
      "Take fintech, data, AI mandates. Decline e-commerce and hardware. Saying no protects both parties.",
  },
  {
    num: "06",
    tag: "Architecture",
    name: "Second-Order Thinking",
    definition: '"Ask: \'and then what?\' First-order consequences are obvious. Second-order is where decisions are won or lost."',
    application:
      "Migrating to microservices looks efficient (1st order). Increases operational complexity for a 10-person team (2nd order). Often the wrong call.",
  },
];

export default function MentalOS() {
  return (
    <section
      id="mental-os"
      className="relative bg-[#080808] py-24 md:py-32 overflow-hidden gold-radial"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#fbbf24]/5 blur-[120px] rounded-full -mr-48 -mb-48 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
          <span
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#fbbf24]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            MENTAL OS
          </span>
        </div>
        <div className="mb-16 max-w-3xl">
          <h2
            className="text-4xl md:text-6xl font-black text-white tracking-[-0.02em] leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            How I approach
            <br />
            <span
              className="text-[#fbbf24]"
              style={{
                fontFamily: "var(--font-serif-display)",
                fontStyle: "italic",
                fontWeight: 700,
              }}
            >
              hard problems.
            </span>
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-lg">
            The frameworks that shape how I diagnose, decide, and build. Applied daily in
            client work, product decisions, and system design.
          </p>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {models.map((m, i) => (
            <motion.article
              key={m.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group bg-[#080808] p-7 border border-white/5 relative overflow-hidden transition-all duration-500 hover:bg-[#0d0d0d] card-left-glow"
            >
              {/* Card top row */}
              <div className="flex justify-between items-start mb-6">
                <span
                  className="text-[10px] font-bold text-neutral-700 tracking-widest"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {m.num}
                </span>
                <span className="text-[9px] font-bold py-1 px-2 bg-[rgba(251,191,36,0.07)] border border-[rgba(215,119,6,0.25)] text-[#d97706] uppercase tracking-wider">
                  {m.tag}
                </span>
              </div>

              {/* Name */}
              <h3
                className="text-[1.05rem] font-black text-white mb-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {m.name}
              </h3>

              {/* Definition */}
              <p className="text-neutral-500 text-[13px] leading-relaxed mb-6 italic">
                {m.definition}
              </p>

              {/* Divider */}
              <div className="h-px w-full bg-white/5 mb-6" />

              {/* Application */}
              <span
                className="text-[9px] font-bold text-neutral-700 uppercase tracking-widest block mb-3"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Applied in client work
              </span>
              <p className="text-[#fbbf24] text-[13px] leading-relaxed">
                {m.application}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
