#!/usr/bin/env node
/**
 * Stats data layer — 5 raw functions over the Plausible Stats API v2
 * (single endpoint: POST /api/v2/query). No chained reasoning here;
 * all analysis is done by prompting on top of these.
 *
 * Env:
 *   PLAUSIBLE_API_KEY  — Stats API key (create via Plausible UI:
 *                        Account -> Settings -> API Keys -> Stats API)
 *   PLAUSIBLE_HOST     — default https://plausible.yogeshsahu.xyz
 */

const HOST = process.env.PLAUSIBLE_HOST ?? "https://plausible.yogeshsahu.xyz";
const KEY = process.env.PLAUSIBLE_API_KEY;

function requireKey() {
  if (!KEY) {
    throw new Error(
      "PLAUSIBLE_API_KEY not set. Create a Stats API key in the Plausible UI " +
        "(Account -> Settings -> API Keys -> New API Key -> Stats API) and set it in analyst/.env"
    );
  }
  return KEY;
}

async function query({ site, metrics, date_range, dimensions = [], filters = [], order_by = [], limit }) {
  const body = { site_id: site, metrics, date_range, dimensions, filters, order_by };
  if (limit) body.pagination = { limit };
  const res = await fetch(`${HOST}/api/v2/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${requireKey()}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Plausible query ${res.status}: ${err.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.results ?? [];
}

/** get_overview — visitors, pageviews, bounce %, avg visit duration */
export async function getOverview(site, period) {
  const rows = await query({
    site,
    date_range: period,
    metrics: ["visitors", "pageviews", "bounce_rate", "visit_duration"],
  });
  const m = rows[0]?.metrics;
  if (!m) return { visitors: 0, pageviews: 0, bounce_rate: 0, visit_duration: 0 };
  return {
    visitors: m[0],
    pageviews: m[1],
    bounce_rate: m[2],
    visit_duration: m[3],
  };
}

/** get_top_pages — top n pages by visitors */
export async function getTopPages(site, period, n = 10) {
  const rows = await query({
    site,
    date_range: period,
    dimensions: ["event:page"],
    metrics: ["visitors", "pageviews", "bounce_rate"],
    order_by: [["visitors", "desc"]],
    limit: n,
  });
  return rows.map((r) => ({
    page: r.dimensions[0],
    visitors: r.metrics[0],
    pageviews: r.metrics[1],
    bounce_rate: r.metrics[2],
  }));
}

/** get_sources — top n acquisition sources by visitors */
export async function getSources(site, period, n = 10) {
  const rows = await query({
    site,
    date_range: period,
    dimensions: ["visit:source"],
    metrics: ["visitors", "pageviews"],
    order_by: [["visitors", "desc"]],
    limit: n,
  });
  return rows.map((r) => ({
    source: r.dimensions[0],
    visitors: r.metrics[0],
    pageviews: r.metrics[1],
  }));
}

/** get_events — custom event counts by name (excludes pageview) */
export async function getEvents(site, period) {
  const rows = await query({
    site,
    date_range: period,
    dimensions: ["event:name"],
    metrics: ["events"],
    filters: [["is_not", "event:name", ["pageview"]]],
    order_by: [["events", "desc"]],
    limit: 50,
  });
  return rows.map((r) => ({ event: r.dimensions[0], count: r.metrics[0] }));
}

/** compare_periods — overview for two periods + deltas */
export async function comparePeriods(site, a, b) {
  const [cur, prev] = await Promise.all([getOverview(site, a), getOverview(site, b)]);
  const pct = (c, p) => (p > 0 ? Math.round(((c - p) / p) * 1000) / 10 : null);
  return {
    current_period: a,
    previous_period: b,
    current: cur,
    previous: prev,
    deltas: {
      visitors: { current: cur.visitors, previous: prev.visitors, pct: pct(cur.visitors, prev.visitors) },
      pageviews: { current: cur.pageviews, previous: prev.pageviews, pct: pct(cur.pageviews, prev.pageviews) },
      bounce_rate: { current: cur.bounce_rate, previous: prev.bounce_rate, delta_points: cur.bounce_rate - prev.bounce_rate },
      visit_duration: { current: cur.visit_duration, previous: prev.visit_duration, delta_seconds: cur.visit_duration - prev.visit_duration },
    },
  };
}

/** Convenience: fetch everything for one site+period (what the LLM sees). */
export async function collectAll(site, period) {
  const [overview, pages, sources, events] = await Promise.all([
    getOverview(site, period),
    getTopPages(site, period, 10),
    getSources(site, period, 10),
    getEvents(site, period),
  ]);
  return { site, period, overview, top_pages: pages, sources, custom_events: events };
}
