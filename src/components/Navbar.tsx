import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { userData } from '../config/data'
import ThemeToggle from './ThemeToggle'

/**
 * Navbar
 * -------------------------------------------------------------------------
 * Sticky top navigation bar (replaces the old fixed sidebar). Contains:
 *   • a cursive "mulberyn" brand logo on the left
 *   • the section links with a sliding underline indicator (desktop)
 *   • the theme toggle
 *   • a hamburger menu that expands the links on mobile
 *
 * The active link is tracked with a scroll-position spy, and clicking a link
 * smooth-scrolls to the section.
 */

interface Indicator {
  left: number
  width: number
  ready: boolean
}

export default function Navbar() {
  const [active, setActive] = useState<string | undefined>(
    userData.navItems[0]?.id
  )
  const [open, setOpen] = useState(false) // mobile menu open?

  // ---- Sliding underline indicator (ref-based, glitch-free) ----
  // Instead of a Framer `layoutId` (which animates on mount/unmount and can
  // stutter across distant items), we keep ONE persistent underline and drive
  // its left/width from the measured position of the active link. This gives a
  // smooth, direct slide across any distance.
  const listRef = useRef<HTMLUListElement | null>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [indicator, setIndicator] = useState<Indicator>({
    left: 0,
    width: 0,
    ready: false,
  })

  const measure = () => {
    const ul = listRef.current
    const el = active ? linkRefs.current[active] : null
    if (ul && el) {
      // Measure the link relative to the <ul> (robust regardless of which
      // ancestor is the positioning context — offsetLeft can resolve against
      // the sticky <header> instead of the <ul>).
      const ulBox = ul.getBoundingClientRect()
      const box = el.getBoundingClientRect()
      const inset = 12 // underline is narrower than the link's padding
      setIndicator({
        left: box.left - ulBox.left + inset,
        width: Math.max(0, box.width - inset * 2),
        ready: true,
      })
    }
  }

  // Measure before paint whenever the active item changes (no flash).
  useLayoutEffect(measure, [active])

  // Re-measure on resize and once web fonts finish loading (they shift widths).
  useEffect(() => {
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Scroll-spy: highlight the nav item for the section currently in view.
  // Uses scroll position (not IntersectionObserver) so the LAST section can
  // still become active even when it's too short to reach a viewport band —
  // a bottom-of-page guard forces the last section at the very bottom.
  useEffect(() => {
    const ids = userData.navItems.map((n) => n.id)
    let raf = 0

    const update = () => {
      raf = 0
      // Viewport line at 35% down; a section is "active" once its top passes it.
      // Use getBoundingClientRect (viewport-relative) — NOT offsetTop, which is
      // relative to the positioned ancestor and would mis-compute the position.
      const markerVp = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= markerVp) current = id
      }
      // At (or near) the bottom of the page, always show the last section.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update() // initial
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Smooth-scroll to a section and close the mobile menu.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        {/* ---- Brand: cursive script logo, revealed once on load by a
             left-to-right "handwriting" mask sweep (see .brand-write). ---- */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setOpen(false)
          }}
          className="brand-write font-script text-[1.75rem] font-bold leading-none text-primary transition-colors duration-200 hover:text-primary-soft"
        >
          {userData.githubHandle || 'mulberyn'}
        </a>

        {/* ---- Desktop links ---- */}
        <ul ref={listRef} className="relative hidden items-center gap-1 md:flex">
          {userData.navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  ref={(el) => {
                    linkRefs.current[item.id] = el
                  }}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}

          {/* ONE persistent sliding underline, positioned from the active
              link's measured geometry. Smooth across any distance. */}
          <motion.span
            aria-hidden
            className="absolute -bottom-0.5 h-0.5 rounded-full bg-primary"
            initial={false}
            animate={{ left: indicator.left, width: indicator.width }}
            style={{ opacity: indicator.ready ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 38, mass: 0.8 }}
          />
        </ul>

        {/* ---- Right controls ---- */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-card text-text-primary shadow-soft md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ---- Mobile dropdown menu ---- */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-md md:hidden"
          >
            {userData.navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`block px-6 py-3 font-sans text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-surface text-primary'
                        : 'text-text-secondary hover:bg-surface'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
