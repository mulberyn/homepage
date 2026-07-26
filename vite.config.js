import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
//
// The `base` option controls the public path the app is served from.
// For GitHub Pages "project" sites the app lives at
//   https://<username>.github.io/<repository-name>/
// so `base` MUST be "/<repository-name>/" (with the leading and trailing slash).
//
// We read it from the VITE_BASE_URL environment variable so you never have to
// touch this file — just set VITE_BASE_URL in a `.env` file (see .env.example)
// or in your GitHub Actions workflow. It falls back to "/" for local dev.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_URL || '/'

  return {
    base,
    plugins: [
      react(),
      // ---- PWA: installable + offline-capable ----
      // Generates a web app manifest and a service worker that precaches the
      // built assets, so the site loads instantly on repeat visits and works
      // offline. `registerType: autoUpdate` transparently updates the SW when
      // you deploy a new build.
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'Academic Homepage',
          short_name: 'Homepage',
          description: 'Personal academic homepage.',
          theme_color: '#e88f7a',
          background_color: '#fffaf7',
          display: 'standalone',
          // start_url / scope respect the deploy base path automatically.
          start_url: base,
          scope: base,
          icons: [
            // SVG icon works for the tab + many install targets. For the best
            // installability (Chrome/Android) also add PNG icons named
            // pwa-192.png and pwa-512.png to /public and list them here.
            {
              src: 'favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          // Cache the core static assets produced by the build.
          globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        },
      }),
    ],
  }
})
