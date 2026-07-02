---
name: blueforest-branding
description: |
  Apply BlueForest Studios brand identity (logo, colors, fonts, icons) to HTML files and web designs. Use when the user asks to 'brand it', 'apply BlueForest branding', mentions 'BlueForest style', 'BFS brand', 'our brand', or 'company branding' in the context of BlueForest projects.
---

# BlueForest Studios Branding

Apply the BlueForest Studios brand identity to HTML and web designs. BlueForest Studios is a video production company — tagline: **Integrated Video Production**.

## Site type — pick a register first

Decide which kind of page this is, then read the matching reference file for layout, tone, and component guidance:

- **Marketing / landing / portfolio page** → read `references/marketing-sites.md`
- **Technical / docs / dashboard / internal tool** → read `references/technical-sites.md`

The single most important difference: **on marketing pages red means CTA (one per page); on technical pages red means error/danger only.**

## The design system stylesheet

The complete brand CSS (tokens + components) lives in `assets/tokens.css`. Two ways to use it:

**Option A — link it (default for deployed sites):**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ammonehrisman/blueforest-branding@main/plugins/blueforest-branding/skills/blueforest-branding/assets/tokens.css">
```

**Option B — inline it (for fully self-contained single-file deliverables):** read `assets/tokens.css` and paste it into the page's `<style>` tag.

Either way, **never redefine or hardcode brand values** — use the `--bfs-*` custom properties and `.bfs-*` component classes from the stylesheet. Page-specific CSS goes in its own `<style>` block and builds on the tokens (`var(--bfs-space-8)`, `var(--bfs-text-2xl)`, etc.), never on raw hex or magic pixel values.

### Quick token reference

- Colors: `--bfs-blue` `--bfs-dark` `--bfs-white` `--bfs-silver` `--bfs-red` `--bfs-grey` `--bfs-cream` `--bfs-ice`; derived: `--bfs-blue-hover`, `--bfs-blue-tint`, `--bfs-ice-soft`, `--bfs-cream-soft` (never hardcode hover/tint hex — they're `color-mix()` derived)
- Semantic: `--bfs-bg` `--bfs-text` `--bfs-text-muted` `--bfs-border` (flip automatically inside `.bfs-dark` scope)
- Type: fluid scale `--bfs-text-xs` → `--bfs-text-hero` (clamp-based; never fixed px headings)
- Spacing: `--bfs-space-1` → `--bfs-space-32` (4px base)
- Radius: `--bfs-radius-sm/md/lg/full`; Shadows: `--bfs-shadow-sm/md/lg`
- Components: `.bfs-container`, `.bfs-section` (+ `-cream`/`-ice`), `.bfs-grid`, `.bfs-btn` (+ `-primary`/`-secondary`/`-accent`), `.bfs-card`, `.bfs-card-tinted`, `.bfs-icon-chip`, `.bfs-badge` (+ `-done`/`-active`/`-pending`/`-error`), `.bfs-table`, `.bfs-logo`, `.bfs-dark`

## Typography

Brand font is **Diavlo** (print). On the web use **Poppins**; monospace is **JetBrains Mono** (technical pages only):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

Add `&family=JetBrains+Mono:wght@400;600` to the same URL when the page has code.

## Logo

Embed from the permanent URLs — never base64, never Read/Glob for local files:

- **Blue** (on white/cream/ice): `https://raw.githubusercontent.com/ammonehrisman/blueforest-branding/main/plugins/blueforest-branding/skills/blueforest-branding/assets/BlueForestStudios_logo_blue.svg`
- **White** (on `.bfs-dark` sections and photos): `https://raw.githubusercontent.com/ammonehrisman/blueforest-branding/main/plugins/blueforest-branding/skills/blueforest-branding/assets/BlueForestStudios_logo_white.svg`

```html
<img src="…logo_blue.svg" alt="BlueForest Studios" class="bfs-logo">
```

The SVGs have a tightly cropped `viewBox` — they render at the correct visual size with simple CSS sizing; do not add padding or scaling adjustments.

Placement: header top-left (`.bfs-logo`), hero centered (`.bfs-logo-hero`), footer (`.bfs-logo-footer`, white variant on dark). Always ≥16px clear space. Never distort, crop, or recolor — on dark backgrounds switch to the white variant, never CSS `filter: invert()`/`brightness()` hacks.

## Cards — the rules

Three approved variants, nothing else:

1. **`.bfs-card`** — white, 1px ice border + soft shadow together, 2rem padding. The default.
2. **`.bfs-card-tinted`** (add `.ice` for cool) — solid cream/ice background, no border, no shadow. Use on white sections for quiet feature grids.
3. **Feature card** — `.bfs-card` or `.bfs-card-tinted` opening with a `.bfs-icon-chip` (48px tinted square holding a 24px icon), then h3, then body text.

Status (done/in-progress/pending/error) is always a `.bfs-badge-*` pill inside the card — **never** encoded as a card border color.

## Anti-patterns — never do these

- ❌ **Colored top-border or left-border accent strips on cards** (`border-top: 3px solid …`). This is the #1 banned pattern. Use `.bfs-icon-chip` or `.bfs-badge` to add color instead.
- ❌ Shadow-only cards (no border) on white, or shadowed cards on tinted sections — tinted sections get `.bfs-card-tinted` or plain white-bordered cards.
- ❌ Hardcoded hex anywhere outside tokens.css — including hover states (`#0088c2` etc.); use the derived `-hover`/`-tint` variables.
- ❌ Pure black `#000` — dark is always `--bfs-dark`.
- ❌ Fixed-px heading sizes — use the fluid `--bfs-text-*` scale.
- ❌ Gradients on heroes or buttons — brand surfaces are flat; depth comes from tinted sections and soft shadows.
- ❌ Icon soup — an icon must carry meaning (nav, feature, status, contact). Never decorate every list item or heading.
- ❌ More than two font weights within one component.

## Icons

Preferred: **Iconify MCP** (`mcp__iconify__search-icons` → `get-icon-snippet` with `raw-svg`), sets `lucide` > `heroicons` > `tabler`. Embed inline, color via `currentColor`.

**No Iconify available** (claude.ai or other tools): use the 12 pre-fetched Lucide SVGs in `references/icons.md`, or hand-write simple 24×24 stroke SVGs matching Lucide style (`stroke-width="2"`, `stroke-linecap="round"`, `fill="none"`).

Sizes: 16–20px inline, 24px buttons/nav, 24px inside `.bfs-icon-chip`, 48–64px hero.

## Layout

Avoid long runs of full-width text. Content sections should pair text with a visual element — a stat callout, image, quote panel, or CSS visualization — using the `.bfs-split` utilities (`-60-40`/`-40-60` variants; they stack on mobile automatically). Docs-style prose is the exception: single column, max-width 720px.

## Workflow

1. Pick the register (marketing vs technical) and read the matching reference file.
2. Load fonts and the design system (link or inline `tokens.css`).
3. Build with `.bfs-*` components and tokens; page-specific CSS extends them.
4. Embed the correct logo variant(s).
5. Add icons where they carry meaning.
6. Include a simple inline SVG favicon in brand colors (legible at 16px).
7. Responsive by default: viewport meta, `.bfs-grid`, fluid type does the rest.

## Quality checklist

- [ ] tokens.css linked or inlined; zero hardcoded brand hex in page CSS
- [ ] Register chosen; red used correctly for it (CTA vs danger)
- [ ] Cards use an approved variant; **no colored border-accent strips anywhere**
- [ ] Status shown as badges, not border colors
- [ ] Correct logo variant per background; clear space respected
- [ ] Fluid type scale used for headings
- [ ] Sections alternate white / cream-soft / ice-soft; dark sections use `.bfs-dark` with white logo
- [ ] Text sections pair with visuals (`.bfs-split`); no full-width text walls
- [ ] Favicon present (inline SVG, brand colors)
- [ ] Responsive (viewport meta, grid, no horizontal scroll on mobile)
