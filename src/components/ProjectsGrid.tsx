"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PROJECTS = [
  {
    id: "cryptoprism-db",
    label: "PROJ_001 · PYTHON · GCP",
    name: "CryptoPrism DB",
    desc: "Three-database GCP architecture. 1,000+ coins, 130+ on-chain indicators. Production AI-powered QA scoring system. 99.9% uptime SLA.",
    metric: "1B+",
    metricSub: "data points / day",
    tags: ["GCP", "PostgreSQL", "Python", "FastAPI"],
    cta: "Live ↗",
    ctaDark: true,
    href: "https://cryptoprism.io",
  },
  {
    id: "kari",
    label: "PROJ_002 · UNITY · MOBILE",
    name: "KARI",
    desc: "India-themed puzzle platformer. 50K downloads in 21 days across 110 countries. Built solo.",
    metric: "50K",
    metricSub: "downloads · 21 days",
    tags: ["Unity", "C#", "Mobile"],
    cta: "App Store ↗",
    ctaDark: false,
    href: "https://apps.apple.com/app/kari-and-the-lost-shrines",
  },
  {
    id: "cryptoprism-platform",
    label: "PROJ_003 · REACT · FASTAPI",
    name: "CryptoPrism Platform",
    desc: "Real-time crypto analytics dashboard. WebSocket feeds, multi-timeframe charts, portfolio tracking.",
    metric: "Live",
    metricSub: "WebSocket · real-time",
    tags: ["React", "FastAPI", "WebSockets"],
    cta: "Live ↗",
    ctaDark: true,
    href: "https://cryptoprism.io",
  },
  {
    id: "ubisoft",
    label: "PROJ_004 · PYSPARK · DATABRICKS",
    name: "Ubisoft Data Pipeline",
    desc: "AAA Game Analytics. Assassin's Creed · For Honor · Just Dance global scale data engineering.",
    metric: "AAA",
    metricSub: "global scale",
    tags: ["PySpark", "Databricks"],
    cta: null,
    ctaDark: false,
    href: "#",
  },
  {
    id: "timesfm",
    label: "PROJ_005 · PYTHON · ML",
    name: "TimesFM Quant",
    desc: "Google's TimesFM applied to crypto markets. NLP-driven market sentiment analysis. MS dissertation A-grade.",
    metric: "82/100",
    metricSub: "MS FinTech · Strathclyde",
    tags: ["TimesFM", "NLP", "Python"],
    cta: null,
    ctaDark: false,
    href: "#",
  },
];

const CARD_WIDTH = 320;
const CARD_GAP = 16;

export default function ProjectsGrid() {
  const totalCards = PROJECTS.length + 1; // +1 for GitHub card
  const maxDrag = -(totalCards * (CARD_WIDTH + CARD_GAP) - (CARD_WIDTH + CARD_GAP));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="work" className="snap-section pt-[46px] bg-[#f7f4ee] border-b-2 border-[#1a1a1a] flex flex-col">

      {/* Header */}
      <motion.div
        className="border-t-2 border-[#1a1a1a] pt-5 flex justify-between items-center px-6 lg:px-14 py-5 flex-shrink-0"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#bbb]"
           style={{ fontFamily: "var(--font-headline)" }}>
          03 — SELECTED WORK
        </p>
        <div className="flex items-center gap-3">
          <p className="text-[10px] text-[#bbb] hidden md:block"
             style={{ fontFamily: "var(--font-headline)" }}>
            ← drag to explore →
          </p>
          <p className="text-[10px] text-[#bbb] md:hidden"
             style={{ fontFamily: "var(--font-headline)" }}>
            swipe →
          </p>
          <a href="https://github.com/CryptoPrism-io" target="_blank" rel="noreferrer"
             className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#888] hover:text-[#1a1a1a] transition-colors hidden sm:block"
             style={{ fontFamily: "var(--font-headline)" }}>
            View all 23 repos ↗
          </a>
        </div>
      </motion.div>

      {/* Horizontal carousel — native scroll on mobile, drag on desktop */}
      <div className="flex-1 overflow-x-auto md:overflow-hidden flex items-center px-6 md:px-10 lg:px-14 scrollbar-hide">
        <motion.div
          className="flex gap-4 md:cursor-grab md:active:cursor-grabbing"
          {...(!isMobile && {
            drag: "x",
            dragConstraints: { left: maxDrag, right: 0 },
            dragElastic: 0.05,
            dragTransition: { bounceStiffness: 300, bounceDamping: 30 },
            whileDrag: { cursor: "grabbing" },
          })}
        >
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              className="bg-white border border-[#e0e0e0] border-t-2 flex flex-col flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]"
              style={{
                borderTopColor: i === 0 ? "#1a1a1a" : i < 3 ? "#555" : "#888",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-3"
                   style={{ fontFamily: "var(--font-headline)" }}>
                  {p.label}
                </p>
                <h3 className="text-[1rem] font-black uppercase tracking-[-0.02em] text-[#1a1a1a] mb-3"
                    style={{ fontFamily: "var(--font-headline)" }}>
                  {p.name}
                </h3>
                <p className="text-[12px] text-[#888] leading-[1.7] mb-4 flex-1"
                   style={{ fontFamily: "var(--font-body)" }}>
                  {p.desc}
                </p>
                <div className="mb-4">
                  <span className="text-[2rem] font-black leading-none tracking-[-0.03em] text-[#1a1a1a]"
                        style={{ fontFamily: "var(--font-headline)" }}>
                    {p.metric}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#ccc] block mt-0.5"
                        style={{ fontFamily: "var(--font-headline)" }}>
                    {p.metricSub}
                  </span>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag}
                            className="text-[10px] border border-[#e0e0e0] text-[#999] px-2.5 py-0.5"
                            style={{ fontFamily: "var(--font-headline)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.cta && (
                    <a href={p.href}
                       target={p.href !== "#" ? "_blank" : undefined}
                       rel="noreferrer"
                       className={`text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1.5 ${p.ctaDark ? "bg-[#1a1a1a] text-white" : "border border-[#1a1a1a] text-[#1a1a1a]"}`}
                       style={{ fontFamily: "var(--font-headline)" }}
                       onClick={(e) => e.stopPropagation()}>
                      {p.cta}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          {/* GitHub card */}
          <motion.article
            className="bg-[#1a1a1a] flex flex-col p-4 sm:p-5 justify-between flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] min-h-[280px] sm:min-h-[300px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: PROJECTS.length * 0.07, ease: EASE }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555] mb-3"
                 style={{ fontFamily: "var(--font-headline)" }}>
                OPEN SOURCE
              </p>
              <h3 className="text-[1rem] font-black uppercase text-white mb-3"
                  style={{ fontFamily: "var(--font-headline)" }}>
                + 18 More
              </h3>
              <p className="text-[12px] text-[#666] leading-[1.7]"
                 style={{ fontFamily: "var(--font-body)" }}>
                23 public repos on GitHub. GCP, Python, fintech, AI.
              </p>
            </div>
            <a href="https://github.com/CryptoPrism-io" target="_blank" rel="noreferrer"
               className="mt-6 text-[10px] font-black uppercase tracking-[0.1em] border border-white text-white px-4 py-2.5 hover:bg-white hover:text-[#1a1a1a] transition-colors inline-block"
               style={{ fontFamily: "var(--font-headline)" }}
               onClick={(e) => e.stopPropagation()}>
              View on GitHub ↗
            </a>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
