# Motion Graphics — Video Production Spec

The BlueForest motion language for video work: logo animations, lower thirds,
title cards, and explainer graphics. Tool-agnostic (DaVinci Resolve, After
Effects, Remotion) — timings are in frames @ 24fps; scale proportionally for
other rates. Values were developed and approved in the `blueforest-motion-lab`
Remotion project (comp `05-REM005-Favorites` holds the approved moves with
annotations; the variant code there is ground truth).

## Format & delivery

- Master at **UHD 3840×2160, 24fps**. All pixel values below are at UHD.
- Remotion exports: **ProRes 4444, muted**. Alpha overlays (lower thirds,
  bars) additionally need `--pixel-format yuva444p10le --image-format png`.
- Colors: the 8 brand hex values (see SKILL.md). Blue `#009DDC` is the accent
  and line color; dark `#231F20` for text/dark elements; red only for
  errors/alerts, never decoration. Logo colorways: blue on light, white on
  blue/dark — never recolored via filters in deliverables.

## Motion language (the rules)

Adapted from the classic 12 principles of animation for logos/text/shapes:

- **Eased, never linear.** Standard curves: `ease-out cubic` or
  `cubic-bezier(0.25, 0.1, 0.25, 1)`. Springs for arrivals:
  **bounce** = damping 12 / stiffness 130 (visible overshoot, settles clean);
  **soft** = damping 18 / stiffness 140 (no bounce). Masks and wipes always
  use pure eases — spring overshoot clips inside masks.
- **Overlap, don't sequence** — start each element while the previous is
  still settling. Staggers: 2–6f between related elements, ~10f between word
  groups.
- **Built for the trim** — the full build completes by ~60–105 frames, then a
  static hold. Never put payoff late; clips get trimmed to length.
- **Anticipation & follow-through, subtly** — small counter-moves (2–4f) and
  slight overshoot on arrivals. Exaggeration stays at a few percent of scale;
  the brand is clean and confident, not bouncy.
- **Slight rotation is a house signature** — elements may enter tilted
  −4° to −10° and settle back to perfectly horizontal (spring), pivoting from
  a natural anchor (left edge, trunk line). Never leave anything tilted.
- **Staging** — one focal point at a time; any paused frame should look
  designed.
- **Entrance moves in the kit**: mask-rise (element lifts out of a clip
  region, 14–16f), fade-up (opacity + 20–30px rise), draw-on (lines/borders
  via stroke or scaleX from left), pop (scale 0.6–0.85 → 1 on bounce spring),
  swing (rotation settle). Lines/underlines draw from the left.

## Text readability (hard rules)

- **Reveal in reading order** — text enters exactly in the order it should be
  read; a later line never arrives before an earlier one lands.
- **Word-by-word reveals guide the eye**: 3–6f between words, each word on a
  14f mask-rise (or 10f in fast passes). Pace ≤ 3–4 words/second.
- **On-screen time ≥ word-count ÷ 3 seconds**, minimum ~2s for any text.
- **Read while static** — text gets legible fast, then holds; never drift or
  restyle text while it's being read. Per-letter effects only for 1–3 word
  titles.

## Approved moves

### Logo entrances (tree and wordmark animate as separate layers)

The mark splits into layers: tree (`logo-tree_*.svg`), full wordmark
(`logo-text_*.svg`), or the wordmark's two words (`logo-text1/2_*.svg`) —
assets in the motion lab's `public/logos/`. Tree always leads; text follows
(reading order).

- **Rise** (calm register — default for content openers): tree rises out of a
  bottom mask (16f ease-out) while the wordmark fades up 26px on a soft
  spring from f14. No bounce on text.
- **Rise duo**: same tree, wordmark in two beats — "blueforest" at f10,
  "studios" at f20 (soft springs, 26px rise, 12f fades).
- **Tilt duo** (signature): tree swings upright from −6° around the trunk
  line (bounce spring) and lands flat; "blueforest" mask-rises at f5,
  "studios" at f15 (16f eases).

**Lottie versions** (Rise duo + Tilt duo, blue and white colorways):
`assets/lottie/bfs-logo-{rise,tilt}-duo_{blue,white}.json` — 3840×2160 @24fps,
96f, transparent, pure vector shapes with springs/eases baked per-frame from
the lab code. Work in Remotion (`@remotion/lottie`), DaVinci Resolve 21+
(drag into media pool; alpha auto-recognized), lottie-web, and Skottie.

### Lower third — "Word Rise" (the approved style)

Picked from 12 candidates; tested over interview footage, lower-left.

1. Blue underline draws first (soft spring, from left). Its width always
   equals the name exactly (size the line to the name, not a fixed length).
2. Name words mask-rise 6f apart (14f masks), landing over the line.
3. **5-frame rest** — nothing moves.
4. Title/subtitle runs word-by-word in a **22-frame pass** (3f/word, 10f
   rises).

Type: name 84px/600, title 42px/500 at UHD (scale with layout). Over footage:
white name, ice title, soft text shadow (`0 2px 20px rgba(0,0,0,0.45)`).
Placement: lower-left by default; never over the subject.

**Panel treatment (in testing)**: 50%-white panel with strong brand grain,
4px border at 25% white — border draws around the perimeter first (eased),
fill fades in as it completes, then Word Rise text (no shadow needed).

### Backgrounds

Composable brand backgrounds (see the lab's `BrandBackground`): palette color
× brightness-neutral bipolar grain (amount/size/contrast) × geometric pattern
(dots/grid/diagonal/triangles) at low opacity. Pattern/grain ink auto-flips:
dark marks on light grounds, white on dark/blue. Reserve the dark background
for opening/section titles.

### Explainer graphics

Diagram style: metro-map metaphor is the house favorite (colored route lines
that draw on, ringed station circles that pop in with lucide icons, terminus
bars, repeating data pulses after the build settles). Lines draw with eased
stroke reveals; stations pop on bounce springs; labels fade up in reading
order. Icons: lucide, 24×24 stroke style, `currentColor`.

## Source of truth

`blueforest-motion-lab/` (BlueForest Branding folder): approved moves live in
comp `05-REM005-Favorites` with spec annotations; implementation in
`src/compositions/` and shared constants in `src/lib/brand.ts` +
`src/lib/anim.ts`. When this spec and the lab disagree, the lab wins — update
this file.
