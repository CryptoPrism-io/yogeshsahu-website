"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const PROJECTS = [
  {
    id: "cryptoprism-onchain",
    label: "PROJ_001 | PYTHON | GCP",
    name: "CryptoPrism On-chain Analytics",
    desc: "BigQuery-based on-chain data pipeline processing 1B+ datapoints across 100+ coins. Real-time market data ingestion, analytics, and ML scoring.",
    outcome: "1B+ datapoints/day, 99.9% SLA",
    tags: ["Python", "BigQuery", "Cloud Run", "GitHub Actions"],
    href: "https://github.com/CryptoPrism-io/cryptoprism-onchain",
  },
  {
    id: "pratyaksha",
    label: "PROJ_002 | REACT | AI AGENTS",
    name: "Pratyaksha",
    desc: "AI-powered cognitive journaling platform with 4-agent AI pipeline. Transforms raw thoughts into actionable self-insight through real-time analysis.",
    outcome: "4-agent AI pipeline",
    tags: ["React", "Express", "LangChain", "Firebase"],
    href: "https://ai-becoming.web.app",
  },
  {
    id: "gyanmarg",
    label: "PROJ_003 | REACT | FIREBASE",
    name: "GyanMarg",
    desc: "EdTech learning management platform with real-time sync, educational content delivery, and adaptive learning paths.",
    outcome: "Real-time learning platform",
    tags: ["React", "Firebase", "TypeScript"],
    href: "https://ai-polymind.web.app",
  },
  {
    id: "ai-bharatverse",
    label: "PROJ_004 | REACT | LANGCHAIN",
    name: "AI Bharatverse",
    desc: "Interactive AI-powered platform for exploring the history of India. Built for Times of India as a 6-month fractional engagement.",
    outcome: "Times of India delivery",
    tags: ["React", "LangChain", "Python", "AI/LLM"],
    href: "#",
  },
  {
    id: "kari",
    label: "PROJ_005 | UNITY | MOBILE",
    name: "Kari and the Lost Shrines",
    desc: "Mobile game for Isha Foundation — explore Indian temples, collect lost relics. 50,000+ downloads, 4.5+ rating on both stores.",
    outcome: "50K+ downloads, 4.5+ rating",
    tags: ["Unity", "C#", "Mobile"],
    href: "https://apps.apple.com/us/app/kari-and-the-lost-shrines/id1561474376",
  },
];

export default function ProjectsWindow() {
  return (
    <div className="p-6">
      <motion.div
        className="mb-4 rounded-xl border p-4"
        variants={fadeUp(0, 10)}
        initial="initial"
        animate="animate"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <p
          className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Selected Work
        </p>
        <p
          className="text-[12px] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          This is proof, not decoration. Each project shows the same pattern: hard constraints, technical pressure,
          and decisions that had to survive real operating conditions. If you need CTO-level ownership without a
          full-time CTO hire, start with the diagnostic.
        </p>
      </motion.div>

      <div className="mb-5 flex items-center justify-between">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Execution Highlights
        </p>
        <a
          href="https://github.com/CryptoPrism-io"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] hover:underline"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-highlight)" }}
        >
          View all 23 repos
        </a>
      </div>

      <div className="flex flex-col gap-3">
        {PROJECTS.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.href}
            target={project.href !== "#" ? "_blank" : undefined}
            rel="noreferrer"
            className="block rounded-lg border p-4 transition-colors"
            variants={fadeUp(index * 0.04, 8)}
            initial="initial"
            animate="animate"
            whileHover={{ y: -2 }}
            style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
          >
            <ImagePlaceholder
              variant="screenshot"
              label={project.name}
              className="mb-3 aspect-video w-full"
            />
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <p
                  className="mb-1 text-[9px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
                >
                  {project.label}
                </p>
                <h3
                  className="text-[14px] font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                >
                  {project.name}
                </h3>
              </div>
              <span
                className="rounded border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--ys-accent-strong)",
                  borderColor: "rgba(169, 61, 29, 0.28)",
                  background: "rgba(207, 79, 39, 0.1)",
                }}
              >
                {project.outcome}
              </span>
            </div>

            <p
              className="mb-3 text-[12px] leading-[1.75]"
              style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
            >
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
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
          </motion.a>
        ))}
      </div>
    </div>
  );
}
