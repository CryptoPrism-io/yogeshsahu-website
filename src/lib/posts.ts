export interface Post {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tag: string;
  excerpt: string;
}

export const posts: Post[] = [
  {
    slug: 'why-fractional-cto-beats-full-time',
    title: 'Why a Fractional CTO Outperforms a Full-Time Hire Before Series A',
    subtitle: 'Pattern recognition across 5+ mandates',
    date: 'Mar 2026',
    readTime: '6 min',
    tag: 'Fractional CTO',
    excerpt: 'Most pre-seed founders hire for headcount, not leverage. Here\'s why a 2-day/week engagement with the right operator delivers more architectural clarity and investor confidence than a full-time hire who\'s still ramping.',
  },
  {
    slug: 'building-1b-data-pipeline',
    title: 'Building a 1B+ Data Points/Day Pipeline on GCP Under $400/Month',
    subtitle: 'Architecture decisions that made CryptoPrism viable',
    date: 'Feb 2026',
    readTime: '9 min',
    tag: 'Infrastructure',
    excerpt: 'The constraint was $400/month. The requirement was 99.9% uptime on 1B+ daily data points across 1,000 crypto assets. This is the architecture — every trade-off, every cut, and the two decisions that made it possible.',
  },
  {
    slug: 'mental-models-for-technical-founders',
    title: 'Six Mental Models Every Technical Founder Uses Without Knowing It',
    subtitle: 'From First Principles to Second-Order Thinking',
    date: 'Jan 2026',
    readTime: '7 min',
    tag: 'Thinking',
    excerpt: 'First Principles. Inversion. OODA Loop. Antifragility. The best technical decisions I\'ve made weren\'t from frameworks or books — they came from building fast enough to see the second-order effects.',
  },
];
