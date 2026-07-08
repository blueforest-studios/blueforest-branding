# BlueForest Design System v3 — Design

**Project code:** SYS-2026-016 (System Building Dashboard, row 3)
**Date:** 2026-07-08
**Status:** Approved by Ammon

## Goal

Upgrade the blueforest-branding skill (v2) from a brand spec into a full design
system with two new subsets: **UI design** and **video motion graphics**. Must
work in Claude Code (plugin), claude.ai/design (skill upload + inline style
prompt), and any tool (jsDelivr stylesheets).

## Approach (chosen: layer onto v2)

Three phases, no restructuring of what works. Existing v2 behavior — marketing
registers, tokens.css, card/badge/register rules — is untouched.

## Structure

```
skills/blueforest-branding/
├── SKILL.md                  ← router: core rules + subset picker
├── assets/
│   ├── tokens.css            ← core tokens + components (unchanged)
│   ├── ui.css                ← NEW: UI component layer (builds on tokens.css)
│   └── logo SVGs             ← unchanged
└── references/
    ├── marketing-sites.md    ← unchanged
    ├── technical-sites.md    ← unchanged
    ├── icons.md              ← unchanged
    ├── ui-design.md          ← NEW: UI subset rules + claude.ai/design guidance
    └── motion-graphics.md    ← NEW: video motion production spec (no CSS)
```

## Subset 1: UI design

- **assets/ui.css** — one component layer on top of tokens.css: form controls
  (inputs, selects, textareas, checkboxes/radios, labels, validation states),
  app shell (topbar, sidebar, tabs), modal + drawer, toasts/alerts, extended
  table states (sortable headers, row hover/selected), skeleton loaders,
  empty/loading/error state patterns. Tokens only — no new colors, no
  hardcoded hex.
- **Register:** UI defaults to the technical register (red = errors/danger
  only, cool neutrals, blue primary actions).
- **references/ui-design.md** — app-shell layout patterns, component usage,
  state handling, accessibility basics, plus a self-contained **style prompt
  block** (tokens written out inline) for claude.ai/design and any tool that
  can't link a stylesheet.

## Subset 2: Video motion graphics

- **references/motion-graphics.md** — a production spec, not CSS.
  Tool-agnostic (Resolve / After Effects / Remotion).
- **Gather step first:** Ammon's conventions are a mix of existing and new.
  He points at 1–3 representative videos/project files (logo sting, typical
  lower third, title card); established style gets codified, gaps get designed
  fresh from the brand guide and approved.
- **Spec covers:** (1) logo animation — in/out treatments, duration, blue vs
  white logo; (2) lower thirds — layout, colors, Diavlo, in/out timing in
  frames at common frame rates; (3) title cards & section breaks; (4) motion
  language — easing character, standard durations, banned moves (echoes the
  anti-pattern list); (5) technical — safe areas, minimum text sizes, hex +
  Rec.709 notes.

## Packaging, delivery, verification, tracking

- SKILL.md becomes a router: core brand rules stay; adds a subset picker
  (marketing page → registers; app/dashboard/tool → ui-design.md + ui.css;
  video work → motion-graphics.md).
- Plugin → v3.0.0, pushed to public GitHub; ui.css served via jsDelivr like
  tokens.css.
- claude.ai: re-zip + re-upload skill folder; the inline style prompt block
  covers claude.ai/design.
- Verification: showcase page exercising the new UI components, served
  locally, design-reviewed before shipping.
- Tracking: SYS-2026-016 on the System Building Dashboard; project CLAUDE.md
  and README updated at the end.

## Phases

1. **UI subset** — ui.css + ui-design.md + showcase; no external dependency,
   can start immediately.
2. **Motion subset** — gather Ammon's reference videos, codify + design,
   approve, write motion-graphics.md.
3. **Package & ship** — SKILL.md router, v3.0.0, GitHub push, claude.ai
   re-upload, docs + dashboard updates.
