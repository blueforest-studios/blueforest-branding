---
name: blueforest-branding
description: |
  Apply the BlueForest Studios design system v5 "Glow" (logo, Poppins type, pill buttons, five section surfaces, the lit field, smooth scrolling and motion polish, rollover diagrams, action language, imagery) to marketing sites, system plans, consoles, and video motion graphics. Use when the user asks to 'brand it', 'apply BlueForest branding', mentions 'BlueForest style', 'BFS brand', 'our brand', or 'company branding' in the context of BlueForest projects. ALSO use proactively — without being asked — whenever building any BlueForest-facing HTML deliverable: the website, landing pages, pitch/proposal sites, system-building plans and overview pages, internal tools, dashboards, consoles. If the page represents BlueForest Studios, this skill applies by default.
---

# BlueForest Studios Design System v5 "Glow"

BlueForest Studios makes **video, websites, and marketing strategy** from Raleigh, NC. The brand looks like blueforeststudios.com: Poppins, pill buttons, calm pale pages with blue, night and gray feature bands, and motion that feels finished. One unexpected thing: in the dark sections, a field of dots lights up under the pointer.

> **Tagline:** "Integrated Video Production" is **retired** (2026-10-05). Never use it. Until a new one exists the logo stands alone.

## Pick the spec first

Three specs share one stylesheet. Each has its own template and rulebook.

| Building… | Start from | Read |
|---|---|---|
| Website page, landing page, product or practice page | `templates/landing.html` | `references/marketing-sites.md` |
| System plan, project or campaign plan, overview page, creative brief, weekly review | `templates/plan.html` | `references/planning-sites.md` |
| Console, dashboard, internal tool, app UI | `templates/console.html` | `references/consoles.md` |
| Any page with photos | — | `references/imagery.md` (library first) |
| Client proposal / pitch site | `templates/pitch.html` (still v4 "Frame", see Legacy) | `references/pitch-sites.md` |
| Video motion graphics (logo stings, lower thirds) | — | `references/motion-graphics.md` |

Copy the template, fill every `REPLACE`, and delete sections that don't apply. Don't rebuild structure from scratch.

## Stylesheet + runtime

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v5.0.0/plugins/blueforest-branding/skills/blueforest-branding/assets/glow.css">
<script defer src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v5.0.0/plugins/blueforest-branding/skills/blueforest-branding/assets/glow.js"></script>
```

- **Always pin the version tag** (`@v5.0.0`), never `@main`, so a later change can't restyle a deployed page.
- Lenis (smooth scrolling) goes on marketing sites and plans. **Consoles don't load it.**
- Add `&family=JetBrains+Mono:wght@400;500;600` to the font URL for plans and consoles (codes, figures in tables).
- For self-contained single files, inline `assets/glow.css` and `assets/glow.js`.
- Sites with their own build (the Astro website) take the tokens, components and runtime from these two files rather than linking the CDN.
- Page-specific CSS builds on `--bfs-*` tokens. **No raw hex in page CSS.**

## The rules

### 1 · Five surfaces: two for reading, three for feature bands
Every top-level section carries one surface class.

| Class | Color | Use |
|---|---|---|
| `.bfs-s-pale` | `#F1F4F8` | Reading. Nav, hero, process, footer. |
| `.bfs-s-white` | `#FFFFFF` | Reading. Cards, tables, long copy. |
| `.bfs-s-night` | `#10171C` | Feature. Carries the lit field (rule 4): the intro or reel, and the close. |
| `.bfs-s-blue` | `#009DDC` | Feature. **One headline and one white button, nothing else.** White body text on blue fails contrast. Once per page. |
| `.bfs-s-slate` | `#4F5051` | Feature. Pictures: a stills row, a work grid, news. |

- **Pale and white together cover at least half the page**, and they hold all copy longer than two sentences.
- **Never two feature bands of the same color in a row.** A page uses each feature color at most twice.
- Marketing pages open pale and close night then pale (footer). Plans use only the picture header plus white and pale. Consoles have no page surfaces.
- **No tan, beige, cream or warm-gray backgrounds** anywhere.
- `BFS.audit()` reports each surface's share and warns on every rule above.

### 2 · The header carries one picture and three lines of text
- **Marketing hero** (`.bfs-hero`, pale): on the left a kicker, a headline of ten words or fewer, one sentence, and at most two buttons. On the right one real frame in a rounded `.bfs-shot` that zooms slowly. The kicker states a fact (category and place); it is the only kicker on the page.
- **Plan header** (`.bfs-phead`): one picture behind the name, one sentence of 12 words or fewer, and one quiet line of facts (`.bfs-meta`: status · date · what it waits on). Centered.
- **Never a placeholder, never text alone.** Source order is in `references/imagery.md`. Crop with `--focal`.
- **Directly under the header, the content starts.** No summary band, no row of labeled text columns, no stat row.

### 3 · Action language: a visitor always knows what a click does
| Signal | Means | Markup |
|---|---|---|
| ▶ | Plays a video **in the on-page player** | `<button class="bfs-shot bfs-media" data-play data-src>` or `<button class="bfs-link" data-play data-src>` |
| → | Opens **another page on our site** | `<a class="bfs-card">`, `.bfs-link`, or a button with `→` |
| ↗ | **Leaves our site** (text link only, new tab) | `.bfs-link` with `↗`, `target="_blank" rel="noopener"` |
- Clickable media shows a **tag** at all times (`.bfs-tag`: `▶ 2:14`) and a **pill** on hover naming the action (`.bfs-pill`).
- Every media action is **repeated as a text link** nearby, so it works on touch screens.
- `data-src` is an mp4/webm URL. `glow.js` builds the player (`BFS.play(src)`).
- Things that are not links never look like links: rollover diagrams keep the arrow cursor (rule 7).

### 4 · The lit field: the one unexpected element
`<canvas data-field>` as the first child of a `.bfs-field.bfs-s-night` section draws a grid of dots. A light follows the pointer, brightening the dots near it and pushing them apart. With no pointer, the light drifts slowly on its own.
- **Only in night sections, at most twice per page** (the intro and the close). Never behind long copy, never on consoles or plans.
- It is the brand's single surprise. Don't add a second pointer effect to a page: no cursor trails, no tilt cards, no parallax.
- Reduced-motion users get a still field.

### 5 · Motion: every page feels finished
All of this ships in `glow.css` and `glow.js`. Use the attributes; don't hand-roll animation.
- **Smooth scrolling** (Lenis, `lerp` 0.1) on marketing sites and plans.
- **Reveal** `[data-rv]`: rises 28px while fading in, 0.9s/1.2s, `cubic-bezier(.22,1,.36,1)`, 90ms stagger within a batch. Put it on each heading, paragraph, card and figure, not on whole sections.
- **Headline words** `[data-words]` on the `h1`: words rise out of a mask one after another.
- **Nav** `[data-nav]`: shrinks and gains a hairline once the page moves.
- **Hover**: cards lift 4px and their picture zooms to 1.04; link arrows slide 4px; the primary button leans toward the pointer (`[data-mag]`, one per section at most).
- **Numbers** `[data-count]` count up once. **Diagram lines** (`.ln`) and the process line draw once.
- **Easing is always `var(--ease)`.** Durations: hover 0.4–0.6s, reveals about 1s, nothing loops except the hero picture's slow zoom and the video halo.
- `prefers-reduced-motion` turns all of it off. Never animate layout on consoles beyond the 0.35s view fade.

### 6 · Type, color, buttons, logo
- **Poppins only.** Headlines 700 (`.bfs-h1`) and 600 (`.bfs-h2`, `.bfs-h3`) with tight tracking; body 400 at 1rem/1.6 in `--bfs-grey`. JetBrains Mono only for codes and figures in tables and consoles.
- **Buttons are pills, uppercase, tracked** (`.bfs-btn` + `-blue`, `-line`, `-white`). **Buttons and status badges are the only pills.** Cards, pictures, tags and inputs use 16px, 12px and 8px corners.
- Cards: white, 1px line, 16px corners, soft shadow (`.bfs-card`, `.bfs-panel`).

| Token | Hex | Use |
|---|---|---|
| `--bfs-blue` | `#009DDC` | Primary buttons, the blue band, lines in diagrams, meters |
| `--bfs-blue-deep` | `#0088C2` | Hover on blue |
| `--bfs-blue-text` | `#0077A8` | Blue text on pale and white (kicker, links) |
| `--bfs-sky` | `#7FD0F0` | Blue text on night; the lit field |
| `--bfs-ink` | `#231F20` | Text on pale and white |
| `--bfs-grey` | `#5B666B` | Body and muted text on pale and white |
| `--bfs-night` / `--bfs-slate` / `--bfs-pale` | `#10171C` / `#4F5051` / `#F1F4F8` | Surfaces (rule 1) |
| `--bfs-line` | `#E4E9EE` | Borders and table rules |
| `--bfs-red` | `#DB3E26` | **Errors and risks only.** Never a button, never decoration. |

- **Logo:** blue on pale and white, white on night, slate and blue. 56px tall in the nav (44px once it shrinks), 46px in the footer, 32px in a console top bar. Load it from `https://raw.githubusercontent.com/blueforest-studios/blueforest-branding/main/plugins/blueforest-branding/skills/blueforest-branding/assets/BlueForestStudios_logo_blue.svg` (or `…_logo_white.svg`). Never distort, recolor or `filter:` it.

### 7 · Diagrams answer the pointer
Added 2026-11-14 from Ammon's note on the process graphic.
- Any diagram with **three to seven named parts** (a process, a timeline, a parts list) uses `.bfs-flow`: rolling over a part lifts it onto a card, opens its dot into **one Lucide icon**, turns its title blue, and dims the other parts.
- **Nothing is hidden at rest.** Every word is readable without the pointer, and the icon only repeats what the label says.
- The cursor stays an arrow. A part that is also a link is a card (rule 3), not a flow stop.
- Touch screens show every icon all the time (`@media (hover:none)`, built in).
- One rollover diagram per page.

### 8 · Restraint: fewer elements, even spacing
- **Text budget.** Each section gets one heading and at most one short intro sentence. **One kicker per page** (the hero's). Callouts, asides and fine print each need a reason a reader would miss them.
- **One path per action.** No duplicate links to the same place, no second button that scrolls to the next section.
- **Say it once, page-wide.** Before shipping, list every text element and cut what repeats, explains the obvious, or announces what's coming. Expect to delete about a third of a first draft.
- **Matching padding.** Sections use the built-in `.bfs-section` padding; the space above a standalone block equals the space below it. Rows of cards align their links at the bottom (built in).
- Dense, not airy: content sits in a 1200px `.bfs-wrap`; pictures in a row use 1rem gutters.

### 9 · Pictures over paragraphs
- **Every content section carries a visual** that does real work: a project frame or library still, a video tile, a `.bfs-flow` or `.bfs-diagram`, a chart, a table. Icons alone don't count.
- **Turn structure into graphics.** Steps become a `.bfs-flow`; how parts connect becomes a `.bfs-diagram` (inline SVG: `.bx` boxes, one `.bx-on`, `.ln` lines); status becomes a `.bfs-checklist` with a meter; comparisons become a table.
- **Text budget:** about 120 words per section (audit warns above 150) and 700 words for the page below the header.
- **Picture share:** aim for pictures beside or behind 40% of the scroll below the header; the audit warns under 30%.
- **More text goes in a collapsible**: `<details class="bfs-more"><summary>Topic · n min</summary><div>…</div></details>`, closed by default, under the visual it explains. Never fold away a decision, a price, a date or the next step.

### 10 · Page copy: plain sentences with some character
- **Write complete sentences** a client would say out loud. Name the reader and the outcome. Use "you" for them and "we" for BlueForest.
- **Let a person speak.** One line per page may sound like Ammon ("I'm Ammon, the guy in the hard hat."). It must be true.
- **Concrete nouns and numbers.** Cut words that could describe any company: *seamless, elevate, leverage, robust, cutting-edge, world-class, solutions, journey, unlock, empower*.
- **Short and active.** Headline ten words or fewer, header sentence 12, section intros two sentences. No "not X, but Y", no rhetorical questions, no em-dash chains.
- **Say each fact once.** If it isn't authentic, it doesn't go on the page. Copy Ammon sends as himself follows the `ammon-voice` skill.

## Component quick reference
Layout `.bfs-wrap` `.bfs-section` `.bfs-head(.center)` `.bfs-split` `.bfs-two` `.bfs-cards` `.bfs-stills` ·
Type `.bfs-kicker` `.bfs-h1` `.bfs-h2` `.bfs-h3` `.bfs-lede` ·
Top `.bfs-nav[data-nav]` `.bfs-hero` `.bfs-hero-txt` `.bfs-phead` `.bfs-meta` ·
Media `.bfs-shot` (`--focal`) `.bfs-media` `.bfs-tag` `.bfs-pill` `.bfs-field` + `canvas[data-field]` ·
Content `.bfs-card` `.bfs-card-b` `.bfs-band` `.bfs-flow` (`.bfs-ico`, `--n`) `.bfs-diagram` (`.bx` `.bx-on` `.ln` `text.sm`) `.bfs-more` `.bfs-checklist` (`li.on`) `.bfs-prog` `.bfs-meter` (`--v`) `.bfs-callout(.risk)` `.bfs-table` (`.num`) `.bfs-table-scroll` `.bfs-panel` `.bfs-panel-h` `.bfs-panel-b` ·
Status `.bfs-badge(.done/.live/.wait/.err)` `.bfs-code(.vid/.sys/.mkt)` `.bfs-delta(.bad)` ·
Actions `.bfs-btn` `.bfs-btn-blue` `.bfs-btn-line` `.bfs-btn-white` `.bfs-btns` `.bfs-link` · Close `.bfs-cta` `.bfs-footer` ·
Console `.bfs-con` `.bfs-con-top` `.bfs-con-side` `.bfs-con-main` `.bfs-con-h` `.bfs-seg` `.bfs-kpis` `.bfs-kpi` `.bfs-cols` `.bfs-chart` ·
Attributes `data-rv` `data-words` `data-nav` `data-play` `data-src` `data-count` (`data-pre`, `data-suf`) `data-mag` `data-field` `data-no-lenis`

## Anti-patterns — never
- ❌ "Integrated Video Production" anywhere.
- ❌ Camera props from v4: viewfinder corner marks, live timecode, a REC light, corner readouts, call-sheet styling. Ammon found them gimmicky (2026-11-14).
- ❌ Generic "AI design" tropes: soft serif headlines, an italic accent word in every heading, cream "paper" backgrounds, mono `01 —` eyebrows, a small label over every heading, pills on things that aren't buttons or badges.
- ❌ A second pointer effect next to the lit field; the lit field outside night sections; animation that loops for attention.
- ❌ White paragraphs on the blue band; two feature bands of one color in a row; feature bands over half the page; long copy on night or slate.
- ❌ Text-only headers; a summary band, labeled columns or a stat row under the header.
- ❌ Ambiguous clickables: media with no tag, pill or text-link fallback; a rollover diagram that looks clickable.
- ❌ Text-heavy pages: sections with no picture, lists that should be a diagram, long detail left open instead of folded into `.bfs-more`.
- ❌ Colored left or top border strips on cards; status shown as card color (use `.bfs-badge`). Red as a button or decoration.
- ❌ Tan, beige, cream or warm-gray backgrounds; a nav logo under 56px.
- ❌ Raw hex in page CSS; `@main` stylesheet links on deployed pages; `filter` hacks on the logo.
- ❌ Adjective-stack copy, filler words from rule 10, the same fact repeated in header and body.
- ❌ Shipping with `REPLACE` markers or `picsum.photos` placeholders. Client imagery in this public repo.

## Workflow
1. Pick the spec and read its reference.
2. Copy the template; fill content; delete what doesn't apply.
3. Imagery: real frames first, then the library, then client assets; generate with `scripts/imagegen.sh` only for concepts, moods and backgrounds (`references/imagery.md`).
4. Do the rule 8 cut pass, then the rule 9 pass: every section has a working visual, and anything that reads as a list or sequence is a diagram.
5. Serve over http:// and check in the browser: `BFS.audit()` returns `ok: true` with no warnings, no horizontal scroll at 375px, the lit field follows the pointer, the rollover diagram shows its icons, hover states show tag and pill, the copy passes a read-aloud check, and `grep -c REPLACE` returns 0.
6. Reviewable pages embed the `?review` overlay (`~/.claude/rules/frontend.md`).

## Legacy
- **v4 "Frame"** (2026-10-05 to 2026-11-14): pages linking `assets/frame.css` at a `@v4.x` tag (Saira, viewfinder marks). **Leave them on v4 when editing**; migrate one to v5 only when asked. Its templates and references are in `templates/legacy/` and `references/legacy/`.
- **Pitch sites** still start from the v4 `templates/pitch.html` until a v5 pitch template ships. Don't mix v4 and v5 classes on one page.
- **v3** (before 2026-10-05): `assets/tokens.css` + `assets/ui.css` at `@main` (Poppins, cream/ice). The Blair Console still inlines these; it moves to v5 only when asked. Rules in `references/legacy/`.
