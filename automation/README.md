# Glassdoor Automation

This folder is the start of a controlled browser automation pipeline for Glassdoor.

Use raw Playwright for the runtime system.

Do not use MCP as the main execution layer for repeatable automation. MCP is useful for exploration and debugging, but the durable system should be code, config, and run logs.

## What This First Pass Does

- launches a persistent browser profile for Glassdoor
- lets you log in manually and keep the session
- captures a structured snapshot of the current form page
- fills known profile fields from a local master JSON
- stops before submit

## Guardrails

- no CAPTCHA or MFA bypass
- no final submit automation in this first pass
- no overwriting without visible review
- no finance or identity verification automation

## Files

- `data/profile.master.template.json`: template for your master data
- `sites/glassdoor.json`: first-pass Glassdoor field mapping
- `scripts/glassdoor-login.mjs`: persistent login bootstrap
- `scripts/glassdoor-snapshot.mjs`: inspect current form fields
- `scripts/glassdoor-profile-fill.mjs`: fill mapped fields without submitting

## Setup

From the repo root:

```powershell
npm install
Copy-Item automation\data\profile.master.template.json automation\data\profile.master.json
```

Then edit `automation/data/profile.master.json` with your real data.

## Commands

Bootstrap login:

```powershell
npm run automation:glassdoor:login
```

Inspect the current page and save a form inventory:

```powershell
npm run automation:glassdoor:snapshot
```

Fill mapped profile fields:

```powershell
npm run automation:glassdoor:profile
```

## Recommended Workflow

1. Run login bootstrap and complete auth manually.
2. Run snapshot while the Glassdoor profile or preferences form is open.
3. Review the generated field inventory under `automation/runs/`.
4. Refine `sites/glassdoor.json`.
5. Run profile fill.
6. Review changes in-browser and save manually.
