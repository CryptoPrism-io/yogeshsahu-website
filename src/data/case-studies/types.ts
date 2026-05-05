import type { ClusterId } from '@/data/clusters';

export type Tone =
  | 'navy'
  | 'blue'
  | 'green'
  | 'gold'
  | 'purple'
  | 'cyan'
  | 'red';

export interface LeadershipLens {
  call: string;       // The strategic decision (and the option rejected)
  bet: string;        // What I committed to with incomplete info
  tradeoff: string;   // What I deliberately sacrificed
  outcome: string;    // Business / user impact
  coordinated: string; // Team / stakeholders led or aligned
  nextStep: string;   // Forward-looking roadmap
}

export interface StatItem {
  label: string;
  value: string;
  sub?: string;
  tone?: Tone;
}

export interface StatBlock {
  type: 'stats';
  cols?: 2 | 3 | 4 | 5 | 6;
  items: StatItem[];
}

export interface FlowNode {
  label: string;
  sublabel?: string;
  tone?: Tone | 'light';
}

export interface FlowBlock {
  type: 'flow';
  title?: string;
  // Each row is a sequence of nodes that get rendered with arrows between them.
  rows: FlowNode[][];
}

export interface TableBlock {
  type: 'table';
  headers: { label: string; align?: 'left' | 'right' }[];
  rows: { value: string; mono?: boolean; bold?: boolean; tone?: Tone }[][];
}

export interface CalloutBlock {
  type: 'callout';
  tone?: 'gold' | 'green' | 'blue' | 'purple';
  title?: string;
  body: string;
}

export interface ProseBlock {
  type: 'prose';
  heading?: string;
  body: string; // plain text; line breaks become paragraphs
}

export interface TagsBlock {
  type: 'tags';
  items: { label: string; tone?: Tone }[];
}

export type CaseStudyBlock =
  | StatBlock
  | FlowBlock
  | TableBlock
  | CalloutBlock
  | ProseBlock
  | TagsBlock;

export interface CaseStudySection {
  number?: string; // e.g. "01", "02"
  eyebrow?: string; // small uppercase label
  title: string;
  blocks: CaseStudyBlock[];
}

export interface CaseStudyContent {
  slug: string;
  cluster: ClusterId;
  archetype: string;          // e.g. "Founder-Operator"
  oneLineTagline: string;     // shown on /work card and detail header
  leadershipLens: LeadershipLens;
  sections: CaseStudySection[];
  sourceFile: string;         // pointer to the static portfolio HTML
}
