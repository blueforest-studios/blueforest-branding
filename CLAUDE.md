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

## v4 "Frame" (2026-10-05)
Chosen from the brand-refresh rounds (`../brand-refresh-2026/`, direction C2). Ships as **new files** (`assets/frame.css`, `assets/frame.js`, `templates/{pitch,landing,plan}.html`, `references/{pitch-sites,landing-pages,planning-sites,imagery}.md`). v3 `tokens.css`/`ui.css` are untouched because ~22 existing pages link them via `@main`. v4 links are **pinned to `@v4.4.1`**: bump the tag (and SKILL.md/templates/README URLs) on every release. The "Integrated Video Production" tagline is retired. The stills library is a separate effort; client imagery must **never** enter this public repo.

## Status / What's Next
1. **Design-system build in claude.ai/design** — bring the skill's brand rules in as the foundation; add UI-design mode + motion-graphics mode. (The driving goal, 2026-07-08.)
2. **NotebookLM notebook (follow-up, deferred until the design system has real docs):** run the standard recipe — publish key docs as Google Docs into a Drive folder `"SYS-2026-016 BlueForest Design System — NotebookLM Sources"`, create the notebook as ammon@blueforeststudios.com named `"SYS-2026-016 — BlueForest Design System"`, generate Audio/Video overviews, then record the link in the dashboard's Notebook LM column **and** `registry.notebooklm_url` in Blair (the registry is the system of record). Recipe details: Blair repo → `docs/notebooklm-dashboard-feature.md`.
3. Consider a `design system` option for the dashboard's Type dropdown (row currently typed `skill`).

## v4.1 header (2026-10-19)
Every page opens with `.bfs-cine`: one image or graphic, kicker + h1 + one sentence, metadata in the four corner readouts, centered (`.bfs-cine-left/-right` when the subject sits to a side), crop via `--focal`. Directly under it a `.bfs-summary` band (retired in 4.4.0), never a stat row. `BFS.audit()` warns on a header without an image or a stat row under it. The old split `.bfs-hero` stays in frame.css for pages built on v4.0. Rule lives in SKILL.md rule 2; mockups that led to it: `../brand-refresh-2026/hero-2026-10/`.

4.1.1 (2026-10-20): SKILL.md rule 8 "Page copy" (plain complete sentences, no adjective stacks or filler words, read-aloud check); a four-line `.bfs-summary` goes 2×2 between 561 and 1100px instead of wrapping 3+1.

4.2.0 (2026-10-21): `scripts/imagegen.sh` generates images through Codex's built-in image tool on the ChatGPT plan (no API key). Rules in `references/imagery.md` → "Generated images": concepts, moods, backgrounds only, never presented as real BlueForest or client work. Plugin-only release: frame.css/js unchanged, so pages stay pinned to `@v4.3.1`.

4.3.0 (2026-11-05): SKILL.md rule 9 "Restraint" from three BlueGift page review rounds: a text budget (no kickers over section headings, one header button, two corner readouts, summary band only when it adds facts), one path per action, a page-wide cut pass, wider gutters (`--bfs-pad` now `clamp(1.5rem,9vw,10rem)` in frame.css), matching above/below padding, bottom-aligned card buttons. The "airy layouts" anti-pattern became "cramped pages" + "element pile-ups". Pages pinned to `@v4.1.1` keep the old gutter.

4.3.1 (2026-11-05): templates trimmed to rule 9. Pitch: no kicker, one header button, two readouts (client; code + date), no summary band, no section kickers, 15-minute call link. Landing: two readouts, no section kickers or "Practice N" labels, no duplicate discovery-call link, no padding-top overrides. Plan: two readouts, no summary band, one callout (risks), no section kicker. All three carry a `?review` overlay placeholder and hide its Enlarge button. frame.css: `.bfs-cols` stays one even row above 860px (the wider gutters made auto-fit wrap three columns to 2+1).

4.4.0 (2026-11-14): Ammon's notes on the CSB Job Radar design page. **Summary band retired**: nothing sits between the header and the content (no `.bfs-summary`, no labeled text columns, no stat row); `BFS.audit()` warns on any short text-only band under the header. The habit came from the `overview-site` skill, which told every plan page to add one (fixed there too). **New rule 10 "Pictures over paragraphs"**: every section carries a working visual, lists and sequences become diagrams, ≤120 words a section / ≤700 below the header, pictures beside 40% of the scroll (audit floor 30%); the audit reports `words`, `wordySections`, `pictureShare`. New `.bfs-diagram` (inline SVG flows drawn with tokens; the plan template opens with one). **Mid surface is cool gray `#EBEDEF`** (`--bfs-cool`; `--bfs-warm` kept as an alias) and the light card fill `#F5F6F7`: the warm gray read as beige. **Logo bigger**: nav 56px (was 42; 46px on phones, nav 88px tall), footer 46px (was 34). Pitch problem section and landing practice columns now lead with a still.

4.4.1 (2026-11-14): Ammon: extra text goes in collapsible sections. New `.bfs-more` (native `<details>`, closed by default, plus/× toggle, uppercase summary naming the topic + read time) sits under the visual it explains. Closed text isn't counted by the audit's word budget. Never fold the decision, a price, a date or the next step. Plan template carries one; `planning-sites.md` maps reasoning, source lists, edge cases, failure handling and testing notes to collapsibles.
