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
      style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-muted)" }}
    >
      <div
        className="flex items-center justify-between gap-3 border-b px-4 py-2"
        style={{ borderColor: "var(--ys-border)" }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          {label}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-mono font-semibold transition-all"
          style={
            copied
              ? {
                  borderColor: "rgba(11, 141, 128, 0.4)",
                  color: "var(--ys-highlight)",
                  background: "rgba(11, 141, 128, 0.1)",
                }
              : {
                  borderColor: "var(--ys-border)",
                  color: "var(--ys-text-soft)",
                  background: "var(--ys-surface)",
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
          color: "var(--ys-text)",
          maxHeight: maxHeight ?? undefined,
          overflowY: maxHeight ? "auto" : undefined,
        }}
      >
        {code}
      </pre>
    </div>
  );
}
