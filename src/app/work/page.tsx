import Link from "next/link";
import type { Metadata } from "next";
import { CLUSTERS, CLUSTER_ORDER } from "@/data/clusters";
import { getProjectsByCluster } from "@/lib/projects";
import ClusterSection from "@/components/work/ClusterSection";
import WorkPageHeader from "@/components/work/WorkPageHeader";
import MobileNav from "@/components/layout/MobileNav";

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
      <div className="fixed top-4 left-4 z-50 hidden max-[767px]:block">
        <MobileNav />
      </div>
      <nav
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 inline-flex items-center gap-4 px-4 py-2"
        style={{
          background: "color-mix(in oklch, var(--ys-surface) 78%, transparent)",
          backdropFilter: "blur(14px) saturate(120%)",
          WebkitBackdropFilter: "blur(14px) saturate(120%)",
          border: "1px solid color-mix(in oklch, var(--ys-border) 70%, transparent)",
          borderRadius: 9999,
          boxShadow: "0 8px 24px -12px oklch(0% 0 0 / 0.18)",
        }}
      >
        <Link
          href="/"
          aria-label="Home"
          className="text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          YS.
        </Link>
        <span aria-hidden style={{ width: 1, height: 14, background: "var(--ys-border)" }} />
        <span
          className="text-[9px] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Work
        </span>
      </nav>

      <WorkPageHeader />

      <div className="mx-auto max-w-[1180px] px-10 pb-[100px]">
        {CLUSTER_ORDER.map((id) => (
          <ClusterSection
            key={id}
            cluster={CLUSTERS[id]}
            projects={getProjectsByCluster(id)}
          />
        ))}
      </div>

      <footer
        className="px-10 py-[72px]"
        style={{ borderTop: "1px solid var(--ys-border)" }}
      >
        <div className="mx-auto max-w-[1180px] grid gap-8">
          <p
            className="m-0"
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--ys-text)",
              maxWidth: "28ch",
            }}
          >
            Build something they&apos;ll remember.
          </p>
          <div
            className="flex justify-between items-baseline pt-2"
            style={{ borderTop: "1px solid var(--ys-border)" }}
          >
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              YS.
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              yogeshsahu.xyz
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
