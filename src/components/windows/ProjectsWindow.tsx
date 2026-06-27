"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { featuredProjects } from "@/lib/projects";

// Compact highlight reel — the window teases; /work is the full hub.
const REEL = featuredProjects.slice(0, 3);

export default function ProjectsWindow() {
  return (
    <div className="p-6">
      <motion.div
        className="mb-5 rounded-xl border p-4"
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
          className="text-[14px] leading-[1.75]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          A few highlights. The full set — twelve case studies across three leadership clusters — lives in the Work hub.
        </p>
      </motion.div>

      <div className="mb-3 flex items-center justify-between">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Featured
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-2.5">
        {REEL.map((project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp(i * 0.05, 8)}
            initial="initial"
            animate="animate"
            whileHover={{ y: -2 }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="group block rounded-lg border p-4 transition-colors"
              style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
            >
              <div className="mb-1.5 flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-2.5">
                  <span
                    className="text-[10px] font-bold tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4
                    className="text-[14px] font-bold"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                  >
                    {project.name}
                  </h4>
                </div>
                <span
                  className="shrink-0 rounded border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--ys-accent-strong)",
                    borderColor: "rgba(169, 61, 29, 0.28)",
                    background: "rgba(207, 79, 39, 0.1)",
                  }}
                >
                  {project.stat} {project.statLabel}
                </span>
              </div>
              <p
                className="text-[13px] leading-[1.65]"
                style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
              >
                {project.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp(0.2, 8)} initial="initial" animate="animate">
        <Link
          href="/work"
          className="focus-ring flex items-center justify-between rounded-lg px-5 py-3.5 transition-colors"
          style={{ background: "var(--ys-text)", color: "var(--ys-surface)" }}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            See all 12 case studies
          </span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <p
          className="mt-2 flex items-center gap-1 text-[10px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Opens the Work hub
          <ArrowUpRight size={11} />
        </p>
      </motion.div>
    </div>
  );
}
