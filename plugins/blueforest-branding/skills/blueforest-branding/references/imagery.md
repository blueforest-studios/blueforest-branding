# Imagery

BlueForest is a video studio, so pages lead with real frames from real work. Imagery is not decoration.

## Source order (first match wins)

1. **The BlueForest Stills Library** (`library/` and its `manifest.json`): curated, rights-cleared frames from completed films, BTS shoots, the website, and social posts. Query the manifest by tags. The library is being built: see "Library status" below.
2. **Assets the user provides for this page** (client-supplied photos, approved stills).
3. **A generated image** (see "Generated images" below), only for what real frames can't show: a concept, a mood, a texture or background.
4. **Placeholders, for drafts only:** `https://picsum.photos/id/<id>/<w>/<h>`. A page containing `picsum.photos` is not shippable. Say so when delivering a draft.

Never use generic stock imagery that pretends to be BlueForest's own work.

## Header image (every page)

The `.bfs-cine` header always carries one image. First match wins:
1. **A frame from this project:** footage (`ffmpeg -ss <t> -i <clip> -frames:v 1 -q:v 3 hero.jpg`), a style frame, a Remotion render, a screenshot of the system being planned. Log footage (C-Log, BRAW, S-Log) must go through a Rec.709 transform first; a flat grey frame is not usable.
2. **A Stills Library frame** that matches the practice or industry.
3. **A client asset** (product shot, location photo) the client has approved.
4. **A generated image** when none of the above exists: a concept frame or an atmospheric background that fits the subject. Never text alone, never a placeholder.

Pick a frame with the subject in the upper or middle third and room around it for centered type; set `--focal` so the crop keeps the subject. Export about 1600–2000px wide as JPG or WebP under ~400 KB, saved beside the page. Client frames stay in the client's project folder, never in this public repo.

## Generated images (ChatGPT plan via Codex)

`scripts/imagegen.sh "<prompt>" <page-folder>/img/<name>.png [16:9]` runs Codex's built-in image tool, so it bills the ChatGPT subscription, not the API. It needs the ChatGPT app (or the Codex CLI) signed in with ChatGPT. If the script reports that Codex isn't found, fall back to a placeholder and say so. Each image takes about a minute and uses the plan's limits 3–5× faster than text, so generate only the images the page uses: one per slot, plus at most one variant.

**Use it for:** concept and mood frames in pitches (label them `Concept` in the `.bfs-tag`), header images for internal plans with no project footage yet, backgrounds, textures, and illustrations for strategy and web pages.
**Never for:** anything presented as BlueForest's real work, such as portfolio, BTS, team, or testimonial images; a client's people, products or locations as if photographed; or logos and text (the brand assets and HTML handle those).

Prompt like a cinematographer: the subject, the setting, the light (time of day, direction), the lens and depth of field, and the mood. Ask for "no text" and room for centered type when it's a header. After generating, convert it like any other frame (about 1800px wide, JPG or WebP under ~400 KB, `sips -s format jpeg -s formatOptions 70 --resampleWidth 1800 in.png --out out.jpg`) and keep the PNG out of the deliverable. Generated images for client work stay in the client's folder, never in this public repo.

## Library status

Not yet populated. Until it is, use options 2 and 3 above and tell Ammon which slots still need real stills. When the library goes live, this section will hold the manifest URL and query examples.

## Treatment

- Crops: hero/feature frames `2.6:1` (`.bfs-frame`), tiles `16:10`, wide tiles `2.2:1`, portraits `4:5`. Use `object-fit: cover`. Never stretch.
- The system applies a subtle grade (slight desaturation; darker on hover). Don't add other filters, duotones, or overlays except the `.bfs-shade` and `.bfs-ttl` gradients that keep text legible.
- Text on images: only inside `.bfs-ttl`, `.bfs-osd`, `.bfs-line` (subtitles), or the hero frame. All of these already carry legibility shading.
- `alt` text describes what's in the frame ("Director framing an interview in a warehouse"). Purely decorative frames get `alt=""`.
- Websites always appear inside `.bfs-browser` chrome. Videos always carry a `▶ runtime` tag.
- People: prefer frames where faces are engaged, not mid-blink. Never use frames of minors without a release. If in doubt, choose a different frame.
