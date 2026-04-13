"use client";

import { Server, Brain, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const radarData = [
  { axis: "Infrastructure", value: 95 },
  { axis: "Product", value: 88 },
  { axis: "Finance", value: 82 },
  { axis: "AI / ML", value: 85 },
  { axis: "Architecture", value: 93 },
];

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
              viewport={{ once: true, amount: 0 }}
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
        {/* Radar chart panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-200"
        >
          {/* Left: radar */}
          <div className="bg-[#111] p-8 flex flex-col justify-center">
            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1"
               style={{ fontFamily: "var(--font-headline)" }}>
              Expertise Radar
            </p>
            <p className="text-[11px] text-neutral-600 mb-6">Self-assessed percentile vs. typical consultant</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fontSize: 10, fill: "#6b7280", fontFamily: "var(--font-headline)" }}
                  />
                  <Radar
                    name="Yogesh"
                    dataKey="value"
                    stroke="#fbbf24"
                    fill="#fbbf24"
                    fillOpacity={0.15}
                    strokeWidth={1.5}
                    dot={{ fill: "#fbbf24", r: 3 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0d0d0d",
                      border: "1px solid rgba(251,191,36,0.2)",
                      borderRadius: "2px",
                      fontSize: "10px",
                      color: "#fbbf24",
                    }}
                    formatter={(v) => [`${v}th percentile`]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: context */}
          <div className="bg-neutral-50 border-l border-neutral-200 p-8 flex flex-col justify-center gap-5">
            {radarData.map((d) => (
              <div key={d.axis} className="flex items-center gap-4">
                <span className="text-[11px] font-bold text-neutral-500 w-28 flex-shrink-0"
                      style={{ fontFamily: "var(--font-headline)" }}>
                  {d.axis}
                </span>
                <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#d97706] rounded-full"
                    style={{ width: `${d.value}%` }}
                  />
                </div>
                <span className="text-[11px] font-black text-[#111] w-8 text-right"
                      style={{ fontFamily: "var(--font-headline)" }}>
                  {d.value}
                </span>
              </div>
            ))}
            <p className="text-[10px] text-neutral-400 mt-2 leading-relaxed">
              Ratings are self-assessed based on professional engagements, certifications and measurable outcomes — not self-congratulation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
