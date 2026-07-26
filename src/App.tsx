import TopNav from './components/TopNav'
import ProfileSidebar from './components/ProfileSidebar'
import MainContent from './components/MainContent'
import ArcBackground from './components/ArcBackground'
import Seo from './components/Seo'
import useKeyboardNav from './hooks/useKeyboardNav'
import { useTheme } from './context/ThemeContext'

/**
 * App
 * -------------------------------------------------------------------------
 * Warm, fresh layout:
 *   • flat SVG arc background (decorative, behind everything)
 *   • sticky TopNav with the section links (all screen sizes)
 *   • a centered page container (max 1240px, padded — nothing hugs the
 *     screen edge) holding the navigation-free identity sidebar and the
 *     scrolling content column side by side (≥960px); below 960px the
 *     sidebar folds into the top of the flow and everything stacks.
 * The theme provider lives one level up in main.tsx.
 */
export default function App() {
  const { toggleTheme } = useTheme()

  // Power-user keyboard navigation (j/k, arrows, 1–9, g/G, t). See the hook.
  useKeyboardNav({ toggleTheme })

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

      <TopNav />

      {/* #main is the skip-link target (tabIndex -1 so focus lands here). */}
      <div id="main" tabIndex={-1} className="outline-none">
        {/* Centered page container: sidebar + content share it, so the
            sidebar keeps a comfortable inset from the left screen edge. */}
        <div className="mx-auto flex w-full max-w-[1240px] flex-col px-5 sm:px-8 side:flex-row side:gap-10">
          <ProfileSidebar />
          <MainContent />
        </div>
      </div>
    </div>
  )
}
