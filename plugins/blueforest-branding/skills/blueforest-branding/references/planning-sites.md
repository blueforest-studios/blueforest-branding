# Planning & system-overview sites

Internal pages generated from a markdown plan: system designs (SYS-* projects), project plans, campaign plans, onboarding plans, and weekly reviews. Readers scan them for status and decisions. The `overview-site` skill produces these and uses this reference for the look.

**Start from `templates/plan.html`.** The markdown stays the source of truth; regenerate the HTML from it under the same filename.

## Structure

| Block | Surface | Component |
|---|---|---|
| Nav | dark | Logo + `System plan` HUD + one overall `.bfs-st` status |
| Title band | dark, **compact** (`.bfs-section-tight`) | HUD with project code + updated date, `h1` at `--bfs-t-2xl`, one-line lede, `.bfs-st` chips (owner, phase, target) |
| Key numbers | light | `.bfs-stats` of `.bfs-stat` cards |
| Body | light | `.bfs-doc` = sticky `.bfs-toc` + content: `.bfs-prose`, `.bfs-grid` of `.bfs-card`s, `.bfs-table`, `.bfs-callout`, `.bfs-checklist` |
| Decisions / next steps | mid | `.bfs-grid` of white `.bfs-card`s (cards automatically turn white on mid) |
| Footer | dark | Project code · source `.md` path |

Long copy always sits on **light**. Mid holds one short closing block. Dark is title only, so these pages usually audit at 15–20% dark.

## House style (Ammon's standing preferences)

- **Numbers are Saira, never mono.** Mono (`JetBrains Mono`) is only for code, file paths, CLI commands, and literal IDs inside running text.
- **Every card opens with `.bfs-card-head`:** a `.bfs-chip` holding a 20px Lucide icon that names the concept, a one-line `h3`, and an optional right-aligned `.bfs-st` status. A title wrapping to two lines is a layout bug: widen the grid (`.bfs-grid-2`) rather than wrap.
- **Grid gaps are `--bfs-space-8`.** `h2` gets `--bfs-space-8` below it before a grid.
- **Callouts** (`.bfs-callout bfs-vf`) use the card fill, so they contrast on both light and mid. Info = blue corner marks; risk/warning = `.bfs-callout-warn` (tally-red marks). Every risk names a mitigation.
- **Status** is always a `.bfs-st` camera-state chip: `Standby` (default), `.bfs-st-live` (in progress), `.bfs-st-done`, `.bfs-st-err` (blocked). Never use a colored card border.
- Icons go on card headers, stats, callouts, and contact rows. Never on plain list items or body headings.
- Always embed the review overlay (gated behind `?review`).

## Turning markdown into the page

- `##` sections become `id`'d blocks listed in the TOC.
- Bulleted lists of things (components, workstreams) become a card grid. Lists of steps become a `.bfs-checklist` or table.
- Tables stay tables (`.bfs-table`). Put dates in `.bfs-when` and money or numbers in `.bfs-num` cells.
- Lines starting with "Note", "Warning", "Risk", or "Insight" become callouts.
- Key numbers mentioned in the text get promoted to the `.bfs-stats` row at the top.
