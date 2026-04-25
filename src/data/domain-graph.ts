export const DOMAIN_GRAPH = [
  {
    id: "finance",
    label: "FINANCE",
    x: 118,
    y: 112,
    tone: "var(--ys-accent)",
    subdomains: [
      { id: "markets", label: "MARKETS", x: 72, y: 238 },
      { id: "pricing", label: "PRICING", x: 118, y: 322 },
      { id: "signals", label: "SIGNALS", x: 164, y: 238 },
    ],
  },
  {
    id: "leadership",
    label: "LEADERSHIP",
    x: 280,
    y: 112,
    tone: "var(--ys-highlight)",
    subdomains: [
      { id: "discovery", label: "DISCOVERY", x: 234, y: 238 },
      { id: "alignment", label: "ALIGN", x: 280, y: 322 },
      { id: "delivery", label: "DELIVERY", x: 326, y: 238 },
    ],
  },
  {
    id: "technology",
    label: "TECHNOLOGY",
    x: 442,
    y: 112,
    tone: "var(--ys-text)",
    subdomains: [
      { id: "ai", label: "AI", x: 396, y: 238 },
      { id: "data", label: "DATA", x: 442, y: 322 },
      { id: "systems", label: "SYSTEMS", x: 488, y: 238 },
    ],
  },
] as const;

export type DomainId = (typeof DOMAIN_GRAPH)[number]["id"];
export type SubdomainId = (typeof DOMAIN_GRAPH)[number]["subdomains"][number]["id"];

export const DOMAIN_DETAILS: Record<
  DomainId,
  {
    summary: string;
    subdomains: Record<SubdomainId, string>;
  }
> = {
  finance: {
    summary: "Market logic, pricing judgment, and decision systems built for actual financial workflows.",
    subdomains: {
      markets: "Live financial context and product behavior.",
      pricing: "Valuation and model-backed decision layers.",
      signals: "Indicators, scanning, and operator guidance.",
      discovery: "",
      alignment: "",
      delivery: "",
      ai: "",
      data: "",
      systems: "",
    },
  },
  leadership: {
    summary: "Discovery, alignment, and execution control when authority is fragmented and speed matters.",
    subdomains: {
      discovery: "Problem framing, scope control, and commercial definition.",
      alignment: "Stakeholder trust, technical alignment, and expectation management.",
      delivery: "Execution sequencing under real delivery pressure.",
      markets: "",
      pricing: "",
      signals: "",
      ai: "",
      data: "",
      systems: "",
    },
  },
  technology: {
    summary: "Hands-on architecture across AI, data, and production systems that have to survive contact with reality.",
    subdomains: {
      ai: "Applied AI integration and orchestration inside products.",
      data: "Pipelines, storage, movement, and analytical structure.",
      systems: "Architecture, APIs, reliability, and runtime behavior.",
      markets: "",
      pricing: "",
      signals: "",
      discovery: "",
      alignment: "",
      delivery: "",
    },
  },
};
