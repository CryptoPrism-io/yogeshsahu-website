import type { LeadershipLens as LensData } from "@/data/case-studies/types";

const SLOTS: { key: keyof LensData; eyebrow: string; label: string }[] = [
  { key: 'call', eyebrow: '01', label: 'The Call' },
  { key: 'bet', eyebrow: '02', label: 'The Bet' },
  { key: 'tradeoff', eyebrow: '03', label: 'The Trade-off' },
  { key: 'outcome', eyebrow: '04', label: 'The Outcome' },
  { key: 'coordinated', eyebrow: '05', label: 'Coordinated' },
  { key: 'nextStep', eyebrow: '06', label: 'Where this goes next' },
];

export default function LeadershipLens({ lens }: { lens: LensData }) {
  return (
    <section
      aria-label="Leadership Lens"
      className="mx-auto mb-12 max-w-4xl rounded-2xl border px-5 py-6 sm:px-7 sm:py-8"
      style={{
        borderColor: "var(--ys-border)",
        background: "var(--ys-surface-strong)",
      }}
    >
      <p
        className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--ys-accent-strong)",
        }}
      >
        Leadership Lens
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {SLOTS.map((slot) => (
          <div key={slot.key}>
            <p
              className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ys-text-soft)",
              }}
            >
              <span style={{ color: "var(--ys-accent)" }}>{slot.eyebrow}</span>
              {"  "}
              {slot.label}
            </p>
            <p
              className="text-[13.5px] leading-[1.7]"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--ys-text)",
              }}
            >
              {lens[slot.key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
