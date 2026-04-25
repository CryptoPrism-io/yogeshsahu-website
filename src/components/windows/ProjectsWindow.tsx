"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const PROJECTS = [
  {
    id: "cryptoprism-db",
    label: "PROJ_001 | PYTHON | GCP",
    name: "CryptoPrism DB",
    desc: "Three-database GCP architecture for 1,000+ assets and 130+ on-chain indicators.",
    outcome: "1B+ points/day, 99.9% SLA",
    tags: ["GCP", "PostgreSQL", "Python", "FastAPI"],
    href: "https://cryptoprism.io",
  },
  {
    id: "cryptoprism-platform",
    label: "PROJ_002 | REACT | FASTAPI",
    name: "CryptoPrism Platform",
    desc: "Real-time analytics interface with live feed processing and multi-timeframe workflows.",
    outcome: "Live market context at operator speed",
    tags: ["React", "FastAPI", "WebSockets"],
    href: "https://cryptoprism.io",
  },
  {
    id: "kari",
    label: "PROJ_003 | UNITY | MOBILE",
    name: "KARI",
    desc: "India-themed puzzle platformer built and launched quickly with global distribution.",
    outcome: "50K downloads in 21 days",
    tags: ["Unity", "C#", "Mobile"],
    href: "https://apps.apple.com/app/kari-and-the-lost-shrines",
  },
  {
    id: "ubisoft",
    label: "PROJ_004 | PYSPARK | DATABRICKS",
    name: "Ubisoft Pipeline",
    desc: "Analytics pipeline work for high-volume game telemetry in global production environments.",
    outcome: "AAA-scale data operations",
    tags: ["PySpark", "Databricks"],
    href: "#",
  },
  {
    id: "timesfm",
    label: "PROJ_005 | PYTHON | ML",
    name: "TimesFM Quant",
    desc: "Academic-financial research applying Google's TimesFM model to crypto forecasting.",
    outcome: "Dissertation topper, 82/100",
    tags: ["TimesFM", "NLP", "Python"],
    href: "#",
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
