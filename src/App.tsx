import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MainContent from './components/MainContent'
import ArcBackground from './components/ArcBackground'
import Seo from './components/Seo'
import useKeyboardNav from './hooks/useKeyboardNav'
import { useTheme } from './context/ThemeContext'

/**
 * App
 * -------------------------------------------------------------------------
 * Warm, fresh "小清新" layout:
 *   • flat SVG arc background (decorative, behind everything)
 *   • sticky top nav bar (no sidebar)
 *   • centered content: Hero identity header + MainContent sections
 * The theme provider lives one level up in main.tsx.
 */
export default function App() {
  const { toggleTheme } = useTheme()

  // Power-user keyboard navigation (j/k, arrows, 1–9, g/G, t). See the hook.
  useKeyboardNav({ toggleTheme })

  // NOTE: no `overflow-x-hidden` on the root — it creates a scroll container
  // that breaks the Navbar's `position: sticky`. The decorative arcs are
  // already clipped by ArcBackground's own fixed `overflow-hidden` wrapper.
  return (
    <div className="relative min-h-screen">
      {/* Side-effect only: sets document title, meta tags, JSON-LD. */}
      <Seo />

      {/* Decorative flat arcs behind all content. */}
      <ArcBackground />

      {/* Accessibility: skip straight to the content. */}
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[60] rounded-lg bg-primary px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <Navbar />

      {/* #main is the skip-link target (tabIndex -1 so focus lands here). */}
      <div id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <MainContent />
      </div>
    </div>
  )
}
