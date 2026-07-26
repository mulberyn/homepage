import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { userData } from '../config/data.js'
import ThemeToggle from './ThemeToggle.jsx'

/**
 * Navbar
 * -------------------------------------------------------------------------
 * Sticky top navigation bar (replaces the old fixed sidebar). Contains:
 *   • a monogram + name on the left
 *   • the section links with a sliding underline indicator (desktop)
 *   • the theme toggle
 *   • a hamburger menu that expands the links on mobile
 *
 * The active link is tracked with an IntersectionObserver scroll-spy, and
 * clicking a link smooth-scrolls to the section.
 */

// Derive a short monogram from the user's name, e.g. "Ada Lovelace" -> "AL".
function monogram(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function Navbar() {
  const [active, setActive] = useState(userData.navItems[0]?.id)
  const [open, setOpen] = useState(false) // mobile menu open?

  // Scroll-spy: highlight the nav item whose section is in view.
  useEffect(() => {
    const ids = userData.navItems.map((n) => n.id)
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Smooth-scroll to a section and close the mobile menu.
  const handleNavClick = (e, id) => {
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
        {/* ---- Brand / monogram ---- */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setOpen(false)
          }}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-white shadow-soft">
            {monogram(userData.name)}
          </span>
          <span className="hidden font-sans text-base font-bold text-text-primary sm:block">
            {userData.name}
          </span>
        </a>

        {/* ---- Desktop links ---- */}
        <ul className="hidden items-center gap-1 md:flex">
          {userData.navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative block rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                  {/* Sliding underline indicator. */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </a>
              </li>
            )
          })}
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
