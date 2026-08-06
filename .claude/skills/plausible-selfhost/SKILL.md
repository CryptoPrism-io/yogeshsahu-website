---
name: plausible-selfhost
description: Deploy and operate Plausible CE (self-hosted analytics) on AWS EC2. Use for standing up a new instance, adding sites, troubleshooting, or extending to more products. Contains the exact commands and every known gotcha so redeploying takes minutes, not an hour.
---

# Plausible CE Self-Host — Runbook

## When to use
- Deploying Plausible on a new EC2 instance
- Adding a new product/site to an existing instance
- Debugging Plausible/ClickHouse/Postgres container issues
- Scaling the same instance to more products

## Architecture (one instance, many sites)

```
EC2 t3.medium (EIP)
├── plausible_events_db  (ClickHouse 24.12-alpine) — analytics store, SHARED
├── plausible_db          (Postgres 16-alpine)      — metadata, SHARED
└── plausible             (ghcr.io/plausible/community-edition:v3.2.1)
    ├── serves dashboard at https://plausible.<domain>
    └── serves tracker  /js/script.js  for ALL sites
```

One Plausible = all products. Each product adds the script tag with its own
`data-domain`. No per-product infra.

## Reference facts (current deployment)

| Fact | Value |
|------|-------|
| Instance | `t3.medium`, EIP `52.202.90.162`, region us-east-1 |
| Image | `ghcr.io/plausible/community-edition:v3.2.1` |
| Compose source | official `github.com/plausible/community-edition` (NOT the old `analytics` repo) |
| Dashboard URL | `https://plausible.yogeshsahu.xyz` |
| Config dir | `/home/ubuntu/plausible/` on the instance |
| SSH | `plausible-key.pem` (store securely, never commit) |

## Deploy from scratch (fast path, ~10 min)

1. Launch EC2 t3.medium, 30GB gp3, security group (443 open, 22 from your IP only), attach EIP.
2. Install Docker:
   ```bash
   sudo apt-get update -qq && sudo apt-get install -y -qq ca-certificates curl gnupg
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   echo 'deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable' | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
   sudo apt-get update -qq && sudo apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```
3. `mkdir -p ~/plausible/clickhouse` and place the official compose + 4 ClickHouse configs (see KB doc `docs/plausible-selfhost-aws-runbook.md`).
4. Create `.env` with the 7 required vars (BASE_URL, SECRET_KEY_BASE, TOTP_VAULT_KEY, HTTP_PORT, HTTPS_PORT, DATABASE_URL, CLICKHOUSE_DATABASE_URL). **DATABASE_URL/CLICKHOUSE_DATABASE_URL must be non-empty** — empty nil crashes boot.
5. `sudo docker compose up -d` — migrations auto-run on first boot (entrypoint does `createdb && migrate && run`).
6. Add the A record for the dashboard subdomain FIRST, before relying on HTTPS.

## Adding a new product/site (5 min)

1. In Plausible dashboard → Add website → enter the product's domain.
2. On the product's site, add (only `data-domain` changes):
   ```html
   <script defer data-domain="product-domain.com" src="https://plausible.<dash-domain>/js/script.js"></script>
   ```
3. Hard-refresh the product page, check Plausible → Realtime → should show the visit.
4. No DNS, no deploy, no new container. Done.

## THE GOTCHAS (these cost an hour each the first time)

1. **Use the community-edition repo + ghcr image, NOT `plausible/analytics:v2.1`.**
   The old `analytics` image is dated 2023, has a different entrypoint (no auto-migrate), and `:v2.1` doesn't even exist. Correct: `ghcr.io/plausible/community-edition:v3.2.1`.

2. **ClickHouse IPv6 crash.** `24.x-alpine` tries to bind `[::]:9000` and dies with
   `Address family for hostname not supported` on Docker bridge networks.
   Fix: mount `clickhouse/ipv4-only.xml` with `<listen_host>0.0.0.0</listen_host>`.
   (The official compose already includes this — don't omit it.)

3. **Postgres version mismatch.** The old setup used postgres:15; the official
   compose uses postgres:16. Reusing the old `db-data` volume → `database files
   are incompatible with server`. Fix: `docker compose down -v` to wipe volumes
   on a fresh deploy.

4. **Empty `DATABASE_URL`/`CLICKHOUSE_DATABASE_URL` = boot crash.**
   `String.starts_with?(nil, "%2F")` at `runtime.exs:499`. The compose passes
   `DATABASE_URL=${DATABASE_URL}`; if `.env` doesn't set it, it becomes empty/nil
   and Plausible dies. Set both explicitly in `.env`.

5. **Let's Encrypt needs DNS FIRST.** The cert fails with `challenges have failed`
   if `plausible.<domain>` doesn't resolve to the EIP yet. Add DNS, then
   `docker compose restart plausible` to retry cert issuance.

6. **SECRET_KEY_BASE must be ≥64 bytes.** Use `openssl rand -base64 48`.

7. **SSH key on Windows.** `Set-Content`/`Out-File` mangles PEM line endings →
   `invalid format`. Write via `[System.IO.File]::WriteAllText` with proper
   LF newlines + 64-char wrapping, then `icacls /inheritance:r` for perms.

## Troubleshooting quick reference

| Symptom | Cause | Fix |
|---------|-------|-----|
| ClickHouse restart loop, exit 210 | IPv6 bind | mount ipv4-only.xml |
| `mix: not found` | wrong image | use ghcr CE image |
| `database "plausible_db" does not exist` | no createdb run | CE entrypoint auto-runs; ensure healthchecks pass |
| `relation "salts" does not exist` | migrations never ran | CE entrypoint runs migrate on boot |
| `String.starts_with?(nil,"%2F")` | empty DATABASE_URL | set both DB URLs in .env |
| cert challenges failed | DNS missing | add A record, restart plausible |
| Postgres `incompatible with server` | old volume | `down -v` |

## Verification checklist
- [ ] `docker compose ps` — all 3 services Up (db + events_db Healthy)
- [ ] `curl -sI http://127.0.0.1:80/` → 301 (redirect to HTTPS)
- [ ] `curl -sI https://127.0.0.1:443/ -k` → 302 (redirect to login)
- [ ] `https://plausible.<domain>` → admin login page, TLS green
- [ ] Add a test site → paste script on a product → Realtime shows the hit
