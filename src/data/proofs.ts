import type { SubdomainId } from "./domain-graph";

export interface LandingProofCard {
  id: string;
  title: string;
  meta: string;
  note: string;
  href?: string;
  windowId?: string;
}

export const SUBDOMAIN_PROOFS: Record<SubdomainId, LandingProofCard[]> = {
  markets: [
    {
      id: "cryptoprism-onchain",
      title: "On-chain Analytics",
      meta: "BigQuery / Pipeline",
      note: "1B+ market datapoints flowing through a production data pipeline.",
      href: "/projects/cryptoprism-onchain",
    },
    {
      id: "cryptoprism-api",
      title: "CryptoPrism API",
      meta: "FastAPI / Cloud Run",
      note: "Microservices backend serving analytics and trading endpoints.",
      href: "/projects/cryptoprism-api",
    },
    {
      id: "projects-window",
      title: "More Work",
      meta: "window",
      note: "Open the broader project evidence set.",
      windowId: "projects",
    },
  ],
  pricing: [
    {
      id: "timesfm-bot",
      title: "TimesFM Bot",
      meta: "ML / 100 coins",
      note: "ML-powered trading signals and automated execution across 100 coins.",
      href: "/projects/timesfm-trading-bot",
    },
    {
      id: "pratyaksha-pricing",
      title: "Pratyaksha",
      meta: "AI journaling",
      note: "4-agent AI pipeline turning raw thoughts into actionable insight.",
      href: "/projects/pratyaksha",
    },
    {
      id: "diagnostic-window",
      title: "Diagnostic",
      meta: "scope",
      note: "See how pricing and architecture get scoped commercially.",
      windowId: "diagnostic",
    },
  ],
  signals: [
    {
      id: "cryptoprism-dashboard",
      title: "Dashboard",
      meta: "live analysis",
      note: "Analytics dashboard for crypto portfolio and market visualization.",
      href: "/projects/cryptoprism-dashboard",
    },
    {
      id: "news-engine-signal",
      title: "News Engine",
      meta: "signal flow",
      note: "AI-aware ingestion feeding automated spot trading decisions.",
      href: "/projects/cryptoprism-news-fetcher",
    },
    {
      id: "terminal-window",
      title: "Terminal",
      meta: "ops",
      note: "Open the operating view behind the surface layer.",
      windowId: "terminal",
    },
  ],
  discovery: [
    {
      id: "diag-discovery",
      title: "5-Day Scope",
      meta: "entry offer",
      note: "Discovery structure, architecture framing, and execution definition.",
      windowId: "diagnostic",
    },
    {
      id: "about-discovery",
      title: "Profile",
      meta: "operator",
      note: "Context on how the work gets led and framed.",
      windowId: "about",
    },
    {
      id: "contact-discovery",
      title: "Contact",
      meta: "inquiry",
      note: "Start the conversation when the problem is still ambiguous.",
      windowId: "contact",
    },
  ],
  alignment: [
    {
      id: "kari",
      title: "Kari",
      meta: "influence",
      note: "Fast shipping through alignment and momentum, not formal authority.",
      href: "https://apps.apple.com/app/kari-and-the-lost-shrines",
    },
    {
      id: "cryptoprism-platform",
      title: "CryptoPrism",
      meta: "product direction",
      note: "Product and engineering alignment carried into a live platform.",
      href: "https://cryptoprism.io",
    },
    {
      id: "experience-window",
      title: "Experience",
      meta: "trajectory",
      note: "Open the operating history behind the leadership claim.",
      windowId: "experience",
    },
  ],
  delivery: [
    {
      id: "projects-delivery",
      title: "Projects",
      meta: "delivery proof",
      note: "Execution examples across fintech, AI, and product systems.",
      windowId: "projects",
    },
    {
      id: "contact-delivery",
      title: "Inquiry",
      meta: "engage",
      note: "Start with the problem and move into a defined delivery track.",
      windowId: "contact",
    },
    {
      id: "profile-delivery",
      title: "Profile",
      meta: "operator fit",
      note: "See how delivery leadership and architecture judgment combine.",
      windowId: "about",
    },
  ],
  ai: [
    {
      id: "pratyaksha-ai",
      title: "Pratyaksha",
      meta: "AI workflows",
      note: "4-agent AI journaling pipeline anchored in live product behavior.",
      href: "/projects/pratyaksha",
    },
    {
      id: "news-engine-ai",
      title: "News Engine",
      meta: "NLP pipeline",
      note: "AI-aware ingestion and relevance flow in production.",
      href: "/projects/cryptoprism-news-fetcher",
    },
    {
      id: "ai-bharatverse",
      title: "AI Bharatverse",
      meta: "LLM / interactive",
      note: "AI-powered platform for exploring Indian history. Built for Times of India.",
      href: "/projects/ai-bharatverse",
    },
  ],
  data: [
    {
      id: "cryptoprism-data",
      title: "On-chain Analytics",
      meta: "data core",
      note: "Production data pipeline processing 1B+ datapoints across 100+ coins.",
      href: "/projects/cryptoprism-onchain",
    },
    {
      id: "cryptoprism-api-data",
      title: "CryptoPrism API",
      meta: "data serving",
      note: "FastAPI microservices serving analytics and portfolio endpoints.",
      href: "/projects/cryptoprism-api",
    },
    {
      id: "news-data",
      title: "News Engine",
      meta: "ingestion",
      note: "Content ingestion and signal-ready processing.",
      href: "/projects/cryptoprism-news-fetcher",
    },
  ],
  systems: [
    {
      id: "dashboard-systems",
      title: "Dashboard",
      meta: "runtime",
      note: "React analytics dashboard for portfolio tracking and visualization.",
      href: "/projects/cryptoprism-dashboard",
    },
    {
      id: "projects-systems",
      title: "Projects",
      meta: "stack breadth",
      note: "See the broader production systems footprint.",
      windowId: "projects",
    },
    {
      id: "terminal-systems",
      title: "Terminal",
      meta: "ops layer",
      note: "Inspect the operating layer beneath the polished surface.",
      windowId: "terminal",
    },
  ],
};

export const PROOF_CARD_ANCHORS = [
  { x: 122, y: 446 },
  { x: 280, y: 446 },
  { x: 438, y: 446 },
] as const;
