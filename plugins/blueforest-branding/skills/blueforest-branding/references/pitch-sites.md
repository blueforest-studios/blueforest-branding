# Pitch & proposal sites

Client-facing proposals sent as a private link (Client Pitch Kit). One client, one decision. The page sells an outcome, then makes saying yes easy.

**Start from `templates/pitch.html`.** Copy it, then replace every `REPLACE`, and run `grep REPLACE` before shipping to confirm none are left.

## Section order (keep it)

| # | Section | Surface | Notes |
|---|---|---|---|
| 1 | Nav + header | dark | `.bfs-cine` (SKILL.md rule 2). The image is a concept still or a frame from their footage. Kicker `Proposal for <Client>`; the headline names *their* outcome in their words; one sentence; Approve & book + See the approach. Treatment frame, project code, working title and date go in the corner readouts. |
| 2 | Summary | light | `.bfs-summary`: What you asked for · What we'll make · Timeline and investment, each one sentence. Light here because the problem section is mid. No stat cards. |
| 3 | The problem | mid | `.bfs-split`: their problem in their language + `.bfs-ticks` symptoms + one `.bfs-callout` insight. |
| 4 | The approach | light | Treatment frames as `.bfs-still` tiles in a `.bfs-reel`, captioned "Frame 01 — …". |
| 5 | Production plan | mid | Call-sheet `.bfs-table` (Phase · When · What happens · You get). |
| 6 | Investment | light | `.bfs-cols` tiers, `.bfs-price`; one `.bfs-pick` with a `.bfs-new` "Recommended" tag. |
| 7 | Proof | mid | `.bfs-subtitle` testimonial from the most similar past client (plays the interview) + `.bfs-logos`. |
| 8 | Next step | light | `.bfs-cta`: date-anchored headline + a `.bfs-form` panel holding the single approve/book button (e-sign or TidyCal link). |
| 9 | Footer | dark | "Prepared for <Client> · <Project ID>". |

Drop sections that don't apply, but keep the light/mid alternation and run `BFS.audit()`.

## Rules specific to pitches

- `<meta name="robots" content="noindex">` always (already in the template). Pitch sites are private links.
- The **project code** (`VID-YYYY-NNN`) appears in the header's corner readout and the footer. Never invent one; it comes from Blair.
- **One primary action:** "Approve & book". The hero and the nav both point to `#next`. A secondary "book a call" text link is fine.
- **Imagery:** library stills that match the concept (same industry, mood, or setting). Never use the client's own photos without permission. If no good match exists, use fewer, bigger frames rather than weak ones.
- **Prices** use `.bfs-price` (Saira, never mono). Mention "From $X" in the summary's timeline-and-investment line only if tiers exist.
- **Copy tone:** confident, concrete, short. Sentence-case headings. No exclamation marks. Name their problem before our process.
- Review mode: embed the review overlay gated behind `?review` (see `~/.claude/rules/frontend.md`).
