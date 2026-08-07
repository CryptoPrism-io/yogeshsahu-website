import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Shared small header for resource sub-pages:
 * Resources / [Resource] · [TITLE] · one-liner · ← Back to Resources
 */
export default function ResourcePageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="space-y-4">
      <p
        className="text-[11px] font-bold uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-2)" }}
      >
        {eyebrow}
      </p>
      <h1
        className="font-bold uppercase"
        style={{
          fontFamily: "var(--font-headline)",
          color: "var(--color-ink)",
          fontSize: "clamp(28px, 4.5vw, 48px)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>
      <p
        className="max-w-[62ch] text-[15px] leading-[1.7]"
        style={{ fontFamily: "var(--font-body)", color: "var(--color-ink-2)" }}
      >
        {description}
      </p>
      <Link
        href="/resources"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] transition-colors"
        style={{ color: "var(--color-ink-2)" }}
      >
        <ArrowLeft size={12} />
        Back to Resources
      </Link>
    </header>
  );
}
