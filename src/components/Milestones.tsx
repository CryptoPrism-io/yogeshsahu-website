"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    icon: "🎮",
    title: "Kari & the Lost Shrines",
    body: "21 days. Zero marketing. 50K downloads across 110 countries — and a personal note from Sadhguru.",
    badge: "Sadhguru Appreciation",
  },
  {
    icon: "🏍",
    title: "Solo. 21 States. No Support.",
    body: "Crossed 21 Indian states on a motorbike, alone. What most people plan for years — executed.",
    badge: "21 States · Solo",
  },
  {
    icon: "🎓",
    title: "Strathclyde MS FinTech",
    body: "Dissertation topper — 82/100. Applied Google's TimesFM to live crypto price forecasting. Cohort first.",
    badge: "Merit · Cohort Topper",
  },
  {
    icon: "🏢",
    title: "Ubisoft",
    body: "Worked across Assassin's Creed, For Honor, and Just Dance. Consumer gaming at global scale.",
    badge: "AAA Titles",
  },
  {
    icon: "🏆",
    title: "Gamerz Nation",
    body: "Co-founded 7 e-sports franchises. Built the first GeForce-certified gaming zone in India.",
    badge: "First in India",
  },
];

export default function Milestones() {
  return (
    <section id="milestones" className="bg-[#080808] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
          <span
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#fbbf24]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            MILESTONES
          </span>
        </div>
        <h2
          className="text-4xl md:text-6xl font-black text-white tracking-[-0.02em] leading-tight mb-16"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Not just{" "}
          <span
            className="text-[#fbbf24]"
            style={{
              fontFamily: "var(--font-serif-display)",
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            code.
          </span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.09, duration: 0.45 }}
              className="group flex flex-row items-start gap-4 p-6 bg-[rgba(251,191,36,0.04)] border border-[rgba(251,191,36,0.1)] hover:bg-[rgba(251,191,36,0.07)] hover:border-[rgba(251,191,36,0.28)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Emoji icon */}
              <div className="w-11 h-11 min-w-[44px] flex items-center justify-center bg-[rgba(251,191,36,0.08)] text-xl flex-shrink-0">
                {m.icon}
              </div>

              <div className="flex flex-col h-full">
                <h3
                  className="text-base font-black text-white mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {m.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  {m.body}
                </p>
                <div className="mt-auto">
                  <span className="inline-block text-[9px] font-black uppercase tracking-widest text-[#fbbf24] bg-[rgba(251,191,36,0.08)] border border-[rgba(251,191,36,0.18)] px-2.5 py-1">
                    {m.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Decorative sixth panel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden lg:flex relative p-6 bg-[rgba(251,191,36,0.04)] border border-[rgba(251,191,36,0.1)] items-end overflow-hidden"
          >
            <div
              className="text-[3.5rem] font-black uppercase tracking-[-0.04em] text-white/5 leading-none"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              THE
              <br />
              JOURNEY
              <br />
              IS THE
              <br />
              CODE.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
