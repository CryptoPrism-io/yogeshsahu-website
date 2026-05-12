"use client";

import { motion } from "framer-motion";
import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { DOMAIN_GRAPH, DOMAIN_DETAILS, type DomainId, type SubdomainId } from "@/data/domain-graph";
import { SUBDOMAIN_PROOFS, PROOF_CARD_ANCHORS, type LandingProofCard } from "@/data/proofs";
import { fadeUp } from "@/lib/motion";

export default function GlyphPanel({ onOpen }: { onOpen: (id: string) => void }) {
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

  const openLandingProof = (proof: LandingProofCard) => {
    if (proof.windowId) {
      onOpen(proof.windowId);
      return;
    }

    if (proof.href) {
      window.open(proof.href, "_blank", "noopener,noreferrer");
    }
  };

  // Domain click → breadth view (Projects window). Subdomain click → depth view (first proof for that subdomain).
  const handleDomainClick = (_domainId: DomainId) => {
    onOpen("projects");
  };

  const handleSubdomainClick = (subdomainId: SubdomainId) => {
    const firstProof = SUBDOMAIN_PROOFS[subdomainId]?.[0];
    if (firstProof) {
      openLandingProof(firstProof);
    }
  };

  // Iris/gaze — each node has an inner pupil that orients toward the cursor.
  // Closer cursor = brighter, larger pupil. Nodes always "look" at the user.
  const irisFor = (nx: number, ny: number, scale: "domain" | "subdomain") => {
    const dx = pointer.x - nx;
    const dy = pointer.y - ny;
    const dist = Math.hypot(dx, dy);
    const intensity = 0.15 + 0.85 * Math.max(0, Math.min(1, 1 - dist / 140));
    const maxOff = scale === "domain" ? 2.8 : 2.2;
    const peakR = scale === "domain" ? 2.6 : 1.9;
    const baseR = scale === "domain" ? 1.4 : 1.1;
    const r = baseR + (peakR - baseR) * intensity;
    if (dist < 0.5) return { x: nx, y: ny, intensity, r };
    return {
      x: nx + (dx / dist) * maxOff,
      y: ny + (dy / dist) * maxOff,
      intensity,
      r,
    };
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
        {/* Warm terracotta well — same hue as the page, just slightly deeper */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[42px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(140, 60, 28, 0.42) 0%, rgba(140, 60, 28, 0.22) 38%, rgba(140, 60, 28, 0) 72%)",
          }}
        />
        {/* Cursor-following highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[42px] opacity-80 blur-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${(pointer.x / 560) * 100}% ${(pointer.y / 540) * 100}%, rgba(255,244,233,0.18), rgba(255,244,233,0) 32%)`,
          }}
        />
        <motion.div
          className="pointer-events-none absolute left-8 right-8 top-0 z-[2] flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 backdrop-blur-xl xl:left-10 xl:right-10"
          animate={{ x: -parallaxX * 0.35, y: -parallaxY * 0.35 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.4 }}
          style={{
            borderColor: "rgba(255, 244, 233, 0.34)",
            background: "rgba(28, 17, 11, 0.58)",
            boxShadow: "0 18px 38px -22px rgba(15, 8, 4, 0.55), inset 0 1px 0 rgba(255, 244, 233, 0.16)",
          }}
        >
          <p
            className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255, 239, 225, 0.78)" }}
          >
            Interactive Domain
          </p>
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-headline)", color: "rgba(255, 250, 244, 1)" }}
            >
              {infoTitle}
            </p>
          </div>
          <p
            className="max-w-[48%] truncate text-right text-[11px] leading-[1.4]"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255, 244, 233, 0.92)" }}
          >
            {infoBody}
          </p>
        </motion.div>
        <motion.div
          className="focus-ring group relative block h-[calc(100%-110px)] w-full transition-transform duration-200 hover:-translate-y-0.5"
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
            {/* Mandala scaffold — concentric rings */}
            <circle cx="280" cy="240" r="212" stroke="rgba(255,244,233,0.24)" strokeWidth="1.1" fill="none" />
            <circle cx="280" cy="240" r="168" stroke="rgba(255,244,233,0.2)" strokeWidth="1" strokeDasharray="4 10" fill="none" />
            <circle cx="280" cy="240" r="128" stroke="rgba(255,244,233,0.16)" strokeWidth="0.9" strokeDasharray="2 8" fill="none" />
            <circle cx="280" cy="240" r="84" stroke="rgba(255,244,233,0.18)" strokeWidth="0.9" fill="none" />
            <circle cx="280" cy="240" r="46" stroke="rgba(255,244,233,0.22)" strokeWidth="0.9" strokeDasharray="3 5" fill="none" />

            {/* Radial spokes from inner ring outward to each outer subdomain */}
            {[
              { x: 72, y: 238 }, { x: 164, y: 238 }, { x: 234, y: 238 },
              { x: 326, y: 238 }, { x: 396, y: 238 }, { x: 488, y: 238 },
            ].map((p, i) => {
              const dx = p.x - 280;
              const dy = p.y - 240;
              const len = Math.sqrt(dx * dx + dy * dy);
              const sx = 280 + (dx / len) * 48;
              const sy = 240 + (dy / len) * 48;
              return (
                <line key={`spoke-${i}`} x1={sx} y1={sy} x2={p.x} y2={p.y}
                  stroke="rgba(255,244,233,0.16)" strokeWidth="0.9" strokeDasharray="2 4" />
              );
            })}

            {/* Petal arcs joining adjacent outer subdomains, alternating above/below */}
            <path d="M 72 238 Q 118 198 164 238" stroke="rgba(255,244,233,0.22)" strokeWidth="1" fill="none" />
            <path d="M 164 238 Q 199 272 234 238" stroke="rgba(255,244,233,0.22)" strokeWidth="1" fill="none" />
            <path d="M 234 238 Q 280 208 326 238" stroke="rgba(255,244,233,0.22)" strokeWidth="1" fill="none" />
            <path d="M 326 238 Q 361 272 396 238" stroke="rgba(255,244,233,0.22)" strokeWidth="1" fill="none" />
            <path d="M 396 238 Q 442 198 488 238" stroke="rgba(255,244,233,0.22)" strokeWidth="1" fill="none" />

            {/* Cross-tier connectors — outer subdomains down to inner-tier dots */}
            <path d="M 72 238 Q 95 292 118 322" stroke="rgba(255,244,233,0.18)" strokeWidth="0.9" fill="none" />
            <path d="M 164 238 Q 141 292 118 322" stroke="rgba(255,244,233,0.18)" strokeWidth="0.9" fill="none" />
            <path d="M 234 238 Q 257 292 280 322" stroke="rgba(255,244,233,0.18)" strokeWidth="0.9" fill="none" />
            <path d="M 326 238 Q 303 292 280 322" stroke="rgba(255,244,233,0.18)" strokeWidth="0.9" fill="none" />
            <path d="M 396 238 Q 419 292 442 322" stroke="rgba(255,244,233,0.18)" strokeWidth="0.9" fill="none" />
            <path d="M 488 238 Q 465 292 442 322" stroke="rgba(255,244,233,0.18)" strokeWidth="0.9" fill="none" />

            {/* Mandala flourish — petal apex dots */}
            <circle cx="118" cy="198" r="1.6" fill="rgba(255,244,233,0.5)" />
            <circle cx="199" cy="272" r="1.6" fill="rgba(255,244,233,0.5)" />
            <circle cx="280" cy="208" r="1.6" fill="rgba(255,244,233,0.5)" />
            <circle cx="361" cy="272" r="1.6" fill="rgba(255,244,233,0.5)" />
            <circle cx="442" cy="198" r="1.6" fill="rgba(255,244,233,0.5)" />
            <circle cx="280" cy="240" r="2.2" fill="rgba(255,244,233,0.42)" />
            <motion.circle
              cx={pointer.x}
              cy={pointer.y}
              r="82"
              fill="rgba(255,244,233,0.06)"
              animate={{ opacity: [0.18, 0.32, 0.18] }}
              transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <text
              x="280"
              y="42"
              textAnchor="middle"
              fill="rgba(255,250,244,0.92)"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.26em",
                filter: "drop-shadow(0 1px 2px rgba(15,8,4,0.55))",
              }}
            >
              DOMAIN MAP
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
                  onClick={() => handleDomainClick(domain.id)}
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
                  {(() => {
                    const iris = irisFor(domain.x, domain.y, "domain");
                    return (
                      <circle
                        cx={iris.x}
                        cy={iris.y}
                        r={iris.r}
                        fill={`rgba(255, 250, 244, ${(0.18 + iris.intensity * 0.78).toFixed(3)})`}
                        style={{ pointerEvents: "none" }}
                      />
                    );
                  })()}
                </motion.g>
                <text
                  x={domain.x}
                  y={domain.y - 42}
                  textAnchor="middle"
                  fill={activeDomain === domain.id ? "rgba(255,250,244,1)" : "rgba(255,247,238,0.92)"}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    fontWeight: activeDomain === domain.id ? 700 : 600,
                    letterSpacing: "0.16em",
                    filter: "drop-shadow(0 1px 2px rgba(15,8,4,0.6))",
                  }}
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
                      onClick={() => handleSubdomainClick(node.id)}
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
                      {(() => {
                        const iris = irisFor(node.x, node.y, "subdomain");
                        return (
                          <circle
                            cx={iris.x}
                            cy={iris.y}
                            r={iris.r}
                            fill={`rgba(255, 250, 244, ${(0.18 + iris.intensity * 0.78).toFixed(3)})`}
                            style={{ pointerEvents: "none" }}
                          />
                        );
                      })()}
                    </motion.g>
                    <text
                      x={node.x}
                      y={node.y + (node.y > 280 ? 24 : -18)}
                      textAnchor="middle"
                      fill={activeSubdomain === node.id ? "rgba(255,250,244,1)" : "rgba(255,245,234,0.86)"}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9.5px",
                        fontWeight: activeSubdomain === node.id ? 700 : 600,
                        letterSpacing: "0.1em",
                        filter: "drop-shadow(0 1px 2px rgba(15,8,4,0.55))",
                      }}
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </g>
            ))}

            {/* Trace pulse — bright dash travels from mandala center out to the active subdomain */}
            <motion.line
              key={`trace-${activeSubdomainConfig.id}`}
              x1={280}
              y1={240}
              x2={activeSubdomainConfig.x}
              y2={activeSubdomainConfig.y}
              stroke="rgba(255, 250, 244, 0.36)"
              strokeWidth={5}
              strokeLinecap="round"
              style={{ strokeDasharray: "24 240" }}
              initial={{ strokeDashoffset: 264 }}
              animate={{ strokeDashoffset: -264 }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.line
              key={`trace-core-${activeSubdomainConfig.id}`}
              x1={280}
              y1={240}
              x2={activeSubdomainConfig.x}
              y2={activeSubdomainConfig.y}
              stroke="rgba(255, 250, 244, 0.95)"
              strokeWidth={1.6}
              strokeLinecap="round"
              style={{ strokeDasharray: "12 252" }}
              initial={{ strokeDashoffset: 264 }}
              animate={{ strokeDashoffset: -264 }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Breathing halo around the active subdomain node */}
            <motion.circle
              key={`halo-${activeSubdomainConfig.id}`}
              cx={activeSubdomainConfig.x}
              cy={activeSubdomainConfig.y}
              r="14"
              fill="none"
              stroke="rgba(255, 250, 244, 0.5)"
              strokeWidth="1.4"
              initial={{ scale: 0.7, opacity: 0.8 }}
              animate={{ scale: [0.7, 1.9], opacity: [0.8, 0] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
              style={{ transformOrigin: `${activeSubdomainConfig.x}px ${activeSubdomainConfig.y}px` }}
            />
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

              const targetY = anchor.y - 18;
              const verticalSpan = targetY - activeSubdomainConfig.y;
              const c1y = activeSubdomainConfig.y + verticalSpan * 0.42;
              const c2y = activeSubdomainConfig.y + verticalSpan * 0.78;

              return (
                <g key={proof.id}>
                  <motion.path
                    d={`M${activeSubdomainConfig.x} ${activeSubdomainConfig.y} C ${activeSubdomainConfig.x} ${c1y}, ${anchor.x} ${c2y}, ${anchor.x} ${targetY}`}
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

        </motion.div>
        <motion.div
          className="absolute bottom-4 left-[38px] right-[38px] z-[2] grid grid-cols-3 gap-3"
          animate={{ x: parallaxX * 1.15, y: parallaxY * 1.15 }}
          transition={{ type: "spring", stiffness: 110, damping: 18, mass: 0.5 }}
        >
            {activeProofs.map((proof, index) => (
              <motion.button
                key={proof.id}
                onClick={() => openLandingProof(proof)}
                className="focus-ring rounded-2xl border px-4 py-3 text-left backdrop-blur-xl transition-colors"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.05 }}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                style={{
                  borderColor: "rgba(255, 244, 233, 0.32)",
                  background: "rgba(28, 17, 11, 0.58)",
                  boxShadow: "0 14px 32px -22px rgba(15, 8, 4, 0.55), inset 0 1px 0 rgba(255, 244, 233, 0.14)",
                }}
              >
                <p
                  className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(255, 239, 225, 0.78)" }}
                >
                  {proof.meta}
                </p>
                <p
                  className="mb-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-headline)", color: "rgba(255, 250, 244, 1)" }}
                >
                  {proof.title}
                </p>
                <p
                  className="text-[11px] leading-[1.55]"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255, 244, 233, 0.92)" }}
                >
                  {proof.note}
                </p>
              </motion.button>
            ))}
        </motion.div>
      </div>
    </motion.aside>
  );
}
