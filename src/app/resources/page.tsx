import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import ResourcesView from "@/components/resources/ResourcesView";

export const metadata: Metadata = {
  title: "Resources & Investor Directory — Yogesh Sahu",
  description:
    "Explore global angel investors, seed funds, pitch deck blueprints, and technical playbooks for founders, engineers, and solopreneurs.",
  openGraph: {
    title: "Resources & Global Investor Directory — Yogesh Sahu",
    description:
      "Global angel & seed investor directory with instant CSV/Excel export, pitch deck blueprints, and tech playbooks.",
    url: "https://yogeshsahu.xyz/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources & Global Investor Directory — Yogesh Sahu",
    description: "Explore 2,500+ active global investors and founder playbooks.",
  },
};

export default function ResourcesPage() {
  return (
    <main className="h-screen overflow-y-auto" style={{ background: "var(--ys-surface)", color: "var(--ys-text)" }}>
      {/* Top Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b px-5 py-3"
        style={{
          borderColor: "var(--ys-border)",
          background: "rgba(255, 248, 241, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Back to home"
              className="focus-ring flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-[var(--ys-surface-strong)]"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "var(--ys-border)",
                color: "var(--ys-text-soft)",
              }}
            >
              <ArrowLeft size={13} strokeWidth={2} />
              Home
            </Link>
            <span aria-hidden style={{ width: 1, height: 16, background: "var(--ys-border)" }} />
            <Link
              href="/"
              aria-label="Home"
              className="text-[12px] font-bold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              YS.
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/work" className="transition-colors hover:underline" style={{ color: "var(--ys-text-soft)" }}>
              Work & Case Studies
            </Link>
            <span
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] border font-bold"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(207, 79, 39, 0.08)",
                borderColor: "rgba(207, 79, 39, 0.28)",
                color: "var(--ys-accent-strong)",
              }}
            >
              <BookOpen size={11} /> Resources Hub
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[90vw] px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <ResourcesView />
      </div>

      {/* Footer */}
      <footer
        className="border-t px-5 py-8"
        style={{ borderColor: "var(--ys-border)" }}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between text-xs font-mono" style={{ color: "var(--ys-text-soft)" }}>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-bold uppercase tracking-[0.1em] underline"
              style={{ color: "var(--ys-accent)" }}
            >
              Back to Home
            </Link>
            <span>•</span>
            <Link
              href="/work"
              className="hover:underline"
              style={{ color: "var(--ys-text-soft)" }}
            >
              Work Portfolio
            </Link>
          </div>
          <span>yogeshsahu.xyz</span>
        </div>
      </footer>
    </main>
  );
}
