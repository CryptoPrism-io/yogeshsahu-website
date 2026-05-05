import type { ClusterId } from '@/data/clusters';
import { CLUSTER_ORDER } from '@/data/clusters';

export type Category = 'fintech' | 'ai' | 'quant' | 'web' | 'tools';

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
    image: '/images/projects/onchain-cover.webp',
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
    image: '/images/projects/cryptoprism-landing.webp',
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
    image: '/images/projects/timesfm-cover.webp',
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
    image: '/images/projects/becoming-landing.webp',
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
    image: '/images/projects/polymind-explore.webp',
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
