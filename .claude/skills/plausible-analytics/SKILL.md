---
name: plausible-analytics
description: Develop and manage Plausible analytics events across all CryptoPrism products. Use when adding/modifying tracked events, onboarding a new product/site, defining goals, or mapping event categories. Includes the event taxonomy, the trackEvent helper contract, site registration, and verification steps.
---

# Plausible Analytics — Event Development & Site Management

## When to use
- Adding a new tracked event to any product
- Onboarding a new product/site to the self-hosted Plausible
- Defining Goals / conversions
- Debugging why an event or site isn't showing data
- Mapping the event taxonomy across products

## Core facts

| Fact | Value |
|------|-------|
| Plausible host | `https://plausible.yogeshsahu.xyz` |
| Tracker script | `/js/script.outbound-links.js` (auto-tracks outbound + downloads) |
| Deploy skill | `.claude/skills/plausible-selfhost/SKILL.md` |
| Analytics helper | `src/lib/analytics.ts` -> `trackEvent(name, props)` |
| DB access | via `plausible-plausible_db-1` container (Postgres `plausible_db`) |

## Registered sites (all accept events)

| Domain | Product |
|--------|---------|
| `yogeshsahu.xyz` | Portfolio (current repo) |
| `cryptoprism.io` | CryptoPrism |
| `cryptoprism.tech` | CryptoPrism tech site |
| `trinetryinfotech.com` | Trinetry |
| `puneglobalgroup.in` | PGG |
| `ai-becoming.web.app` | Pratyaksha |
| `ai-polymind.web.app` | Gyanmarg |

## The one-wildcard model
The tracker loads from `plausible.yogeshsahu.xyz`; `data-domain` is just a label.
So ANY product can track with one script tag — `data-domain` changes per site,
the `src` stays identical. Firebase `*.web.app` needs no DNS.

## Event taxonomy (portfolio repo)

### Standard auto-tracked (zero code)
- **Pageview** — every page load (built into script.js)
- **Outbound link click** — via `script.outbound-links.js` + `data-outbound-links`
- **File download** — via `data-file-downloads` (e.g. `/yogesh-sahu-cv.pdf`)
- **Scroll depth / engagement time** — built into the tracker

### Custom events (via `trackEvent`)

| Event | Fires on | Props | Category |
|-------|----------|-------|----------|
| `diagnostic_click` | Diagnostic CTA (desktop, mobile, nav strip) | `source` | **Conversion** |
| `contact_click` | Contact buttons | `source` | **Conversion** |
| `project_open` | Case card click | `project` (id) | **Engagement** |
| `dock_open` | Dock app icon open | `app` (id) | **Engagement** |
| `nav_click` | GlyphPanel nav link | `destination` (href) | **Engagement** |
| `journal_read` | Log post click | `post` (slug) | **Content** |

### Categories
- **Conversion** — money-adjacent actions (diagnostic, contact) -> mark as Goals
- **Engagement** — product/site interaction (project, dock, nav)
- **Content** — reading/consuming content (journal)

## Adding a new event (portfolio)

1. Add the name to the `EventName` union in `src/lib/analytics.ts`.
2. Import `trackEvent` in the component.
3. Call it in the `onClick` (or on interaction) — use snake_case, add a `source` prop where there are multiple triggers.
4. Define a Goal in Plausible if it's a conversion (see below).
5. Build + deploy + verify in Realtime.

## Onboarding a NEW product/site

1. **Register the site** in Plausible DB (one-time):
   ```sql
   INSERT INTO sites (domain, inserted_at, updated_at, timezone, public, team_id, native_stats_start_at)
   VALUES ('<domain>', now(), now(), 'Asia/Calcutta', false, 1, now());
   ```
   Run via: `cat add-site.sql | sudo docker exec -i plausible-plausible_db-1 psql -U postgres -d plausible_db`

2. **Restart plausible** container to refresh the site cache:
   ```bash
   cd ~/plausible && sudo docker compose restart plausible
   ```

3. **Add the tracker tag** to the product's layout/head:
   ```html
   <script defer data-domain="<product-domain>" data-outbound-links data-file-downloads
     src="https://plausible.yogeshsahu.xyz/js/script.outbound-links.js"></script>
   ```

4. **Verify the site accepts events** (HTTP 202 = registered):
   ```bash
   curl -s -o NUL -w "%{http_code}\n" -X POST "https://plausible.yogeshsahu.xyz/api/event" \
     -H "Content-Type: text/plain" -H "Origin: https://<product-domain>" \
     -H "User-Agent: Mozilla/5.0 (test)" \
     --data-binary "{\"domain\":\"<product-domain>\",\"name\":\"pageview\",\"url\":\"https://<product-domain>/\",\"referrer\":\"\"}"
   # Expect 202
   ```

5. **Hard-refresh the product** and check the Plausible dashboard Realtime.

## Defining Goals (conversions)

In the Plausible dashboard -> site -> Goals -> Add goal, create a Goal for each
**Conversion** event name (`diagnostic_click`, `contact_click`). Goals make these
show as conversion metrics, not just raw events. Content/engagement events can
stay as regular events.

## Verification

- **Site accepts events:** POST `/api/event` -> 202
- **Event in dashboard:** trigger it, check Realtime within seconds
- **Outbound/download:** check the site's dashboard "Outbound Links" / "File Downloads" sections
- **Tracker loaded:** `curl -sI https://plausible.yogeshsahu.xyz/js/script.outbound-links.js` -> 200

## Gotchas

- **Events dropped if site not registered** — always register the site BEFORE
  adding the tracker tag.
- **`data-domain` is a label, not a URL** — no DNS needed per product.
- **Restart needed after DB site insert** — the site cache refreshes on restart.
- **Windows curl + JSON** — write the body to a file and use `--data-binary @file`
  (inline single-quote JSON breaks on Windows PowerShell).
- **Never hardcode the tracker host** — use `NEXT_PUBLIC_PLAUSIBLE_HOST` env.
