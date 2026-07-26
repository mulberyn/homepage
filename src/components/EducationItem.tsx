import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { asset } from '../utils/asset'
import type { EducationEntry } from '../config/data'

/**
 * EducationItem
 * -------------------------------------------------------------------------
 * A single education entry with a small school logo/badge on the left, the
 * school name, major, and degree · dates. Flat and minimal — no card.
 *
 * The logo path is resolved against the deploy base (GitHub Pages serves the
 * site from "/<repo>/", so a raw "/images/…" path would 404 there). If the
 * image still fails to load, a GraduationCap icon fills the same frame so the
 * layout never collapses or shows a broken-image glyph.
 */
export default function EducationItem({
  school,
  logo,
  major,
  degree,
  dates,
}: EducationEntry) {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <motion.li
      className="flex items-start gap-4"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* School logo/badge (~44px), framed so any logo shape — square SVG,
          transparent PNG, wide wordmark — sits neatly and stays aligned. */}
      {logo &&
        (logoFailed ? (
          <span
            aria-hidden
            className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-bg-card text-primary"
          >
            <GraduationCap size={24} strokeWidth={1.75} />
          </span>
        ) : (
          <img
            src={asset(logo)}
            alt={`${school} logo`}
            loading="lazy"
            onError={() => setLogoFailed(true)}
            className="mt-0.5 h-11 w-11 shrink-0 rounded-lg border border-border bg-bg-card object-contain p-1"
          />
        ))}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="font-sans text-base font-bold text-text-primary">
            {school}
          </h3>
          <span className="font-sans text-xs font-medium uppercase tracking-wider text-text-muted">
            {dates}
          </span>
        </div>
        {major && (
          <p className="mt-0.5 text-sm text-text-secondary">{major}</p>
        )}
        {degree && (
          <p className="mt-0.5 font-sans text-xs font-semibold text-primary">
            {degree}
          </p>
        )}
      </div>
    </motion.li>
  )
}
