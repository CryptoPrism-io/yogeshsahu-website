"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ClusterMeta } from "@/data/clusters";
import type { Project } from "@/lib/projects";
import CaseCard from "./CaseCard";

export default function ClusterSection({
  cluster,
  projects,
}: {
  cluster: ClusterMeta;
  projects: Project[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="mb-1.5 text-[12px] uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          Cluster {cluster.id} · {cluster.archetype}
        </p>
        <h2
          className="mb-3.5 font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
            fontSize: "clamp(30px,4vw,46px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {cluster.name}
        </h2>
        <p
          className="mb-[30px] max-w-[760px] text-[16.5px] leading-[1.55]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          {cluster.thesis}
        </p>
      </motion.div>

      <div
        className="grid gap-[22px]"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))" }}
      >
        {projects.map((p, idx) => (
          <motion.div
            key={p.id}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + idx * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <CaseCard project={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
