"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Mono code box with a copy button. Fires copy_skill (piece) on copy.
 */
export default function CopyBox({
  label,
  code,
  piece,
  maxHeight,
}: {
  label: string;
  code: string;
  piece: string;
  maxHeight?: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    trackEvent("copy_skill", { piece });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--color-rule)", background: "var(--color-paper-muted)" }}
    >
      <div
        className="flex items-center justify-between gap-3 border-b px-4 py-2"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-2)" }}
        >
          {label}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-mono font-semibold transition-colors duration-[var(--dur-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          style={
            copied
              ? {
                  borderColor: "color-mix(in oklch, var(--color-accent) 40%, transparent)",
                  color: "var(--color-accent-strong)",
                  background: "color-mix(in oklch, var(--color-accent) 10%, transparent)",
                }
              : {
                  borderColor: "var(--color-rule)",
                  color: "var(--color-ink-2)",
                  background: "var(--color-paper)",
                }
          }
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className="overflow-x-auto p-4 text-[12px] leading-[1.7]"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-ink)",
          maxHeight: maxHeight ?? undefined,
          overflowY: maxHeight ? "auto" : undefined,
        }}
      >
        {code}
      </pre>
    </div>
  );
}
