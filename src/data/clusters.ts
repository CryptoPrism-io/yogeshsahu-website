export type ClusterId = 'A' | 'B' | 'C';

export interface ClusterMeta {
  id: ClusterId;
  slug: string;
  name: string;
  archetype: string;
  thesis: string;
  order: number;
}

export const CLUSTERS: Record<ClusterId, ClusterMeta> = {
  A: {
    id: 'A',
    slug: 'fintech-engineering',
    name: 'Fintech Engineering',
    archetype: 'Founder-Operator',
    thesis:
      'Treated $800/mo Glassnode-class market data as a founder build-vs-buy problem — shipped equivalent intelligence at $30/mo and a live execution layer on top.',
    order: 1,
  },
  B: {
    id: 'B',
    slug: 'enterprise-operations',
    name: 'Enterprise Operations',
    archetype: 'Solution Architect',
    thesis:
      'Owned the architecture and rollout of ERP/CRM systems that real businesses run on — scope, schema, deployment, sign-off.',
    order: 2,
  },
  C: {
    id: 'C',
    slug: 'consumer-and-ai',
    name: 'Consumer & AI Products',
    archetype: 'Product Visionary',
    thesis:
      'Made consumer bets across edtech, cultural AI, civic tech and gaming — chose the audience, the format, and the metric of success.',
    order: 3,
  },
};

export const CLUSTER_ORDER: ClusterId[] = ['A', 'B', 'C'];

export function getClusterMeta(id: ClusterId): ClusterMeta {
  return CLUSTERS[id];
}
