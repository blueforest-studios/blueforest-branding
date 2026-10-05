# Landing pages & marketing sites

Public pages that sell BlueForest's practices (Video, Web, Marketing strategy): the homepage, practice pages, campaign landing pages, and product pages (BlueCue, Blair for Business, and so on).

**Start from `templates/landing.html`.**

## Section order

| Section | Surface | Component |
|---|---|---|
| Nav + hero | dark | `.bfs-hero` + clickable `.bfs-frame` reel (REC, live `[data-tc]` timecode, "Play reel · m:ss" button) |
| Stats + clients | light | `.bfs-metabar` with a `.bfs-wide` client list |
| Work | light | `.bfs-reel` of `.bfs-tile`s + `.bfs-tabs[data-filter]` (All · Video · Web · Strategy) |
| Practices | mid | `.bfs-cols` ×3 with `.bfs-ticks` and a "Typical · n wks" HUD foot; `.bfs-new` on Web/Strategy |
| Process | light | `.bfs-split` + call-sheet `.bfs-table` |
| Proof | mid | `.bfs-subtitle` testimonial + `.bfs-logos` |
| Contact | light | `.bfs-cta` + `.bfs-form` |
| Footer | dark | logo · nav · © line |

Campaign landing pages can be shorter: hero, one proof section, and the form. Keep the dark top and footer, and run the audit.

## Work grid recipe

- Layout: one `.big` tile (4 columns × 2 rows) with two normal tiles beside it, then `.wide` tiles **in pairs**. Rows must stay full; no orphan gaps.
- **Every tile shows what it is** (`.bfs-tag`: `▶ 2:14`, `Website`, `Strategy`) and **what a click does** (`.bfs-pill`: "Play film", "View case study", "Read case study").
- Every action is repeated under the tile in `.bfs-acts` text links, so touch screens without hover still work.
- Video → `<button class="bfs-media bfs-vf" data-play data-src data-title data-href>`. Page → `<a class="bfs-media bfs-vf" href>`. Websites always sit in `.bfs-browser` chrome. External links are text-only `.bfs-act` with the ↗ icon and `target="_blank" rel="noopener"`.
- `data-type` on each tile can hold several values (`"video strategy"`) so it appears under more than one filter.

## Copy

The hero eyebrow names the practices (`Video · Web · Marketing strategy — Raleigh, NC`) until a new tagline exists. **Never use "Integrated Video Production"** (retired 2026-10-05). Write headlines about the client's outcome, not our gear.
