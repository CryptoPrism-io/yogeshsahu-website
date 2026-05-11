import type { ClusterId } from '@/data/clusters';
import { CLUSTER_ORDER } from '@/data/clusters';

export type Category = 'fintech' | 'ai' | 'quant' | 'web' | 'tools';

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface Gallery {
  layout: 'wide' | 'mobile';
  intro?: string;
  images: GalleryImage[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stat: string;
  statLabel: string;
  tags: string[];
  category: Category[];
  language: string;
  featured: boolean;
  href: string;
  githubHref: string;
  image?: string;
  gallery?: Gallery;
  reportHref?: string;
  reports?: { label: string; href: string }[];
  cluster?: ClusterId;
}

export const projects: Project[] = [
  {
    id: 'cryptoprism-onchain',
    name: 'CryptoPrism On-chain Analytics',
    description: 'BigQuery-based on-chain data pipeline processing 1B+ datapoints across 100+ coins. Real-time market data ingestion, analytics, and ML scoring.',
    stat: '1B+',
    statLabel: 'datapoints / day',
    tags: ['Python', 'BigQuery', 'Cloud Run', 'GitHub Actions'],
    category: ['fintech', 'quant'],
    language: 'Python',
    featured: true,
    href: 'https://cryptoprism.io',
    githubHref: 'https://github.com/CryptoPrism-io/cryptoprism-onchain',
    image: '/images/projects/cryptoprism-onchain/02-onchain.webp',
    gallery: {
      layout: 'wide',
      intro: 'Three screens from the on-chain analytics surface — discovery feed, on-chain primary view, and cross-chain intelligence.',
      images: [
        { src: '/images/projects/cryptoprism-onchain/01-discover.webp', caption: 'Discover — AI-powered surfacing of on-chain activity (whale accumulation, DeFi TVL anomalies, L2 capital inflows) before they hit consumer feeds.' },
        { src: '/images/projects/cryptoprism-onchain/02-onchain.webp', caption: 'On-chain primary view — exchange flow, supply distribution, UTXO age bands, and whale transactions in one consolidated dashboard.' },
        { src: '/images/projects/cryptoprism-onchain/03-cross-chain.webp', caption: 'Cross-chain intelligence — capital flow, bridge activity, and L1↔L2 movement reconciliation across chains.' },
      ],
    },
    reportHref: '/reports/onchain-architecture.html',
    cluster: 'A',
  },
  {
    id: 'cryptoprism-api',
    name: 'CryptoPrism API',
    description: 'FastAPI microservices backend deployed on Cloud Run. Serves analytics data, portfolio management, and trading endpoints.',
    stat: '<50ms',
    statLabel: 'p99 latency',
    tags: ['Python', 'FastAPI', 'Cloud Run', 'PostgreSQL', 'Redis'],
    category: ['fintech', 'tools'],
    language: 'Python',
    featured: true,
    href: 'https://cryptoprism.io',
    githubHref: 'https://github.com/CryptoPrism-io/cryptoprism-api',
    image: '/images/projects/cryptoprism-api/01-dashboard.webp',
    gallery: {
      layout: 'wide',
      intro: 'The consumer-facing dashboard powered by the API — the primary integration target for downstream products.',
      images: [
        { src: '/images/projects/cryptoprism-api/01-dashboard.webp', caption: 'CryptoPrism dashboard — AI-native crypto analytics. Smarter scans, faster decisions. The flagship product the API serves.' },
      ],
    },
    cluster: 'A',
  },
  {
    id: 'timesfm-trading-bot',
    name: 'TimesFM 100-Coin Trading Bot',
    description: "ML-powered trading bot using Google TimesFM for signal generation across 100 coins. Automated execution via Binance API.",
    stat: '100',
    statLabel: 'coins tracked',
    tags: ['Python', 'TimesFM', 'Binance API', 'BigQuery'],
    category: ['quant', 'ai'],
    language: 'Python',
    featured: true,
    href: 'https://github.com/CryptoPrism-io/times-fm-100-coin-bot',
    githubHref: 'https://github.com/CryptoPrism-io/times-fm-100-coin-bot',
    image: '/images/projects/timesfm-trading-bot/01-tier1-wide-swing.webp',
    gallery: {
      layout: 'wide',
      intro: "Five reports from the actual c3 OOS validation run (Apr 1–19, 2026) plus a live PnL snapshot. All numbers are pulled from the bot's Postgres state — no synthetic data.",
      images: [
        { src: '/images/projects/timesfm-trading-bot/01-tier1-wide-swing.webp', caption: 'Tier 1 — Wide Swing config. DEPLOY verdict. $+1,148 net P&L · 65.0% win rate · 2.16 profit factor · -3.0% max drawdown across 226 trades.' },
        { src: '/images/projects/timesfm-trading-bot/02-tier2-long-only.webp', caption: 'Tier 2 — Long-only config (calibrated after T2 short-side losses). DEPLOY. $+412 · 65.4% win · 2.02 PF · 81 trades dominated by ZEC and TAO.' },
        { src: '/images/projects/timesfm-trading-bot/03-tier3-momentum.webp', caption: 'Tier 3 — Momentum config. REVIEW (small sample). $+162 across 39 trades · ALGO carries >80% of P&L; flagged for ALGO-only review before scale.' },
        { src: '/images/projects/timesfm-trading-bot/04-tier4-patience.webp', caption: 'Tier 4 — Patience config. BLOCK verdict. 1,617 trades, $0 net, 1.15 PF. Dedicated T4 model required before deployment — honest negative result.' },
        { src: '/images/projects/timesfm-trading-bot/05-live-pnl-apr24.webp', caption: 'Live PnL · Apr 24, 2026 — production trade book showing realized vs forecast PnL gap analysis across the c3 deployment.' },
      ],
    },
    reportHref: '/reports/timesfm-report.html',
    cluster: 'A',
  },
  {
    id: 'cryptoprism-news-fetcher',
    name: 'CryptoPrism News Fetcher',
    description: 'News sentiment analysis pipeline feeding automated spot trading decisions via Binance API.',
    stat: 'Live',
    statLabel: 'trading signals',
    tags: ['Python', 'Binance API', 'Sentiment Analysis'],
    category: ['quant', 'ai'],
    language: 'Python',
    featured: false,
    href: 'https://github.com/CryptoPrism-io/CryptoPrism-News-Fetcher',
    githubHref: 'https://github.com/CryptoPrism-io/CryptoPrism-News-Fetcher',
    image: '/images/projects/news-fetcher-cover.webp',
    reportHref: '/reports/ml-signal-architecture.html',
    reports: [
      { label: 'ML Architecture', href: '/reports/ml-signal-architecture.html' },
      { label: 'Trading Playbook', href: '/reports/trading-playbook.html' },
      { label: 'Q4 Backtest', href: '/reports/q4-backtest.html' },
      { label: 'Trishula PnL', href: '/reports/trishula-pnl.html' },
    ],
    cluster: 'A',
  },
  {
    id: 'pratyaksha',
    name: 'Pratyaksha',
    description: 'AI-powered cognitive journaling platform with 4-agent AI pipeline. Transforms raw thoughts into actionable self-insight through real-time analysis.',
    stat: '4',
    statLabel: 'AI agents',
    tags: ['React', 'Express', 'LangChain', 'Firebase'],
    category: ['ai', 'web'],
    language: 'TypeScript',
    featured: true,
    href: 'https://ai-becoming.web.app',
    githubHref: 'https://github.com/CryptoPrism-io/pratyaksha',
    image: '/images/projects/pratyaksha/02-soul-mapping.webp',
    gallery: {
      layout: 'mobile',
      intro: 'Five screens from the "Becoming" cognitive-mirror experience — soul mapping, journaling, conversational analysis, and the visual identity.',
      images: [
        { src: '/images/projects/pratyaksha/01-journal-chat.webp', caption: 'Journal-as-conversation — speak to your past entries through a context-aware AI that has read your full history.' },
        { src: '/images/projects/pratyaksha/02-soul-mapping.webp', caption: 'Soul mapping — visual cartography of recurring patterns, emotional valences, and identity threads across months of journaling.' },
        { src: '/images/projects/pratyaksha/03-detailed-log.webp', caption: 'Detailed log — granular timeline of journal entries with sentiment markers and AI-derived themes.' },
        { src: '/images/projects/pratyaksha/04-cover-art-a.webp', caption: 'Visual identity — generative cover artwork in the Becoming aesthetic.' },
        { src: '/images/projects/pratyaksha/05-cover-art-b.webp', caption: 'Visual identity — alternate generative cover.' },
      ],
    },
    cluster: 'C',
  },
  {
    id: 'gyanmarg',
    name: 'GyanMarg',
    description: 'EdTech learning management platform with real-time sync, educational content delivery, and adaptive learning paths.',
    stat: 'Live',
    statLabel: 'platform',
    tags: ['React', 'Firebase', 'TypeScript'],
    category: ['web'],
    language: 'TypeScript',
    featured: true,
    href: 'https://ai-polymind.web.app',
    githubHref: 'https://github.com/CryptoPrism-io/gyanmarg',
    image: '/images/projects/gyanmarg/04-visualizations.webp',
    gallery: {
      layout: 'wide',
      intro: 'Four screens from the GyanMarg adaptive learning platform — chapter timeline, library, scroll-based reading, and visualization workspace.',
      images: [
        { src: '/images/projects/gyanmarg/01-chapters.webp', caption: 'Chapter timeline — adaptive sequencing of curriculum chapters, progress markers, and recommended next steps.' },
        { src: '/images/projects/gyanmarg/02-library.webp', caption: 'Library — searchable corpus of materials, tagged by subject and difficulty.' },
        { src: '/images/projects/gyanmarg/03-scroll.webp', caption: 'Scroll reader — long-form reading view with inline questions and highlights synced across devices.' },
        { src: '/images/projects/gyanmarg/04-visualizations.webp', caption: 'Visualization workspace — interactive diagrams generated from textual content for STEM topics.' },
      ],
    },
    cluster: 'C',
  },
  {
    id: 'ai-bharatverse',
    name: 'AI Bharatverse',
    description: 'Interactive AI-powered platform for exploring the history of India. Built for Times of India as a 6-month fractional engagement.',
    stat: '6mo',
    statLabel: 'delivery',
    tags: ['React', 'LangChain', 'Python', 'AI/LLM'],
    category: ['ai', 'web'],
    language: 'TypeScript',
    featured: false,
    href: '',
    githubHref: '',
    image: '/images/projects/ai-bharatverse/01-landing.webp',
    gallery: {
      layout: 'wide',
      intro: 'Four screens from the AI Bharatverse experience for Times of India — landing, conversational exploration, long-form deep dive, and the editorial fact-check console used by historians.',
      images: [
        { src: '/images/projects/ai-bharatverse/01-landing.webp', caption: 'Landing page — editorial hero with conversational AI preview card showing a Vijayanagara query with primary-source citations.' },
        { src: '/images/projects/ai-bharatverse/02-conversation.webp', caption: 'Conversational Exploration — Battle of Panipat thread with AI responses framed as scholarly cards, citation chips, and follow-up suggestions.' },
        { src: '/images/projects/ai-bharatverse/03-mauryan-deepdive.webp', caption: 'Mauryan Empire deep dive — long-form article generated by AI, reviewed by Prof. Romila Thapar, with floating "Ask Bharatverse" inquiry card.' },
        { src: '/images/projects/ai-bharatverse/04-factcheck-console.webp', caption: 'Editorial Fact-Check Console — internal tool with semantic underlines (verified / low-confidence / flagged), citation verification, AI reasoning trace.' },
      ],
    },
    cluster: 'C',
  },
  {
    id: 'kari',
    name: 'Kari and the Lost Shrines',
    description: "Mobile game for Isha Foundation — explore Indian temples, collect lost relics. 50,000+ downloads, 4.5+ rating on both stores.",
    stat: '50K+',
    statLabel: 'downloads',
    tags: ['Unity', 'C#', 'Mobile'],
    category: ['tools'],
    language: 'C#',
    featured: true,
    href: 'https://apps.apple.com/us/app/kari-and-the-lost-shrines/id1561474376',
    githubHref: '',
    image: '/images/projects/kari/01-collect-relics.webp',
    gallery: {
      layout: 'mobile',
      intro: 'Promotional captures from Kari: Lost Shrines — 2D side-scrolling exploration with light-puzzle mechanics, Indian mythology art direction.',
      images: [
        { src: '/images/projects/kari/01-collect-relics.webp', caption: 'Help Kari in his quest to collect relics — Nataraja-inspired protagonist on a glowing platform, dynamic light cone gameplay.' },
        { src: '/images/projects/kari/02-restore-shrines.webp', caption: 'Blazing a trail to restore ravaged shrines — relic collection prompts unlock teleport to the next shrine in the level.' },
      ],
    },
    cluster: 'C',
  },
  {
    id: 'trinetry-erp',
    name: 'Trinetry ERP/CRM',
    description: 'Custom ERP/CRM system for SME manufacturing and distribution. Automated invoicing, inventory management, and client outreach with agentic AI workflows.',
    stat: 'Agentic',
    statLabel: 'AI workflows',
    tags: ['Python', 'React', 'PostgreSQL', 'AI/Agents'],
    category: ['tools', 'ai'],
    language: 'Python',
    featured: false,
    href: '',
    githubHref: '',
    image: '/images/projects/trinetry-erp/01-mission-control.webp',
    gallery: {
      layout: 'wide',
      intro: 'Four screens illustrating the agentic AI surface — Mission Control, autonomous decision audit trail, AI-augmented inventory, and progressive trust configuration.',
      images: [
        { src: '/images/projects/trinetry-erp/01-mission-control.webp', caption: 'Mission Control — real-time autonomous action stream, three agent status cards (Invoice/Reorder/Outreach), low-confidence escalations queue.' },
        { src: '/images/projects/trinetry-erp/02-decision-detail.webp', caption: 'Decision Detail · Smart Reorder — full chain-of-thought audit trail showing tool calls, confidence aggregation, and the resulting purchase order.' },
        { src: '/images/projects/trinetry-erp/03-inventory-ai.webp', caption: 'Inventory + AI Forecast — 8-row stock grid with reorder/safety threshold ticks, plus 30-day demand forecast and supplier comparison.' },
        { src: '/images/projects/trinetry-erp/04-progressive-trust.webp', caption: 'Progressive Trust — 12-week autonomy timeline, per-agent confidence threshold sliders, granular scope controls per workflow.' },
      ],
    },
    cluster: 'B',
  },
  {
    id: 'cryptoprism-dashboard',
    name: 'CryptoPrism Dashboard',
    description: 'React-based analytics dashboard for crypto portfolio tracking and market visualization.',
    stat: '1K+',
    statLabel: 'coins tracked',
    tags: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
    category: ['fintech', 'web'],
    language: 'TypeScript',
    featured: false,
    href: 'https://cryptoprism.io',
    githubHref: 'https://github.com/CryptoPrism-io/cryptoprism-dashboard',
    image: '/images/projects/cryptoprism-landing.webp',
  },
  {
    id: 'fxsaarthi',
    name: 'FxSaarthi',
    description: 'Professional forex session dashboard tracking the four major sessions (Sydney, Tokyo, London, NY) with real-time pair coverage and session overlap analytics.',
    stat: '28',
    statLabel: 'forex pairs',
    tags: ['Python', 'OANDA API', 'TypeScript', 'React'],
    category: ['fintech', 'tools'],
    language: 'TypeScript',
    featured: false,
    href: '',
    githubHref: '',
    image: '/images/projects/fxsaarthi/01-saarthi.webp',
    gallery: {
      layout: 'wide',
      intro: 'The Saarthi AI conversational surface for FX traders.',
      images: [
        { src: '/images/projects/fxsaarthi/01-saarthi.webp', caption: 'Saarthi AI — conversational FX analysis with context-aware market reads and pair-specific guidance.' },
      ],
    },
    cluster: 'A',
  },
  {
    id: 'pgg-erp',
    name: 'PGG ERP',
    description: 'Enterprise resource planning system for a manufacturing operation. Inventory, production scheduling, vendor reconciliation, and finance close.',
    stat: '7',
    statLabel: 'end-to-end operations',
    tags: ['Python', 'PostgreSQL', 'React'],
    category: ['tools'],
    language: 'Python',
    featured: false,
    href: '',
    githubHref: '',
    image: '/images/projects/pgg-erp/01-sales-dashboard.webp',
    gallery: {
      layout: 'wide',
      intro: 'Four screens from the production GST invoicing system serving Pune Global Group — Express + EJS + Prisma + PostgreSQL on Cloud Run.',
      images: [
        { src: '/images/projects/pgg-erp/01-sales-dashboard.webp', caption: 'Sales Invoice Dashboard — FY 2025-26 with KPI strip (receivables, payables, overdue), filterable invoice table with GST type pills.' },
        { src: '/images/projects/pgg-erp/02-new-invoice-form.webp', caption: 'Create Tax Invoice form — auto-numbered INV-2526-185, customer typeahead, line items with live CGST/SGST split, Decimal.js totals.' },
        { src: '/images/projects/pgg-erp/03-tax-invoice-pdf.webp', caption: 'A4 Tax Invoice PDF preview — Indian GST-compliant 14-column line item table, totals breakdown, amount in words, bank details.' },
        { src: '/images/projects/pgg-erp/04-receivables-ledger.webp', caption: 'Receivables Ledger — customer-grouped outstanding balances with inline payment recording (NEFT/UPI/cash), aging breakdown.' },
      ],
    },
    cluster: 'B',
  },
  {
    id: 'pgg-crm',
    name: 'PGG CRM',
    description: 'Customer relationship and outreach platform built alongside the ERP — pipeline tracking, automated client communication, and deal-stage analytics.',
    stat: '12',
    statLabel: 'CRUD + pipeline ops',
    tags: ['Python', 'PostgreSQL', 'React'],
    category: ['tools'],
    language: 'Python',
    featured: false,
    href: '',
    githubHref: '',
    image: '/images/projects/pgg-crm/01-pipeline-kanban.webp',
    gallery: {
      layout: 'wide',
      intro: 'Four screens from the live PGG Outreach CRM — generated from the production EJS templates and Express routes.',
      images: [
        { src: '/images/projects/pgg-crm/01-pipeline-kanban.webp', caption: 'Lead Pipeline Kanban — six-stage flow from NEW to WON/LOST with ICP score rings, vertical badges, and source chips.' },
        { src: '/images/projects/pgg-crm/02-lead-detail-sales-intel.webp', caption: 'Lead Detail · Sales Intel tab — procurement signals, competitor footprint, news events, and AI-recommended outreach action.' },
        { src: '/images/projects/pgg-crm/03-quote-builder-pdf.webp', caption: 'Quote Builder with live A4 PDF preview — 18 rate cards, dynamic line items with HSN codes, Puppeteer-rendered output.' },
        { src: '/images/projects/pgg-crm/04-outreach-composer.webp', caption: 'Outreach Composer — dual editor for Email (Resend) and WhatsApp (Baileys), filtered segment of 47 leads, live delivery tracking.' },
      ],
    },
    cluster: 'B',
  },
];

export const featuredProjects = projects.filter(p => p.featured);

export function getProjectsByCluster(cluster: ClusterId): Project[] {
  return projects.filter((p) => p.cluster === cluster);
}

export function getAllClusteredProjects(): Array<{ cluster: ClusterId; projects: Project[] }> {
  return CLUSTER_ORDER.map((cluster) => ({
    cluster,
    projects: getProjectsByCluster(cluster),
  }));
}
