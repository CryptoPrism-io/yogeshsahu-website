import type { CaseStudyContent } from './types';
import type { ClusterId } from '@/data/clusters';
import { cryptoprismOnchain } from './cryptoprism-onchain';
import { cryptoprismApi } from './cryptoprism-api';
import { cryptoprismNewsFetcher } from './cryptoprism-news-fetcher';
import { timesfmTradingBot } from './timesfm-trading-bot';
import { fxsaarthi } from './fxsaarthi';

// Cases get registered here as they're ported (Tasks 7 & 8).
export const caseStudies: Record<string, CaseStudyContent> = {
  'cryptoprism-onchain': cryptoprismOnchain,
  'cryptoprism-api': cryptoprismApi,
  'cryptoprism-news-fetcher': cryptoprismNewsFetcher,
  'timesfm-trading-bot': timesfmTradingBot,
  'fxsaarthi': fxsaarthi,
};

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return caseStudies[slug];
}

export function getCaseStudiesByCluster(cluster: ClusterId): CaseStudyContent[] {
  return Object.values(caseStudies).filter((c) => c.cluster === cluster);
}

export type { CaseStudyContent } from './types';
export type {
  LeadershipLens,
  CaseStudyBlock,
  CaseStudySection,
  StatBlock,
  FlowBlock,
  TableBlock,
  CalloutBlock,
  ProseBlock,
  TagsBlock,
  Tone,
} from './types';
