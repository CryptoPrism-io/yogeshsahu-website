import { journal } from "@/data/journal";

export const dynamic = "force-static";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sorted = [...journal].sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = sorted
    .map((entry) => {
      const link = `https://yogeshsahu.xyz/journal/${entry.slug}`;
      const pubDate = new Date(entry.date).toUTCString();
      return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(entry.excerpt)}</description>
      <category>${entry.tags.join(", ")}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Journal — Yogesh Sahu</title>
    <link>https://yogeshsahu.xyz/journal</link>
    <description>A weekly Friday check-in on what I'm building, reading, and figuring out.</description>
    <language>en</language>
    <atom:link href="https://yogeshsahu.xyz/journal/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
