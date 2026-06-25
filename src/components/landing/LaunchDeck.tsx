"use client";

import Image from "next/image";
import { type CSSProperties, type RefObject, useEffect, useRef, useState } from "react";
import { rhythmDelays } from "@/lib/motion";

const EASE = "cubic-bezier(.16,.84,.44,1)";
const MONO = "var(--font-mono)";
const HEAD = "var(--font-headline)";
const BODY = "var(--font-body)";
const SERIF = "var(--font-serif-display)";

function Corner({ pos, size = 7, w = 1.5 }: { pos: "tl" | "tr" | "bl" | "br"; size?: number; w?: number }) {
  const v = pos[0] === "t" ? { top: -5 } : { bottom: -5 };
  const hpos = pos[1] === "l" ? { left: -5 } : { right: -5 };
  const borders =
    pos === "tl"
      ? { borderTop: `${w}px solid var(--ys-accent)`, borderLeft: `${w}px solid var(--ys-accent)` }
      : pos === "tr"
        ? { borderTop: `${w}px solid var(--ys-accent)`, borderRight: `${w}px solid var(--ys-accent)` }
        : pos === "bl"
          ? { borderBottom: `${w}px solid var(--ys-accent)`, borderLeft: `${w}px solid var(--ys-accent)` }
          : { borderBottom: `${w}px solid var(--ys-accent)`, borderRight: `${w}px solid var(--ys-accent)` };
  return <span style={{ position: "absolute", width: size, height: size, ...v, ...hpos, ...borders }} />;
}

/** Registration mark anchored to the card edges (absolute to the article). */
function RegMark({ pos, delay }: { pos: "tl" | "tr" | "bl" | "br"; delay: number }) {
  const v = pos[0] === "t" ? { top: 11 } : { bottom: 11 };
  const hpos = pos[1] === "l" ? { left: 11 } : { right: 11 };
  const borders =
    pos === "tl"
      ? { borderTop: "1.5px solid var(--ys-accent)", borderLeft: "1.5px solid var(--ys-accent)" }
      : pos === "tr"
        ? { borderTop: "1.5px solid var(--ys-accent)", borderRight: "1.5px solid var(--ys-accent)" }
        : pos === "bl"
          ? { borderBottom: "1.5px solid var(--ys-accent)", borderLeft: "1.5px solid var(--ys-accent)" }
          : { borderBottom: "1.5px solid var(--ys-accent)", borderRight: "1.5px solid var(--ys-accent)" };
  return (
    <span
      style={{
        position: "absolute",
        width: 9,
        height: 9,
        ...v,
        ...hpos,
        ...borders,
        animation: `ip-fade .6s ease ${delay}s both`,
      }}
    />
  );
}

const RULE = (delay: number): CSSProperties => ({
  height: 1,
  background: "var(--ys-border)",
  transformOrigin: "left",
  animation: `ip-draw .8s ${EASE} ${delay}s both`,
});

const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

function useCountUp(target: number, suffix: string, dur: number, delay: number) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const id = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(easeOutExpo(p) * target) + suffix;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, dur, delay]);
  return ref;
}

function Metric({
  countRef,
  zero,
  label,
  divider,
  delay,
}: {
  countRef: RefObject<HTMLDivElement | null>;
  zero: string;
  label: string;
  divider: boolean;
  delay: number;
}) {
  return (
    <div
      style={{
        padding: divider ? "13px 0 13px 20px" : "13px 0",
        borderLeft: divider ? "1px solid var(--ys-border)" : undefined,
        animation: `ip-rise .6s ${EASE} ${delay}s both`,
      }}
    >
      <div
        ref={countRef}
        style={{
          fontFamily: HEAD,
          fontWeight: 600,
          fontSize: 30,
          lineHeight: 1,
          color: "var(--ys-accent)",
          letterSpacing: "-0.02em",
        }}
      >
        {zero}
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: MONO,
          fontSize: 9.5,
          letterSpacing: "0.13em",
          color: "var(--ys-text-soft)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function LaunchDeck({ onOpen }: { onOpen: (id: string) => void }) {
  // One shared fast→slow→fast timeline (smoothstep) for the whole panel.
  // 15 beats: header, rule, name×2, bio, metric-rule, m1-3, CTA, career-rule,
  // career-header, featured, kari, gamerz. The left nav (GlyphPanel) overlaps
  // this same window with its own rhythm.
  const R = rhythmDelays(15, 0, 1.05);
  const m1 = useCountUp(6, "+", 900, R[6] * 1000);
  const m2 = useCountUp(2, "M+", 950, R[7] * 1000);
  const m3 = useCountUp(1, "B+", 1000, R[8] * 1000);

  const [clock, setClock] = useState("");
  const [arrow, setArrow] = useState(0);

  useEffect(() => {
    const fmt = () => {
      try {
        const t = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        });
        setClock(`${t} IST`);
      } catch {
        /* noop */
      }
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  const mono = (size: number, spacing: string, color: string): CSSProperties => ({
    fontFamily: MONO,
    fontSize: size,
    letterSpacing: spacing,
    color,
    textTransform: "uppercase",
  });

  return (
    <section
      className="no-scrollbar absolute left-3 right-3 top-3 z-[2] md:left-auto md:right-4 md:top-4 md:w-[520px] xl:w-[540px]"
      style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
      aria-label="Identity panel"
    >
      <article
        style={{
          position: "relative",
          width: "100%",
          background: "var(--ys-surface)",
          border: "1px solid var(--ys-border)",
          borderRadius: 5,
          padding: "22px 26px 20px",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "0 28px 64px -30px rgba(42,23,15,0.6)",
          fontFamily: BODY,
        }}
      >
        {/* grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.05,
            mixBlendMode: "multiply",
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
          }}
        />

        {/* registration corner marks — snap in last */}
        <RegMark pos="tl" delay={R[14] + 0.05} />
        <RegMark pos="tr" delay={R[14] + 0.09} />
        <RegMark pos="bl" delay={R[14] + 0.13} />
        <RegMark pos="br" delay={R[14] + 0.17} />

        <div style={{ position: "relative" }}>
          {/* header strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              animation: `ip-fade .6s ease ${R[0]}s both`,
            }}
          >
            <span style={{ ...mono(11, "0.15em", "var(--ys-text-soft)"), lineHeight: 1.3 }}>
              FOUNDER&nbsp;|&nbsp;AI-NATIVE BUILDER&nbsp;|&nbsp;CTO
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--ys-text-soft)",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ys-highlight)" }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--ys-highlight)",
                    display: "inline-block",
                    animation: `ip-pulse 2.4s ease-in-out infinite`,
                  }}
                />
                OPEN
              </span>
              <span style={{ color: "#c9ad97" }}>·</span>
              <span suppressHydrationWarning>{clock || "—"}</span>
            </span>
          </div>
          <div style={{ ...RULE(R[1]), marginTop: 12 }} />

          {/* hero */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 168px",
              gap: 24,
              alignItems: "start",
              padding: "16px 0 14px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontFamily: HEAD,
                  fontWeight: 700,
                  fontSize: 46,
                  lineHeight: 0.9,
                  letterSpacing: "-0.025em",
                  color: "var(--ys-text)",
                }}
              >
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span style={{ display: "block", animation: `ip-line .9s ${EASE} ${R[2]}s both` }}>YOGESH</span>
                </span>
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span style={{ display: "block", animation: `ip-line .9s ${EASE} ${R[3]}s both` }}>SAHU</span>
                </span>
              </h1>
              <p
                style={{
                  margin: "16px 0 0",
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "var(--ys-text-soft)",
                  maxWidth: "30ch",
                  animation: `ip-rise .8s ${EASE} ${R[4]}s both`,
                }}
              >
                I build and ship AI-native B2B and B2C products end-to-end — 6+ production-grade apps in 6 months,{" "}
                <em
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--ys-accent-strong)",
                  }}
                >
                  not MVPs.
                </em>
              </p>
            </div>

            <div style={{ animation: `ip-rise .9s ${EASE} ${R[2]}s both` }}>
              <div
                style={{
                  position: "relative",
                  width: 168,
                  height: 168,
                  border: "1px solid #c5c0b8",
                  background: "#e9e7e3",
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Yogesh Sahu"
                  fill
                  sizes="168px"
                  style={{ objectFit: "cover", filter: "grayscale(1) contrast(1.02)" }}
                  priority
                />
                <Corner pos="tl" />
                <Corner pos="tr" />
                <Corner pos="bl" />
                <Corner pos="br" />
              </div>
              <div style={{ marginTop: 9, ...mono(9, "0.1em", "#6e635a") }}>B&amp;W · Headshot</div>
            </div>
          </div>

          {/* metrics */}
          <div style={RULE(R[5])} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
            <Metric countRef={m1} zero="0+" label="Apps shipped" divider={false} delay={R[6]} />
            <Metric countRef={m2} zero="0M+" label="Lines of code" divider delay={R[7]} />
            <Metric countRef={m3} zero="0B+" label="Datapoints / day" divider delay={R[8]} />
          </div>

          {/* CTA */}
          <button
            onClick={() => onOpen("diagnostic")}
            onMouseEnter={() => setArrow(6)}
            onMouseLeave={() => setArrow(0)}
            className="focus-ring"
            aria-label="Start a diagnostic"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              background: "var(--ys-highlight)",
              color: "var(--ys-surface)",
              border: "none",
              cursor: "pointer",
              padding: "13px 20px",
              borderRadius: 3,
              marginTop: 6,
              animation: `ip-rise .7s ${EASE} ${R[9]}s both`,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Start a Diagnostic
            </span>
            <span
              style={{
                fontSize: 18,
                lineHeight: 1,
                display: "inline-block",
                transform: `translateX(${arrow}px)`,
                transition: `transform .25s ${EASE}`,
              }}
            >
              →
            </span>
          </button>

          {/* career highlights */}
          <section style={{ marginTop: 20 }}>
            <div style={RULE(R[10])} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 16,
                marginBottom: 14,
                animation: `ip-fade .6s ease ${R[11]}s both`,
              }}
            >
              <span style={mono(11, "0.15em", "var(--ys-text-soft)")}>Career Highlights</span>
              <span
                style={{
                  ...mono(10, "0.12em", "var(--ys-accent-strong)"),
                  border: "1px solid var(--ys-border)",
                  padding: "4px 9px",
                }}
              >
                2× Founder
              </span>
            </div>

            {/* featured */}
            <div
              className="ip-lift"
              style={{ paddingBottom: 14, borderBottom: "1px solid var(--ys-border)", animation: `ip-rise .7s ${EASE} ${R[12]}s both` }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <span style={mono(11, "0.14em", "var(--ys-text-soft)")}>CryptoPrism</span>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "#c9ad97" }}>01</span>
              </div>
              <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 38, lineHeight: 1, color: "var(--ys-highlight)", letterSpacing: "-0.025em" }}>
                72 PB+
              </div>
              <p style={{ margin: "13px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--ys-text-soft)" }}>
                Built a 72+ petabyte data pipeline and made it accessible to anyone through an NLP-to-SQL chat — query the
                entire crypto market in plain language.
              </p>
            </div>

            {/* two narrow */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div className="ip-lift" style={{ padding: "14px 20px 0 0", animation: `ip-rise .7s ${EASE} ${R[13]}s both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
                  <span style={mono(10, "0.12em", "var(--ys-text)")}>Kari &amp; Lost Shrines</span>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "#c9ad97" }}>02</span>
                </div>
                <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 26, lineHeight: 1, color: "var(--ys-accent)", letterSpacing: "-0.02em" }}>
                  2M+
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.45, color: "var(--ys-text-soft)" }}>
                  2M social reach in 2020.
                </p>
              </div>
              <div
                className="ip-lift"
                style={{ padding: "14px 0 0 20px", borderLeft: "1px solid var(--ys-border)", animation: `ip-rise .7s ${EASE} ${R[14]}s both` }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
                  <span style={mono(10, "0.12em", "var(--ys-text)")}>Gamerz Nation</span>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "#c9ad97" }}>03</span>
                </div>
                <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 26, lineHeight: 1, color: "var(--ys-accent)", letterSpacing: "-0.02em" }}>
                  100K+
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.45, color: "var(--ys-text-soft)" }}>
                  First startup at 22 — 7 franchises and 100K+ revenue in its first year.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </section>
  );
}
