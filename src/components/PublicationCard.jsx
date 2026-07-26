import { motion } from 'framer-motion'
import { FileText, Github, ExternalLink, BookOpen, Quote } from 'lucide-react'

/**
 * PublicationCard
 * -------------------------------------------------------------------------
 * One publication in the Publications grid. Shows an optional thumbnail, the
 * title/authors/venue, and a row of link buttons built from the `links` object
 * in data.js. Unknown link keys still render with a generic icon + the key as
 * its label, so you can add e.g. `slides`, `video`, `poster` freely.
 */

// Map known link keys to an icon + label. Anything not listed falls back to a
// generic external-link icon and a Title-Cased label.
const LINK_META = {
  pdf: { icon: FileText, label: 'PDF' },
  code: { icon: Github, label: 'Code' },
  project: { icon: ExternalLink, label: 'Project' },
  arxiv: { icon: BookOpen, label: 'arXiv' },
  bibtex: { icon: Quote, label: 'BibTeX' },
}

const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export default function PublicationCard({ publication }) {
  const { title, authors, venue, year, thumbnail, links = {} } = publication

  // Keep only links that actually have a value.
  const linkEntries = Object.entries(links).filter(([, url]) => url)

  return (
    <motion.article
      className="group flex gap-4 rounded-2xl border border-border bg-bg-card p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-soft hover:shadow-lift sm:p-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {/* Optional thumbnail. Hidden entirely if no image is provided. */}
      {thumbnail && (
        <div className="hidden w-28 shrink-0 overflow-hidden rounded-xl bg-surface sm:block">
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-surface px-2.5 py-0.5 font-sans text-[11px] font-semibold text-primary">
            {venue} {year}
          </span>
        </div>

        <h3 className="font-sans text-base font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 text-sm text-text-secondary">{authors}</p>

        {linkEntries.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {linkEntries.map(([key, url]) => {
              const meta = LINK_META[key] || {
                icon: ExternalLink,
                label: titleCase(key),
              }
              const Icon = meta.icon
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-sans text-xs font-medium text-text-secondary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon size={13} strokeWidth={2.2} />
                  {meta.label}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </motion.article>
  )
}
