import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Decks & Templates — Yogesh Sahu",
  description:
    "Pitch deck templates, sample decks, data room checklists and one-pager structures. Being prepared for Q3 2026.",
};

export default function DecksPage() {
  return (
    <div className="space-y-8 pb-12">
      <div
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 px-6 text-center"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <div
          className="rounded-xl border px-4 py-2 text-xs font-mono uppercase tracking-widest mb-4"
          style={{
            borderColor: "var(--color-rule)",
            color: "var(--color-accent-strong)",
            background: "color-mix(in oklch, var(--color-accent) 6%, transparent)",
          }}
        >
          <Sparkles size={14} className="inline mr-2" />
          Q3 2026
        </div>
        <h1
          className="text-xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--color-ink)",
          }}
        >
          Pitch Decks & Templates
        </h1>
        <p
          className="text-sm max-w-md"
          style={{ color: "var(--color-ink-2)" }}
        >
          Slide-by-slide pitch deck templates, sample decks, data room
          checklist, and one-pager structure. Being prepared for Q3 2026.
        </p>
      </div>
    </div>
  );
}
