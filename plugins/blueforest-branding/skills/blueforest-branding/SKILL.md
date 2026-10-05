---
name: blueforest-branding
description: |
  Apply the BlueForest Studios design system v4 "Frame" (logo, Saira type, three-surface color system, viewfinder marks, action language, imagery, components, motion) to web pages, app interfaces, and video motion graphics. Use when the user asks to 'brand it', 'apply BlueForest branding', mentions 'BlueForest style', 'BFS brand', 'our brand', or 'company branding' in the context of BlueForest projects. ALSO use proactively — without being asked — whenever building any BlueForest-facing HTML deliverable: pitch/proposal sites, landing pages, the website, system-building plans and overview pages, internal tools, dashboards. If the page represents BlueForest Studios, this skill applies by default.
---

# BlueForest Studios Design System v4 "Frame"

BlueForest Studios makes **video, websites, and marketing strategy** (three practices) from Raleigh, NC. The brand is seen through a camera: dark cinematic tops, bright working pages, viewfinder marks, and camera-display labels.

> **Tagline:** "Integrated Video Production" is **retired** (2026-10-05). Never use it. A new tagline is TBD; until then the logo stands alone, and hero eyebrows name the practices: `Video · Web · Marketing strategy — Raleigh, NC`.

## Pick the page type first

| Building… | Start from | Read |
|---|---|---|
| Client proposal / pitch site | `templates/pitch.html` | `references/pitch-sites.md` |
| Landing page, website page, product/practice page | `templates/landing.html` | `references/landing-pages.md` |
| System plan, project/campaign plan, overview page, weekly review | `templates/plan.html` | `references/planning-sites.md` |
| Any page with photos | — | `references/imagery.md` (library first) |
| App / dashboard / internal tool UI | — | `references/ui-design.md` (still v3 components; see "Legacy" below) |
| Video motion graphics (logo stings, lower thirds) | — | `references/motion-graphics.md` |

Copy the template, fill every `REPLACE`, and delete sections that don't apply. Don't rebuild structure from scratch.

## Stylesheet + runtime

```html
<link href="https://fonts.googleapis.com/css2?family=Saira:wdth,wght@50..125,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v4.0.0/plugins/blueforest-branding/skills/blueforest-branding/assets/frame.css">
<script defer src="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v4.0.0/plugins/blueforest-branding/skills/blueforest-branding/assets/frame.js"></script>
```

- **Always pin the version tag** (`@v4.0.0`), never `@main`, so a later design change can't silently restyle a page that's already deployed.
- For self-contained single files, inline `assets/frame.css` and `assets/frame.js`.
- Add `&family=JetBrains+Mono:wght@400;600` to the font URL only when the page contains code.
- Page-specific CSS builds on `--bfs-*` tokens. **No raw hex in page CSS.**

## The rules

### 1 · Three surfaces
Every top-level section carries exactly one: `.bfs-light` (white, the default and **always the largest share**), `.bfs-mid` (warm gray `#E9E7E4`, for section breaks), or `.bfs-dark` (near-black `#141112`).
- **Dark starts the page** (nav + hero/title band) and closes it (footer). Use it in between only for a big title or image band on long pages. Never two dark sections in a row.
- **Dark ≤ 25% of page height, and never on a copy-heavy section.** Dark is for titles and imagery.
- Below the top, **alternate light ↔ mid** to mark chapters.
- Dark *images* may sit on light or mid sections (for example, the subtitle testimonial). Images don't count as surface.
- Verify with `BFS.audit()` in the console, or drop `<div data-bfs-audit></div>` into a draft. It reports the light/mid/dark split and flags violations.

### 2 · Action language: a visitor always knows what a click does
| Signal | Means | Markup |
|---|---|---|
| ▶ | Plays a video **in the on-page player** | `<button class="bfs-media bfs-vf" data-play data-src data-title [data-href]>` |
| → | Opens **another page on our site** | `<a class="bfs-media bfs-vf" href>` / `.bfs-act` with the `bfs-arrow` icon |
| ↗ | **Leaves our site** (text link only, new tab) | `.bfs-act` with the `bfs-ext` icon, `target="_blank" rel="noopener"` |
- Clickable images show a **type tag** at all times (`.bfs-tag`: `▶ 2:14` / `Website` / `Strategy`) and a **hover pill** naming the action (`.bfs-pill`).
- Every action is **repeated as a text link** (`.bfs-acts`) so it works on touch screens.
- Websites always sit in `.bfs-browser` chrome.
- The only playhead is the player's scrub bar. No auto-moving or hover-scrub mechanics.
- `data-src` is an mp4/webm URL (native `<video>`) or an embed URL (Frame.io, YouTube, and so on, in an `<iframe>`). `frame.js` builds the player.

### 3 · Viewfinder marks mean "this is the subject"
`.bfs-vf` draws four corner marks. They **lock on** to clickable media on hover, frame the hero and featured films, and frame what matters (callouts, the form panel). Don't put them on every box; that cheapens them.

### 4 · Type: Saira, one family
- Headings: weight 700, `font-stretch: 87.5%`, tight leading.
- Body: 17px at 100% width.
- HUD labels (`.bfs-hud`): 125% width, uppercase, tracked. Use them only where a camera would show data or a form would show a field label (timecodes, specs, status, metadata, section kickers). Never as decoration above every heading.
- Numbers are always Saira (tabular). Mono is for code only.
- Fluid scale: `--bfs-t-hud … --bfs-t-hero`. Never use fixed-px headings.

### 5 · Color
| Token | Hex | Use |
|---|---|---|
| `--bfs-blue` | `#009DDC` | BlueForest Blue (Pantone 299): primary buttons, marks, list ticks, one highlighted word in a hero headline |
| `--bfs-blue-text` | `#0077A8` | Blue for small text on light/mid (via `--bfs-accent`) |
| `--bfs-black` | `#141112` | Dark surface |
| `--bfs-ink` | `#231F20` | Brand dark: text on light, panels on dark |
| `--bfs-bone` | `#ECE9E6` | Text on dark |
| `--bfs-warm` | `#E9E7E4` | Mid surface |
| `--bfs-silver` / `--bfs-grey` | `#B6B8BA` / `#5E6468` | Muted text on dark / light |
| `--bfs-tally` | `#DB3E26` | Brand red: **REC light, errors, and risks only.** Never a CTA, never decoration. |

Cream and ice from v3 are retired on v4 pages.

### 6 · Logo
- White variant on dark (nav, footer): `https://raw.githubusercontent.com/blueforest-studios/blueforest-branding/main/plugins/blueforest-branding/skills/blueforest-branding/assets/BlueForestStudios_logo_white.svg`
- Blue variant (`…_logo_blue.svg`) on light, only if a light nav is ever needed.
- Never distort, recolor, or `filter:` the logo; keep ≥16px clear space. The SVGs are tightly cropped, so size them with `height`.

## Component quick reference
Layout `.bfs-wrap` `.bfs-section(-tight)` `.bfs-sh` `.bfs-split(-even)` `.bfs-grid(-2)` `.bfs-doc` + `.bfs-toc` `.bfs-prose` ·
Top `.bfs-nav` `.bfs-hero` `.bfs-hero-head` `.bfs-frame` `.bfs-osd.tl/.tr/.bl/.br` `.bfs-rec` `[data-tc]` `.bfs-play` ·
Media `.bfs-media` `.bfs-still` `.bfs-tag` `.bfs-pill` `.bfs-ttl` `.bfs-browser` `.bfs-reel` `.bfs-tile(.big/.wide/.full)` `.bfs-tabs[data-filter]` ·
Content `.bfs-metabar` `.bfs-cols` `.bfs-ticks` `.bfs-price` `.bfs-pick` `.bfs-new` `.bfs-table` `.bfs-when` `.bfs-num` `.bfs-subtitle` `.bfs-logos` ·
Planning `.bfs-stats` `.bfs-stat` `.bfs-card` `.bfs-card-head` `.bfs-chip` `.bfs-st(-live/-done/-err)` `.bfs-callout(-warn)` `.bfs-checklist` ·
Actions `.bfs-btn-blue` `.bfs-btn-ink` `.bfs-btn-line` `.bfs-act` `.bfs-acts` · Close `.bfs-cta` `.bfs-form` `.bfs-field` `.bfs-footer`
Icons: `<svg class="bfs-icon"><use href="#bfs-play|bfs-arrow|bfs-ext"/></svg>` (sprite injected by frame.js). Other icons: inline Lucide (Iconify MCP, or `references/icons.md`).

## Anti-patterns — never
- ❌ "Integrated Video Production" anywhere.
- ❌ Generic "AI design" tropes: soft serif headlines, an italic accent word in every heading, cream "paper" backgrounds, mono `01 —` eyebrows on every section, pill-shaped everything.
- ❌ Airy, half-empty layouts. Frame is dense: 6px image gutters, metadata bars instead of standalone stat sections, ruled columns instead of floating cards.
- ❌ Ambiguous clickables: an image with no tag, no pill, or no text-link fallback; a video and a page link that look the same.
- ❌ Dark sections holding long copy; dark above 25%; two dark sections in a row; mid larger than light.
- ❌ Colored left/top border strips on cards; status shown as card color (use `.bfs-st`).
- ❌ Red as a button or decoration. Gradients on buttons or surfaces (the only gradients are the legibility shades over images).
- ❌ Raw hex in page CSS; `@main` stylesheet links on deployed pages; `filter` hacks on the logo.
- ❌ Shipping with `REPLACE` markers or `picsum.photos` placeholders.

## Workflow
1. Pick the page type and read its reference.
2. Copy the template; fill content; delete what doesn't apply.
3. Imagery: library first (`references/imagery.md`).
4. Serve over http:// and check in the browser: `BFS.audit()` passes, no horizontal scroll at 375px, hover states show tag, pill, and marks, and `grep -c REPLACE` returns 0.
5. Reviewable pages embed the `?review` overlay (`~/.claude/rules/frontend.md`).

## Legacy (v3)
Pages built before 2026-10-05 link `assets/tokens.css` (and `ui.css` for apps), using Poppins, cream/ice, and pill buttons. **Leave them on v3 when editing**; don't mix v3 and v4 classes on one page. Migrate a page to v4 only when asked. App/dashboard UI still uses the v3 `ui.css` component layer until a v4 UI subset ships. v3 page rules are kept in `references/legacy/`.
