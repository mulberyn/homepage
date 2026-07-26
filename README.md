# 🌿 Leaf

**English** | [简体中文](./README.zh-CN.md)

**Leaf** is a warm, airy, fully-customizable personal academic homepage.
Soft cream backgrounds, a coral accent, letter-like typography and gentle
motion — built with **React + Vite + Tailwind CSS + Framer Motion**
(TypeScript throughout), and ready to deploy to **GitHub Pages** in minutes.

<p align="center">
  <em>Floating scroll-aware nav · Warm Light/Dark · Sticky identity sidebar · Letter-like sections · Timeline & awards fold · Flat arc backgrounds</em>
</p>

---

## ✨ Features

- **Floating, scroll-aware top nav** — transparent and full-width at the top
  of the page; after a small scroll it contracts into a rounded, blurred
  "pill" with a hairline border and soft shadow. Scrolling down tucks it
  away; any upward scroll brings it straight back. Section links highlight
  via scroll-spy, and collapse behind a hamburger with a smooth
  `grid-template-rows` dropdown on phones.
- **Identity sidebar** — avatar, name, clickable **@handle**, role, location
  and social links stay pinned beside the content on wide screens (≥960px)
  and fold into the top of the flow on smaller ones.
- **Letter-like reading experience** — a centered reading column, generous
  1.8 line-height, serif body text, and minimal sections separated by warm
  hairline dividers — no heavy cards or borders.
- **Warm Light / Dark mode** — light (`#FDF8F5` cream, coral `#E88F7A`
  accent) and a cozy warm-dark (`#2D2A26`, muted `#D4A08A`). Both stay warm,
  never cold; the choice is remembered and follows your OS preference by
  default.
- **Personal touches** — a handwriting-style brand logo that writes itself
  out on load, school logo badges in Education, a dashed vertical timeline
  for Experience & Publications, and an awards "show more" fold with
  gold/silver medal icons.
- **Flat arc backgrounds** — very-low-opacity decorative SVG arcs and
  circles that scale to any screen and never distract.
- **Typography** — **Inter** for headings and UI, **Lora** for the serif
  body, **Dancing Script** for the cursive brand.
- **Gentle motion** — subtle Framer Motion `whileInView` fade-ups and quiet
  hovers. `prefers-reduced-motion` is respected everywhere.
- **Zero-code customization** — everything lives in one well-commented file:
  [`src/config/data.ts`](src/config/data.ts).
- **SEO, PWA, keyboard nav, print styles** — Open Graph + JSON-LD metadata,
  installable offline-capable PWA, `j`/`k`/`1`–`9`/`g`/`t` shortcuts, and an
  ink-friendly CV printout.

---

## 🚀 Quick Start (5 minutes)

You only need to edit **one file** to make Leaf yours: `src/config/data.ts`.

### 1. Local development

> **Prerequisite:** [Node.js](https://nodejs.org/) 18 or newer (`node -v`).

```bash
# 1. Clone the repository (or click "Use this template" / "Fork" on GitHub)
git clone https://github.com/<username>/<repository-name>.git
cd <repository-name>

# 2. Install dependencies
npm install

# 3. Start the dev server (opens http://localhost:5173)
npm run dev
```

### 2. Add your information

Open **`src/config/data.ts`** and edit the `userData` object — your name,
bio, education, experience, publications, awards and social links. The file
is heavily commented; you don't need to touch any other file.

> 💡 In the `about` bio, wrap words in `**double asterisks**` to give them a
> soft highlighter effect.

### 3. Replace the placeholder images

Drop your own files into **`public/`** and point `data.ts` at them:

| File              | Used for                          | Referenced in `data.ts` as |
| ----------------- | --------------------------------- | -------------------------- |
| `public/avatar.*` | Your profile photo (square)       | `avatar: '/avatar.jpeg'`   |
| `public/thumb1.*` | Publication thumbnails (optional) | `thumbnail: '/thumb1.svg'` |

### 4. Build for production

```bash
npm run build      # typecheck + output static files to ./dist
npm run preview    # locally preview the production build
```

---

## 🌐 Deploy to GitHub Pages

### Option A — Automatic deploy with GitHub Actions ✅ (recommended)

This repo ships [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
On every push to `main` it builds the site, sets the base path to
`/<repository-name>/` automatically, and publishes `dist/` to the `gh-pages`
branch using the built-in `GITHUB_TOKEN` — no secrets to configure.

One-time setup: in **Settings → Pages**, set **Source** to *Deploy from a
branch*, branch **`gh-pages`**, folder **`/ (root)`**. Then just push:

```bash
git push origin main
```

Your site goes live at `https://<username>.github.io/<repository-name>/`.

> If the first run can't push, enable **Read and write permissions** under
> **Settings → Actions → General → Workflow permissions**.

### Option B — Manual deploy

Create a `.env` from [`.env.example`](.env.example) with
`VITE_BASE_URL=/<repository-name>/`, then:

```bash
npm run deploy
```

### Custom domain / user site

Serve from the root by setting `VITE_BASE_URL=/` (in `deploy.yml` for CI, or
`.env` for manual deploys). For a custom domain, also set it under
**Settings → Pages → Custom domain** — see the
[official guide](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

| Variable        | Default | Description                                                                    |
| --------------- | ------- | ------------------------------------------------------------------------------ |
| `VITE_BASE_URL` | `/`     | Public base path. Use `/<repository-name>/` for a project site on GitHub Pages. |

---

## 📁 Project Structure

```
.
├── .github/workflows/deploy.yml   # CI: build + deploy to gh-pages
├── public/                        # Static assets (avatar, thumbnails, favicon)
├── src/
│   ├── components/
│   │   ├── TopNav.tsx             # Floating scroll-aware nav pill + mobile dropdown
│   │   ├── ProfileSidebar.tsx     # Sticky identity card (avatar, socials)
│   │   ├── MainContent.tsx        # All sections + bio highlighter
│   │   ├── Section.tsx            # Minimal section wrapper (divider + reveal)
│   │   ├── ArcBackground.tsx      # Flat decorative SVG arcs & circles
│   │   ├── ThemeToggle.tsx        # Warm Light / Dark toggle
│   │   ├── TimelineList.tsx       # Dashed vertical timeline
│   │   ├── TimelineItem.tsx       # Experience entry
│   │   ├── PublicationItem.tsx    # Publication entry
│   │   ├── EducationItem.tsx      # Education rows with school logo badges
│   │   ├── AwardsList.tsx         # Awards + inline "show more" fold
│   │   ├── AwardItem.tsx          # A single award row (medal icon)
│   │   ├── SocialLinks.tsx        # Icon links (GitHub, mail, …)
│   │   └── Seo.tsx                # Meta tags + Open Graph + JSON-LD
│   ├── hooks/
│   │   ├── useHeaderScroll.ts     # Nav pill state: notTop / hide-on-scroll-down
│   │   ├── useScrollSpy.ts        # Active-section tracking + smooth scroll
│   │   └── useKeyboardNav.ts      # j/k, arrows, 1–9, g/G, t shortcuts
│   ├── config/
│   │   └── data.ts                # 👈 ALL your personal info lives here
│   ├── context/
│   │   └── ThemeContext.tsx       # Global theme state
│   ├── styles/
│   │   └── index.css              # Tailwind + CSS-variable themes + print styles
│   ├── App.tsx                    # Layout: arcs, nav, sidebar, content, SEO
│   └── main.tsx                   # React entry point
├── vite.config.ts                 # Base path (VITE_BASE_URL) + PWA config
├── tailwind.config.js
└── package.json
```

---

## 🎨 Customization Cheatsheet

| I want to…                    | Do this                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| Change any text/content       | Edit `src/config/data.ts`                                                                    |
| Reorder or hide a section     | Reorder / remove entries in `navItems` (in `data.ts`)                                        |
| Change my photo               | Replace `public/avatar.jpeg` and update `avatar` in `data.ts`                                |
| Change the `@handle` link     | Set `githubHandle` / `githubUrl` in `data.ts`                                                |
| Swap a school logo            | Drop a logo in `public/` and set `logo` on the education entry                               |
| Highlight / fold an award     | Set `highlight: true/false` on the award in `data.ts`                                        |
| Tweak the accent colors       | Edit `--color-primary` (light) and the `[data-theme='dark']` block in `src/styles/index.css` |
| Adjust the background arcs    | Edit `src/components/ArcBackground.tsx`                                                      |

> ⌨️ **Keyboard shortcuts:** `j`/`k` or ↑/↓ move between sections · `1`–`9`
> jump to a section · `g`/`G` go to first/last · `t` toggles the theme.

---

## 🛠️ Available Scripts

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot reload           |
| `npm run typecheck` | Type-check the project with `tsc --noEmit`          |
| `npm run build`     | Typecheck + production build to `./dist`            |
| `npm run preview`   | Preview the production build locally                |
| `npm run deploy`    | Build and publish `./dist` to the `gh-pages` branch |

---

## 💐 Acknowledgements

Leaf stands on the shoulders of some lovely projects:

- **[mem.ac](https://mem.ac/)** — the content structure (about / education /
  experience / publications / awards) and the overall idea of a calm,
  personal academic homepage.
- **[Astro Theme Pure](https://github.com/cworld1/astro-theme-pure)** — the
  floating, scroll-aware top navigation: the transparent-to-pill morph, the
  hide-on-scroll-down behavior and the `grid-template-rows` mobile dropdown.
- Built with ❤️ using [React](https://react.dev/), [Vite](https://vite.dev/),
  [Tailwind CSS](https://tailwindcss.com/) and
  [Framer Motion](https://www.framer.com/motion/).

---

## 📄 License

MIT — free to use, modify, and share. Attribution appreciated but not
required.
