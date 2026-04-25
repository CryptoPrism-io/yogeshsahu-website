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
      id: "cryptoprism-db",
      title: "CryptoPrism DB",
      meta: "GCP / PostgreSQL",
      note: "1B+ market datapoints flowing through a production financial core.",
      href: "/projects/cryptoprism-db",
    },
    {
      id: "forex-pipeline",
      title: "Forex Pipeline",
      meta: "FX / pipelines",
      note: "Trading-session workflow and live financial processing.",
      href: "/projects/forex-pipeline",
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
      id: "pratyaksha-pricing",
      title: "Pratyaksha",
      meta: "130+ indicators",
      note: "Signal design and quant workflow support in a live scanner.",
      href: "/projects/pratyaksha",
    },
    {
      id: "backtest",
      title: "Backtest",
      meta: "quant research",
      note: "Strategy validation and pricing logic under model constraints.",
      href: "/projects/backtest",
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
      id: "screener",
      title: "Screener",
      meta: "live analysis",
      note: "Interface and backend signal surfaces for active decisions.",
      href: "/projects/cryptoprism-screener",
    },
    {
      id: "news-engine-signal",
      title: "News Engine",
      meta: "signal flow",
      note: "AI-aware inputs feeding signal relevance and context.",
      href: "/projects/news-fetcher.html",
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
      note: "Real-time analysis engine anchored in live product behavior.",
      href: "/projects/pratyaksha",
    },
    {
      id: "news-engine-ai",
      title: "News Engine",
      meta: "NLP pipeline",
      note: "AI-aware ingestion and relevance flow in production.",
      href: "/projects/news-fetcher.html",
    },
    {
      id: "screener-ai",
      title: "Screener",
      meta: "surface",
      note: "Front-end interface for analysis and AI-adjacent system execution.",
      href: "/projects/cryptoprism-screener",
    },
  ],
  data: [
    {
      id: "cryptoprism-data",
      title: "CryptoPrism DB",
      meta: "data core",
      note: "Production data architecture and market pipeline depth.",
      href: "/projects/cryptoprism-db",
    },
    {
      id: "forex-data",
      title: "Forex Pipeline",
      meta: "data flow",
      note: "Market-session data transformation and pipeline logic.",
      href: "/projects/forex-pipeline",
    },
    {
      id: "news-data",
      title: "News Engine",
      meta: "ingestion",
      note: "Content ingestion and signal-ready processing.",
      href: "/projects/news-fetcher.html",
    },
  ],
  systems: [
    {
      id: "screener-systems",
      title: "Screener",
      meta: "runtime",
      note: "System boundary between interface, analysis, and delivery speed.",
      href: "/projects/cryptoprism-screener",
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
