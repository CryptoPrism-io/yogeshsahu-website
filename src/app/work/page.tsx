import Link from "next/link";
import type { Metadata } from "next";
import { CLUSTERS, CLUSTER_ORDER } from "@/data/clusters";
import { getProjectsByCluster } from "@/lib/projects";
import ClusterSection from "@/components/work/ClusterSection";
import WorkPageHeader from "@/components/work/WorkPageHeader";

export const metadata: Metadata = {
  title: "Work — Yogesh Sahu",
  description:
    "Twelve case studies across fintech engineering, enterprise operations, and consumer & AI products. Founder-operator portfolio.",
  openGraph: {
    title: "Work — Yogesh Sahu",
    description:
      "Twelve case studies across fintech engineering, enterprise operations, and consumer & AI products.",
    url: "https://yogeshsahu.xyz/work",
  },
};

export default function WorkPage() {
  return (
    <main className="h-screen overflow-y-auto" style={{ background: "var(--ys-surface)" }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b px-5 py-3"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-[12px] font-bold uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            YS.
          </Link>
          <span
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            Work
          </span>
        </div>
      </nav>

      <WorkPageHeader />

      <div className="mx-auto max-w-5xl px-5 pb-16">
        {CLUSTER_ORDER.map((id) => (
          <ClusterSection
            key={id}
            cluster={CLUSTERS[id]}
            projects={getProjectsByCluster(id)}
          />
        ))}
      </div>

      <footer
        className="border-t px-5 py-8"
        style={{ borderColor: "var(--ys-border)" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-[11px] font-bold uppercase tracking-[0.1em] underline"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
          >
            Back to Home
          </Link>
          <span
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            yogeshsahu.xyz
          </span>
        </div>
      </footer>
    </main>
  );
}
