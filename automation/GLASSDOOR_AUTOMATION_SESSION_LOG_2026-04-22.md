# Glassdoor Automation Session Log

Date: 2026-04-22

## Objective

Build the first working slice of a browser automation workflow for job-platform onboarding and applications, starting with Glassdoor.

The immediate goal for this session was:

1. decide the browser-control approach
2. reuse the existing `cryptoprism.io` Chrome profile for Google-based auth
3. prove one-site login/session persistence on Glassdoor
4. capture the target page structure so profile-fill automation could be mapped

## Scope For This Session

This session was intentionally limited to the foundation layer, not full end-to-end job application submission.

In scope:

- browser control architecture
- persistent profile/session reuse
- Google SSO path through the existing Chrome profile
- Glassdoor-specific scaffolding
- page snapshotting and field discovery
- safe non-submit profile-fill foundation

Out of scope:

- bypassing CAPTCHA or MFA
- automated Google credential entry
- final job application submission
- mass-apply orchestration across all portals
- financial/KYC portals

## High-Level Decision

The correct runtime architecture is:

- Playwright for durable automation code
- existing Chrome profile reuse for authentication state
- Glassdoor login via the site's own `Login with Google` flow in-browser
- manual approval before any irreversible actions

Playwright MCP was treated as a debugging/exploration aid, not the primary execution layer.

## What We Built

Created an automation scaffold under `automation/` with:

- `README.md`
- `data/profile.master.template.json`
- `sites/glassdoor.json`
- `scripts/glassdoor-login.mjs`
- `scripts/glassdoor-snapshot.mjs`
- `scripts/glassdoor-profile-fill.mjs`
- helper modules under `scripts/lib/`

Updated repo config:

- `.gitignore`
- `package.json`

Installed:

- `playwright`

## Key Findings

### 1. Existing Chrome profile was identified successfully

Chrome profile metadata showed:

- profile directory: `Profile 17`
- profile name: `cryptoprism.io`
- account: `yogesh.sahu@cryptoprism.io`

This was the right profile to reuse for Google login.

### 2. Blank Chrome profile issue was real and understood

The first launcher used an isolated automation profile directory. That opened Chrome without your existing Google identity, which is why you saw a profile-less session.

This was corrected by pointing the system-profile path at the real Chrome user data and the `cryptoprism.io` profile.

### 3. Google auth should stay manual-in-browser

We explicitly did not script Google credentials.

Correct approach:

- open the real Chrome profile
- click `Login with Google` in the browser
- preserve cookies/session in the same profile

### 4. Reusing a live Chrome profile is the hard part

The main engineering problem was not Glassdoor selectors. It was reliably controlling the real Chrome profile from Playwright on Windows.

## Failures and What They Meant

### Failure 1: Path loader bug in the config helper

Symptom:

- `ENOENT` against a bad path like `C:\C:\...`

Cause:

- `import.meta.url` path handling was wrong on Windows

Fix:

- switched to `fileURLToPath(import.meta.url)`

### Failure 2: Initial navigation timeout on Glassdoor

Symptom:

- `page.goto` timed out at 5 seconds

Cause:

- timeout budget was too low for Glassdoor

Fix:

- raised default and navigation timeouts

### Failure 3: Playwright could not relaunch the real Chrome profile while Chrome was already open

Symptom:

- `launchPersistentContext` exited immediately with browser/context closed errors

Cause:

- the real Chrome profile was still in use

Fix:

- confirmed that Chrome must be closed before first takeover or attach

### Failure 4: Relaunching the same real Chrome profile repeatedly was brittle

Symptom:

- one launch could work, but follow-up scripts failed when trying to launch the same profile again

Cause:

- the design was trying to relaunch a live synced profile instead of attaching to an existing browser session

Fix:

- changed the architecture to use a reusable Chrome session over a remote debugging port

### Failure 5: Direct Node child-process launch of Chrome was inconsistent

Symptom:

- Chrome could start, but the remote debugging endpoint often did not appear

Observed behavior:

- manual PowerShell `Start-Process` with the same flags could expose the endpoint
- plain Node `spawn(chrome.exe, ...)` remained unreliable on this machine/profile combination

Fix attempted:

- refactored launcher several times
- changed flag formats
- finally switched the Windows launch path toward `powershell.exe Start-Process`

Status:

- improved, but not fully closed out in this session because the final retry was interrupted by the user

### Failure 6: Snapshot runs timed out at the shell layer even when the browser step had worked

Symptom:

- command timed out after manual waiting

Cause:

- shell/tool timeout and long manual wait windows

Fix:

- added configurable manual wait via `AUTOMATION_WAIT_MS`
- made snapshot screenshots best-effort instead of blocking the run

### Failure 7: Screenshot capture on Glassdoor could hang

Symptom:

- screenshot timeout on a heavy page

Fix:

- reduced screenshot strictness
- wrote form inventory before screenshot
- treated screenshot failure as a logged event, not fatal

## What Actually Worked

### Working item 1: Chrome profile discovery

We successfully discovered and validated the correct Chrome profile.

### Working item 2: Automation scaffold

The initial Glassdoor automation project structure was created successfully.

### Working item 3: Playwright installation and script wiring

The scripts were installed and runnable from `npm` commands.

### Working item 4: Snapshot pipeline

A Glassdoor snapshot run completed successfully enough to produce output under:

`automation/runs/2026-04-22/...`

The captured page inventory showed only:

- `sc.keyword`
- `sc.location`

This indicated that the browser was still on the Glassdoor community/search surface, not the actual profile/preferences page we wanted to automate.

### Working item 5: Manual Google-auth path definition

The correct auth pattern is now clear and documented:

- launch/attach to `Profile 17`
- user clicks `Login with Google`
- session persists in that profile
- later scripts attach to the same browser state

## Why Full Glassdoor Automation Was Not Finished

The session stopped before the final stable loop was completed.

Specifically:

- we had not yet captured the actual Glassdoor profile/preferences form
- we had not yet mapped real profile fields on that form
- the last launcher refactor was still being validated when the run was interrupted

So the blocker at the end of this chat was not strategy. It was finishing the Windows-specific Chrome attach/launch reliability work and then snapshotting the correct Glassdoor page.

## Detour That Happened During The Session

A UI bug on the website was reported mid-session.

Issue:

- the left-side hover/info card in the home glyph panel was clipped near the viewport edge

Action taken:

- adjusted layout in `src/app/page.tsx`
- moved the glyph panel inward
- moved the info card inward
- made overflow behavior explicit

Verification:

- ran lint on `src/app/page.tsx`

This was unrelated to Glassdoor automation but was fixed during the same chat.

## Files Touched During This Session

Automation-related:

- `automation/README.md`
- `automation/data/profile.master.template.json`
- `automation/sites/glassdoor.json`
- `automation/scripts/glassdoor-login.mjs`
- `automation/scripts/glassdoor-snapshot.mjs`
- `automation/scripts/glassdoor-profile-fill.mjs`
- `automation/scripts/lib/browser.mjs`
- `automation/scripts/lib/config.mjs`
- `automation/scripts/lib/fs.mjs`
- `automation/scripts/lib/logger.mjs`
- `automation/scripts/lib/prompt.mjs`
- `.gitignore`
- `package.json`

Detour/UI fix:

- `src/app/page.tsx`

## Current State At End Of Session

Completed:

- automation scaffold exists
- Glassdoor-specific config exists
- Playwright is installed
- correct Chrome profile was identified
- snapshot logging infrastructure exists
- at least one Glassdoor page inventory was captured

Partially completed:

- reusable attach/launch model for the real Chrome profile

Not completed:

- stable end-to-end login attach flow using the real `cryptoprism.io` profile
- snapshot of the actual Glassdoor profile/preferences page
- mapped Glassdoor profile-fill selectors
- any application submission flow

## Recommended Next Step

When resuming this task, continue in this order:

1. validate the final Windows Chrome launcher/attach path for `Profile 17`
2. open Glassdoor and complete `Login with Google` manually in that attached browser
3. navigate to the exact Glassdoor profile/preferences page
4. rerun snapshot on that target page
5. map selectors into `automation/sites/glassdoor.json`
6. run safe non-submit profile fill

## Summary

This session did not complete Glassdoor automation end-to-end, but it did establish the right architecture, create the code scaffold, identify the correct Chrome profile, prove snapshot/logging output, and narrow the remaining problem to reliable Windows launch/attach behavior plus correct target-page capture.
