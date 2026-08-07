import type { Metadata } from "next";
import ResourcePageHeader from "@/components/resources/ResourcePageHeader";
import InvestorsSection from "@/components/resources/InvestorsSection";
import investorsData from "@/data/investors.json";

export const metadata: Metadata = {
  title: "8,628+ Investor Directory — Yogesh Sahu",
  description:
    "A searchable directory of 8,600+ angels, VCs and funds with filtering, enrichment scores and a data dashboard. Built for founders raising in India and beyond.",
  openGraph: {
    title: "8,628+ Investor Directory — Yogesh Sahu",
    description:
      "Searchable directory of 8,600+ angels, VCs and funds — filters, enrichment scores, dashboard.",
    url: "https://yogeshsahu.xyz/resources/investors",
  },
};

export default function InvestorsPage() {
  return (
    <div className="space-y-8 pb-12">
      <ResourcePageHeader
        eyebrow="Resources / Investors"
        title={`${investorsData.length.toLocaleString()}+ Investors`}
        description="Find angels, VCs and funds relevant to what you're building — search, filter, enrich and export."
      />
      <InvestorsSection />
    </div>
  );
}
