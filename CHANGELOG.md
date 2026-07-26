# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/).

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
