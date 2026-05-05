import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function CaseCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-xl border p-4 transition-colors hover:opacity-90"
      style={{
        borderColor: "var(--ys-border)",
        background: "var(--ys-surface-strong)",
      }}
    >
      {project.image && (
        <Image
          src={project.image}
          alt={project.name}
          width={700}
          height={250}
          className="mb-3 w-full rounded-lg object-cover"
        />
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
          className="text-[1rem] font-bold"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
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
    </Link>
  );
}
