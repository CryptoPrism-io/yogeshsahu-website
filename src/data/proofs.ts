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
      id: "fxsaarthi-markets",
      title: "FxSaarthi",
      meta: "FX / OANDA",
      note: "Forex session intelligence across Sydney, Tokyo, London, and NY with live pair coverage.",
      href: "/projects/fxsaarthi",
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
      id: "cryptoprism-api-pricing",
      title: "CryptoPrism API",
      meta: "FastAPI / Cloud Run",
      note: "Microservices backend serving analytics and pricing endpoints.",
      href: "/projects/cryptoprism-api",
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
      id: "news-engine-signal",
      title: "News Engine",
      meta: "signal flow",
      note: "AI-aware ingestion feeding automated spot trading decisions.",
      href: "/projects/cryptoprism-news-fetcher",
    },
    {
      id: "cryptoprism-dashboard",
      title: "Dashboard",
      meta: "live analysis",
      note: "Analytics dashboard for crypto portfolio and market visualization.",
      href: "/projects/cryptoprism-dashboard",
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
      id: "pgg-crm-discovery",
      title: "PGG CRM",
      meta: "commercial scoping",
      note: "B2B pipeline with sales intel, ICP scoring, and outreach across email and WhatsApp.",
      href: "/projects/pgg-crm",
    },
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
      id: "gyanmarg-delivery",
      title: "GyanMarg",
      meta: "edtech / shipped",
      note: "Adaptive learning platform with real-time sync and curriculum sequencing in production.",
      href: "/projects/gyanmarg",
    },
    {
      id: "pgg-erp-delivery",
      title: "PGG ERP",
      meta: "production ops",
      note: "GST-compliant invoicing, receivables, and seven end-to-end operations live for a manufacturing group.",
      href: "/projects/pgg-erp",
    },
    {
      id: "contact-delivery",
      title: "Inquiry",
      meta: "engage",
      note: "Start with the problem and move into a defined delivery track.",
      windowId: "contact",
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
      id: "ai-bharatverse",
      title: "AI Bharatverse",
      meta: "LLM / interactive",
      note: "AI-powered platform for exploring Indian history. Built for Times of India.",
      href: "/projects/ai-bharatverse",
    },
    {
      id: "news-engine-ai",
      title: "News Engine",
      meta: "NLP pipeline",
      note: "AI-aware ingestion and relevance flow in production.",
      href: "/projects/cryptoprism-news-fetcher",
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
      id: "trinetry-data",
      title: "Trinetry ERP",
      meta: "AI ops data",
      note: "Inventory, decisions, and forecasts powered by a unified operational data layer.",
      href: "/projects/trinetry-erp",
    },
    {
      id: "projects-data",
      title: "More Work",
      meta: "window",
      note: "Open the broader data and pipeline evidence set.",
      windowId: "projects",
    },
  ],
  systems: [
    {
      id: "cryptoprism-api-systems",
      title: "CryptoPrism API",
      meta: "FastAPI / Cloud Run",
      note: "Microservices architecture, runtime behavior, and API reliability under live load.",
      href: "/projects/cryptoprism-api",
    },
    {
      id: "trinetry-systems",
      title: "Trinetry ERP",
      meta: "agentic architecture",
      note: "Multi-agent decision system with progressive trust controls and live mission control.",
      href: "/projects/trinetry-erp",
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
