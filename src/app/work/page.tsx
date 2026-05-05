import Link from "next/link";
import type { Metadata } from "next";
import { CLUSTERS, CLUSTER_ORDER } from "@/data/clusters";
import { getProjectsByCluster } from "@/lib/projects";
import ClusterSection from "@/components/work/ClusterSection";

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

      <header className="mx-auto max-w-5xl px-5 pt-20 pb-10">
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Twelve case studies / three leadership clusters
        </p>
        <h1
          className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.95]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          Work
        </h1>
        <p
          className="max-w-[60ch] text-[15px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          Each case opens with a decision, a bet, and an outcome — engineering depth in support, not in the lead.
        </p>
      </header>

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
