import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ProjectEntry } from '../config/data'

/**
 * ProjectItem
 * -------------------------------------------------------------------------
 * One project in the Projects grid. Kept deliberately light — a hairline
 * border on the soft card surface rather than a heavy card — to match the
 * flat look of the other sections. With a `url` the WHOLE item is a link
 * (new tab) and shows an ArrowUpRight glyph beside the title; hovering
 * lifts it a touch and warms the border. Without a `url` it renders as a
 * static block: no arrow, no hover motion.
 */
export default function ProjectItem({ title, description, url, tech }: ProjectEntry) {
  const clickable = Boolean(url)

  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`font-sans text-base font-bold text-text-primary transition-colors duration-200 ${
            clickable ? 'group-hover:text-primary' : ''
          }`}
        >
          {title}
        </h3>
        {clickable && (
          <ArrowUpRight
            aria-hidden
            size={16}
            strokeWidth={2}
            className="mt-1 shrink-0 text-text-muted transition-colors duration-200 group-hover:text-primary"
          />
        )}
      </div>

      {description && (
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      )}

      {tech && tech.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-bg-alt px-2 py-0.5 font-sans text-[11px] font-medium text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  )

  // Shared surface; hover lift/recolor only when the item links somewhere.
  const surface = `flex h-full flex-col rounded-xl border border-border bg-bg-card p-4 ${
    clickable
      ? 'group transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary-soft hover:shadow-soft'
      : ''
  }`

  const wrap = (children: ReactNode) =>
    clickable ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} (opens in a new tab)`}
        className={surface}
      >
        {children}
      </a>
    ) : (
      <div className={surface}>{children}</div>
    )

  return (
    <motion.li
      className="h-full"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {wrap(inner)}
    </motion.li>
  )
}
