# Planning & system-overview sites

Internal pages generated from a markdown plan: system designs (SYS-* projects), project plans, campaign plans, onboarding plans, and weekly reviews. Readers scan them for status and decisions. The `overview-site` skill produces these and uses this reference for the look.

**Start from `templates/plan.html`.** The markdown stays the source of truth; regenerate the HTML from it under the same filename.

## Structure

| Block | Surface | Component |
|---|---|---|
| Nav | dark | Logo + one overall `.bfs-st` status |
| Header | dark | `.bfs-cine`: a frame from the project (or a library still), kicker naming the page type (`System plan`, `Creative brief`, `Weekly review`), `h1`, one summary sentence. Two corner readouts: the code and the updated date (status sits in the nav chip). See SKILL.md rule 2. |
| Body | light | Starts directly under the header (no summary band, SKILL.md rule 2). `.bfs-doc` = sticky `.bfs-toc` + content, led by a `.bfs-diagram` of how it works: `.bfs-prose`, `.bfs-grid` of `.bfs-card`s, `.bfs-table`, `.bfs-callout`, `.bfs-checklist` |
| Decisions / next steps | mid | `.bfs-grid` of white `.bfs-card`s (cards automatically turn white on mid) |
| Footer | dark | Project code · source `.md` path |

Long copy always sits on **light**. Mid holds one short closing block. Dark is the header only, so these pages usually audit at 15–22% dark.

## House style (Ammon's standing preferences)

- **Numbers are Saira, never mono.** Mono (`JetBrains Mono`) is only for code, file paths, CLI commands, and literal IDs inside running text.
- **Every card opens with `.bfs-card-head`:** a `.bfs-chip` holding a 20px Lucide icon that names the concept, a one-line `h3`, and an optional right-aligned `.bfs-st` status. A title wrapping to two lines is a layout bug: widen the grid (`.bfs-grid-2`) rather than wrap.
- **Grid gaps are `--bfs-space-8`.** `h2` gets `--bfs-space-8` below it before a grid.
- **Callouts** (`.bfs-callout bfs-vf`) use the card fill, so they contrast on both light and mid. Info = blue corner marks; risk/warning = `.bfs-callout-warn` (tally-red marks). Every risk names a mitigation.
- **Status** is always a `.bfs-st` camera-state chip: `Standby` (default), `.bfs-st-live` (in progress), `.bfs-st-done`, `.bfs-st-err` (blocked). Never use a colored card border.
- Icons go on card headers, stats, callouts, and contact rows. Never on plain list items or body headings.
- Always embed the review overlay (gated behind `?review`).
- Backgrounds stay neutral: white, the cool-gray mid, dark. No beige, tan or cream card or callout fills in page CSS.

## Turning markdown into the page

**The page is the picture-level view** (SKILL.md rule 10). Show the decisions, the flow, the parts and what happens next, at most ~700 visible words below the header. Supporting detail folds into `.bfs-more` collapsibles; link the source `.md` once (footer) for the rest.

- The main flow (weekly run, pipeline, user journey) becomes a `.bfs-diagram` (inline SVG; the template's How it works figure). Steps, sources and tiers become labeled boxes, not numbered paragraphs.
- Each `##` section kept on the page carries a visual: a diagram, a screenshot, a project frame, or a generated concept image.
- Paragraphs a reader may still want (reasoning, full source lists, edge cases, failure handling, testing notes) go in `.bfs-more` collapsibles under the visual they explain, closed by default, one per topic. The summary names the topic (`Failure handling · 1 min`). Decisions, dates, prices and next steps stay open.

- `##` sections become `id`'d blocks listed in the TOC.
- Bulleted lists of things (components, workstreams) become a card grid with one-line bodies. Lists of steps become a diagram, or a `.bfs-checklist` when they're tasks with status.
- Tables stay tables (`.bfs-table`). Put dates in `.bfs-when` and money or numbers in `.bfs-num` cells.
- Lines starting with "Note", "Warning", "Risk", or "Insight" become callouts.
- **Numbers stay where they belong:** a runtime goes in the cut section, a budget in the budget table. Never promote them to a stat row at the top. A `.bfs-stats` row is only for pages that are about numbers (dashboards, weekly reviews), and never directly under the header.
- The markdown's opening paragraph becomes the header's one sentence. Purpose, audience and next steps don't get their own band under the header: the next step goes in the closing block, the rest is cut or lives in the .md.
