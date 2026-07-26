import { useEffect, useState, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { userData } from '../config/data'
import useScrollSpy from '../hooks/useScrollSpy'
import useHeaderScroll from '../hooks/useHeaderScroll'
import ThemeToggle from './ThemeToggle'

/**
 * TopNav
 * -------------------------------------------------------------------------
 * A floating, scroll-aware navigation bar in the style of Astro Theme Pure,
 * restyled with this project's warm palette:
 *
 *   • At the very top of the page the bar is TRANSPARENT and full-width —
 *     just the cursive brand (written out once on load — see .brand-write),
 *     the section links and the theme toggle sitting over the page.
 *   • Past 20px of scroll (`notTop`) it detaches into a warm "pill": rounded
 *     corners, hairline border, translucent blurred background, soft shadow,
 *     and on ≥640px screens it also pulls its sides in (margin-inline), so
 *     it visibly contracts into a floating capsule. All of it transitions.
 *   • Scrolling DOWN past 350px slides the bar off the top; any upward
 *     scroll brings it straight back (never while the mobile menu is open).
 *
 * The active link is highlighted with the accent color and a small underline
 * that spans exactly the label. Each link owns its own underline — nothing
 * slides between items, so there is no cross-item animation to stutter.
 *
 * Layout: the brand is pinned left and the link group fills the remaining
 * space (flex-1). On narrow screens (640–960px) the links CENTER in that
 * space so they don't crowd either edge; at ≥960px (`side:`) they align
 * right next to the theme toggle, matching Pure's desktop look.
 *
 * Below 640px the links collapse behind a hamburger; the menu drops down as
 * a warm card and expands with a `grid-template-rows: 0fr → 1fr` transition
 * (the same technique Pure uses), with centered links.
 */
export default function TopNav() {
  const { active, scrollTo } = useScrollSpy()
  const { notTop, hidden } = useHeaderScroll()
  const [expanded, setExpanded] = useState(false)

  // The pill needs a solid-ish surface whenever it floats OR the mobile menu
  // is open (for legibility over the page even at the very top).
  const surfaced = notTop || expanded

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setExpanded(false)
    scrollTo(id)
  }

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  return (
    <header
      className={`sticky top-3 z-40 transition-transform duration-300 ${
        hidden && !expanded ? '-translate-y-24' : ''
      }`}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8">
        <nav
          aria-label="Sections"
          className={`relative flex h-14 items-center justify-between rounded-2xl border transition-[margin,padding,background-color,border-color,box-shadow] duration-300 ${
            surfaced
              ? 'border-border bg-bg-veil px-3 shadow-soft backdrop-blur-md sm:px-4'
              : 'border-transparent px-1'
          } ${notTop ? 'sm:mx-[7%]' : 'sm:mx-0'}`}
        >
          {/* Brand at the far left. */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="brand-write shrink-0 px-2 font-script text-[1.35rem] font-bold text-primary transition-colors duration-200 hover:text-primary-soft sm:text-[1.5rem]"
          >
            {userData.githubHandle || 'mulberyn'}
          </a>

          {/* Link group (≥640px): fills the space between brand and toggle,
              centered on narrow screens, right-aligned on ≥960px. */}
          <ul className="hidden min-w-0 flex-1 items-center justify-center sm:flex side:justify-end">
            {userData.navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-3 py-2 font-sans text-sm transition-colors duration-200 ${
                      isActive
                        ? 'font-semibold text-primary'
                        : 'font-medium text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                    {/* Per-item active underline: spans exactly the label
                        text (insets match the link's padding) and fades in
                        place — no sliding between items, no stutter. */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-primary transition-opacity duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Theme toggle + hamburger (<640px), pinned right. */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            {/* Mobile menu toggle, styled to match ThemeToggle. */}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="topnav-mobile-menu"
              aria-label={expanded ? 'Close menu' : 'Open menu'}
              className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-bg-card text-primary transition-colors duration-300 hover:border-primary-soft sm:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={expanded ? 'close' : 'open'}
                  initial={{ y: 14, opacity: 0, rotate: -20 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -14, opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {expanded ? <X size={17} /> : <Menu size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile dropdown: a warm card just below the pill. The height
              animates via the grid-template-rows 0fr→1fr trick (the inner
              wrapper's overflow-hidden makes the row collapsible). */}
          <div
            id="topnav-mobile-menu"
            className={`absolute inset-x-0 top-[calc(100%+0.5rem)] grid rounded-2xl border transition-[grid-template-rows,opacity,border-color,box-shadow] duration-300 sm:hidden ${
              expanded
                ? 'grid-rows-[1fr] border-border bg-card-veil opacity-100 shadow-soft backdrop-blur-md'
                : 'pointer-events-none grid-rows-[0fr] border-transparent opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-col px-5 py-2">
                {userData.navItems.map((item) => {
                  const isActive = active === item.id
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        aria-current={isActive ? 'true' : undefined}
                        tabIndex={expanded ? undefined : -1}
                        className={`block w-full py-2 text-center font-sans text-sm transition-colors duration-200 ${
                          isActive
                            ? 'font-semibold text-primary'
                            : 'font-medium text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
