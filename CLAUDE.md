# blueforest-branding — BlueForest Design System

> **Project ID: `SYS-2026-016`** (Blair registry + Streamtime job `[SYS-2026-016] BlueForest Design System` — log hours there; System Building Dashboard row exists). Registered 2026-07-08.

## Purpose
BlueForest Studios' brand identity skill, growing into the **full BlueForest design system**. Today: a Claude Code plugin/skill carrying colors, fonts, logo, and style rules for BlueForest-themed websites and internal web documents. Next: a proper design system built in **claude.ai/design**, extended with a **UI-design mode** (product/dashboard interfaces) and a **motion-graphics mode** (Remotion/video work). Skill and design system deliberately share this one repo so both stay in sync and update together.

## Layout
- `plugins/blueforest-branding/skills/blueforest-branding/` — the installable skill (SKILL.md + `assets/` logos + `references/`).
- `README.md` — marketplace/plugin readme.
- (planned) design-system source that syncs to the claude.ai/design project.

## Install / Update (any Mac)
```bash
claude plugin marketplace add blueforest-studios/blueforest-branding && claude plugin install blueforest-branding@blueforest-branding
claude plugin update blueforest-branding@blueforest-branding
```

## Conventions / decisions
- **Repo is deliberately PUBLIC** (Ammon, 2026-07-08): raw URLs must be fetchable from claude.ai/design and other web contexts without auth. Consequence: **no client work, credentials, or internal financials in this repo — ever.**
- Dashboard icon: swatch fan deck, `blueforest-icons/blueforest-branding.svg` (family style: black outline, one `#009FE0` accent).
- Blair is the system of record for the project registration; the System Building Dashboard row mirrors it.

## Status / What's Next
1. **Design-system build in claude.ai/design** — bring the skill's brand rules in as the foundation; add UI-design mode + motion-graphics mode. (The driving goal, 2026-07-08.)
2. **NotebookLM notebook (follow-up, deferred until the design system has real docs):** run the standard recipe — publish key docs as Google Docs into a Drive folder `"SYS-2026-016 BlueForest Design System — NotebookLM Sources"`, create the notebook as ammon@blueforeststudios.com named `"SYS-2026-016 — BlueForest Design System"`, generate Audio/Video overviews, then record the link in the dashboard's Notebook LM column **and** `registry.notebooklm_url` in Blair (the registry is the system of record). Recipe details: Blair repo → `docs/notebooklm-dashboard-feature.md`.
3. Consider a `design system` option for the dashboard's Type dropdown (row currently typed `skill`).
