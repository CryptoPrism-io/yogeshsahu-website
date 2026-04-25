"use client";

import CustomCursor from "@/components/desktop/CustomCursor";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import Window from "@/components/desktop/Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { DOMAIN_GRAPH, DOMAIN_DETAILS, type DomainId, type SubdomainId } from "@/data/domain-graph";
import { SUBDOMAIN_PROOFS, PROOF_CARD_ANCHORS, type LandingProofCard } from "@/data/proofs";
import { WINDOW_CONFIGS, ICON_MAP, WINDOW_CONTENT } from "@/data/window-configs";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { fadeUp, MOTION_DURATION, MOTION_EASE_QUICK } from "@/lib/motion";

function GlyphPanel({ onOpen }: { onOpen: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDomain, setActiveDomain] = useState<DomainId>("technology");
  const [activeSubdomain, setActiveSubdomain] = useState<SubdomainId>("ai");
  const [pointer, setPointer] = useState({ x: 280, y: 240 });

  const activeDomainConfig = DOMAIN_GRAPH.find((domain) => domain.id === activeDomain) ?? DOMAIN_GRAPH[2];
  const activeSubdomainConfig =
    activeDomainConfig.subdomains.find((node) => node.id === activeSubdomain) ?? activeDomainConfig.subdomains[0];
  const infoTitle = `${activeDomainConfig.label} / ${activeSubdomainConfig.label}`;
  const infoBody = DOMAIN_DETAILS[activeDomain].subdomains[activeSubdomainConfig.id];
  const activeProofs = SUBDOMAIN_PROOFS[activeSubdomainConfig.id];
  const parallaxX = (pointer.x - 280) / 30;
  const parallaxY = (pointer.y - 240) / 34;

  const openCapabilityGraph = (domainId: DomainId, subdomainId?: SubdomainId) => {
    window.dispatchEvent(
      new CustomEvent("capability-focus", {
        detail: { domainId, subdomainId: subdomainId ?? null },
      }),
    );
    onOpen("capability-graph");
  };

  const openLandingProof = (proof: LandingProofCard) => {
    if (proof.windowId) {
      onOpen(proof.windowId);
      return;
    }

    if (proof.href) {
      window.open(proof.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    const x = ((event.clientX - bounds.left) / bounds.width) * 560;
    const y = ((event.clientY - bounds.top) / bounds.height) * 540;
    setPointer({ x, y });
  };

  return (
    <motion.aside
      className="absolute left-6 top-[58px] z-[0] hidden lg:block xl:left-10 xl:top-[66px]"
      variants={fadeUp(0.12, 18)}
      initial="initial"
      animate="animate"
    >
      <div
        ref={containerRef}
        className="relative h-[min(78vh,680px)] w-[min(52vw,720px)] min-h-[560px] min-w-[560px] overflow-visible pt-20"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setPointer({ x: 280, y: 240 });
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[42px] opacity-90 blur-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${(pointer.x / 560) * 100}% ${(pointer.y / 540) * 100}%, rgba(255,244,233,0.22), rgba(255,244,233,0) 34%)`,
          }}
        />
        <motion.div
          className="pointer-events-none absolute left-8 right-8 top-0 z-[2] flex items-center justify-between gap-4 rounded-full border px-4 py-2 backdrop-blur-md xl:left-10 xl:right-10"
          animate={{ x: -parallaxX * 0.35, y: -parallaxY * 0.35 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.4 }}
          style={{
            borderColor: "rgba(255,244,233,0.12)",
            background: "rgba(151, 79, 52, 0.14)",
          }}
        >
          <p
            className="shrink-0 text-[8px] uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255,239,225,0.5)" }}
          >
            Interactive Domain
          </p>
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-headline)", color: "rgba(255,248,241,0.94)" }}
            >
              {infoTitle}
            </p>
          </div>
          <p
            className="max-w-[48%] truncate text-right text-[10px]"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,239,225,0.72)" }}
          >
            {infoBody}
          </p>
        </motion.div>
        <motion.div
          className="focus-ring group relative block h-[calc(100%-80px)] w-full transition-transform duration-200 hover:-translate-y-0.5"
          animate={{ x: parallaxX, y: parallaxY }}
          transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.55 }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 560 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: "drop-shadow(0 26px 48px rgba(25, 11, 6, 0.1))",
            }}
          >
            <circle cx="280" cy="240" r="212" stroke="rgba(255,244,233,0.08)" strokeWidth="1.1" />
            <circle cx="280" cy="240" r="168" stroke="rgba(255,244,233,0.06)" strokeWidth="1" strokeDasharray="4 12" />
            <path d="M62 178H498" stroke="rgba(255,244,233,0.06)" strokeWidth="1" strokeDasharray="4 12" />
            <path d="M62 282H498" stroke="rgba(255,244,233,0.04)" strokeWidth="1" strokeDasharray="4 16" />
            <motion.circle
              cx={pointer.x}
              cy={pointer.y}
              r="82"
              fill="rgba(255,244,233,0.06)"
              animate={{ opacity: [0.18, 0.32, 0.18] }}
              transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <text x="280" y="42" textAnchor="middle" fill="rgba(255,239,225,0.48)" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.28em" }}>
              DOMAIN MAP
            </text>
            <text x="280" y="474" textAnchor="middle" fill="rgba(255,239,225,0.34)" style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em" }}>
              HOVER TO TRACE / CLICK TO OPEN PROOF GRAPH
            </text>

            {DOMAIN_GRAPH.map((domain, domainIndex) => (
              <g key={domain.id}>
                <motion.path
                  d={`M${domain.x} ${domain.y + 26}L${domain.x} 188`}
                  stroke={activeDomain === domain.id ? "rgba(255,244,233,0.42)" : "rgba(255,244,233,0.16)"}
                  strokeWidth={activeDomain === domain.id ? "2.2" : "1.5"}
                  strokeLinecap="round"
                  initial={{ pathLength: 0.15, opacity: 0.2 }}
                  animate={{
                    pathLength: [0.15, 1, 1],
                    opacity: activeDomain === domain.id ? [0.34, 0.92, 0.4] : [0.12, 0.42, 0.16],
                  }}
                  transition={{
                    duration: 3.4,
                    delay: domainIndex * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.7,
                    ease: "easeInOut",
                  }}
                />
                <motion.g
                  className="cursor-pointer"
                  whileHover={{ y: -2, scale: 1.02 }}
                  onMouseEnter={() => {
                    setActiveDomain(domain.id);
                    setActiveSubdomain(domain.subdomains[0].id);
                  }}
                  onClick={() => openCapabilityGraph(domain.id)}
                >
                  <circle cx={domain.x} cy={domain.y} r="22" fill="rgba(255,248,241,0.94)" stroke="rgba(255,244,233,0.84)" strokeWidth="9" />
                  <circle
                    cx={domain.x}
                    cy={domain.y}
                    r={activeDomain === domain.id ? "18" : "16"}
                    fill={domain.tone}
                    fillOpacity={activeDomain === domain.id ? "0.22" : "0.12"}
                    stroke="rgba(31,20,13,0.56)"
                    strokeWidth={activeDomain === domain.id ? "2.8" : "2.2"}
                  />
                  <circle cx={domain.x} cy={domain.y} r="5.5" fill={domain.tone} />
                </motion.g>
                <text
                  x={domain.x}
                  y={domain.y - 42}
                  textAnchor="middle"
                  fill={activeDomain === domain.id ? "rgba(255,248,241,0.9)" : "rgba(255,239,225,0.68)"}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em" }}
                >
                  {domain.label}
                </text>

                {domain.subdomains.map((node, nodeIndex) => (
                  <g key={node.id}>
                    <motion.path
                      d={`M${domain.x} 188L${node.x} ${node.y}`}
                      stroke={activeDomain === domain.id ? "rgba(255,244,233,0.34)" : "rgba(255,244,233,0.16)"}
                      strokeWidth={activeSubdomain === node.id ? "2" : "1.5"}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 1],
                        opacity:
                          activeSubdomain === node.id
                            ? [0.12, 0.82, 0.34]
                            : activeDomain === domain.id
                              ? [0.08, 0.54, 0.18]
                              : [0.04, 0.22, 0.1],
                      }}
                      transition={{
                        duration: 3,
                        delay: domainIndex * 0.2 + nodeIndex * 0.16,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 0.5,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="13"
                      fill="none"
                      stroke="rgba(255,244,233,0.3)"
                      strokeWidth="1"
                      initial={{ scale: 0.55, opacity: 0 }}
                      animate={{ scale: [0.55, 1.25, 1.85], opacity: [0, 0.3, 0] }}
                      transition={{
                        duration: 2.6,
                        delay: 0.4 + domainIndex * 0.2 + nodeIndex * 0.16,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 0.9,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    />
                    <motion.g
                      className="cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                      onMouseEnter={() => {
                        setActiveDomain(domain.id);
                        setActiveSubdomain(node.id);
                      }}
                      onClick={() => openCapabilityGraph(domain.id, node.id)}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={activeSubdomain === node.id ? "8.5" : "6.5"}
                        fill="rgba(255,248,241,0.2)"
                        stroke={activeSubdomain === node.id ? "rgba(255,244,233,0.58)" : "rgba(255,244,233,0.22)"}
                        strokeWidth="1.2"
                      />
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={activeSubdomain === node.id ? "5.5" : "4.5"}
                        fill={domain.tone}
                        initial={{ scale: 0.5, opacity: 0.1 }}
                        animate={{
                          scale: activeSubdomain === node.id ? [0.86, 1.2, 0.96] : [0.5, 1, 0.94],
                          opacity: activeSubdomain === node.id ? [0.4, 1, 0.7] : [0.1, 1, 0.42],
                        }}
                        transition={{
                          duration: 3,
                          delay: domainIndex * 0.2 + nodeIndex * 0.16,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.g>
                    <text
                      x={node.x}
                      y={node.y + (node.y > 280 ? 24 : -18)}
                      textAnchor="middle"
                      fill={activeSubdomain === node.id ? "rgba(255,248,241,0.84)" : "rgba(255,239,225,0.46)"}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "8.5px", letterSpacing: "0.12em" }}
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </g>
            ))}
          </svg>
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 560 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {activeProofs.map((proof, index) => {
              const anchor = PROOF_CARD_ANCHORS[index];

              if (!anchor) {
                return null;
              }

              const controlY = activeSubdomainConfig.y + 94;

              return (
                <g key={proof.id}>
                  <motion.path
                    d={`M${activeSubdomainConfig.x} ${activeSubdomainConfig.y} C ${activeSubdomainConfig.x} ${controlY}, ${anchor.x} ${controlY + 34}, ${anchor.x} ${anchor.y - 18}`}
                    stroke="rgba(255,244,233,0.26)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.08, opacity: 0.1 }}
                    animate={{ pathLength: [0.08, 1, 1], opacity: [0.1, 0.72, 0.24] }}
                    transition={{
                      duration: 2.8,
                      delay: index * 0.14,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.45,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.circle
                    cx={anchor.x}
                    cy={anchor.y - 18}
                    r="6"
                    fill={activeDomainConfig.tone}
                    initial={{ scale: 0.55, opacity: 0.2 }}
                    animate={{ scale: [0.55, 1.1, 0.9], opacity: [0.2, 0.9, 0.4] }}
                    transition={{
                      duration: 2.2,
                      delay: 0.2 + index * 0.14,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.55,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          <motion.div
            className="absolute bottom-6 left-[38px] right-[38px] z-[2] grid grid-cols-3 gap-3"
            animate={{ x: parallaxX * 1.15, y: parallaxY * 1.15 }}
            transition={{ type: "spring", stiffness: 110, damping: 18, mass: 0.5 }}
          >
            {activeProofs.map((proof, index) => (
              <motion.button
                key={proof.id}
                onClick={() => openLandingProof(proof)}
                className="focus-ring rounded-2xl border px-4 py-3 text-left backdrop-blur-md transition-colors"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.05 }}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                style={{
                  borderColor: "rgba(255,244,233,0.14)",
                  background: "rgba(122, 63, 42, 0.16)",
                }}
              >
                <p
                  className="mb-1 text-[9px] uppercase tracking-[0.16em]"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(255,239,225,0.52)" }}
                >
                  {proof.meta}
                </p>
                <p
                  className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em]"
                  style={{ fontFamily: "var(--font-headline)", color: "rgba(255,248,241,0.94)" }}
                >
                  {proof.title}
                </p>
                <p
                  className="text-[11px] leading-[1.55]"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,239,225,0.72)" }}
                >
                  {proof.note}
                </p>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.aside>
  );
}

function LaunchDeck({ onOpen }: { onOpen: (id: string) => void }) {
  const metrics = [
    { value: "1B+", label: "data points/day" },
    { value: "99.9%", label: "uptime SLA" },
    { value: "23", label: "public repos" },
  ];

  return (
    <motion.section
      className="absolute left-3 right-3 top-3 z-[2] md:left-auto md:right-4 md:top-4 md:w-[500px] xl:w-[480px]"
      variants={fadeUp(0, 24)}
      initial="initial"
      animate="animate"
    >
      <div
        className="rounded-2xl border p-5 md:p-6"
        style={{
          borderColor: "rgba(215, 189, 168, 0.55)",
          background: "rgba(255, 244, 233, 0.84)",
          backdropFilter: "blur(20px) saturate(1.12)",
          WebkitBackdropFilter: "blur(20px) saturate(1.12)",
          boxShadow: "0 24px 56px rgba(34, 18, 11, 0.24)",
        }}
      >
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          CHIEF SOLUTIONS ARCHITECT | FRACTIONAL CTO
        </p>
        <h1
          className="mb-3 text-[clamp(2rem,5.4vw,3.2rem)] font-black uppercase leading-[0.95]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          Yogesh Sahu
        </h1>
        <p
          className="mb-5 max-w-[50ch] text-[13px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          I scope, architect, code, and lead client-facing AI, fintech, and data-heavy engagements from
          discovery through delivery. Start with a hands-on architecture diagnostic, then move into
          focused leadership without taking on the wrong full-time hire too early.
        </p>

        <div className="mb-5 grid grid-cols-3 gap-2">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.label}
              className="rounded-xl border px-3 py-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 + idx * 0.08 }}
              style={{
                borderColor: "rgba(215, 189, 168, 0.75)",
                background: "rgba(255, 248, 241, 0.92)",
              }}
            >
              <p
                className="text-[1.1rem] font-bold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
              >
                {item.value}
              </p>
              <p
                className="text-[9px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={() => onOpen("projects")}
            className="focus-ring flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors"
            aria-label="Open projects window"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(169, 61, 29, 0.35)",
              background: "rgba(207, 79, 39, 0.1)",
              color: "var(--ys-accent-strong)",
              fontFamily: "var(--font-headline)",
            }}
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.08em]">See Projects</span>
            <ArrowRight size={14} />
          </motion.button>
          <motion.button
            onClick={() => onOpen("contact")}
            className="focus-ring flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors"
            aria-label="Open contact window"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(11, 141, 128, 0.36)",
              background: "rgba(11, 141, 128, 0.1)",
              color: "var(--ys-highlight)",
              fontFamily: "var(--font-headline)",
            }}
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.08em]">Start Diagnostic</span>
            <ArrowRight size={14} />
          </motion.button>
          <motion.button
            onClick={() => onOpen("diagnostic")}
            className="focus-ring col-span-2 flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors"
            aria-label="Open diagnostic window"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(169, 61, 29, 0.24)",
              background: "rgba(255, 248, 241, 0.96)",
              color: "var(--ys-text)",
              fontFamily: "var(--font-headline)",
            }}
          >
            <div>
              <span className="mb-0.5 block text-[12px] font-bold uppercase tracking-[0.08em]">View 5-day scope</span>
              <span
                className="block text-[9px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                discovery, architecture, delivery, pricing
              </span>
            </div>
            <ArrowRight size={14} />
          </motion.button>
          <motion.button
            onClick={() => onOpen("about")}
            className="focus-ring rounded-xl border px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
            aria-label="Open about window"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(215, 189, 168, 0.75)",
              color: "var(--ys-text)",
              fontFamily: "var(--font-headline)",
            }}
          >
            Open Profile
          </motion.button>
          <motion.button
            onClick={() => onOpen("terminal")}
            className="focus-ring rounded-xl border px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
            aria-label="Open terminal window"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(215, 189, 168, 0.75)",
              color: "var(--ys-text)",
              fontFamily: "var(--font-headline)",
            }}
          >
            Open Terminal
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const {
    openWindows,
    dockWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  } = useWindowManager(WINDOW_CONFIGS);
  const topZIndex = openWindows.reduce((max, current) => Math.max(max, current.zIndex), 0);

  return (
    <div className="desktop-surface desktop-pattern desktop-cursor relative h-screen w-screen overflow-hidden">
      <CustomCursor />
      <MenuBar />

      <main className="absolute top-11 left-0 right-0 bottom-16 overflow-hidden">
        <LaunchDeck onOpen={openWindow} />
        <GlyphPanel onOpen={openWindow} />

        {openWindows.map((w) => (
          <Window
            key={w.id}
            state={{ ...w, icon: "" }}
            isFocused={w.zIndex === topZIndex}
            titleIcon={ICON_MAP[w.id]}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onMaximize={() => maximizeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            onDragEnd={(pos) => updatePosition(w.id, pos)}
          >
            {WINDOW_CONTENT[w.id](openWindow)}
          </Window>
        ))}
      </main>

      <Dock windows={dockWindows} iconMap={ICON_MAP} onOpen={openWindow} onFocus={focusWindow} />
    </div>
  );
}
