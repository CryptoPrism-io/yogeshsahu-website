# Self-Host Plausible Analytics on AWS EC2 — Runbook

Deploy the open-source Plausible analytics stack on a single EC2 instance using
Docker Compose. Serves the `yogeshsahu.xyz` tracker, cookieless, $0 model cost.

## Target infrastructure (minimal, credits-friendly)

| Resource | Choice | Why |
|----------|--------|-----|
| Instance | **t3.medium** (2 vCPU / 4 GB RAM) | Enough for ClickHouse + Postgres + app |
| Disk | **gp3, 30 GB** | Low-traffic personal site, room to grow |
| OS | Ubuntu 22.04 LTS | Plausible docs + docker images target it |
| Region | us-east-1 (match existing infra) | Consistency with the pratyaksha Lambda/RDS |
| Domain | `plausible.yogeshsahu.xyz` | Subdomain keeps main site clean |
| TLS | Caddy (in compose) | Auto Let's Encrypt, zero config |
| Cost | ~$18/mo on-demand (or cheaper w/ savings plan) | Within the ~$50 budget |

## Step 1 — Launch the EC2 instance

Via console or AWS CLI. Key settings:

- AMI: **Ubuntu 22.04 LTS** (arm64 not needed — x86 t3.medium)
- Instance type: `t3.medium`
- Key pair: use an existing one, or create `plausible-key`
- Network: default VPC, **public subnet** (needs public IP for the subdomain)
- Security group `plausible-sg`:
  - **Inbound 443** from `0.0.0.0/0` (HTTPS — the tracker script is loaded by visitors)
  - **Inbound 22** from YOUR IP only (SSH)
  - **No** other inbound
- Storage: **30 GB gp3**
- Public IP: enable Auto-assign public IP (or attach an Elastic IP — recommend EIP so DNS doesn't break on stop/start)

```bash
# (Optional) via CLI — adjust key/name
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \   # us-east-1 Ubuntu 22.04
  --instance-type t3.medium \
  --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=30,VolumeType=gp3}' \
  --security-groups plausible-sg \
  --key-name plausible-key \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=plausible}]'
```

## Step 2 — DNS

Create an **A record** in your DNS provider (or Route 53):

```
plausible.yogeshsahu.xyz  →  <EC2 public IP>
```

Optionally get an **Elastic IP** and assign it so the A record survives stop/start:

```bash
aws ec2 allocate-address --domain vpc
aws ec2 associate-address --instance-id <i-...> --allocation-id <eipalloc-...>
```

## Step 3 — Install Docker on the instance

```bash
ssh -i ~/.ssh/plausible-key.pem ubuntu@<EC2-IP>
```

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER
```

Log out and back in so the docker group applies.

## Step 4 — Plausible config

Create the directory and secrets file:

```bash
mkdir -p ~/plausible && cd ~/plausible
```

```bash
# Generate the secret key
openssl rand -base64 48
```

Create `plausible-conf.env` (paste your generated key):

```env
BASE_URL=https://plausible.yogeshsahu.xyz
SECRET_KEY_BASE=<paste 48-char base64 key from above>
TOTP_VAULT_KEY=<another openssl rand -base64 32>
```

## Step 5 — Docker Compose file

Create `docker-compose.yml`:

```yaml
version: "3.9"
services:
  mail:
    image: bytemark/smtp
    restart: always

  plausible_db:
    image: postgres:15-alpine
    restart: always
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=postgres

  plausible_events_db:
    image: clickhouse/clickhouse-server:24.8-alpine
    restart: always
    volumes:
      - event-data:/var/lib/clickhouse
      - ./clickhouse/clickhouse-config.xml:/etc/clickhouse-server/config.d/logging.xml:ro
      - ./clickhouse/clickhouse-user-config.xml:/etc/clickhouse-server/users.d/logging.xml:ro
    ulimits:
      nofile:
        soft: 262144
        hard: 262144

  plausible:
    image: plausible/analytics:v2.1
    restart: always
    command: sh -c "sleep 10 && mix do ecto.create, ecto.migrate, run --no-start -e 'Plausible.Repo.query!(\"ALTER TABLE events ADD COLUMN IF NOT EXISTS template_id INT REFERENCES template_ids(id)\")' && mix phx.server"
    depends_on:
      - plausible_db
      - plausible_events_db
      - mail
    ports:
      - "127.0.0.1:8000:8000"
    env_file:
      - plausible-conf.env
    environment:
      - DATABASE_URL=postgres://postgres:postgres@plausible_db:5432/plausible_db
      - CLICKHOUSE_DATABASE_URL=http://plausible_events_db:8123/plausible_events_db
      - SMTP_ADDR=smtp
      - SMTP_PORT=25

  caddy:
    image: caddy:2
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data
    environment:
      - DOMAIN=plausible.yogeshsahu.xyz

volumes:
  db-data:
  event-data:
  caddy-data:
```

Create the ClickHouse configs (keep defaults, silence excessive logging):

`clickhouse/clickhouse-config.xml`:
```xml
<clickhouse>
  <logger>
    <level>warning</level>
    <console>true</console>
  </logger>
  <listen_try>false</listen_try>
</clickhouse>
```

`clickhouse/clickhouse-user-config.xml`:
```xml
<clickhouse>
  <profiles>
    <default>
      <log_queries>0</log_queries>
      <log_query_threads>0</log_query_threads>
    </default>
  </profiles>
</clickhouse>
```

Create `Caddyfile`:
```
{$DOMAIN} {
    reverse_proxy 127.0.0.1:8000
}
```

## Step 6 — Start it

```bash
cd ~/plausible
docker compose up -d
docker compose ps   # wait until plausible is healthy
```

Plausible takes a minute to boot (migrations + ClickHouse warmup). Verify:

```bash
curl -I https://plausible.yogeshsahu.xyz
# expect 200/301
```

## Step 7 — Add the site + get the script key

1. Open `https://plausible.yogeshsahu.xyz` → create admin account
2. **Add website** → domain `yogeshsahu.xyz`
3. The dashboard gives you a snippet:
   ```html
   <script defer data-domain="yogeshsahu.xyz" src="https://plausible.yogeshsahu.xyz/js/script.js"></script>
   ```

## Step 8 — Point the portfolio at it

In the `yogeshsahu-website` repo:

```bash
gh secret set NEXT_PUBLIC_PLAUSIBLE_HOST --body "https://plausible.yogeshsahu.xyz"
# NEXT_PUBLIC_PLAUSIBLE_SITE already set to yogeshsahu.xyz
```

Push a commit (or re-run the deploy workflow) — the tracker goes live. Verify:

```bash
curl -s https://yogeshsahu.xyz/ | grep -o "plausible[^\"']*"
```

Then hard-refresh the site and check the Plausible dashboard **Realtime** — you should appear.

## Cost check (within budget)

| Item | On-demand | Savings-plan |
|------|-----------|--------------|
| t3.medium (us-east-1) | ~$18/mo | ~$12/mo |
| 30GB gp3 | ~$3/mo | — |
| EIP (idle while assigned) | ~$3/mo | — |
| **Total** | **~$24/mo** | **~$18/mo** |

## Hard rules
- Never expose Plausible's `:8000` app port publicly (it's bound to 127.0.0.1 — keep it that way).
- SSH only from your IP; no `0.0.0.0/0` on 22.
- `SECRET_KEY_BASE` + `TOTP_VAULT_KEY` stay in `plausible-conf.env` on the instance — never commit.
- If the instance is stopped >7 days, re-verify the EIP is still attached before DNS-dependent visitors hit errors.

## Definition of done
1. `https://plausible.yogeshsahu.xyz` returns 200 and shows the admin login.
2. The site `yogeshsahu.xyz` is added to Plausible.
3. `NEXT_PUBLIC_PLAUSIBLE_HOST` secret set; the portfolio loads `script.js` from the instance.
4. A hard-refresh shows the visitor in Plausible Realtime.

---

# DEPLOYED REALITY (2026-08-06) — supersedes the Caddy-based parts above

The above reflects the ORIGINAL plan (Caddy + `plausible/analytics:v2.1`). The
actual working deployment uses the **official Plausible Community Edition v3.2.1**
compose, which has built-in TLS (no Caddy). The correct reference is
`.claude/skills/plausible-selfhost/SKILL.md`. Key differences:

- Image: `ghcr.io/plausible/community-edition:v3.2.1` (NOT `plausible/analytics:v2.1`)
- Built-in Let's Encrypt via `HTTP_PORT`/`HTTPS_PORT` env — no Caddy container
- Entrypoint auto-runs `createdb && migrate && run` on boot
- Postgres 16 + ClickHouse 24.12, both with healthchecks
- Compose + ClickHouse configs come from `github.com/plausible/community-edition`

## Live stack (as deployed)

| Service | Image | Status |
|---------|-------|--------|
| `plausible` | `ghcr.io/plausible/community-edition:v3.2.1` | Up |
| `plausible_db` | `postgres:16-alpine` | Healthy |
| `plausible_events_db` | `clickhouse/clickhouse-server:24.12-alpine` | Healthy |

Instance: `t3.medium` `i-034f30a4c644521a7` · EIP `52.202.90.162` · us-east-1
Dashboard: `https://plausible.yogeshsahu.xyz` · SSH key `plausible-key.pem`

## One-wildcard model (how all products get analytics)

The tracker loads from the dashboard host; `data-domain` is only a label:

```html
<script defer data-domain="<any-product-domain>" src="https://plausible.yogeshsahu.xyz/js/script.js"></script>
```

So **`*.yogeshsahu.xyz → EIP` enables analytics on every product**. Firebase
`*.web.app` sites need no DNS at all. Per-product wildcards on other owned domains
are optional (only for separate dashboards).

## Domain inventory (owner's zones)

| Domain | Wildcard added | Notes |
|--------|----------------|-------|
| `yogeshsahu.xyz` | ✅ `*` → 52.202.90.162 | Dashboard host |
| `cryptoprism.io` | optional | CryptoPrism |
| `trinetryinfotech.com` | optional | Trinetry |
| `puneglobalgroup.in` | optional | PGG |
| `ai-becoming.web.app` / `ai-polymind.web.app` | not needed | Firebase-owned zones |

