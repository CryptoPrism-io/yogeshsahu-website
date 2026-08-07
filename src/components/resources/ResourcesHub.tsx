import ResourcesHubCards from "./ResourcesHubCards";

/**
 * /resources hub — compact hero + the resource marketplace grid.
 * Server component; the card grid is client-side only for nav_click tracking.
 */
export default function ResourcesHub() {
  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-4">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-2)" }}
        >
          Resources
        </p>
        <h1
          className="font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--color-ink)",
            fontSize: "clamp(32px, 5vw, 60px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          Tools I&apos;ve built and collected
          <br />
          while building companies.
        </h1>
        <p
          className="max-w-[60ch] text-[15px] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-ink-2)" }}
        >
          Free resources for founders and builders — analytics, investors,
          playbooks, engineering tools and more. Free to explore, copy,
          download and use.
        </p>
      </header>

      <ResourcesHubCards />
    </div>
  );
}
