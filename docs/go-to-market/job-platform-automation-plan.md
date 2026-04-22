# Job Platform Automation Plan

## Objective

Build a browser automation pipeline that does two things in order:

1. creates and completes profiles across selected freelance/job platforms from one canonical data source
2. uses those completed profiles to drive assisted mass-apply workflows for matched roles

This should be treated as a product, not a one-off macro.

## Core Decision

Use a **master profile JSON** as the source of truth, then add:

- a deterministic browser runner for each site
- a site-specific field mapping layer
- a human approval checkpoint before irreversible actions like final submit, payment, KYC, or contract acceptance

AI should help with:

- mapping profile data into messy form fields
- generating tailored answers and short cover notes
- recovering from minor UI variation

AI should **not** be trusted to blindly submit everything end-to-end without controls.

## Recommended Stack

- **Browser control:** Playwright with a persistent Chrome/Chromium profile
- **Execution model:** one runner per platform, one shared orchestration layer
- **Canonical data:** `profile.master.json`
- **Per-site mapping:** `sites/<site>.json`
- **Run logs:** screenshots + JSON event logs + failure snapshots
- **Optional AI layer:** use LLM calls only for classification, answer generation, and fallback reasoning

Given your local setup, this is best built either:

- inside a new dedicated automation repo, or
- as a separate `automation/` area rather than mixing directly into the portfolio app

## Why This Order Matters

Most of the portals you listed are now profile-first. That means the real pipeline is:

`master profile -> portal onboarding -> profile completion -> role discovery -> shortlist -> assisted apply`

If you skip the profile layer, mass apply quality collapses and many sites block or downgrade incomplete accounts.

## Platform Tiers

### Tier 1: Build profile automation first

These are worth structured onboarding and profile completion:

- Wellfound
- Contra
- Braintrust
- Gun.io
- Arc
- Malt
- Upwork
- Toptal

### Tier 2: Build search + shortlist + light apply automation second

These are more job-board-like and can often be automated after profile data is ready:

- Y Combinator Jobs
- Remote OK
- We Work Remotely
- Himalayas
- Dynamite Jobs
- FlexJobs

### Tier 3: Keep manual or semi-manual

These involve account verification, payments, finance, or low-value automation:

- Wise
- Razorpay
- Gmail
- Glassdoor Community

These should not be in the first browser automation sprint.

## Master Data Model

The first real deliverable is a complete JSON record that can answer 80 to 90 percent of repetitive questions.

Suggested sections:

- `identity`
- `contact`
- `location`
- `work_authorization`
- `target_roles`
- `employment_preferences`
- `headline_variants`
- `bio_variants`
- `core_skills`
- `tools_and_stack`
- `industry_focus`
- `experience_entries`
- `case_studies`
- `portfolio_links`
- `resume_files`
- `rate_preferences`
- `salary_preferences`
- `screening_answers`
- `platform_specific_overrides`
- `compliance_flags`

Example shape:

```json
{
  "identity": {
    "full_name": "Yogesh Sahu",
    "primary_title": "Hands-On Chief Solutions Architect / Fractional CTO",
    "email": "",
    "phone": "",
    "linkedin": "https://linkedin.com/in/yogeshsahu",
    "portfolio": "https://yogeshsahu.xyz"
  },
  "target_roles": [
    "Fractional CTO",
    "Solutions Architect",
    "Founding Engineer",
    "Product Engineer",
    "Technical Product Manager"
  ],
  "headline_variants": {
    "default": "Hands-On Chief Solutions Architect / Fractional CTO | AI, fintech, and data-heavy products | Discovery to delivery leadership",
    "product": "",
    "freelance": ""
  },
  "screening_answers": {
    "authorized_to_work": "",
    "need_visa_sponsorship": "",
    "years_experience_total": "",
    "expected_hourly_rate_usd": "",
    "notice_period": "",
    "why_interested_short": ""
  },
  "platform_specific_overrides": {
    "upwork": {},
    "wellfound": {},
    "contra": {}
  }
}
```

## Site Adapter Model

Each site should have a small adapter config plus a script.

Adapter responsibilities:

- login flow definition
- navigation steps
- field selectors
- known dropdown values
- resume upload rules
- profile completeness checks
- application flow steps
- manual checkpoint markers
- anti-bot sensitivity rating

Example adapter data:

```json
{
  "site": "wellfound",
  "mode": "profile_and_apply",
  "login": {
    "persistent_context": true,
    "manual_auth_allowed": true
  },
  "checkpoints": [
    "before_resume_upload",
    "before_final_submit"
  ],
  "sensitivity": "medium"
}
```

## Execution Architecture

### Phase 1: Profile bootstrap

Goal:
Create or complete profiles on the highest-value platforms using the master JSON.

Runner behavior:

- open site with persistent browser context
- detect logged-in state
- navigate to profile pages
- fill empty fields only by default
- compare existing content before overwriting
- upload approved resume/portfolio assets
- save screenshots after each major section
- write completion state back to a local run log

### Phase 2: Role discovery and filtering

Goal:
Search roles and eliminate low-fit jobs before applying.

Filters should include:

- remote only
- role family match
- geography/work authorization fit
- seniority fit
- compensation threshold if visible
- contractor/freelance/full-time preference
- clear relevance to your positioning

This stage should generate a shortlist, not auto-submit everything.

### Phase 3: Assisted apply

Goal:
Automate repetitive application steps while preserving quality.

Recommended rules:

- auto-fill only if role fit score is above threshold
- generate a site-sized custom answer using role description + master profile
- pause for review before final submit
- store submitted role URL, timestamp, answers used, and outcome

### Phase 4: Outreach follow-through

Once apply is submitted:

- create a follow-up record
- generate LinkedIn/email outreach draft
- add reminder for follow-up in 3 to 5 business days

## Browser Strategy

Do not rely on pure AI browser wandering.

Preferred approach:

1. deterministic Playwright selectors first
2. fallback heuristics second
3. LLM reasoning only when the UI changes or the field label is ambiguous

Use a dedicated browser profile for automation so sessions persist without polluting your personal browser state.

## Guardrails

These matter more than speed.

- Never bypass CAPTCHA, MFA, KYC, or identity verification.
- Never auto-submit on finance/payment platforms.
- Never overwrite an existing good profile section without diffing it first.
- Never mass-apply to low-fit roles just because the form is easy.
- Always save a screenshot and structured log before final submission.
- Require human confirmation on first-run flows for every new platform.

## Suggested Portal Order

Start with the platforms where profile quality matters most and the upside is real:

1. Wellfound
2. Contra
3. Braintrust
4. Gun.io
5. Arc
6. Upwork

Then move to discovery/apply boards:

1. Y Combinator Jobs
2. We Work Remotely
3. Remote OK
4. Himalayas
5. Dynamite Jobs

Leave Toptal for later. It has higher process sensitivity and usually benefits from a cleaner manual-first setup.

## What To Build In Sprint 1

Sprint 1 should not try to automate every portal.

Deliverables:

1. `profile.master.json`
2. one reusable Playwright runner with persistent context
3. adapter format for platforms
4. working profile-fill flows for `wellfound` and `contra`
5. run logging with screenshots
6. a role shortlist generator that saves matched URLs and role metadata

If sprint 1 works, then add `braintrust`, `gun.io`, and `arc`.

## Proposed Repo Structure

```text
automation/
  data/
    profile.master.json
    roles.targets.json
    screening.answers.json
  sites/
    wellfound.json
    contra.json
    braintrust.json
  scripts/
    run-profile-fill.ts
    run-role-search.ts
    run-assisted-apply.ts
    lib/
      browser.ts
      logger.ts
      profile-map.ts
      answer-generator.ts
      fit-score.ts
  runs/
    2026-04-22/
      wellfound/
      contra/
```

## How Codex Fits

Codex is useful for:

- building and maintaining the automation code
- generating adapter configs
- reviewing failures from screenshots and logs
- refining the master profile data model
- improving role-fit scoring and custom-answer generation

Codex should not be the only control plane for live browser decisions. The durable system should be code plus logs, not chat history.

## Practical Recommendation

Your best next move is:

1. build the master profile JSON from your existing LinkedIn and offer docs
2. implement profile automation for two platforms only
3. add shortlist generation
4. add assisted apply with manual final confirmation
5. expand platform count only after the logs show stable behavior

That gets you from repetitive profile setup to a controlled mass-apply pipeline without turning the whole thing into brittle browser chaos.
