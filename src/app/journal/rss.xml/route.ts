import { posts } from "@/data/posts";

export const dynamic = "force-static";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Back-compat feed: /journal/rss.xml now serves the unified log feed.
export async function GET() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = sorted
    .map((post) => {
      const link = `https://yogeshsahu.xyz/log/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${post.tags.join(", ")}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Log — Yogesh Sahu</title>
    <link>https://yogeshsahu.xyz/log</link>
    <description>Architecture notes, cost lessons, decision logs, and weekly reflections from Yogesh Sahu.</description>
    <language>en</language>
    <atom:link href="https://yogeshsahu.xyz/log/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

