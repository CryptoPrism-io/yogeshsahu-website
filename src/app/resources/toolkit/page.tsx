import type { Metadata } from "next";
import ResourcePageHeader from "@/components/resources/ResourcePageHeader";
import ToolkitList from "@/components/resources/ToolkitList";

export const metadata: Metadata = {
  title: "Engineering Toolkit — Yogesh Sahu",
  description:
    "Skills, prompts and tools from real engineering work — AI, engineering, design, productivity and finance resources for technical founders.",
  openGraph: {
    title: "Engineering Toolkit — Yogesh Sahu",
    description:
      "Skills, prompts and tools from real engineering work — for technical founders and lead engineers.",
    url: "https://yogeshsahu.xyz/resources/toolkit",
  },
};

export default function ToolkitPage() {
  return (
    <div className="space-y-8 pb-12">
      <ResourcePageHeader
        eyebrow="Resources / Engineering Toolkit"
        title="Engineering Toolkit"
        description="Skills, prompts and tools from real engineering work — the things a technical founder or lead engineer reaches for daily."
      />
      <ToolkitList />
    </div>
  );
}
