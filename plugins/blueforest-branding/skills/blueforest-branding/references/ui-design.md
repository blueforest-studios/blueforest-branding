# UI Design — Apps, Tools & Product Interfaces

For building actual interfaces: dashboards, internal tools, forms, admin panels, app shells. Extends the technical register — red is errors/danger only, blue is the primary action.

## Stylesheets

Link **both** (ui.css builds on tokens.css):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ammonehrisman/blueforest-branding@main/plugins/blueforest-branding/skills/blueforest-branding/assets/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ammonehrisman/blueforest-branding@main/plugins/blueforest-branding/skills/blueforest-branding/assets/ui.css">
```

Self-contained deliverables: inline both files.

## App shell

`.bfs-shell` = topbar + sidebar + main grid (sidebar hides under 900px). `.bfs-topbar` holds the logo (32px) and actions; `.bfs-topbar-spacer` pushes them apart. `.bfs-sidebar` uses `.bfs-nav-link` items grouped under `.bfs-nav-heading` labels. Active nav = tinted blue pill (`.active` or `aria-current="page"`) — **never a left-border accent**. `.bfs-main` holds page content.

## Forms

- Wrap each control in `.bfs-field`: `.bfs-label` → control → `.bfs-hint` or `.bfs-error-msg`.
- Controls: `.bfs-input`, `.bfs-select`, `.bfs-textarea`; checkboxes/radios are native inputs inside a `.bfs-check` label (accent-color handles branding).
- Required marker: `<span class="bfs-required">*</span>` inside the label.
- Validation: set `aria-invalid="true"` on the control and add `.bfs-error-msg` (with icon) below it. Error text says how to fix, not just "invalid".
- One column by default; group related fields with `.bfs-grid` only when they're genuinely parallel (city/state/zip).
- Submit = `.bfs-btn-primary` (blue). Cancel = `.bfs-btn-secondary`.

## Overlays

- `.bfs-modal` and `.bfs-drawer` style the native `<dialog>` element — open with `showModal()`, no library.
- Modal: `.bfs-modal-title`, body, `.bfs-modal-actions` (buttons right-aligned, primary last).
- Destructive confirms are the one place `.bfs-btn-danger` (red) appears; pair with a plain `.bfs-btn-secondary` cancel.
- Drawer = right-side panel for detail/edit views.
- `.bfs-toast` in `.bfs-toast-stack`: brief confirmations only (dark pill, bottom-right). Anything needing a decision is a modal or `.bfs-alert`, not a toast.

## Feedback

`.bfs-alert-info` (ice) / `-success` (blue tint) / `-warning` (cream) / `-error` (red tint), each with a leading icon. Background + icon carry the meaning — no border accents. Inline page feedback only; transient feedback is a toast.

## Tables & data

- Base `.bfs-table` plus: sortable headers (`.bfs-th-sort` th wrapping a button, `aria-sort` on the th when active), row hover, `.selected` / `aria-selected="true"` rows (blue tint).
- Stats/KPIs: follow the dashboard-stats pattern in technical-sites.md.

## States — every view needs all four

1. **Loading**: `.bfs-skeleton` blocks (`-title`, `-text`) matching the final layout, or `.bfs-spinner` for button-level waits.
2. **Empty**: `.bfs-empty` — icon chip, one-line heading, muted explanation, one primary action.
3. **Error**: `.bfs-empty.error` (red chip) with a retry action, or `.bfs-alert-error` for partial failures.
4. **Loaded**: the content.

## Accessibility floor

- Every control has a visible label (no placeholder-as-label).
- State conveyed by ARIA (`aria-invalid`, `aria-current`, `aria-selected`, `aria-sort`), which the CSS keys off — style and semantics can't drift apart.
- Focus rings (blue, 2px) come free from ui.css — don't suppress them.
- Interactive targets ≥ 40px; color is never the only signal (icons + text accompany it).

## Style prompt block — for claude.ai/design & tools that can't link CSS

Paste this into the tool's style/system field:

> Use the BlueForest Studios design system. Font: Poppins (Google Fonts); mono: JetBrains Mono. Colors — primary blue #009DDC (links, active states, primary buttons), dark #231F20 (text, dark surfaces), silver #B6B8BA (borders, muted), french grey #6C7B81 (secondary text), red #DB3E26 (errors/destructive ONLY, never decoration or CTAs), cream #EFE6D8 (warm tint), ice #D8E0E4 (cool tint, alternating rows, sidebar backgrounds). White background; generous whitespace; 4px spacing grid; radii 8/12/16px; pill-shaped buttons; soft shadows always paired with a 1px border. Cards: white with 1px ice border + soft shadow, or flat tinted (cream/ice) with no shadow — NEVER colored top/left border accent strips. Status = small tinted pill badges (blue tint done, cream active, ice pending, red tint error). Active nav = blue-tinted pill. Forms: visible labels above inputs, 8px-radius inputs with silver borders, blue focus ring. Tone: clean, cool, scannable; sentence case labels; data in mono.

## Copy tone

Same as technical register: terse, literal, sentence case. Buttons are verbs ("Save changes", not "Submit").
