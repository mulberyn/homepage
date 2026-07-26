import type { MouseEvent } from 'react'
import { userData } from '../config/data'
import useScrollSpy from '../hooks/useScrollSpy'
import ThemeToggle from './ThemeToggle'

/**
 * TopNav
 * -------------------------------------------------------------------------
 * The sticky top navigation bar, shown at every screen size, separated from
 * the content by a warm hairline (border-bottom). Its content is a centered
 * group: the cursive "mulberyn" brand (written out once on load — see
 * .brand-write) on the left, with the five section links right after it.
 * The theme toggle sits at the bar's right edge.
 *
 * Centering: a 3-column grid (1fr | auto | 1fr) keeps the brand + links
 * group truly centered in the page while the toggle lives in the right
 * column — no overlap, no off-center drift.
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
        {/* Left spacer — balances the toggle column so the middle group is
            centered relative to the page, not just the leftover space. */}
        <span aria-hidden />

        {/* Centered group: brand on the left, section links right after,
            with a clear breathing gap between the two. */}
        <div className="flex min-w-0 items-center gap-4 sm:gap-8">
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
