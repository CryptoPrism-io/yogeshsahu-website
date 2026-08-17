"use client";

import { useState } from "react";

const EASE = "cubic-bezier(.16,.84,.44,1)";
const MONO = "var(--font-mono)";
const HEAD = "var(--font-headline)";
const BODY = "var(--font-body)";
const SERIF = "var(--font-serif-display)";

const QUICK_FACTS = [
  { label: "Location", value: "Mumbai, India" },
  { label: "Timezone", value: "IST (UTC+5:30)" },
  { label: "Experience", value: "8+ years" },
  { label: "Focus", value: "AI-Native Products" },
  { label: "Stack", value: "Next.js · FastAPI · Postgres" },
  { label: "Availability", value: "Open for mandates" },
];

const PHILOSOPHY = [
  "I believe in shipping production-grade code, not MVPs.",
  "Every product should have a clear path to revenue from day one.",
  "AI is a multiplier, not a replacement for good architecture.",
  "Performance is a feature—latency kills user trust.",
];

interface AboutWindowProps {
  hideHeader?: boolean;
}

export default function AboutWindow({ hideHeader }: AboutWindowProps = {}) {
  const [activeTab, setActiveTab] = useState<"facts" | "philosophy" | "contact">("facts");

  return (
    <div
      className="h-full overflow-y-auto p-6"
      style={{ fontFamily: BODY, background: "var(--ys-surface)" }}
    >
      {/* Header */}
      {!hideHeader && (
        <div className="mb-6">
          <h2
            style={{
              fontFamily: HEAD,
              fontWeight: 700,
              fontSize: 32,
              color: "var(--ys-text)",
              marginBottom: 8,
            }}
          >
            About Me
          </h2>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.1em",
              color: "var(--ys-text-soft)",
              textTransform: "uppercase",
            }}
          >
            Founder · AI-Native Builder · CTO
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {(["facts", "philosophy", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="transition-all duration-300"
            style={{
              padding: "8px 16px",
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid var(--ys-border)",
              background: activeTab === tab ? "var(--ys-highlight)" : "transparent",
              color: activeTab === tab ? "var(--ys-surface)" : "var(--ys-text)",
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          animation: `fadeIn 0.4s ${EASE}`,
        }}
      >
        {activeTab === "facts" && (
          <div className="grid grid-cols-2 gap-4">
            {QUICK_FACTS.map((fact) => (
              <div
                key={fact.label}
                style={{
                  padding: "16px",
                  border: "1px solid var(--ys-border)",
                  borderRadius: 4,
                  background: "rgba(255,245,235,0.5)",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    color: "var(--ys-text-soft)",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {fact.label}
                </div>
                <div
                  style={{
                    fontFamily: BODY,
                    fontSize: 14,
                    color: "var(--ys-text)",
                    fontWeight: 500,
                  }}
                >
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "philosophy" && (
          <div className="space-y-4">
            {PHILOSOPHY.map((quote, i) => (
              <div
                key={i}
                style={{
                  padding: "20px",
                  borderLeft: "3px solid var(--ys-highlight)",
                  background: "rgba(255,245,235,0.5)",
                }}
              >
                <p
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--ys-text)",
                    margin: 0,
                  }}
                >
                  "{quote}"
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-4">
            <div
              style={{
                padding: "20px",
                border: "1px solid var(--ys-border)",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "var(--ys-text-soft)",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Direct Channels
              </div>
              <div className="space-y-3">
                <a
                  href="mailto:yogesh.sahu@cryptoprism.io"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: BODY,
                    fontSize: 14,
                    color: "var(--ys-accent)",
                    textDecoration: "none",
                  }}
                >
                  <span>✉</span> yogesh.sahu@cryptoprism.io
                </a>
                <a
                  href="https://linkedin.com/in/yogeshsahu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: BODY,
                    fontSize: 14,
                    color: "var(--ys-accent)",
                    textDecoration: "none",
                  }}
                >
                  <span>🔗</span> linkedin.com/in/yogeshsahu
                </a>
                <a
                  href="https://github.com/CryptoPrism-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: BODY,
                    fontSize: 14,
                    color: "var(--ys-accent)",
                    textDecoration: "none",
                  }}
                >
                  <span>⚡</span> github.com/CryptoPrism-io
                </a>
              </div>
            </div>

            <div
              style={{
                padding: "20px",
                border: "1px solid var(--ys-border)",
                borderRadius: 4,
                background: "rgba(255,245,235,0.5)",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "var(--ys-text-soft)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Response Time
              </div>
              <div
                style={{
                  fontFamily: HEAD,
                  fontWeight: 600,
                  fontSize: 24,
                  color: "var(--ys-highlight)",
                }}
              >
                24-48 hours
              </div>
              <p
                style={{
                  fontFamily: BODY,
                  fontSize: 13,
                  color: "var(--ys-text-soft)",
                  marginTop: 8,
                }}
              >
                For urgent matters, mention "URGENT" in the subject line.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
