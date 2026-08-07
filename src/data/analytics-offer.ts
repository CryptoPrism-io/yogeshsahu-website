/**
 * Copy + snippets for the "AI Product Analyst" offering (Resources → Analytics tab).
 * The full prompt mirrors docs/plausible-analytics-repo-prompt.md (founder-generic,
 * fleet map intentionally stripped). ZIP at public/skills/plausible-analytics.zip
 * is assembled from the same content — regenerate if this drifts.
 */

export const SNIPPET = `<script defer data-domain="YOUR-DOMAIN" data-outbound-links data-file-downloads
  src="https://plausible.yogeshsahu.xyz/js/script.outbound-links.js"></script>`;

export const HELPER = `declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string | number> }) => void;
  }
}

// Cookieless custom events. No-op when the tracker isn't loaded.
export function trackEvent(name: string, props: Record<string, string | number> = {}): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;
  window.plausible(name, { props });
}`;

export const EVENTS_GUIDE = `CONVERSION (register as Goals)
Primary CTA clicks · signup/login submit · purchase/checkout · form submit · pricing plan click

ENGAGEMENT
Feature/module open · search used · filter applied · nav

CONTENT
Article/post read · case study open · resource/toolkit click · video play

Use snake_case names, plus a "source" prop when there are multiple triggers.`;

export const GOALS_SQL = `-- register a conversion Goal per event, for YOUR site only
INSERT INTO goals (event_name, inserted_at, updated_at, site_id, display_name, scroll_threshold)
SELECT 'signup_click', now(), now(), id, 'Signup Click', -1
FROM sites WHERE domain = 'YOUR-DOMAIN'
ON CONFLICT DO NOTHING;`;

export const VERIFY = `# 1. Tracker loads — expect 200
curl -sI https://plausible.yogeshsahu.xyz/js/script.outbound-links.js

# 2. Site accepts events — expect 202 (400 = domain not registered yet)
curl -s -o /dev/null -w "%{http_code}" -X POST "https://plausible.yogeshsahu.xyz/api/event" \\
  -H "Content-Type: text/plain" -H "Origin: https://YOUR-DOMAIN" \\
  --data-binary '{"domain":"YOUR-DOMAIN","name":"pageview","url":"https://YOUR-DOMAIN/","referrer":""}'

# 3. Trigger an action on the live site, confirm it in Realtime within seconds.`;

export const FULL_PROMPT = `# Plausible Analytics — Advance Tracking & Add Events (any repo)

Reusable prompt for instrumenting cookieless Plausible analytics in ANY product.
Paste it into your AI coding agent (Claude, Cursor, Copilot) or drop the SKILL.md
from the zip into .claude/skills/plausible-analytics/.

## Mission
Advance Plausible analytics in THIS repo: make sure the cookieless tracker is
installed correctly, instrument the key user interactions as custom events, and
register conversion Goals. Follow repo conventions; keep the diff minimal.

## Fixed facts (do not change)
- Analytics host: https://plausible.yogeshsahu.xyz (self-hosted Plausible CE)
- Tracker: /js/script.outbound-links.js (auto-tracks pageviews, outbound clicks, file downloads, scroll, engagement)
- data-domain is a LABEL, not a URL — one tracker host serves every product
- This site's domain: <SITE_DOMAIN> — set to the actual domain (e.g. myproduct.com, app.myproduct.com)
- If the site is NOT yet registered, register it FIRST (events are dropped otherwise) — see Step 0.

## Step 0 — Registration (new domains only)
1. Register the domain in the Plausible UI (Account → Sites → Add a website) — owner does this once.
2. Owner restarts the plausible container (site cache refresh).
3. Verify with the 202 test (Step 5) BEFORE wiring the tracker.

## Step 1 — Install/verify the tracker (idempotent)
Find the app entry point by framework:
- Next.js (App Router): src/app/layout.tsx — add via next/script (afterInteractive)
- Next.js (Pages Router): pages/_app.tsx or pages/_document.tsx
- Vite/React: index.html or main.tsx
- Firebase static hosting: public/index.html (check firebase.json)
- Plain HTML: the <head> of the root index.html

Ensure exactly this tag (or env-driven equivalent, e.g. NEXT_PUBLIC_PLAUSIBLE_HOST + NEXT_PUBLIC_PLAUSIBLE_SITE):
<script defer data-domain="<SITE_DOMAIN>" data-outbound-links data-file-downloads
  src="https://plausible.yogeshsahu.xyz/js/script.outbound-links.js"></script>

If a CSP exists (check firebase.json / server headers), allow
https://plausible.yogeshsahu.xyz in script-src AND connect-src (the event POST is cross-origin).

## Step 2 — Add a trackEvent helper (if none exists)
Create src/lib/analytics.ts (or match the repo's existing analytics file):
declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string | number> }) => void;
  }
}
export function trackEvent(name: string, props: Record<string, string | number> = {}): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;
  window.plausible(name, { props });
}
For server components use a mounted client wrapper (<PageEvent event=... /> that fires
once, delayed ~400ms) or a <TrackClick event=...> wrapper.

## Step 3 — Instrument the key interactions
Map this product's highest-value actions to events. Use snake_case names and a
source/context prop when there are multiple triggers. Recommended coverage:
- Conversion (Goals): primary CTA clicks, signup/login submit, purchase/checkout, form submit, pricing plan click
- Engagement: feature/module open, search used, filter applied, dock/nav navigation, accordion/tab expand
- Content: article/post read, case study open, resource/toolkit click, video play

Wire each with a short one-line comment: // event: <event_name>

## Step 4 — Register Goals (conversion events only)
For every Conversion event, register it in the Plausible DB (see the skill for the
exact SQL + restart step). Only create Goals for events that map to money-adjacent actions.

## Step 5 — Verify (prove it, don't assume)
1. Tracker loads: curl -sI https://plausible.yogeshsahu.xyz/js/script.outbound-links.js -> 200
2. Site accepts events (202 = registered; 400 = not registered yet):
   curl -s -o /dev/null -w "%{http_code}" -X POST "https://plausible.yogeshsahu.xyz/api/event" \\
     -H "Content-Type: text/plain" -H "Origin: https://<SITE_DOMAIN>" \\
     --data-binary '{"domain":"<SITE_DOMAIN>","name":"pageview","url":"https://<SITE_DOMAIN>/","referrer":""}'
3. Build/lint the repo and confirm no regressions.
4. Hard-refresh the live site, trigger an event, confirm it appears in Plausible Realtime.

## Hard rules
- No dummy/synthetic events — instrument only real interactions; if you're unsure what's
  important, list candidate events and ask first.
- Keep the diff minimal and follow the repo's existing patterns (env vars over hardcoding).
- Do NOT touch unrelated code, mobile-only builds, or other teams' features.
- Never commit secrets (the tracker host is public; API keys are not).
- If the site isn't registered yet, register it BEFORE adding the tracker.`;

export const MAILTO_SUBJECT = "Design partner — AI Product Analyst";
export const MAILTO_BODY = `Product:
URL:
What do you wish your analytics could tell you?`;
