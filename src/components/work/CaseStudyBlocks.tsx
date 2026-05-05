import type {
  CaseStudySection,
  StatBlock,
  FlowBlock,
  TableBlock,
  CalloutBlock,
  ProseBlock,
  TagsBlock,
  Tone,
} from "@/data/case-studies/types";

const TONE_BORDER: Record<Tone | 'light', string> = {
  navy: "var(--ys-text)",
  blue: "var(--ys-highlight)",
  green: "var(--ys-accent-strong)",
  gold: "var(--ys-accent)",
  purple: "var(--ys-accent-strong)",
  cyan: "var(--ys-highlight)",
  red: "#c0392b",
  light: "var(--ys-border)",
};

const COLS_CLASS: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
};

function StatsBlockView({ block }: { block: StatBlock }) {
  const cols = block.cols ?? 4;
  return (
    <div className={`grid gap-3 ${COLS_CLASS[cols]}`}>
      {block.items.map((item, i) => (
        <div
          key={i}
          className="border-l-2 pl-3 py-1"
          style={{ borderColor: TONE_BORDER[item.tone ?? 'navy'] }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            {item.label}
          </p>
          <p
            className="text-[1.6rem] font-bold leading-tight"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {item.value}
          </p>
          {item.sub && (
            <p
              className="text-[10px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              {item.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function FlowBlockView({ block }: { block: FlowBlock }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
    >
      {block.title && (
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          {block.title}
        </p>
      )}
      <div className="flex flex-col gap-3">
        {block.rows.map((row, ri) => (
          <div key={ri} className="flex flex-wrap items-center gap-2">
            {row.map((node, ni) => (
              <div key={ni} className="flex items-center gap-2">
                <div
                  className="rounded-md border px-3 py-2 text-[12px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderColor: TONE_BORDER[node.tone ?? 'light'],
                    background: "var(--ys-surface)",
                    color: "var(--ys-text)",
                  }}
                >
                  <span className="font-bold">{node.label}</span>
                  {node.sublabel && (
                    <span
                      className="ml-2 text-[10px]"
                      style={{ color: "var(--ys-text-soft)" }}
                    >
                      {node.sublabel}
                    </span>
                  )}
                </div>
                {ni < row.length - 1 && (
                  <span
                    aria-hidden
                    className="text-[14px]"
                    style={{ color: "var(--ys-text-soft)" }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TableBlockView({ block }: { block: TableBlock }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr>
            {block.headers.map((h, i) => (
              <th
                key={i}
                className={`border-b px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] ${
                  h.align === "right" ? "text-right" : "text-left"
                }`}
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--ys-text-soft)",
                  borderColor: "var(--ys-border)",
                }}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`border-b px-3 py-2 ${
                    block.headers[ci]?.align === "right" ? "text-right" : "text-left"
                  } ${cell.mono ? "font-mono" : ""} ${cell.bold ? "font-bold" : ""}`}
                  style={{
                    borderColor: "var(--ys-border)",
                    color:
                      cell.tone === "green"
                        ? "var(--ys-accent-strong)"
                        : cell.tone === "red"
                        ? "#c0392b"
                        : "var(--ys-text)",
                    fontFamily: cell.mono ? "var(--font-mono)" : "var(--font-body)",
                  }}
                >
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalloutBlockView({ block }: { block: CalloutBlock }) {
  const accent =
    block.tone === "green"
      ? "var(--ys-accent-strong)"
      : block.tone === "blue" || block.tone === "purple"
      ? "var(--ys-highlight)"
      : "var(--ys-accent)";
  return (
    <div
      className="rounded-xl border-l-4 px-4 py-3"
      style={{
        borderLeftColor: accent,
        background: "var(--ys-surface-strong)",
        borderTopColor: "var(--ys-border)",
        borderRightColor: "var(--ys-border)",
        borderBottomColor: "var(--ys-border)",
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
      }}
    >
      {block.title && (
        <p
          className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-mono)", color: accent }}
        >
          {block.title}
        </p>
      )}
      <p
        className="text-[13px] leading-[1.7]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text)" }}
      >
        {block.body}
      </p>
    </div>
  );
}

function ProseBlockView({ block }: { block: ProseBlock }) {
  const paragraphs = block.body.split(/\n\n+/);
  return (
    <div>
      {block.heading && (
        <h3
          className="mb-2 text-[14px] font-bold uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          {block.heading}
        </h3>
      )}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mb-3 text-[14px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function TagsBlockView({ block }: { block: TagsBlock }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {block.items.map((tag, i) => (
        <span
          key={i}
          className="rounded border px-2 py-0.5 text-[10px]"
          style={{
            fontFamily: "var(--font-mono)",
            borderColor: TONE_BORDER[tag.tone ?? 'light'] === 'var(--ys-border)' ? "var(--ys-border)" : TONE_BORDER[tag.tone ?? 'light'],
            color: "var(--ys-text-soft)",
          }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

export default function CaseStudyBlocks({ sections }: { sections: CaseStudySection[] }) {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-16">
      {sections.map((section, si) => (
        <section key={si} className="mb-12">
          {(section.number || section.eyebrow) && (
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
            >
              {section.number ? `${section.number}  ` : ""}
              {section.eyebrow}
            </p>
          )}
          <h2
            className="mb-5 text-[22px] font-bold uppercase tracking-[0.02em]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {section.title}
          </h2>
          <div className="flex flex-col gap-5">
            {section.blocks.map((block, bi) => {
              switch (block.type) {
                case "stats":
                  return <StatsBlockView key={bi} block={block} />;
                case "flow":
                  return <FlowBlockView key={bi} block={block} />;
                case "table":
                  return <TableBlockView key={bi} block={block} />;
                case "callout":
                  return <CalloutBlockView key={bi} block={block} />;
                case "prose":
                  return <ProseBlockView key={bi} block={block} />;
                case "tags":
                  return <TagsBlockView key={bi} block={block} />;
              }
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
