"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const MONO = "var(--font-mono)";
const HEAD = "var(--font-headline)";
const SERIF = "var(--font-serif-display)";

const mono = (size: number, spacing: string, color: string): CSSProperties => ({
  fontFamily: MONO,
  fontSize: size,
  letterSpacing: spacing,
  color,
  textTransform: "uppercase",
});

const NAV_ITEMS: { href: string; label: string; desc: string }[] = [
  { href: "/", label: "Home", desc: "Portfolio · 2026" },
  { href: "/work", label: "Work Hub", desc: "12 case studies" },
  { href: "/thinking", label: "Thinking", desc: "Architecture notes & logs" },
  { href: "/journal", label: "Journal", desc: "Weekly Friday check-in" },
  { href: "/resources", label: "Resources", desc: "Investor directory & playbooks" },
];

const EXTRA_ITEMS: { href: string; label: string; desc: string; external: boolean }[] = [
  { href: "/yogesh-sahu-cv.pdf", label: "CV ↓", desc: "View · PDF", external: true },
];

function Burger({ onClick, color }: { onClick: () => void; color: string }) {
  const bar = (w: number): CSSProperties => ({ width: w, height: 2, background: color, display: "block", borderRadius: 1 });
  return (
    <button
      onClick={onClick}
      aria-label="Open navigation"
      style={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start" }}>
        <span style={bar(20)} />
        <span style={bar(16)} />
        <span style={bar(10)} />
      </div>
    </button>
  );
}

export default function MobileNav({ light }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const iconColor = light ? "#fff8f1" : "var(--ys-text)";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Burger onClick={() => setOpen(true)} color={iconColor} />

      {typeof document !== "undefined" &&
        createPortal(
          <>
            <AnimatePresence>
              {open && (
                <motion.div
                  key="mb-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setOpen(false)}
                  style={{ position: "fixed", inset: 0, background: "rgba(31,17,11,0.5)", zIndex: 600 }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {open && (
                <motion.aside
                  key="mb-drawer"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 260, mass: 0.8 }}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 280,
                    background: "var(--ys-surface)",
                    borderRight: "1px solid var(--ys-border)",
                    zIndex: 610,
                    display: "flex",
                    flexDirection: "column",
                    padding: "28px 24px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close navigation"
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 20,
                        color: "var(--ys-text-soft)",
                        fontFamily: MONO,
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: "var(--ys-text)",
                      }}
                    >
                      YS.
                    </span>
                    <div style={{ height: 1, background: "var(--ys-border)", marginTop: 16 }} />
                  </div>

                  <nav style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 4 }}>
                    {NAV_ITEMS.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                            padding: "12px 12px",
                            borderRadius: 3,
                            textDecoration: "none",
                            background: isActive ? "var(--ys-surface-strong)" : "transparent",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: HEAD,
                              fontWeight: 600,
                              fontSize: 16,
                              lineHeight: 1.2,
                              letterSpacing: "-0.01em",
                              color: isActive ? "var(--ys-accent-strong)" : "var(--ys-text)",
                            }}
                          >
                            {item.label}
                          </span>
                          <span style={mono(8.5, "0.1em", "var(--ys-text-soft)")}>{item.desc}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  <div style={{ height: 1, background: "var(--ys-border)", margin: "16px 0" }} />

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {EXTRA_ITEMS.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        onClick={() => setOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          padding: "12px 12px",
                          borderRadius: 3,
                          textDecoration: "none",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: HEAD,
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: 1.2,
                            letterSpacing: "-0.01em",
                            color: "var(--ys-text)",
                          }}
                        >
                          {item.label}
                        </span>
                        <span style={mono(8.5, "0.1em", "var(--ys-text-soft)")}>{item.desc}</span>
                      </a>
                    ))}
                  </div>

                  <div style={{ marginTop: "auto", padding: "12px 12px" }}>
                    <div
                      className="flex items-center gap-2"
                      style={mono(9, "0.14em", "var(--ys-text-soft)")}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--ys-highlight)",
                          display: "inline-block",
                          animation: "ip-pulse 2.4s ease-in-out infinite",
                        }}
                      />
                      OPEN
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}
    </>
  );
}
