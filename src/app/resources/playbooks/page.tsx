import type { Metadata } from "next";
import ResourcePageHeader from "@/components/resources/ResourcePageHeader";
import PlaybookList from "@/components/resources/PlaybookList";

export const metadata: Metadata = {
  title: "Founder & Builder Playbooks — Yogesh Sahu",
  description:
    "Practical playbooks for building and fundraising — operating, hiring, fundraising, sales and mental health. Written from the mistakes I actually made.",
  openGraph: {
    title: "Founder & Builder Playbooks — Yogesh Sahu",
    description:
      "Operating, hiring, fundraising, sales and mental-health playbooks from real company-building mistakes.",
    url: "https://yogeshsahu.xyz/resources/playbooks",
  },
};

export default function PlaybooksPage() {
  return (
    <div className="space-y-8 pb-12">
      <ResourcePageHeader
        eyebrow="Resources / Playbooks"
        title="Founder & Builder Playbooks"
        description="Practical guides for building and fundraising — operating, hiring, fundraising, sales and staying sane. No theory; what worked, what didn't, and why."
      />
      <PlaybookList />
    </div>
  );
}
