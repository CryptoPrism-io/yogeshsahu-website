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
    <section ref={ref} className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          Cluster {cluster.id} · {cluster.archetype}
        </p>
        <h2
          className="mb-3 text-[clamp(1.4rem,3vw,2rem)] font-bold uppercase leading-[1.05]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          {cluster.name}
        </h2>
        <p
          className="mb-7 max-w-[68ch] text-[14px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          {cluster.thesis}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <motion.div
            key={p.id}
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
