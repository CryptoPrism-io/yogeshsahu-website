import type { Metadata } from "next";
import ResourcesHub from "@/components/resources/ResourcesHub";
import { founderPlaybooks } from "@/data/founder-playbooks";
import { toolkit } from "@/data/toolkit";

export const metadata: Metadata = {
  title: "Resources — Yogesh Sahu",
  description:
    "Free resources for founders and builders — analytics, investors, playbooks, engineering tools and more. Free to explore, copy, download and use.",
  openGraph: {
    title: "Resources — Yogesh Sahu",
    description:
      "AI Product Analyst, 8,600+ investor directory, founder playbooks, engineering toolkit, deck templates and community.",
    url: "https://yogeshsahu.xyz/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources — Yogesh Sahu",
    description: "AI Product Analyst, 8,600+ investors, playbooks, toolkit, community.",
  },
};

const HUB_ITEMS = [
  {
    name: "AI Product Analyst",
    description: "Your analytics tell you what happened. This tells you what to do next.",
    url: "https://yogeshsahu.xyz/resources/analytics",
  },
  {
    name: "Investors",
    description: "8,600+ investor directory — angels, VCs and funds.",
    url: "https://yogeshsahu.xyz/resources/investors",
  },
  {
    name: "Playbooks",
    description: "Practical guides for building and fundraising.",
    url: "https://yogeshsahu.xyz/resources/playbooks",
  },
  {
    name: "Decks & Templates",
    description: "Useful starting points for founders.",
    url: "https://yogeshsahu.xyz/resources/decks",
  },
  {
    name: "Engineering Toolkit",
    description: "Skills, prompts and tools from real engineering work.",
    url: "https://yogeshsahu.xyz/resources/toolkit",
  },
  {
    name: "Community",
    description: "Communities, programs and places worth knowing.",
    url: "https://yogeshsahu.xyz/resources/community",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHub />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Resources — Yogesh Sahu",
            description:
              "Free resources for founders and builders: AI product analyst, investor directory, playbooks, toolkit, decks and community.",
            url: "https://yogeshsahu.xyz/resources",
            about: {
              "@type": "Person",
              name: "Yogesh Sahu",
              description: "Founder, AI-native builder, CTO",
            },
            mainEntity: [
              {
                "@type": "ItemList",
                name: "Resources",
                itemListElement: HUB_ITEMS.map((item, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: item.name,
                  description: item.description,
                  url: item.url,
                })),
              },
              {
                "@type": "ItemList",
                name: "Founder Playbooks",
                itemListElement: founderPlaybooks.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: p.title,
                  url: `https://yogeshsahu.xyz/resources/playbooks#${p.slug}`,
                })),
              },
              {
                "@type": "ItemList",
                name: "Toolkit",
                itemListElement: toolkit.map((t, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: t.name,
                  url: t.url !== "#" ? t.url : undefined,
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}
