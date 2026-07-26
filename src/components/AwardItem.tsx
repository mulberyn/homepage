import { motion } from 'framer-motion'
import { Medal } from 'lucide-react'
import type { Award, Medal as MedalKind } from '../config/data'

/**
 * AwardItem
 * -------------------------------------------------------------------------
 * A single award — a clean, flat row (no card). The medal icon is colored by
 * `medal`: gold medals get a gold icon, silver medals a silver/gray icon.
 */

// Explicit medal colors (not theme accent) so gold ≠ silver in both modes.
const MEDAL_COLOR: Record<MedalKind, string> = {
  gold: '#d9a520', // warm gold
  silver: '#9ca3af', // cool silver/gray
}

export default function AwardItem({
  title,
  date,
  medal = 'silver',
  highlight,
}: Award) {
  return (
    <motion.li
      className="flex items-center gap-3.5 py-3"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Medal
        size={18}
        strokeWidth={2.2}
        className="shrink-0"
        style={{ color: MEDAL_COLOR[medal] ?? MEDAL_COLOR.silver }}
      />
      <h3
        className={`min-w-0 flex-1 truncate font-sans text-sm ${
          highlight
            ? 'font-semibold text-text-primary'
            : 'font-medium text-text-secondary'
        }`}
      >
        {title}
      </h3>
      <span className="shrink-0 font-sans text-xs font-medium text-text-muted">
        {date}
      </span>
    </motion.li>
  )
}
