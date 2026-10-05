# Technical / Docs / Dashboards / Internal Tools

Cool, dense, scannable. The audience is Ammon and collaborators getting work done — clarity beats atmosphere.

## Register

- **Section rhythm**: white → `bfs-section-ice` → white. Cream sparingly (callouts only). Use `.bfs-section-tight` (`--bfs-space-16`) instead of full marketing padding.
- **Red = error/danger, exclusively.** Destructive buttons, failed states, `.bfs-badge-error`. Never a CTA color here.
- **Denser type**: body can drop to `--bfs-text-sm` in tables and sidebars; headings top out at `--bfs-text-3xl` — no hero scale.
- Load JetBrains Mono; all code, IDs, paths, and numeric data in `--bfs-font-mono`.

## Status system

Status is always a `.bfs-badge-*` pill — never a card border color, never a colored strip:

- `.bfs-badge-done` (blue tint) — complete/passing; pair with circle-check icon
- `.bfs-badge-active` (cream) — in progress/started
- `.bfs-badge-pending` (ice, bordered) — not started/queued
- `.bfs-badge-error` (red tint) — failed/blocked

Checklist/requirement cards (the "Standard Requirements" pattern): `.bfs-card` with a header row of `--bfs-text-2xl` number in `--bfs-font-mono` `--bfs-silver` + badge right-aligned, then title and description. The number and badge carry the state — the card chrome never does.

## Layout patterns

- **Dashboard stats**: `.bfs-card` with `--bfs-caption` label over a `--bfs-text-3xl` mono value. Trend arrows in blue (up) / grey (flat) / red (down).
- **Docs**: sticky sidebar nav (`--bfs-text-sm`, active item blue with `--bfs-blue-tint` background pill), content max-width 720px, `.bfs-table` for parameters, `pre` blocks for code.
- **Callouts**: tinted background + matching icon — info: `--bfs-blue-tint`; note: cream; warning: `--bfs-red-tint`. Background + icon only; no border accents.
- **Tables over cards** when data has more than 3 attributes per item.

## Dark mode (optional)

For dashboards used at night, apply `.bfs-dark` to `<body>` — semantic tokens flip automatically. Use the white logo, keep tinted accents (`--bfs-blue-tint` etc.) for badges/chips as-is.

## Copy tone

Terse and literal. Labels not sentences. Sentence case. Timestamps and counts in mono.
