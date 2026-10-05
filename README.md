# BlueForest Branding — Design System v4 "Frame" & Claude Code Plugin

The BlueForest Studios brand as a portable design system: one stylesheet (`frame.css`), one small runtime (`frame.js`), three page templates, and a Claude skill that knows how to use them.

## The design system (works anywhere)

```html
<link href="https://fonts.googleapis.com/css2?family=Saira:wdth,wght@50..125,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v4.0.0/plugins/blueforest-branding/skills/blueforest-branding/assets/frame.css">
<script defer src="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v4.0.0/plugins/blueforest-branding/skills/blueforest-branding/assets/frame.js"></script>
```

Always link a **version tag**, never `@main`, so deployed pages don't change under you.

- Three surfaces (`.bfs-light` / `.bfs-mid` / `.bfs-dark`): dark at the top, ≤25% of the page; `BFS.audit()` checks it.
- Action language: ▶ plays in the on-page player · → internal page · ↗ external.
- Viewfinder marks (`.bfs-vf`), camera-display labels (`.bfs-hud`), Saira throughout.

Templates: [`pitch.html`](plugins/blueforest-branding/skills/blueforest-branding/templates/pitch.html) (proposals) · [`landing.html`](plugins/blueforest-branding/skills/blueforest-branding/templates/landing.html) (website / landing pages) · [`plan.html`](plugins/blueforest-branding/skills/blueforest-branding/templates/plan.html) (system and project plans).

## The skill

[`SKILL.md`](plugins/blueforest-branding/skills/blueforest-branding/SKILL.md) routes by page type and loads the matching reference: `pitch-sites.md`, `landing-pages.md`, `planning-sites.md`, `imagery.md`, plus `motion-graphics.md`, `ui-design.md` (app UI, still v3), and `icons.md`.

### v3 (legacy)
`assets/tokens.css` + `assets/ui.css` (Poppins, cream/ice, pill buttons) stay published at their old URLs so pages built before v4 keep working. Don't mix v3 and v4 on one page.

## Install

### Claude Code (plugin)

```bash
claude plugins add github:blueforest-studios/blueforest-branding
```

Optional but recommended — the Iconify MCP for icon search:

```bash
npm install -g iconify-mcp
claude mcp add iconify --scope user -- iconify-mcp
```

### claude.ai (skill upload)

Zip the skill folder and upload it under Settings → Capabilities → Skills:

```bash
cd plugins/blueforest-branding/skills && zip -r blueforest-branding.zip blueforest-branding
```

The skill is self-contained (tokens.css, references, and icon fallbacks travel with it), so it works without any MCP servers.

### Any other tool

Just link `tokens.css` (above) and hand the tool `SKILL.md` as design guidance.

## Usage

Natural language: "brand it", "apply BlueForest branding", "make this match the BFS brand". In Claude Code: `/blueforest-branding`.

## Brand quick reference

Font: **Diavlo** (print) / **Poppins** (web) / **JetBrains Mono** (code).

| Name | Hex | Usage |
|------|-----|-------|
| BlueForest Blue | `#009DDC` | Primary — links, headings, primary buttons |
| Dark | `#231F20` | Body text, dark sections |
| Silver | `#B6B8BA` | Borders, muted text |
| Vibrant Day Lily | `#DB3E26` | Marketing: the one CTA · Technical: errors only |
| French Grey | `#6C7B81` | Secondary text |
| Toasted Oatmeal | `#EFE6D8` | Warm backgrounds |
| Icy Waterfall | `#D8E0E4` | Cool backgrounds, borders |

All values live in `tokens.css` as `--bfs-*` custom properties — never hardcode hex in branded output.
