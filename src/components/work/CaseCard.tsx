"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { BRAND_SVG_MAP, BrandSvg } from "@/lib/brand-svgs";

const MotionLink = motion(Link);

export default function CaseCard({ project }: { project: Project }) {
  return (
    <MotionLink
      href={`/projects/${project.id}`}
      className="relative flex h-full flex-col overflow-hidden"
      whileHover={{ y: -3, boxShadow: "0 24px 44px -30px rgba(42,23,15,0.5)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{
        border: "1px solid #e9d3bf",
        background: "var(--ys-surface-strong)",
        color: "inherit",
      }}
    >
      {/* corner registration accent */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderTop: "18px solid var(--ys-accent)",
          borderLeft: "18px solid transparent",
          zIndex: 1,
        }}
      />

      {/* media */}
      <div
        className="relative w-full"
        style={{ height: 180, borderBottom: "1px solid #e9d3bf", background: "var(--ys-surface-muted)" }}
      >
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col" style={{ padding: 20 }}>
        <div className="mb-3 flex flex-wrap gap-x-2 gap-y-1">
          {project.tags.slice(0, 4).map((tag) => {
            const svgSlug = BRAND_SVG_MAP[tag];
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.1em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                {svgSlug && <BrandSvg slug={svgSlug} alt={tag} />}
                {tag}
              </span>
            );
          })}
        </div>
        <h3
          className="mb-2.5 text-[21px] font-bold leading-[1.05]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          {project.name}
        </h3>
        <p
          className="flex-1 text-[14px] leading-[1.5]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          {project.description}
        </p>
        <div
          className="mt-[18px] flex items-baseline justify-between pt-[14px]"
          style={{ borderTop: "1px solid #e9d3bf" }}
        >
          <span
            className="text-[22px] font-bold tabular-nums"
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
      </div>
    </MotionLink>
  );
}
