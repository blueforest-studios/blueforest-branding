# Marketing / Landing / Portfolio Pages

Warm, confident, spacious. The audience is prospective video-production clients — the page itself is evidence of BlueForest's visual craft.

## Register

- **Section rhythm**: white → `bfs-section-cream` → white → `bfs-section-ice` → `.bfs-dark` footer. Never two tinted sections adjacent.
- **Whitespace is the brand**: sections use `--bfs-space-24` block padding minimum; heroes `--bfs-space-32`. When in doubt, add space.
- **Red = CTA, exclusively.** One `.bfs-btn-accent` per page, on the primary conversion action. Everything else blue or secondary. Red never appears decoratively.
- **Warm tints preferred**: cream over ice for section backgrounds; ice for at most one cool contrast section.
- **No full-width text walls**: every content section pairs text with a visual — stat callout, image, quote panel, or CSS visualization — via `.bfs-split` (or `-60-40`/`-40-60`).

## Hero

- `--bfs-text-hero` headline, weight 700, `text-wrap: balance`, max-width ~16ch–20ch.
- One-sentence subhead in `--bfs-text-lg`, `--bfs-text-muted`.
- Primary CTA (`.bfs-btn-primary` or the page's single `.bfs-btn-accent`) + optional `.bfs-btn-secondary` ("Watch our work" with play icon).
- Flat background: white, cream-soft, or `.bfs-dark` with white logo. No gradients, no particle effects.
- For a video company, a video or still frame in the hero beats abstract illustration every time.

## Sections that convert

- **Work/portfolio grid**: `.bfs-grid` of 16:9 thumbnails with `--bfs-radius-lg`, title + client caption below. Hover: subtle scale (1.02) on the image only.
- **Services**: feature cards (`.bfs-card-tinted` + `.bfs-icon-chip`) in a 3-up grid.
- **Social proof**: client logos in a silver-toned row, or a single large quote in `--bfs-text-xl` italic with name/company in `--bfs-caption`. Star ratings use the lucide star icon in `--bfs-blue`, not gold.
- **Final CTA band**: `.bfs-dark` or solid `--bfs-blue` section, white logo, `--bfs-text-2xl` invitation, one button.

## Footer

`.bfs-dark`, white logo (`.bfs-logo-footer`), contact with mail/phone icons, `--bfs-text-sm` in `--bfs-text-muted`.

## Copy tone

Confident, concrete, short. "We produce video that moves people" not "We leverage cutting-edge solutions." Sentence case headings. No exclamation marks.
