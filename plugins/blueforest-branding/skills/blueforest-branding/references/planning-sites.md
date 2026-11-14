# System plans and overview pages (v5 "Glow")

Internal pages generated from a markdown plan: system designs (SYS-* projects), project and campaign plans, creative briefs, onboarding plans, weekly reviews. Readers scan them for how it works, where it stands, and what needs a decision. The `overview-site` skill produces these and uses this reference for the look.

**Start from `templates/plan.html`.** The markdown stays the source of truth; regenerate the HTML from it under the same filename.

## Structure

| Block | Surface | Component |
|---|---|---|
| Nav | pale | Logo, three in-page links, the project code as a `.bfs-code` chip |
| Header | picture | `.bfs-phead`: one frame or screenshot, the name (`h1[data-words]`), one sentence of 12 words or fewer, one `.bfs-meta` line (status · date · what it waits on) |
| How it works | white | `.bfs-two`: heading + two sentences + a `.bfs-more` on the left, a `.bfs-diagram` on the right |
| Roadmap | pale | `.bfs-two`: `.bfs-prog` meter + `.bfs-checklist` on the left; a screenshot and a `.bfs-callout.risk` on the right |
| Decisions / parts | white | `.bfs-panel` holding a `.bfs-table`, status in `.bfs-badge` |
| Footer | pale | Project code · source `.md` path |

Sections alternate white and pale. **Plans never use night, blue or slate bands, and never the lit field.** The only dark area is the header picture.

## House style

- **The roadmap mirrors the project's `## Roadmap` checklist** in its CLAUDE.md. Done steps get `class="on"`; the next step is bold and names its owner. The heading states the count ("Four of nine steps are done.").
- **Status is a badge:** `.done` (blue), `.live` (green), `.wait` (amber), `.err` (red). Never a colored card border.
- **Risks** are `.bfs-callout.risk`: a red label, then the risk and what we do about it in one or two sentences.
- **Numbers and codes** are JetBrains Mono inside tables (`.num`, `.bfs-code`); everything else is Poppins.
- **One diagram per section at most.** Draw it as inline SVG with `.bx` boxes, one `.bx-on` for the subject, `.ln` lines (they draw themselves in) and `text.sm` captions. A sequence of steps a reader walks through is a `.bfs-flow` instead (SKILL.md rule 7).
- Always embed the review overlay (gated behind `?review`).

## Turning markdown into the page

**The page is the picture-level view** (SKILL.md rule 9): the decisions, the flow, the parts and what happens next, in about 700 visible words below the header.

- The markdown's opening paragraph becomes the header's one sentence.
- The main flow (weekly run, pipeline, user journey) becomes the first section's diagram.
- Task lists with status become the roadmap checklist. Lists of parts become a diagram or a table, not bullets.
- Tables stay tables. Dates, money and counts go in `.num` cells.
- Lines starting "Note", "Warning" or "Risk" become callouts. Every risk names a mitigation.
- Reasoning, source lists, edge cases and testing notes fold into `.bfs-more` under the visual they explain, one per topic, named for the topic (`Failure handling · 1 min`). Decisions, dates, prices and next steps stay open.
- **Numbers stay in the section they describe.** No stat row at the top.
