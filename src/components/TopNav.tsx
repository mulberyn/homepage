import type { MouseEvent } from 'react'
import { userData } from '../config/data'
import useScrollSpy from '../hooks/useScrollSpy'
import ThemeToggle from './ThemeToggle'

/**
 * TopNav
 * -------------------------------------------------------------------------
 * The sticky top navigation bar, shown at every screen size, separated from
 * the content by a warm hairline (border-bottom). The cursive "mulberyn"
 * brand (written out once on load — see .brand-write) sits at the bar's far
 * left, inset on desktop so its left edge roughly lines up with the sidebar
 * avatar below. The five section links form their own centered group — far
 * from the brand by construction — and the theme toggle sits at the right
 * edge.
 *
 * Centering: a 3-column grid (1fr | auto | 1fr) keeps the link group truly
 * centered in the page while the brand and toggle live in the outer
 * columns — no overlap, no off-center drift.
 *
 * The active link is highlighted with the accent text color and a small dot
 * beneath it. Each link owns its own dot — nothing slides between items, so
 * there is no cross-item animation to stutter, by construction.
 *
 * On narrow screens the link row scrolls horizontally (scrollbar hidden)
 * instead of collapsing into a hamburger, so every section stays one tap
 * away.
 */
export default function TopNav() {
  const { active, scrollTo } = useScrollSpy()

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollTo(id)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav
        aria-label="Sections"
        className="mx-auto grid h-16 w-full max-w-[1240px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8"
      >
        {/* Brand at the far left. The desktop inset (side:pl) nudges its
            left edge to roughly match the sidebar avatar's left edge below
            (avatar ring starts ~69px into the 270px sidebar column). */}
        <div className="flex justify-start side:pl-[69px]">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="brand-write shrink-0 font-script text-[1.6rem] font-bold text-primary transition-colors duration-200 hover:text-primary-soft"
          >
            {userData.githubHandle || 'mulberyn'}
          </a>
        </div>

        {/* Centered link group — the wide gap to the brand falls out of the
            grid naturally; spacing BETWEEN the links is unchanged. */}
        <div className="flex min-w-0 items-center">
          <ul className="scrollbar-none -mx-1 flex min-w-0 items-center gap-1 overflow-x-auto px-1">
            {userData.navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-3 py-2 font-sans text-sm transition-colors duration-200 sm:px-4 ${
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
                      className={`absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-primary transition-opacity duration-200 sm:inset-x-4 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
