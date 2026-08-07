import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import AnalyticsOffer from "@/components/resources/AnalyticsOffer";

export const metadata: Metadata = {
  title: "AI Product Analyst — Yogesh Sahu",
  description:
    "A lightweight AI product analyst for founders. One tracking snippet → ask questions about your product → get a weekly memo with the single highest-value experiment to run next. Live experiment, looking for 3 design partners.",
  openGraph: {
    title: "AI Product Analyst — Yogesh Sahu",
    description:
      "Your analytics tell you what happened. This tells you what to do next. A live experiment — looking for 3 design partners.",
    url: "https://yogeshsahu.xyz/resources/analytics",
  },
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      <Link
        href="/resources"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] transition-colors"
        style={{ color: "var(--color-ink-2)" }}
      >
        <ArrowLeft size={12} />
        Back to Resources
      </Link>
      <AnalyticsOffer />
    </div>
  );
}
