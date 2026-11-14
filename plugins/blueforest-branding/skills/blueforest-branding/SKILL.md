---
name: blueforest-branding
description: |
  Apply the BlueForest Studios design system v4 "Frame" (logo, Saira type, three-surface color system, viewfinder marks, action language, imagery, components, motion) to web pages, app interfaces, and video motion graphics. Use when the user asks to 'brand it', 'apply BlueForest branding', mentions 'BlueForest style', 'BFS brand', 'our brand', or 'company branding' in the context of BlueForest projects. ALSO use proactively — without being asked — whenever building any BlueForest-facing HTML deliverable: pitch/proposal sites, landing pages, the website, system-building plans and overview pages, internal tools, dashboards. If the page represents BlueForest Studios, this skill applies by default.
---

# BlueForest Studios Design System v4 "Frame"

BlueForest Studios makes **video, websites, and marketing strategy** (three practices) from Raleigh, NC. The brand is seen through a camera: dark cinematic tops, bright working pages, viewfinder marks, and camera-display labels.

> **Tagline:** "Integrated Video Production" is **retired** (2026-10-05). Never use it. A new tagline is TBD; until then the logo stands alone, and the landing-page header kicker names the practices: `Video · Web · Marketing strategy — Raleigh, NC`.

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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v4.4.0/plugins/blueforest-branding/skills/blueforest-branding/assets/frame.css">
<script defer src="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v4.4.0/plugins/blueforest-branding/skills/blueforest-branding/assets/frame.js"></script>
```

- **Always pin the version tag** (`@v4.4.0`), never `@main`, so a later design change can't silently restyle a page that's already deployed.
- For self-contained single files, inline `assets/frame.css` and `assets/frame.js`.
- Add `&family=JetBrains+Mono:wght@400;600` to the font URL only when the page contains code.
- Page-specific CSS builds on `--bfs-*` tokens. **No raw hex in page CSS.**

## The rules

### 1 · Three surfaces
Every top-level section carries exactly one: `.bfs-light` (white, the default and **always the largest share**), `.bfs-mid` (cool gray `#EBEDEF`, for section breaks), or `.bfs-dark` (near-black `#141112`).
- **Dark starts the page** (nav + hero/title band) and closes it (footer). Use it in between only for a big title or image band on long pages. Never two dark sections in a row.
- **Dark ≤ 25% of page height, and never on a copy-heavy section.** Dark is for titles and imagery.
- Below the top, **alternate light ↔ mid** to mark chapters.
- **No tan, beige, cream or warm-gray backgrounds** anywhere: not as a surface, a card, a callout or page CSS. Ammon flagged the old warm mid (`#E9E7E4`) as beige on 2026-11-14; v4.4 made it cool gray. Neutral whites and grays plus the dark surface are the whole palette for backgrounds.
- Dark *images* may sit on light or mid sections (for example, the subtitle testimonial). Images don't count as surface.
- Verify with `BFS.audit()` in the console, or drop `<div data-bfs-audit></div>` into a draft. It reports the light/mid/dark split and flags violations.

### 2 · The header: one picture, three lines of text, centered
Every page opens with `.bfs-cine` (all three templates do). Decided with Ammon 2026-10-19 after text-only, left-stacked headers kept crowding the top of pages.
- **One image or graphic fills the header.** Source order is in `references/imagery.md` → "Header image": a frame from this project first. Never a placeholder, never text alone. Crop to the subject with `--focal` (`style="--focal:50% 12%"` keeps the top of the frame). The component sets the height (about half the viewport, 352–495px); don't resize it.
- **Two or three text items:** the `h1` and one summary line (one plain sentence, 12 words or fewer). A kicker (`.bfs-hud`, 4 words or fewer) is optional: add it only when it says something the `h1` doesn't. **One button** by default; a second only on landing pages, and never one that just scrolls to the next section.
- **Everything else goes in the corner readouts** (`.bfs-osd` `tl/tr/bl/br`): project code, date, client, owner, status. **Two by default, four at most**, a few words each. A readout that repeats the page (a video count beside the videos, a format the buttons already name) gets cut. They sit beside the viewfinder marks at 65% opacity. Wrap the tail of a long readout in `.bfs-m-hide` so phones show the short version.
- **Centered by default.** Use `.bfs-cine-left` or `.bfs-cine-right` only when the subject sits on one side of the frame and centered type would cover it.
- **Directly under the header, the content starts.** Never a summary band, never a row of two to four labeled text columns ("Who it's for · Why we build it · What's next"), never a stat row, whatever classes build it. Ammon retired the `.bfs-summary` band on 2026-11-14: it showed up on almost every page and only restated the header. Facts it used to hold go in the section they belong to (timeline and price in Investment, owner and next step in the closing block). Numbers stay in the section they describe. `BFS.audit()` warns on a header with no image and on any text-only band under it.

### 3 · Action language: a visitor always knows what a click does
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

### 4 · Viewfinder marks mean "this is the subject"
`.bfs-vf` draws four corner marks. They **lock on** to clickable media on hover, frame the hero and featured films, and frame what matters (callouts, the form panel). Don't put them on every box; that cheapens them.

### 5 · Type: Saira, one family
- Headings: weight 700, `font-stretch: 87.5%`, tight leading.
- Body: 17px at 100% width.
- HUD labels (`.bfs-hud`): 125% width, uppercase, tracked. Use them only where a camera would show data or a form would show a field label (timecodes, specs, status, metadata, section kickers). Never as decoration above every heading.
- Numbers are always Saira (tabular). Mono is for code only.
- Fluid scale: `--bfs-t-hud … --bfs-t-hero`. Never use fixed-px headings.

### 6 · Color
| Token | Hex | Use |
|---|---|---|
| `--bfs-blue` | `#009DDC` | BlueForest Blue (Pantone 299): primary buttons, marks, list ticks, one highlighted word in a hero headline |
| `--bfs-blue-text` | `#0077A8` | Blue for small text on light/mid (via `--bfs-accent`) |
| `--bfs-black` | `#141112` | Dark surface |
| `--bfs-ink` | `#231F20` | Brand dark: text on light, panels on dark |
| `--bfs-bone` | `#ECE9E6` | Text on dark |
| `--bfs-cool` | `#EBEDEF` | Mid surface (`--bfs-warm` is a deprecated alias for it) |
| `--bfs-silver` / `--bfs-grey` | `#B6B8BA` / `#5E6468` | Muted text on dark / light |
| `--bfs-tally` | `#DB3E26` | Brand red: **REC light, errors, and risks only.** Never a CTA, never decoration. |

Cream and ice from v3, and the v4.0–4.3 warm gray, are retired. No warm-tinted backgrounds.

### 7 · Logo
- **Size:** 56px tall in the nav (46px under 560px wide), 46px in the footer. Those are frame.css defaults from v4.4; never shrink them in page CSS. Ammon found the older 42px nav logo 20–40% too small.
- White variant on dark (nav, footer): `https://raw.githubusercontent.com/blueforest-studios/blueforest-branding/main/plugins/blueforest-branding/skills/blueforest-branding/assets/BlueForestStudios_logo_white.svg`
- Blue variant (`…_logo_blue.svg`) on light, only if a light nav is ever needed.
- Never distort, recolor, or `filter:` the logo; keep ≥16px clear space. The SVGs are tightly cropped, so size them with `height`.

### 8 · Page copy: plain sentences a client would say out loud
Added 2026-10-20 after Ammon flagged header and intro text that read like a list of adjectives.
- **Write complete sentences.** Every line has a subject and a verb. Write "Owners see a company they'd trust with their business", not "Warm, capable, trustworthy."
- **Name the reader and the outcome.** Say who the page is for and what changes for them. Use "you" and the client's name; use "we" for BlueForest.
- **Use concrete nouns and numbers:** the runtime, the date, the deliverable, the place. Cut words that could describe any company: *seamless, elevate, leverage, robust, cutting-edge, world-class, solutions, journey, unlock, empower*.
- **Keep it short and active.** Header sentence 12 words or fewer. Summary lines 20 words or fewer. Section intros two sentences at most. No "not X, but Y" constructions, no rhetorical questions, no em-dash chains.
- **Say each fact once.** If the header says it, the body expands on it rather than restating it.
- **Check before shipping:** read the header line and each section intro aloud. If it sounds like a brochure, or a client couldn't repeat it to a colleague, rewrite it. Copy Ammon sends as himself (emails, posts) follows the `ammon-voice` skill instead.

### 9 · Restraint: fewer elements, more room, even spacing
Added 2026-11-05 after three review rounds on a BlueGift page cut 25+ elements and widened the margins twice. The first draft of a page should already be the cut version.
- **Text budget.** Each section gets one heading and at most one short intro sentence. **No `.bfs-hud` kicker above section headings** unless it carries data (a timecode, a status, a field label); a kicker that restates the heading ("How to use them" over "3 easy steps") is noise. Callouts, asides and fine print each need a reason a reader would miss them.
- **One path per action.** Don't add a fallback link beside an embed that works (a "new tab" link under a booking widget), a second button that scrolls to the same place, or a nav link and a hero button and a footer link that all repeat one another on a short page.
- **Say it once, page-wide.** Rule 8's "say each fact once" applies across the whole page: the header, section intros, callouts and closing block. Before shipping, list every text element and cut anything that repeats another, explains the obvious, or tells the reader what they're about to read. Expect to delete about a third of a first draft.
- **Wide page margins.** The default gutter is `--bfs-pad: clamp(1.5rem, 9vw, 10rem)` (frame.css from v4.3.0). Never tighten it on reading pages. Body copy and notes sit in a centered column of at most ~46rem; closing and booking blocks at most ~62rem. Media grids keep their tight 6px gutters *inside* those margins: dense media, roomy page.
- **Matching padding.** The space above an element equals the space below it, from the same token. When a block sits alone in a section (a note, a quote, a form), the gap from the section edge to the block equals the gap from the block to the next item; use the section padding value (`clamp(2.75rem,5.5vw,4.5rem)`) for both rather than mixing a section pad with a `--bfs-space-8` margin. Rows of cards align their buttons at the bottom (`display:flex; flex-direction:column` + `margin-top:auto`) so uneven copy never puts actions at two heights.
- **Buttons look like buttons.** Primary actions on media cards (play, download) are `.bfs-btn` (outlined `.bfs-btn-line` for secondary), laid out in an even grid with one-line labels. `.bfs-act` text links are for inline secondary links only.

### 10 · Pictures over paragraphs
Added 2026-11-14: Ammon finds pages consistently carry more text and fewer graphics and images than he wants. Show it, then label it.
- **Every content section carries a visual** that does real work: a project frame or library still, a screenshot in `.bfs-browser`, an inline SVG diagram (flows, timelines, before/after, how the parts connect), a chart, a video tile, or a generated concept image (`references/imagery.md`). Icons and chips don't count.
- **Turn structure into graphics.** A sequence of steps becomes a flow diagram; a comparison becomes a two-picture split or a table; a schedule becomes a timeline; a list of parts becomes a labeled diagram. Write the diagram in inline SVG with `--bfs-*` tokens (blue for the path, ink/grey for boxes and labels, Saira text), at least 320px tall on desktop.
- **Text budget:** about 120 words per section (audit warns above 150) and 700 words for the whole page below the header (audit warns above). Captions and labels of 3–10 words beat paragraphs. Bullets are three to five short lines, not sentences joined by commas.
- **Picture share:** aim for pictures beside or behind 40% of the scroll below the header; `BFS.audit()` reports `pictureShare` and warns under 30%. Prefer splits (`.bfs-split`: picture one side, short copy the other) and full-width image bands over stacked text sections.
- **Long source documents** (design docs, plans, specs) become the picture-level version: the decisions, the flow, the parts, what happens next. The full detail stays in the source `.md` or Doc, linked once from the page. Don't transcribe every table and paragraph.

## Component quick reference
Layout `.bfs-wrap` `.bfs-section(-tight)` `.bfs-sh` `.bfs-split(-even)` `.bfs-grid(-2)` `.bfs-diagram` (`.bx` `.bx-on` `.ln` `text.sm`) `.bfs-doc` + `.bfs-toc` `.bfs-prose` ·
Top `.bfs-nav` `.bfs-cine(-left/-right)` `.bfs-m-hide` `.bfs-frame` `.bfs-osd.tl/.tr/.bl/.br` `.bfs-rec` `[data-tc]` `.bfs-play` · (`.bfs-hero` `.bfs-hero-head`: the v4.0 split hero, kept only for pages already built with it) ·
Media `.bfs-media` `.bfs-still` `.bfs-tag` `.bfs-pill` `.bfs-ttl` `.bfs-browser` `.bfs-reel` `.bfs-tile(.big/.wide/.full)` `.bfs-tabs[data-filter]` ·
Content `.bfs-metabar` `.bfs-cols` `.bfs-ticks` `.bfs-price` `.bfs-pick` `.bfs-new` `.bfs-table` `.bfs-when` `.bfs-num` `.bfs-subtitle` `.bfs-logos` ·
Planning `.bfs-stats` `.bfs-stat` (number-led pages only, never under the header) `.bfs-card` `.bfs-card-head` `.bfs-chip` `.bfs-st(-live/-done/-err)` `.bfs-callout(-warn)` `.bfs-checklist` ·
Actions `.bfs-btn-blue` `.bfs-btn-ink` `.bfs-btn-line` `.bfs-act` `.bfs-acts` · Close `.bfs-cta` `.bfs-form` `.bfs-field` `.bfs-footer`
Icons: `<svg class="bfs-icon"><use href="#bfs-play|bfs-arrow|bfs-ext"/></svg>` (sprite injected by frame.js). Other icons: inline Lucide (Iconify MCP, or `references/icons.md`).

## Anti-patterns — never
- ❌ "Integrated Video Production" anywhere.
- ❌ Generic "AI design" tropes: soft serif headlines, an italic accent word in every heading, cream "paper" backgrounds, mono `01 —` eyebrows on every section, pill-shaped everything.
- ❌ Cramped pages: thin side gutters, blocks crowding the edges, unequal space above and below a block. Frame is dense *inside* (6px image gutters, metadata in corner readouts, ruled columns instead of floating cards) and roomy *around* (wide page margins, rule 9).
- ❌ Element pile-ups: a kicker over every heading, any summary band or labeled text columns under the header, a header with more than one line of text and two buttons, duplicate links to the same place, closing paragraphs that restate the page.
- ❌ Text-only headers; a left-stacked eyebrow + headline + paragraph + chip row; a stat row or metadata bar directly under the header.
- ❌ Ambiguous clickables: an image with no tag, no pill, or no text-link fallback; a video and a page link that look the same.
- ❌ Text-heavy pages: sections of paragraphs with no picture, lists that should be a diagram, a design doc transcribed onto the page (rule 10).
- ❌ Tan, beige, cream or warm-gray backgrounds; a nav logo smaller than 56px.
- ❌ Dark sections holding long copy; dark above 25%; two dark sections in a row; mid larger than light.
- ❌ Colored left/top border strips on cards; status shown as card color (use `.bfs-st`).
- ❌ Red as a button or decoration. Gradients on buttons or surfaces (the only gradients are the legibility shades over images).
- ❌ Raw hex in page CSS; `@main` stylesheet links on deployed pages; `filter` hacks on the logo.
- ❌ Adjective-stack copy ("Warm, capable, trustworthy."), filler words from rule 8, the same fact repeated in header and body.
- ❌ Shipping with `REPLACE` markers or `picsum.photos` placeholders.

## Workflow
1. Pick the page type and read its reference.
2. Copy the template; fill content; delete what doesn't apply.
3. Imagery: real frames first, then the library, then client assets; generate with `scripts/imagegen.sh` (ChatGPT plan via Codex) only for concepts, moods and backgrounds (`references/imagery.md`).
4. Do the rule 9 cut pass: list every text element and button, and delete repeats and extras before showing the page. Then the rule 10 pass: every section has a working visual, and anything that reads as a list or a sequence is a diagram.
5. Serve over http:// and check in the browser: `BFS.audit()` passes with no warnings (no text band under the header, pictureShare ≥ 30 and ideally 40, words ≤ 700, no section over 150 words), the side gutters match rule 9, above/below spacing on standalone blocks measures equal (`getBoundingClientRect`, within 2px), card buttons line up, no horizontal scroll at 375px, hover states show tag, pill, and marks, header and section copy pass the rule 8 read-aloud check, and `grep -c REPLACE` returns 0.
6. Reviewable pages embed the `?review` overlay (`~/.claude/rules/frontend.md`).

## Legacy (v3)
Pages built before 2026-10-05 link `assets/tokens.css` (and `ui.css` for apps), using Poppins, cream/ice, and pill buttons. **Leave them on v3 when editing**; don't mix v3 and v4 classes on one page. Migrate a page to v4 only when asked. App/dashboard UI still uses the v3 `ui.css` component layer until a v4 UI subset ships. v3 page rules are kept in `references/legacy/`.
