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
  return (
    <section className="mb-16">
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <CaseCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
