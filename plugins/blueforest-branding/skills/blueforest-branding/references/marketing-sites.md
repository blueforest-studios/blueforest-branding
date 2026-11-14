# Marketing sites (v5 "Glow")

Public pages that sell BlueForest: the website's pages, campaign landing pages, practice and product pages. A marketing director should understand the offer from the pictures and headings alone.

**Start from `templates/landing.html`.** The Astro website has its own build: it takes the tokens, components and runtime from `assets/glow.css` and `assets/glow.js` instead of linking the CDN.

## Section order

| Section | Surface | What goes in it |
|---|---|---|
| Nav | pale | Logo (56px), three or four links, one outlined pill. `data-nav` makes it shrink on scroll. |
| Hero | pale | `.bfs-hero`: kicker, `h1[data-words]`, one sentence, two buttons at most, one `.bfs-shot` frame. |
| Intro or reel | night + lit field | `.bfs-split`: a heading in a person's voice, two sentences, a ▶ text link, and one video tile. |
| Services | white | `.bfs-cards` ×3. Each card is one link: picture, title, one sentence, a → label. |
| One claim | blue | `.bfs-band`: a headline and a white button. No paragraph. |
| Process | pale | `.bfs-flow`: three to seven stops with icons (SKILL.md rule 7). |
| Work or stills | slate | `.bfs-stills` ×3 with captions, or three ▶ tiles. |
| Close | night + lit field | `.bfs-cta`: heading, one sentence, one blue button. |
| Footer | pale | Logo (46px), city and phone, © line. |

Shorter pages drop sections but keep the order: hero, one proof section, close. Keep pale and white at half the page or more, and run `BFS.audit()`.

## Recipes

- **Hero picture.** A real frame with a person or a camera in it, portrait-ish (the box is about 4:4.4). Put the subject under `--focal`. It zooms slowly on its own; don't add another effect.
- **Video tile.** `<button class="bfs-shot bfs-media" data-play data-src="…mp4">` with an `<img>` poster, a `.bfs-tag` (`▶ 1:45`, the real runtime) and a `.bfs-pill` (`▶ Play video`). Repeat the action as a `.bfs-link` text button beside it.
- **Cards.** Three across, never four. If a card has no picture, it isn't a card: use a table or a flow.
- **The blue band** earns its width with one claim a client would repeat. If you need a second sentence, it belongs in a white section.
- **Process.** Titles are one word where possible; lines are eight words or fewer. Pick the Lucide icon that names the stop (search, clipboard-list, video, scissors, rocket for our five stages).
- **`data-mag`** goes on the primary button in the hero and the close, nowhere else.
- **`data-rv`** goes on each heading, paragraph, card and figure so they arrive in sequence.

## Copy

Write to a marketing director. Lead with their outcome, then the offer. One line on the page may be in Ammon's first person. Headlines are statements, not questions. Full rules: SKILL.md rule 10.
