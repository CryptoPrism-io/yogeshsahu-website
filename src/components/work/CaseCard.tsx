"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const MotionLink = motion(Link);

export default function CaseCard({ project }: { project: Project }) {
  return (
    <MotionLink
      href={`/projects/${project.id}`}
      className="block rounded-xl border p-4"
      whileHover={{ y: -5, boxShadow: "0 12px 36px rgba(34,18,10,0.16), 0 4px 12px rgba(34,18,10,0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      style={{
        borderColor: "var(--ys-border)",
        background: "var(--ys-surface-strong)",
      }}
    >
      {project.image && (
        <div className="relative mb-3 aspect-[7/3] w-full overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <p
        className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
      >
        {project.tags.slice(0, 3).join(" / ")}
      </p>
      <h3
        className="mb-2 text-[15px] font-bold"
        style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
      >
        {project.name}
      </h3>
      <p
        className="mb-3 text-[12px] leading-[1.7]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
      >
        {project.description}
      </p>
      <div className="flex items-center justify-between">
        <span
          className="text-[1rem] font-bold tabular-nums"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)", fontFeatureSettings: '"tnum"' }}
        >
          {project.stat}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          {project.statLabel}
        </span>
      </div>
    </MotionLink>
  );
}
