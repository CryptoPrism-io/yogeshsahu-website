import type { Metadata } from "next";
import ResourcePageHeader from "@/components/resources/ResourcePageHeader";
import CommunityList from "@/components/resources/CommunityList";

export const metadata: Metadata = {
  title: "Community — Yogesh Sahu",
  description:
    "Communities, programs and places worth knowing — for founders and builders. Curated from years of building in public.",
  openGraph: {
    title: "Community — Yogesh Sahu",
    description:
      "Communities, programs and places worth knowing for founders and builders.",
    url: "https://yogeshsahu.xyz/resources/community",
  },
};

export default function CommunityPage() {
  return (
    <div className="space-y-8 pb-12">
      <ResourcePageHeader
        eyebrow="Resources / Community"
        title="Community"
        description="Communities, programs and places worth knowing — for founders and builders."
      />
      <CommunityList />
    </div>
  );
}
