export type CapabilityId = "finance" | "leadership" | "technology";
export type SubdomainId =
  | "markets"
  | "pricing"
  | "signals"
  | "discovery"
  | "alignment"
  | "delivery"
  | "ai"
  | "data"
  | "systems";

export interface ProofLink {
  label: string;
  href: string;
  note: string;
  openWindow?: string;
}

export interface Subdomain {
  id: SubdomainId;
  label: string;
  detail: string;
}

export interface CapabilityConfig {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  subdomains: Subdomain[];
  color: string;
  proofs: ProofLink[];
}

export const CAPABILITIES: Record<CapabilityId, CapabilityConfig> = {
  finance: {
    name: "Finance",
    title: "FinTech and market systems under real operating pressure",
    summary:
      "This node covers financial systems, market context, pricing logic, signal design, and data products built for actual trading and analytical workflows.",
    skills: ["FinTech", "Quant Systems", "Pricing Logic", "Market Data", "Decision Tools"],
    subdomains: [
      { id: "markets", label: "Markets", detail: "Live market context, trading surfaces, and financial product logic." },
      { id: "pricing", label: "Pricing", detail: "Modeling decisions, valuation framing, and risk-aware system behavior." },
      { id: "signals", label: "Signals", detail: "Indicators, screening, and analytical workflows for operator decisions." },
    ],
    color: "var(--ys-accent)",
    proofs: [
      {
        label: "On-chain Analytics",
        href: "/projects/cryptoprism-onchain",
        note: "1B+ datapoints/day across 100+ coins via BigQuery pipeline.",
      },
      {
        label: "CryptoPrism API",
        href: "/projects/cryptoprism-api",
        note: "FastAPI microservices for analytics and trading endpoints.",
      },
      {
        label: "TimesFM Bot",
        href: "/projects/timesfm-trading-bot",
        note: "ML-powered trading signals across 100 coins.",
      },
    ],
  },
  leadership: {
    name: "Leadership",
    title: "Discovery, influence, and delivery ownership without waiting for formal authority",
    summary:
      "This is the consulting and operator layer: framing the problem, aligning stakeholders, leading discovery, and keeping execution commercially credible.",
    skills: ["Discovery", "SOW Thinking", "Stakeholder Alignment", "Execution Clarity", "Influence"],
    subdomains: [
      { id: "discovery", label: "Discovery", detail: "Problem framing, discovery sessions, and engagement definition." },
      { id: "alignment", label: "Align", detail: "Cross-functional trust, expectation management, and direction setting." },
      { id: "delivery", label: "Delivery", detail: "Execution pressure, sequencing, and keeping delivery commercially credible." },
    ],
    color: "var(--ys-highlight)",
    proofs: [
      {
        label: "Kari Mobile Game",
        href: "https://apps.apple.com/app/kari-and-the-lost-shrines",
        note: "Shipped on minimal budget through vision alignment and fast execution.",
      },
      {
        label: "CryptoPrism Platform",
        href: "https://cryptoprism.io",
        note: "Product direction, delivery judgment, and ongoing system ownership.",
      },
      {
        label: "Open Profile",
        href: "",
        openWindow: "about",
        note: "Leadership context, consulting fit, and working style.",
      },
    ],
  },
  technology: {
    name: "Technology",
    title: "Hands-on architecture, AI-native systems, and production-grade execution",
    summary:
      "This node is the technical core: architecture decisions, AI integration, APIs, data pipelines, and the ability to stay close to code while leading the system.",
    skills: ["Architecture", "AI Systems", "FastAPI", "PostgreSQL", "Cloud Data"],
    subdomains: [
      { id: "ai", label: "AI", detail: "Applied AI flows, orchestration, and product-level integration." },
      { id: "data", label: "Data", detail: "Pipelines, schemas, movement, and analytical system design." },
      { id: "systems", label: "Systems", detail: "Architecture, APIs, reliability, and production execution." },
    ],
    color: "var(--ys-text)",
    proofs: [
      {
        label: "Pratyaksha",
        href: "/projects/pratyaksha",
        note: "4-agent AI journaling pipeline in production.",
      },
      {
        label: "News Engine",
        href: "/projects/cryptoprism-news-fetcher",
        note: "AI-aware content and signal pipeline feeding spot trading.",
      },
      {
        label: "AI Bharatverse",
        href: "/projects/ai-bharatverse",
        note: "Interactive AI platform for Indian history. Built for Times of India.",
      },
    ],
  },
};

export const DOMAIN_ORDER: CapabilityId[] = ["finance", "leadership", "technology"];
