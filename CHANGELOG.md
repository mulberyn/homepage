# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/).

## [4.2.1] — Brand anchored to the nav's far left

### Changed

- **Brand position** — the cursive "mulberyn" moved from beside the links to
  the bar's far-left grid column, inset 69px on desktop so its left edge
  lines up with the sidebar avatar's left edge below. The section links now
  form their own page-centered group, leaving a wide natural gap after the
  brand while the spacing between links is unchanged.

---

## [4.2.0] — Nav spacing, contact rows, full-width underline

### Changed

- **Brand ↔ links gap** — the cursive brand now keeps a clear breathing gap
  (2rem on desktop) from the section links; the group stays page-centered.
- **Sidebar contact rows** — two icon + text rows below the @handle/title:
  a MapPin row (`location`, "Hangzhou Zhejiang") and a Mail row with the new
  address `zhangsheng26@stu.pku.edu.cn` (mailto link). Both come from new
  optional `location` / updated `email` fields in `data.ts`.
- **Active-link underline** — the tiny dot under the active nav link is now
  a 2px underline spanning exactly the label text (insets match the link
  padding). Still per-item with an in-place fade — no sliding, no stutter.

---

## [4.1.0] — Centered nav with brand, sidebar trim

### Changed

- **TopNav is now truly centered** — a 3-column grid (1fr | auto | 1fr) keeps
  the nav content centered in the page width, with the theme toggle in the
  right column. The cursive **"mulberyn" brand** (with its handwriting
  reveal) moved from the sidebar into the bar's left slot, section links
  right after it.
- **Sidebar trimmed** — the email text is gone from `ProfileSidebar` (the
  mail icon among the social links remains), and the brand no longer renders
  there now that it lives in the nav.

---

## [4.0.0] — Top nav + identity sidebar layout

### Changed

- **Navigation moved back to a sticky top bar** (`TopNav`) shown at every
  screen size: the five section links plus the theme toggle. The active link
  is marked by the accent text color and a small dot under the label — each
  link owns its own dot, so nothing animates across items and nothing can
  stutter. On narrow screens the link row scrolls horizontally (scrollbar
  hidden) instead of hiding behind a hamburger.
- **The sidebar is now navigation-free** (`ProfileSidebar`): cursive brand,
  circular avatar, name / @handle / title / email, and social links only.
- **Centered page container** — the sidebar and the 850px content column
  share one centered `max-w-[1240px]` padded container, so the sidebar keeps
  a comfortable inset from the left screen edge instead of hugging it. The
  sidebar column (270px) uses `position: sticky` below the nav, staying put
  while the content scrolls.
- **Stacked layout under 960px** (custom `side` breakpoint) — the sidebar
  folds into the top of the page flow as a compact horizontal identity row
  (avatar beside name/title/email, socials underneath), with the nav still
  on top and the content following. `MobileHeader` is gone.
- **Avatar file** — the photo now ships as `/avatar.jpeg` (the old
  `/avatar.jpg` placeholder was replaced).

---

## [3.0.0] — Fixed sidebar layout

### Changed

- **Two-column layout** — the sticky top nav bar + centered Hero are replaced by
  a **fixed 280px left sidebar** (100vh) holding the cursive "mulberyn" brand,
  a 120px circular avatar, name / title / email, social links, the section
  navigation, and the theme toggle. Content scrolls on the right, centered at
  max 850px. Below `lg` the sidebar collapses into a compact sticky top bar
  with a hamburger menu (`MobileHeader`).
- **Nav highlight** — the sliding underline indicator is gone. The active link
  now shows a small coral vertical bar + accent text color; each link owns its
  own indicator, so nothing animates across items and nothing can jitter.
  Scroll-spy + smooth scrolling live in a shared `useScrollSpy` hook.
- **Anchor offsets** — `scroll-padding-top` on `<html>` is now responsive:
  28px on desktop (no top bar), 88px under the mobile header. `Section` no
  longer needs its own `scroll-mt`.

### Fixed

- **Brand "y" descender clipping** — the handwriting mask clips paint to the
  element's border box, and Dancing Script's descenders extended below the
  tight line box. `.brand-write` now reserves room (`line-height: 1.35` +
  bottom padding), so the full glyph survives the mask.

---

## [2.6.0] — Centered dividers, education logos & typography pass

### Changed

- **Section dividers** — no longer span the full content width. They're now a
  centered rule at **~86% width** (inset from the text edges) with **more space
  above than below** (`mt-10` / `mb-8`), so the first divider below About gets
  ~2.5rem of breathing room.
- **Education logos** — each entry's school logo now renders as a framed ~48px
  thumbnail (`object-contain`, bordered) so any real logo (square, transparent
  PNG, wordmark) sits neatly and stays aligned. Swap the placeholder SVGs for
  your own by dropping files in `/public/images/` and updating the `logo` paths
  in `data.js`.
- **Typography pass** — headings get a subtle `-0.01em` letter-spacing and a
  crisper `1.25` line-height; body keeps 17px / 1.8 with kerning + ligatures and
  `optimizeLegibility` for effortless long-form reading. Removed the heavier
  `tracking-tight` on the hero name for a more harmonious scale.

---

## [2.5.0] — Cursive brand, marker highlight & divider polish

### Changed

- **Cursive brand logo** — replaced the navbar's monogram + name with an
  animated **"mulberyn"** script logo (Google **Dancing Script** font) that fades
  in and slides from the left on load. (The Hero still carries the full name and
  avatar as the page's identity.)
- **Marker-style highlight** — the About highlight is now an inset box-shadow
  band (`inset 0 -0.34em 0 var(--highlight-color)`) that hugs the text baseline
  like a gentle marker (mem.ac style), instead of a detached underline sitting
  below the text.
- **Section dividers** — thicker (2px) and more visible via a dedicated warm
  `--divider` color (light `#e3d3c6`, dark `#4d4439`), with balanced ~2rem
  spacing above and below.
- **Polish** — subtle hover micro-interactions (gentle scale + color on social
  icons); removed now-unused tint tokens and the monogram helper.

---

## [2.4.0] — Polish fixes: nav slider, timeline alignment, highlight & arcs

### Fixed

- **Nav slider glitch** — replaced the Framer `layoutId` underline (which
  stuttered across distant items) with **ONE persistent underline** whose
  left/width are measured from the active link via refs
  (`getBoundingClientRect` relative to the `<ul>`), animated with a spring. It
  now slides smoothly and directly across any distance.
- **Scroll-spy for the last section** — rewrote the active-section detection to
  use viewport-relative `getBoundingClientRect().top` (not `offsetTop`, which is
  relative to the positioned ancestor and mis-computed the position) plus a
  bottom-of-page guard, so **Awards** (the short last section) now highlights
  correctly.
- **Timeline node alignment** — the Experience/Publications node circle is now
  vertically centered on the first text line (date / venue) while staying
  anchored to the dashed line's x-position. Also fixed a regression where a
  wrapper made nodes overlap the text.
- **About highlight spacing** — increased the gap between the text and the
  highlight underline bar (~6-8px of breathing room) so the line never touches
  the letters.

### Changed

- **Background arcs are theme-aware** — a new `--arc-opacity` makes the flat
  shapes clearly noticeable in **light** mode (12%) while staying subtle in
  **dark** mode (5%).

---

## [2.3.0] — Timeline, gold/silver medals & highlight polish

### Added

- **Dashed vertical timeline** for Experience & Publications
  (`TimelineList.jsx`) — a single thin, elegant dashed connector line down the
  left with a small circle node per entry. Publications moved from flat cards to
  timeline entries (`PublicationItem.jsx`).
- **Gold / silver medal icons** — awards now carry a `medal` field
  (`"gold" | "silver"`); the medal icon is colored accordingly (gold `#d9a520`,
  silver `#9ca3af`) so a Gold medal never looks like a Silver.

### Changed

- **About highlight spacing** — the highlighter is now drawn as a thin bar
  pinned to the bottom with extra `padding-bottom`, so the underline sits clearly
  **below** the text and never touches the letters.
- Added a second sample Experience and Publication entry so the timeline shows a
  connected line out of the box.

### Removed

- `PublicationCard.jsx` (replaced by the timeline `PublicationItem.jsx`).

---

## [2.2.0] — Warm Light/Dark, personal content & awards fold

Adds a warm dark mode, tightens the layout, and wires in personalized content
(GitHub handle, school logos, competitive-programming awards with a fold).

### Added

- **Warm Light / Dark mode** — replaced the light-only theme set with a simple
  **Light ↔ Dark** toggle (sun/moon). Both are warm: light `#FDF8F5` /
  coral `#E88F7A`; dark `#2D2A26` / muted `#D4A08A` on cream text. Follows the OS
  preference by default and is remembered.
- **Clickable `@handle`** — the GitHub handle renders under the name and links to
  your profile in a new tab (`githubHandle` / `githubUrl` in `data.js`).
- **School logo badges** — Education entries now show a small school logo
  (`EducationItem.jsx`); ships with ZJUT + PKU placeholder badges in `/public`.
- **Awards "show more" fold** — `AwardsList.jsx` shows `highlight: true` awards by
  default and expands the rest **inline** behind a "+ N more" button
  (no popup/modal). Pre-filled with real ICPC / CCPC / provincial results.

### Changed

- **Compact spacing** — reduced section/heading/paragraph margins for a tighter,
  letter-like flow.
- **Config** — restructured `data.js`: `githubHandle`/`githubUrl`; `education`
  entries use `{ school, logo, major, degree, dates }`; `awards` is a flat array
  of `{ title, date, highlight }`; nav label "Honors & Awards" → "Awards".
- **Background arcs** — now use warm-toned colors that adapt to the active theme.

### Removed

- **Scroll progress bar** (`ScrollProgress.jsx`) — removed entirely per design.
- The previous "Fresh / Creamy Warm" light-only theme variants.

---

## [2.1.0] — Minimal, letter-like refinement

Refines the 2.0 warm redesign toward a cleaner, more minimal, blog/letter-like
reading experience (inspired by innei.in). Same layout, palette, config, and
deployment — just calmer, airier styling.

### Changed

- **Sections** — removed the rounded pastel **card panels**; sections are now
  transparent and separated by **subtle hairline dividers**, in a natural
  top-to-bottom reading flow. Pastels are reduced to small **accent dots** next
  to each heading (used sparingly).
- **Reading comfort** — body set to **17px / line-height 1.8**; content column
  narrowed to **max-width 850px** with generous vertical rhythm.
- **Headings** — moderated sizes (h1 ~2rem, h2 ~1.5rem, h3 ~1.2rem); smaller,
  calmer Hero avatar.
- **Publications** — flattened from cards into clean **rows with dividers**
  (no borders/shadows); venue shown as a small uppercase label; link chips hover
  to a subtle outline (no fill).
- **Awards** — flattened into simple divided rows with a small icon and a quiet
  year on the right (no card, no shadow).
- **Hover states** — removed lift/heavy-shadow hovers in favor of quiet
  color-only changes.
- **Background arcs** — opacity lowered to ~4–6% for a more minimal feel.

### Retained

- Sticky top nav (sliding underline, hamburger), two light themes, SEO/JSON-LD,
  PWA, keyboard navigation, accessibility, reading-progress bar, print styles,
  and the config-driven content model.

---

## [2.0.0] — Warm & Fresh redesign ("小清新")

A full visual redesign toward a light, cozy, warm-pastel aesthetic. The content
model, config file, and deployment are unchanged, so existing `data.js` files
keep working — but the layout and styling are new.

### Changed (breaking, visual)

- **Layout** — removed the fixed left **sidebar**; introduced a **sticky top
  navigation bar** (`Navbar.jsx`) with a sliding active-link underline and a
  **hamburger menu** on mobile. Content is now a centered ~900px column.
- **Identity** — moved avatar / name / title / socials into a new centered
  **`Hero.jsx`** header at the top of the page.
- **Palette** — replaced lavender/purple with a **warm coral accent**
  (`#E88F7A`) on **creamy off-white** backgrounds (`#FFFAF7`). Sections now sit
  on **alternating soft pastel panels** (peach / sky / mint / blush).
- **Theme** — replaced dark mode + 4 palettes with **two light themes**:
  "Fresh" and "Creamy Warm" (`ThemeContext` simplified; `ThemeToggle` is now a
  single sun/coffee switch).
- **Typography** — switched to **Inter** (headings/UI) + **Lora** (serif body);
  removed Merriweather + Fira Mono. Metadata is now clean sans, not monospace.
- **Background** — replaced floating glow blobs + dot grid with flat, low-opacity
  **SVG arcs & circles** (`ArcBackground.jsx`).
- **Avatar** — removed the rotating dashed rings in favor of a single calm,
  static soft ring.

### Removed

- `Sidebar.jsx` (superseded by `Navbar.jsx` + `Hero.jsx`).
- Dark mode, the 4-palette switcher, and the rotating-ring animations.

### Fixed

- **Sticky nav bug** — an `overflow-x-hidden` on the root container created a
  scroll context that broke `position: sticky` on the nav bar (it stopped
  sticking after scrolling). Removed it; the decorative arcs are clipped by
  their own fixed wrapper instead.

### Retained

- All 1.1.0 improvements — SEO/JSON-LD, PWA (offline + installable), keyboard
  navigation, accessibility (skip link, focus-visible), reading-progress bar,
  and print styles — recolored to the warm palette.

---

## [1.1.0] — Continuous-improvement pass

This release adds a round of concrete improvements across **SEO, accessibility,
PWA, keyboard navigation, and animation**, building on the 1.0.0 foundation.

### Added

- **SEO & social sharing** (`src/components/Seo.jsx`)
  - Dynamic `<title>`, meta description, keywords, and author derived from
    `data.js`.
  - Open Graph + Twitter Card tags for rich link previews.
  - `schema.org/Person` **JSON-LD** structured data (with `sameAs` linking your
    social/academic profiles) for better search-engine understanding.
  - Canonical link tag.
  - New `seo` config block in `src/config/data.js`.
- **PWA — installable & offline** (`vite-plugin-pwa`)
  - Auto-generated web app manifest + service worker that precaches build assets
    (site loads instantly on repeat visits and works offline).
  - `registerType: autoUpdate` so a new deploy silently updates the SW.
  - Manifest `start_url`/`scope` respect the GitHub Pages base path.
- **Keyboard navigation** (`src/hooks/useKeyboardNav.js`)
  - `j`/`k` and arrow keys move between sections; `1`–`9` jump directly;
    `g`/`G` (or Home/End) go to first/last; `t` toggles the theme.
  - Ignored while typing in fields or when modifier keys are held.
- **Reading-progress bar** (`src/components/ScrollProgress.jsx`)
  - Smooth, spring-based top-of-page progress indicator via Framer Motion
    `useScroll` + `useSpring`.
- **Accessibility**
  - "Skip to content" link for keyboard users.
  - Palette-aware `:focus-visible` outlines throughout.
  - Focusable `#main` landmark target.
- **Print stylesheet** — clean, single-column, ink-friendly CV printout (hides
  decorations, controls, and nav; forces light colors).

### Notes

- For maximum PWA installability on Chrome/Android, add `pwa-192.png` and
  `pwa-512.png` to `/public` and list them in the manifest `icons` array
  (`vite.config.js`). The bundled SVG icon covers the browser tab and many
  install targets.

---

## [1.0.0] — Initial release

### Added

- **Core homepage** — a mem.ac-inspired personal academic site.
- **Tech stack** — React 18, Vite 5, Tailwind CSS 3, Framer Motion 11,
  lucide-react, React Context API.
- **Layout** — two-column (fixed sidebar + scrollable main) collapsing to a
  sticky top header below 1024px.
- **Theming** — lavender-first design with 4 palettes (default/blush/deep/mist)
  and full dark mode via `data-theme` / `data-palette` CSS variables, persisted
  to `localStorage` with a no-flash bootstrap.
- **Typography** — Merriweather (serif) + Fira Mono (metadata).
- **Animations** — Framer Motion scroll reveals, a sliding nav pill with
  IntersectionObserver scroll-spy, hover lifts; `prefers-reduced-motion`
  respected.
- **Decoration** — rotating dashed avatar rings (28s/60s), dot-grid texture, and
  floating glow blobs.
- **Config-driven content** — all personal data in a single, heavily-commented
  `src/config/data.js` (name, bio with `**highlight**` support, education,
  experience, publications with links, awards, socials, nav).
- **Components** — `Sidebar`, `MainContent`, `Section`, `ThemeToggle`,
  `TimelineItem`, `PublicationCard`, `AwardItem`.
- **Deployment** — GitHub Pages via GitHub Actions
  (`peaceiris/actions-gh-pages@v3`, `GITHUB_TOKEN`, automatic base path from the
  repo name), plus a manual `npm run deploy` (gh-pages). `VITE_BASE_URL` env
  var, `.env.example`, `.nojekyll`, and working SVG placeholder assets.
- **Docs** — detailed `README.md` (local dev, deployment, custom domain, env
  vars, structure, customization cheatsheet).

### Fixed

- Desktop and mobile nav menus (both always mounted) shared a Framer Motion
  `layoutId`, causing the sliding pill to animate between menus; each menu now
  uses a unique `layoutId`.
