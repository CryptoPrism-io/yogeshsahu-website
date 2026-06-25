"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { getAllClusteredProjects } from "@/lib/projects";
import { CLUSTERS } from "@/data/clusters";

export default function ProjectsWindow() {
  const clustered = getAllClusteredProjects();

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
          className="text-[14px] leading-[1.75]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          Twelve case studies across three leadership clusters. Each opens with a decision, a bet, and an outcome — engineering depth in support.
        </p>
      </motion.div>

      <div className="mb-5 flex items-center justify-between">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          By Cluster
        </p>
        <Link
          href="/work"
          className="text-[10px] hover:underline"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-highlight)" }}
        >
          Open /work hub →
        </Link>
      </div>

      {clustered.map(({ cluster, projects }, ci) => (
        <motion.div
          key={cluster}
          variants={fadeUp(ci * 0.05, 10)}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
          >
            Cluster {cluster} · {CLUSTERS[cluster].archetype}
          </p>
          <h3
            className="mb-3 text-[14px] font-bold uppercase tracking-[0.04em]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {CLUSTERS[cluster].name}
          </h3>
          <div className="flex flex-col gap-3">
            {projects.map((project, pi) => (
              <motion.div
                key={project.id}
                variants={fadeUp(pi * 0.03, 8)}
                initial="initial"
                animate="animate"
                whileHover={{ y: -2 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="block rounded-lg border p-4 transition-colors"
                  style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={700}
                      height={250}
                      className="mb-3 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <ImagePlaceholder
                      variant="screenshot"
                      label={project.name}
                      className="mb-3 aspect-video w-full"
                    />
                  )}
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h4
                      className="text-[14px] font-bold"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                    >
                      {project.name}
                    </h4>
                    <span
                      className="rounded border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em]"
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
                    className="mb-3 text-[14px] leading-[1.75]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {project.description}
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
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
