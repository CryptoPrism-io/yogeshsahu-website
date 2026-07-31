export type ToolkitCategory =
  | "engineering"
  | "design"
  | "productivity"
  | "finance"
  | "ai";

export type Pricing = "free" | "freemium" | "paid" | "enterprise";

export interface ToolkitItem {
  name: string;
  category: ToolkitCategory;
  pricing: Pricing;
  oneLiner: string; // why I use it
  url: string;
  pricingNote?: string; // e.g. "$20/mo, free for solo"
}

export const toolkit: ToolkitItem[] = [
  // ── Engineering ─────────────────────────────────────────────
  {
    name: "Cloud Run",
    category: "engineering",
    pricing: "freemium",
    oneLiner: "Where every CryptoPrism backend runs. Zero ops, scales to zero, $0 when idle.",
    url: "https://cloud.google.com/run",
  },
  {
    name: "FastAPI",
    category: "engineering",
    pricing: "free",
    oneLiner: "The Python web framework that doesn't get in your way. Pydantic types + async = joy.",
    url: "https://fastapi.tiangolo.com",
  },
  {
    name: "BigQuery",
    category: "engineering",
    pricing: "paid",
    oneLiner: "Why I built a 72 PB pipeline instead of buying Glassnode — $36/mo after materialised views.",
    url: "https://cloud.google.com/bigquery",
    pricingNote: "~$36/mo on our pipeline",
  },
  {
    name: "PostgreSQL",
    category: "engineering",
    pricing: "free",
    oneLiner: "The default database. We run it on AWS RDS with 16 GB RAM and it's been boring for 2 years.",
    url: "https://www.postgresql.org",
  },
  {
    name: "Redis",
    category: "engineering",
    pricing: "freemium",
    oneLiner: "Cache layer for the pipeline. Memorystore $1,000 GCP credits carried us 18 months.",
    url: "https://redis.io",
  },
  {
    name: "GitHub Actions",
    category: "engineering",
    pricing: "freemium",
    oneLiner: "Every CI/CD pipeline. Watch out for the 60-day auto-disable — the keep-alive YAML is in the vault.",
    url: "https://github.com/features/actions",
  },
  {
    name: "Puppeteer",
    category: "engineering",
    pricing: "free",
    oneLiner: "PDF generation for invoices. --no-sandbox + --disable-setuid-sandbox for Cloud Run.",
    url: "https://pptr.dev",
  },
  {
    name: "Resend",
    category: "engineering",
    pricing: "freemium",
    oneLiner: "Transactional + campaign email API. Webhook-based delivery tracking, 3K emails/mo free.",
    url: "https://resend.com",
  },

  // ── Design ─────────────────────────────────────────────────
  {
    name: "Figma",
    category: "design",
    pricing: "freemium",
    oneLiner: "The default design tool. Auto-layout + variables changed the game for me in 2023.",
    url: "https://figma.com",
  },
  {
    name: "Excalidraw",
    category: "design",
    pricing: "free",
    oneLiner: "For architecture diagrams that don't need to be perfect. Whiteboard feel, faster than Figma for thinking.",
    url: "https://excalidraw.com",
  },
  {
    name: "Unsplash",
    category: "design",
    pricing: "free",
    oneLiner: "Photography when I need a hero image and can't justify a paid stock library.",
    url: "https://unsplash.com",
  },

  // ── Productivity ───────────────────────────────────────────
  {
    name: "Notion",
    category: "productivity",
    pricing: "freemium",
    oneLiner: "Where the second-brain KB lives. Templates for SOPs, CRMs, project plans.",
    url: "https://notion.so",
  },
  {
    name: "Obsidian",
    category: "productivity",
    pricing: "free",
    oneLiner: "Personal knowledge base. Local Markdown files, Graph view, free forever. I sync via Git.",
    url: "https://obsidian.md",
  },
  {
    name: "Linear",
    category: "productivity",
    pricing: "freemium",
    oneLiner: "The only project management tool I don't resent. Fast, opinionated, keyboard-first.",
    url: "https://linear.app",
  },
  {
    name: "Raycast",
    category: "productivity",
    pricing: "freemium",
    oneLiner: "Replaced Spotlight on macOS. Window management, snippets, scripts, AI — one launcher.",
    url: "https://raycast.com",
  },

  // ── Finance ────────────────────────────────────────────────
  {
    name: "Zoho Books",
    category: "finance",
    pricing: "freemium",
    oneLiner: "Invoicing + accounting for Indian SMEs. GST-ready, integrates with bank feeds, way better than Tally's UX.",
    url: "https://zoho.com/books",
  },
  {
    name: "Decimal.js",
    category: "finance",
    pricing: "free",
    oneLiner: "Why we never use floats for money. One import line, zero 0.1+0.2 !== 0.3 bugs.",
    url: "https://github.com/MikeMcl/decimal.js",
  },

  // ── AI ─────────────────────────────────────────────────────
  {
    name: "Claude Code",
    category: "ai",
    pricing: "paid",
    oneLiner: "My primary dev tool. 80% of architecture decisions, 50% of code in any given week.",
    url: "https://claude.com/claude-code",
  },
  {
    name: "Ollama",
    category: "ai",
    pricing: "free",
    oneLiner: "Local model runner for single-user dev workloads. vLLM when you need production multi-user.",
    url: "https://ollama.com",
  },
  {
    name: "LiteLLM",
    category: "ai",
    pricing: "free",
    oneLiner: "Gateway proxy with fallback chain. Routes each request to the cheapest tier that can handle it.",
    url: "https://litellm.ai",
  },
  {
    name: "LangChain",
    category: "ai",
    pricing: "freemium",
    oneLiner: "Agent orchestration. Trinetry ERP uses 3 agents: invoice processing, smart reorder, client follow-up.",
    url: "https://langchain.com",
  },
];

export const TOOLKIT_CATEGORIES: {
  id: ToolkitCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "engineering",
    label: "Engineering",
    description: "Cloud, database, language, infrastructure",
  },
  {
    id: "design",
    label: "Design",
    description: "Tools for visual work and diagrams",
  },
  {
    id: "productivity",
    label: "Productivity",
    description: "Knowledge, project management, daily drivers",
  },
  {
    id: "finance",
    label: "Finance",
    description: "Invoicing, accounting, money handling",
  },
  {
    id: "ai",
    label: "AI",
    description: "Models, agents, orchestration",
  },
];

export function getToolkitByCategory(category: ToolkitCategory): ToolkitItem[] {
  return toolkit.filter((t) => t.category === category);
}

export const PRICING_LABELS: Record<Pricing, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  enterprise: "Enterprise",
};

export const PRICING_COLORS: Record<
  Pricing,
  { bg: string; text: string; border: string }
> = {
  free: {
    bg: "rgba(11, 141, 128, 0.1)",
    text: "var(--ys-highlight)",
    border: "rgba(11, 141, 128, 0.3)",
  },
  freemium: {
    bg: "rgba(74, 125, 165, 0.1)",
    text: "#4a7da5",
    border: "rgba(74, 125, 165, 0.3)",
  },
  paid: {
    bg: "rgba(207, 79, 39, 0.1)",
    text: "var(--ys-accent-strong)",
    border: "rgba(207, 79, 39, 0.3)",
  },
  enterprise: {
    bg: "rgba(140, 110, 80, 0.1)",
    text: "#8c6e50",
    border: "rgba(140, 110, 80, 0.3)",
  },
};
