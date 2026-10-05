# Imagery

BlueForest is a video studio, so pages lead with real frames from real work. Imagery is not decoration.

## Source order (first match wins)

1. **The BlueForest Stills Library** (`library/` and its `manifest.json`): curated, rights-cleared frames from completed films, BTS shoots, the website, and social posts. Query the manifest by tags. The library is being built: see "Library status" below.
2. **Assets the user provides for this page** (client-supplied photos, approved stills).
3. **Placeholders, for drafts only:** `https://picsum.photos/id/<id>/<w>/<h>`. A page containing `picsum.photos` is not shippable. Say so when delivering a draft.

Never use generic stock imagery that pretends to be BlueForest's own work.

## Library status

Not yet populated. Until it is, use options 2 and 3 above and tell Ammon which slots still need real stills. When the library goes live, this section will hold the manifest URL and query examples.

## Treatment

- Crops: hero/feature frames `2.6:1` (`.bfs-frame`), tiles `16:10`, wide tiles `2.2:1`, portraits `4:5`. Use `object-fit: cover`. Never stretch.
- The system applies a subtle grade (slight desaturation; darker on hover). Don't add other filters, duotones, or overlays except the `.bfs-shade` and `.bfs-ttl` gradients that keep text legible.
- Text on images: only inside `.bfs-ttl`, `.bfs-osd`, `.bfs-line` (subtitles), or the hero frame. All of these already carry legibility shading.
- `alt` text describes what's in the frame ("Director framing an interview in a warehouse"). Purely decorative frames get `alt=""`.
- Websites always appear inside `.bfs-browser` chrome. Videos always carry a `▶ runtime` tag.
- People: prefer frames where faces are engaged, not mid-blink. Never use frames of minors without a release. If in doubt, choose a different frame.
