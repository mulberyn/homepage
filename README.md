# 🌿 Academic Homepage — Warm & Fresh Edition

A modern, cozy, fully-customizable personal academic homepage with a light,
airy **"小清新" (xiao qing xin)** aesthetic — inspired by the structure of
[mem.ac](https://mem.ac/), reimagined in warm pastels. Built with **React +
Vite + Tailwind CSS + Framer Motion**, and ready to deploy to **GitHub Pages**
in minutes.

<p align="center">
  <em>Sticky top nav · Warm coral + cream palette · Pastel section panels · Flat arc backgrounds · Gentle scroll animations</em>
</p>

---

## ✨ Features

- **Sticky top navigation** — no sidebar; a clean sticky nav bar with a sliding
  active-link underline. Collapses into a **hamburger menu** on mobile.
- **Centered content** — comfortable, readable ~900px column below the nav.
- **Warm, fresh palette** — creamy off-white backgrounds (`#FFFAF7`) with a
  **warm coral accent** (`#E88F7A`) and soft pastel section panels
  (peach / sky / mint / blush). No heavy gradients.
- **Two light themes** — "Fresh" and a toastier "Creamy Warm", toggled live and
  remembered across visits. No jarring dark mode.
- **Flat arc backgrounds** — elegant, low-opacity SVG arcs and circles that scale
  to any screen (purely decorative, never distracting).
- **Typography** — **Inter** (clean sans) for headings/UI, **Lora** (readable
  serif) for body. Light and airy.
- **Gentle motion** — Framer Motion `whileInView` fade-ups, sliding nav
  underline, soft card hover lifts. `prefers-reduced-motion` respected.
- **Zero-code customization** — everything lives in one well-commented file:
  [`src/config/data.js`](src/config/data.js).
- **SEO, PWA, keyboard nav & more** — see [Improvements](#-improvements) below.

---

## 🔎 Inspired by mem.ac — reimagined fresh

The **content structure** follows mem.ac; the **look and feel** deliberately
diverge toward a warm, cozy "小清新" aesthetic:

| Aspect          | mem.ac approach                                     | This project (Warm & Fresh)                                          |
| --------------- | --------------------------------------------------- | -------------------------------------------------------------------- |
| **Layout**      | Fixed left sidebar + scrollable content             | **Sticky top nav bar** + centered ~900px column (hamburger on mobile) |
| **Palette**     | Soft lavender / purple                              | **Warm coral + cream**; NOT purple                                   |
| **Sections**    | Flat background                                     | **Alternating pastel panels** (peach / sky / mint / blush)           |
| **Theme**       | Dark mode + multiple palettes                       | **Two light themes** (Fresh / Creamy Warm) — cozy, no dark mode      |
| **Typography**  | Serif body + monospace metadata                     | **Inter** headings + **Lora** serif body — light & airy              |
| **Decoration**  | Ambient glow blobs                                  | **Flat, low-opacity SVG arcs & circles**                             |
| **Motion**      | Subtle scroll reveals & micro-interactions          | Framer Motion fade-ups, sliding nav underline, hover lifts           |
| **Content**     | About, education, experience, publications, awards  | Same sections, all driven by `src/config/data.js`                    |

---

## 🚀 Quick Start (5 minutes)

You only need to edit **one file** to make this yours: `src/config/data.js`.

### 1. Local Development

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

Open **`src/config/data.js`** and edit the `userData` object — your name, bio,
education, experience, publications, awards, and social links. The file is
heavily commented; you don't need to touch any other file.

> 💡 In the `about` bio, wrap words in `**double asterisks**` to give them the
> fluorescent highlighter effect.

### 3. Replace the placeholder images

Drop your own files into the **`public/`** folder and point `data.js` at them:

| File               | Used for                          | Referenced in `data.js` as |
| ------------------ | --------------------------------- | -------------------------- |
| `public/avatar.*`  | Your profile photo (square)       | `avatar: '/avatar.jpg'`    |
| `public/thumb1.*`  | Publication thumbnails (optional) | `thumbnail: '/thumb1.jpg'` |

Placeholders (`avatar.svg`, `thumb1.svg`, `thumb2.svg`) ship so the site works
immediately — just overwrite them, and update the paths if you change the file
extension.

### 4. Build for production

```bash
npm run build      # outputs static files to ./dist
npm run preview    # locally preview the production build
```

---

## 🌐 Deploy to GitHub Pages

There are two ways to deploy. **Automatic (GitHub Actions)** is recommended.

### Prerequisites (one-time setup)

1. Push this project to a GitHub repository.
2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set the branch to **`gh-pages`** and folder to **`/ (root)`**, then **Save**.
   _(The `gh-pages` branch is created for you the first time you deploy.)_

### Option A — Automatic deploy with GitHub Actions ✅ (recommended)

This repo includes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
On every push to `main` (or `master`) it will:

1. Install dependencies and build the site.
2. Automatically set the correct base path to `/<repository-name>/`.
3. Publish the `dist/` folder to the `gh-pages` branch using the built-in
   `GITHUB_TOKEN` — **no personal access token or secrets to configure.**

Just push your changes:

```bash
git add .
git commit -m "Set up my homepage"
git push origin main
```

Watch it run under the repo's **Actions** tab. When it finishes, your site is
live at:

```
https://<username>.github.io/<repository-name>/
```

> If the first run can't push, go to **Settings → Actions → General →
> Workflow permissions** and enable **Read and write permissions**.

### Option B — Manual deploy from your machine

```bash
npm run deploy
```

This runs the build and publishes `dist/` to the `gh-pages` branch via the
[`gh-pages`](https://www.npmjs.com/package/gh-pages) package.

> ⚠️ **Set the base path first** for a manual deploy. Create a `.env` file (see
> [`.env.example`](.env.example)) with `VITE_BASE_URL=/<repository-name>/`, then
> run `npm run deploy`. The GitHub Actions workflow sets this automatically, so
> you only need it for manual deploys.

### Custom domain

1. In **Settings → Pages → Custom domain**, enter your domain and save (this
   creates a `CNAME` file on the `gh-pages` branch).
2. Set `VITE_BASE_URL=/` (root) — a custom domain serves from the root, not a
   subpath. In `deploy.yml`, change the build step's env to
   `VITE_BASE_URL: "/"`, and uncomment the `cname:` line under the deploy step.
3. Point your domain's DNS at GitHub Pages per the
   [official guide](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

### User/organization site (`<username>.github.io`)

If your repo is named `<username>.github.io`, the site serves from the root.
Set `VITE_BASE_URL=/` (edit the `deploy.yml` build env to `"/"`).

---

## ⚙️ Environment Variables

| Variable        | Default | Description                                                                                              |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `VITE_BASE_URL` | `/`     | The public base path Vite serves from. For a project site use `/<repository-name>/` (keep both slashes). |

Local dev and root/custom-domain deploys use `/`. Project-site deploys use
`/<repository-name>/`. See [`.env.example`](.env.example) for details. The
GitHub Actions workflow injects this value automatically from the repo name.

---

## 📁 Project Structure

```
.
├── .github/workflows/deploy.yml   # CI: build + deploy to gh-pages
├── public/                        # Static assets (avatar, thumbnails, favicon)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky top nav, sliding underline, hamburger
│   │   ├── Hero.jsx             # Avatar + name + title + socials (identity)
│   │   ├── ArcBackground.jsx     # Flat decorative SVG arcs & circles
│   │   ├── MainContent.jsx        # All sections container + bio highlighter
│   │   ├── Section.jsx            # Reusable pastel-panel wrapper w/ reveal
│   │   ├── ThemeToggle.jsx        # Fresh / Creamy Warm toggle
│   │   ├── TimelineItem.jsx       # Education & Experience rows
│   │   ├── PublicationCard.jsx    # Publication cards
│   │   ├── AwardItem.jsx          # Awards list rows
│   │   ├── Seo.jsx               # Meta tags + Open Graph + JSON-LD (SEO)
│   │   └── ScrollProgress.jsx     # Reading-progress bar
│   ├── hooks/
│   │   └── useKeyboardNav.js      # j/k, arrows, 1–9, g/G, t shortcuts
│   ├── config/
│   │   └── data.js               # 👈 ALL your personal info lives here
│   ├── context/
│   │   └── ThemeContext.jsx      # Global theme state (light / warm, Context API)
│   ├── styles/
│   │   └── index.css             # Tailwind + CSS-variable theme + print styles
│   ├── App.jsx                    # Layout: arcs, Navbar, Hero, content, SEO
│   └── main.jsx                   # React entry point
├── index.html
├── vite.config.js                 # base path (VITE_BASE_URL) + PWA config
├── tailwind.config.js
└── package.json
```

---

## 🎨 Customization Cheatsheet

| I want to…                    | Do this                                                              |
| ----------------------------- | ------------------------------------------------------------------- |
| Change any text/content       | Edit `src/config/data.js`                                            |
| Reorder or hide a section     | Reorder / remove entries in `navItems` (in `data.js`)               |
| Change my photo               | Replace `public/avatar.svg` and update `avatar` in `data.js`        |
| Tweak the coral accent / tints | Edit the CSS variables in `src/styles/index.css` (`--color-primary`, `--tint-*`) |
| Change the section panel colors | Reorder the `TINTS` array in `src/components/MainContent.jsx`       |
| Adjust the background arcs     | Edit `src/components/ArcBackground.jsx`                              |
| Add a new publication link    | Add a key to a publication's `links` (e.g. `slides`, `video`)       |

> ⌨️ **Keyboard shortcuts:** `j`/`k` or ↑/↓ move between sections · `1`–`9` jump
> to a section · `g`/`G` go to first/last · `t` toggles the theme.

---

## 🛠️ Available Scripts

| Command           | What it does                                            |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload               |
| `npm run build`   | Production build to `./dist`                            |
| `npm run preview` | Preview the production build locally                    |
| `npm run deploy`  | Build and publish `./dist` to the `gh-pages` branch     |

---

## 🚀 Improvements

After the initial build, the project went through a **continuous-improvement
pass**. Below are the improvements that were proposed, and which were
implemented. See [`CHANGELOG.md`](CHANGELOG.md) for the full detail.

### ✅ Implemented

1. **SEO & social sharing** — dynamic `<title>`, meta description/keywords,
   Open Graph + Twitter cards, and `schema.org/Person` **JSON-LD** structured
   data, all generated from your `data.js`. Configure via the new `seo` block in
   `src/config/data.js`. → [`src/components/Seo.jsx`](src/components/Seo.jsx)
2. **Progressive Web App (PWA)** — installable and **offline-capable** via an
   auto-generated manifest + service worker (`vite-plugin-pwa`), base-path aware
   for GitHub Pages. → [`vite.config.js`](vite.config.js)
3. **Keyboard navigation** — `j`/`k` & arrows move between sections, `1`–`9`
   jump directly, `g`/`G` go to first/last, `t` toggles theme.
   → [`src/hooks/useKeyboardNav.js`](src/hooks/useKeyboardNav.js)
4. **Accessibility** — "skip to content" link, palette-aware `:focus-visible`
   outlines, and a focusable main landmark.
5. **Reading-progress bar + print stylesheet** — a spring-based scroll indicator
   ([`ScrollProgress.jsx`](src/components/ScrollProgress.jsx)) and a clean,
   single-column, ink-friendly CV printout.

### 💡 Proposed for future iterations

- **Internationalization (i18n)** — multi-language `data.js` variants with a
  language switcher in the nav bar.
- **Real PNG PWA icons + screenshots** — add `pwa-192.png` / `pwa-512.png` and
  manifest screenshots for full Chrome/Android install prompts.
- **Publication filtering/search** — filter by year, venue, or tag, with a
  BibTeX export button.
- **Automated Lighthouse CI** — a GitHub Action that fails the build if
  performance/accessibility scores regress.
- **Blog / notes section** — Markdown-driven posts via a `content/` folder.

---

## 📄 License

MIT — free to use, modify, and share. Attribution appreciated but not required.

Built with ❤️ using React, Vite, Tailwind CSS, and Framer Motion.
