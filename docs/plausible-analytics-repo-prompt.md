# Plausible Analytics — Advance Tracking & Add Events (any repo)

Reusable prompt for instrumenting Plausible in ANY product repo — your own fleet
OR any external SaaS founder's product (concierge experiment / customers).
Paste into an agent context, or drop a copy into the repo's `.claude/skills/plausible-analytics/SKILL.md`.

## Mission
Advance Plausible analytics in THIS repo: make sure the cookieless tracker is
installed correctly, instrument the key user interactions as custom events, and
register conversion Goals. Follow repo conventions; keep the diff minimal.

## Fixed facts (do not change)
- Analytics host: `https://plausible.yogeshsahu.xyz` (self-hosted Plausible CE)
- Tracker: `/js/script.outbound-links.js` (auto-tracks pageviews, outbound clicks, file downloads, scroll, engagement)
- `data-domain` is a **label**, not a URL — one tracker host serves every product.
- This site's domain: `<SITE_DOMAIN>` ← set to the actual domain (e.g. cryptoprism.io, ai-polymind.web.app, or a friend's product domain)
- If the site is NOT yet registered in Plausible, register it FIRST (events are dropped otherwise). Registration = DB insert + container restart + verify 202 — done by the repo owner (see Step 0).

## Step 0 — Registration (new/unknown domains only)
The 7 fleet sites are already registered. For ANY other domain (a friend's product,
a new site), ask the owner to register it before you add the tracker:
1. Owner runs the registration SQL on the Plausible VM (see `.claude/skills/plausible-analytics/SKILL.md` in `yogeshsahu-website`), or registers via the Plausible UI (Account → Sites → Add a website).
2. Owner restarts the plausible container (site cache refresh).
3. Verify registration with the 202 test below BEFORE wiring the tracker.

## Step 1 — Install/verify the tracker (idempotent)
Find the app entry point by framework:
- **Next.js (App Router):** `src/app/layout.tsx` — add via `next/script` (`afterInteractive`).
- **Next.js (Pages Router):** `pages/_app.tsx` or `pages/_document.tsx`.
- **Vite/React:** `index.html` or `main.tsx`.
- **Firebase static hosting:** `public/index.html` (check `firebase.json`).
- **Plain HTML:** the `<head>` of the root `index.html`.

Ensure exactly this tag (or env-driven equivalent, e.g. `NEXT_PUBLIC_PLAUSIBLE_HOST` +
`NEXT_PUBLIC_PLAUSIBLE_SITE`):
```html
<script defer data-domain="<SITE_DOMAIN>" data-outbound-links data-file-downloads
  src="https://plausible.yogeshsahu.xyz/js/script.outbound-links.js"></script>
```
If a CSP exists (check `firebase.json` / server headers), allow
`https://plausible.yogeshsahu.xyz` in `script-src` AND `connect-src` (the event POST is cross-origin). Example (Firebase):
```json
"headers": [
  { "source": "**", "headers": [
    { "key": "Content-Security-Policy",
      "value": "script-src 'self' https://plausible.yogeshsahu.xyz; connect-src 'self' https://plausible.yogeshsahu.xyz" }
  ]}
]
```
Note: env vars in static builds (Vite/Firebase) are baked at build time — a missing
`.env` means no tracker in local dev; that's expected, verify on the deployed site.

## Step 2 — Add a trackEvent helper (if none exists)
Create `src/lib/analytics.ts` (or match the repo's existing analytics file):
```ts
declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string | number> }) => void;
  }
}
// Cookieless custom events for Plausible (self-hosted). No-op when not in browser.
export function trackEvent(name: string, props: Record<string, string | number> = {}): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;
  window.plausible(name, { props });
}
```
For server components use a mounted client wrapper (`<PageEvent event=... props=... />`
that fires once, delayed ~400ms) or a `<TrackClick event=...>` wrapper.

## Step 3 — Instrument the key interactions
Map this product's highest-value actions to events. Use **snake_case** names and a
`source`/context prop when there are multiple triggers. Recommended coverage:
- **Conversion (Goals):** primary CTA clicks, signup/login submit, purchase/checkout, form submit, pricing plan click.
- **Engagement:** feature/module open, search used, filter applied, dock/nav navigation, accordion/tab expand.
- **Content:** article/post read, case study open, resource/toolkit click, video play.

Wire each with a short one-line comment: `// event: <event_name>`.

## Step 4 — Register Goals (conversion events only)
For every Conversion event, register it in the Plausible DB (owner-side, see skill
for exact SQL + restart). Only create Goals for events that map to money-adjacent actions.

## Step 5 — Verify (prove it, don't assume)
1. Tracker loads: `curl -sI https://plausible.yogeshsahu.xyz/js/script.outbound-links.js` → 200
2. Site accepts events (202 = registered; write JSON to a file, use `--data-binary @file` on Windows):
   ```bash
   curl -s -o NUL -w "%{http_code}" -X POST "https://plausible.yogeshsahu.xyz/api/event" \
     -H "Content-Type: text/plain" -H "Origin: https://<SITE_DOMAIN>" \
     -H "User-Agent: Mozilla/5.0 (test)" \
     --data-binary '{"domain":"<SITE_DOMAIN>","name":"pageview","url":"https://<SITE_DOMAIN>/","referrer":""}'
   ```
   → Expect **202**. 202 means registered; 400 means site not registered.
3. Build/lint the repo and confirm no regressions.
4. Hard-refresh the live site, trigger an event, confirm it appears in Plausible Realtime.

## Hard rules
- **No dummy/synthetic events** — instrument only real interactions; if you're unsure what's important, list candidate events and ask first.
- Keep the diff minimal and follow the repo's existing patterns (env vars over hardcoding where the repo already does that).
- Do NOT touch unrelated code, mobile-only builds, or other teams' features.
- Never commit secrets (the tracker host is public; API keys are not).
- If the site isn't registered yet, register it BEFORE adding the tracker (events are dropped otherwise).

## Fleet map (registered domains — no registration needed)
| Repo | Domain | Framework | Entry point |
|------|--------|-----------|-------------|
| yogeshsahu-website | yogeshsahu.xyz | Next.js App Router | `src/app/layout.tsx` |
| cpio_website | cryptoprism.io | Vite/React | `index.html` |
| cryptoprism-tech-website | cryptoprism.tech | Firebase static | `public/index.html` |
| trinetryinfotech-website | trinetryinfotech.com | Firebase static | `public/index.html` |
| puneglobalgroup-website | puneglobalgroup.in | Next.js App Router | `src/app/layout.tsx` |
| gyanmarg | ai-polymind.web.app | React (Vite-style) | `app/index.html` |
| pratyaksha (monorepo) | ai-becoming.web.app | Vite/React | `pratyaksha-website-3.0/index.html` |

Any other domain (friend's SaaS, new product): registration required — see Step 0.
For the concierge experiment, friends' products ALSO get the `analyst/` tools
(ask.mjs, weekly-memo.mjs) from `yogeshsahu-website` — tracking first, analysis after ~7 days baseline.
