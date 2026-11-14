# BlueForest Branding — Design System v5 "Glow" & Claude Code Plugin

The BlueForest Studios brand as a portable design system: one stylesheet (`glow.css`), one small runtime (`glow.js`), three page templates, and a Claude skill that knows how to use them.

## The design system (works anywhere)

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v5.0.0/plugins/blueforest-branding/skills/blueforest-branding/assets/glow.css">
<script defer src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@v5.0.0/plugins/blueforest-branding/skills/blueforest-branding/assets/glow.js"></script>
```

Always link a **version tag**, never `@main`, so deployed pages don't change under you.

- Five surfaces: pale and white for reading; night, blue and slate as feature bands. `BFS.audit()` checks the balance.
- The lit field (`canvas[data-field]`): dots in night sections light up under the pointer.
- Motion built in: smooth scrolling (Lenis), staggered reveals, rising headline words, rollover diagrams.
- Action language: ▶ plays in the on-page player · → internal page · ↗ external.

Templates: [`landing.html`](plugins/blueforest-branding/skills/blueforest-branding/templates/landing.html) (marketing sites) · [`plan.html`](plugins/blueforest-branding/skills/blueforest-branding/templates/plan.html) (system plans) · [`console.html`](plugins/blueforest-branding/skills/blueforest-branding/templates/console.html) (consoles and dashboards).

## The skill

[`SKILL.md`](plugins/blueforest-branding/skills/blueforest-branding/SKILL.md) routes by spec and loads the matching reference: `marketing-sites.md`, `planning-sites.md`, `consoles.md`, `imagery.md`, plus `motion-graphics.md` and `icons.md`.

### Earlier versions
- **v4 "Frame"** (`assets/frame.css` + `frame.js`, Saira, viewfinder marks) stays published at its `@v4.x` tags, so pages built on it keep working. Its templates and references are in `templates/legacy/` and `references/legacy/`. Pitch sites still use the v4 `templates/pitch.html`.
- **v3** (`assets/tokens.css` + `assets/ui.css`) stays at `@main` for pages built before v4.

Don't mix versions on one page.

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

The skill is self-contained (stylesheets, references, and icon fallbacks travel with it), so it works without any MCP servers.

### Any other tool

Link `glow.css` and `glow.js` (above) and hand the tool `SKILL.md` as design guidance.

## Usage

Natural language: "brand it", "apply BlueForest branding", "make this match the BFS brand". In Claude Code: `/blueforest-branding`.

## Brand quick reference

Font: **Diavlo** (print, logo) / **Poppins** (web) / **JetBrains Mono** (codes and figures).

| Name | Hex | Usage |
|------|-----|-------|
| BlueForest Blue | `#009DDC` | Primary buttons, the blue band, diagram lines |
| Blue text | `#0077A8` | Blue text on pale and white |
| Ink | `#231F20` | Text on pale and white |
| Grey | `#5B666B` | Body and muted text |
| Pale | `#F1F4F8` | Reading surface (with white) |
| Night | `#10171C` | Feature band with the lit field |
| Slate | `#4F5051` | Feature band for pictures |
| Red | `#DB3E26` | Errors and risks only |

All values live in `glow.css` as `--bfs-*` custom properties. Never hardcode hex in branded output.
