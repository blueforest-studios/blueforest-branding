# BlueForest Branding — Design System & Claude Code Plugin

The BlueForest Studios brand identity as a portable design system: a real stylesheet (`tokens.css`) plus a Claude skill that knows how to apply it.

## The design system (works anywhere)

The complete brand CSS — tokens, buttons, cards, badges, tables, dark scope — is one stylesheet. Link it from any HTML page or tool:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@main/plugins/blueforest-branding/skills/blueforest-branding/assets/tokens.css">
```

For app/product UI, add the component layer (forms, app shell, tabs, modals, toasts, tables, loading/empty states):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/blueforest-studios/blueforest-branding@main/plugins/blueforest-branding/skills/blueforest-branding/assets/ui.css">
```

Source: [`assets/tokens.css`](plugins/blueforest-branding/skills/blueforest-branding/assets/tokens.css) · [`assets/ui.css`](plugins/blueforest-branding/skills/blueforest-branding/assets/ui.css)

## The skill

The skill ([`SKILL.md`](plugins/blueforest-branding/skills/blueforest-branding/SKILL.md)) applies the system across four subsets — marketing pages, technical pages, app UI, and video motion graphics. References load on demand:

- `references/marketing-sites.md` — landing/portfolio register (warm, spacious, red = the one CTA)
- `references/technical-sites.md` — docs/dashboard register (cool, dense, red = errors only)
- `references/ui-design.md` — app/dashboard UI rules + a self-contained style prompt block for claude.ai/design and tools that can't link CSS
- `references/motion-graphics.md` — video motion spec: approved logo entrances, the Word Rise lower third, motion language (easing/springs/timings), and text readability standards
- `references/icons.md` — 12 inline Lucide icons for environments without the Iconify MCP

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
