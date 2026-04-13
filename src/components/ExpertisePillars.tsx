"use client";

import { Server, Brain, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Server,
    title: "Infrastructure & Data",
    body: "Production systems at scale. 1B+ data points daily. Three-database GCP architectures, real-time pipelines, PostgreSQL optimisation, 99.9% uptime SLAs.",
    skills: ["GCP", "PostgreSQL", "Python", "ETL", "vectorbt", "FastAPI", "Docker", "Redis"],
    accent: "#fef3c7",
  },
  {
    icon: Brain,
    title: "Product & AI",
    body: "Full-cycle product delivery — from problem definition to live deployment. AI integration, cognitive apps, React frontends, Firebase backends, mobile games.",
    skills: ["React", "TypeScript", "Firebase", "Gemini AI", "Unity", "Streamlit", "Next.js"],
    accent: "#dbeafe",
  },
  {
    icon: TrendingUp,
    title: "Business & Finance",
    body: "Bloomberg-certified. Investment banking trained. PMI & CSPO qualified. Translates technical decisions into business outcomes — not just code reviews.",
    skills: ["Bloomberg", "PMI", "CSPO", "Power BI", "FinTech", "DPIIT", "LIBF"],
    accent: "#dcfce7",
  },
];

export default function ExpertisePillars() {
  return (
    <section id="expertise" className="bg-[#f8fafc] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
          <span
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d97706]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            WHAT I BRING
          </span>
        </div>
        <div className="mb-16 max-w-3xl">
          <h2
            className="text-4xl md:text-6xl font-black text-[#111] leading-tight mb-4 uppercase tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Three disciplines.
            <br />
            <span
              className="text-[#d97706]"
              style={{
                fontFamily: "var(--font-serif-display)",
                fontStyle: "italic",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.95em",
              }}
            >
              One operator.
            </span>
          </h2>
          <p className="text-neutral-500 text-base leading-relaxed">
            Most technical consultants own one of these. Fractional CTO mandates require all three.
          </p>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group bg-white border border-neutral-200 p-8 hover:border-[#d97706] transition-colors duration-300"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-8"
                style={{ background: p.accent }}
              >
                <p.icon size={26} className="text-[#111]" strokeWidth={1.5} />
              </div>

              <h3
                className="text-xl font-black text-[#111] mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {p.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                {p.body}
              </p>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {p.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 bg-neutral-100 rounded-full text-[11px] font-medium text-neutral-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
