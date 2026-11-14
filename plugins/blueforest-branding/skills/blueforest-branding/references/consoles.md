# Consoles (v5 "Glow")

Dashboards, internal tools and app screens. The model is the **Blair Console**: a white top bar, a pale sidebar, and white cards on a white page. People open a console many times a day to read numbers and act, so it is calmer than a marketing page: no smooth scrolling, no lit field, no section surfaces.

**Start from `templates/console.html`.** Self-contained consoles (like Blair) inline `glow.css` and `glow.js`. Never put real business figures in a static file.

## Shell

| Part | Class | Rules |
|---|---|---|
| Grid | `.bfs-con` | Top bar over a 264px sidebar and the main area. The sidebar hides under 760px. |
| Top bar | `.bfs-con-top` | 57px, sticky. Logo (32px), console name with a one-line caption (`.ttl`), spacer (`.sp`), a freshness note (`.fresh`), the signed-in initials (`.me`). |
| Sidebar | `.bfs-con-side` | Pale. 17px Lucide icons (stroke 1.8) with a label. The current page is a **tinted pill** (`aria-current`), never a border. Counts that need attention sit in `<i>`. Group with `<h2>` labels past six links. |
| Main | `.bfs-con-main` | One inner `<div>`, max 1180px. It fades up 6px over 0.35s when the view changes. |
| Page header | `.bfs-con-h` | One `h1`, one line of context under it, controls on the right (`.bfs-seg` for ranges). |

## Components

- **KPI tiles** (`.bfs-kpis` > `.bfs-kpi`): four at most. A 13px label (`.lab`), the value (`.val`, with `data-count` so it counts up once), then a delta chip with context (`.sub` + `.bfs-delta`, `.bad` for bad news) or a goal meter (`.bfs-meter`, `--v` is the percent).
- **Panels** (`.bfs-panel`): white, 1px line, 16px corners, soft shadow. Header (`.bfs-panel-h`) is a 14px/600 title and a small muted caption; body is `.bfs-panel-b`. Two panels side by side use `.bfs-cols`.
- **Tables** (`.bfs-table`): pale uppercase header row, 1px row lines, pale hover. Numbers right-aligned in mono (`.num`). Wrap wide tables in `.bfs-table-scroll`.
- **Status** is a badge (`.bfs-badge` + `.done`, `.live`, `.wait`, `.err`), never a card border or a colored row.
- **Project codes** are chips (`.bfs-code` + `.vid`, `.sys`, `.mkt`). The Division color always appears with its three-letter code.
- **Charts** are hand-written inline SVG (`.bfs-chart`): hairline axes (`.ax`), one blue line (`.ln`, draws once), a soft area under it (`.ar`), a dashed goal (`.goal`), 11px labels. No chart library. Give every chart an `aria-label` that states what it shows, its range and its goal.
- **Empty states**: a bold line and one muted sentence saying what will appear and how to make it appear.

## Rules

- **Blue is the action and the data color. Red is errors, overdue and risk only.** Amber is waiting, green is live.
- **Density:** 14px base text, 13px labels, 40px minimum hit area on anything clickable.
- **Motion:** the view fade, numbers counting once, the chart drawing once, meters growing once, 0.15s hovers. Nothing else moves. `prefers-reduced-motion` turns it off.
- **No color-only meaning** and WCAG AA contrast (4.5:1) on all text.
- A console page is not audited for word count or picture share (`BFS.audit()` returns `null`).
- The Blair Console still inlines the v3 stylesheets; it moves to these classes only when Ammon asks.
