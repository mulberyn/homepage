import { motion } from 'framer-motion'

interface TimelineItemProps {
  date?: string
  title: string
  subtitle?: string
  description?: string
  isLast?: boolean
}

/**
 * TimelineItem
 * -------------------------------------------------------------------------
 * One entry on the vertical timeline (used for Experience). Renders a small
 * circle node sitting on the parent <TimelineList>'s dashed line, with the
 * date, title, subtitle (company), and description to the right.
 */
export default function TimelineItem({
  date,
  title,
  subtitle,
  description,
  isLast,
}: TimelineItemProps) {
  return (
    <motion.li
      className="group relative pl-8"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Dashed connector down to the next node (hidden on the last item).
          Height = this item + the 1.75rem gap, so it ends exactly at the next
          node's center. */}
      {!isLast && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-[6px] top-2 h-[calc(100%+1.75rem)] border-l border-dashed border-border"
        />
      )}

      {/* Node dot: anchored to the li's left (x≈6px, on the dashed line) and
          vertically centered to the date's line box (top-2 = 8px center, then
          shifted up half its own height). */}
      <span className="absolute left-0 top-2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-primary bg-bg transition-colors duration-300 group-hover:bg-primary" />

      {date && (
        <time className="block font-sans text-xs font-medium uppercase tracking-wider text-text-muted">
          {date}
        </time>
      )}
      <h3 className="mt-0.5 font-sans text-base font-bold text-text-primary">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm font-semibold text-primary">{subtitle}</p>
      )}
      {description && (
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </motion.li>
  )
}
