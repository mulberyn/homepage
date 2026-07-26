import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExternalLink } from 'lucide-react'
import aboutRaw from '../config/about.md?raw'

/**
 * AboutMarkdown
 * -------------------------------------------------------------------------
 * Renders the About bio from src/config/about.md (embedded at build time via
 * Vite's `?raw` import, so dev and production behave identically). Every
 * element is restyled to the site's letter-like look:
 *
 *   • `p`          — serif body text, same rhythm as the old RichBio
 *   • `strong`     — the coral "highlighter" band (.highlight in index.css:
 *                    an inset box-shadow hugging the baseline, so it adds no
 *                    line-height)
 *   • `blockquote` — accent bar on the left, whisper of warm background,
 *                    slightly quieter italic text; adapts to both themes via
 *                    the CSS-variable palette
 *   • `a`          — accent-colored link that opens in a new tab, with a tiny
 *                    ExternalLink glyph riding the top-right corner
 *   • `ul` / `ol`  — coral markers, comfortable indent
 *
 * HTML comments (like the how-to note at the top of about.md) are stripped
 * before rendering — react-markdown would otherwise print them verbatim.
 */

const aboutMarkdown = aboutRaw.replace(/<!--[\s\S]*?-->/g, '').trim()

/** True when about.md has any renderable text — used to gate the section. */
export const hasAboutContent = aboutMarkdown.length > 0

const components: Components = {
  p: ({ children }) => (
    <p className="text-text-secondary [&:not(:first-child)]:mt-3">{children}</p>
  ),

  // The .highlight class paints the coral band via an inset box-shadow, so it
  // hugs the text without adding any line height (same as the old RichBio).
  strong: ({ children }) => <strong className="highlight">{children}</strong>,

  blockquote: ({ children }) => (
    <blockquote className="my-3 rounded-r-lg border-l-[3px] border-primary bg-bg-alt py-2 pl-4 pr-4 italic text-text-secondary [&>p]:text-[0.95em]">
      {children}
    </blockquote>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors duration-200 hover:text-primary-soft hover:decoration-primary-soft"
    >
      {children}
      <ExternalLink
        aria-hidden
        className="ml-px inline-block h-[0.8em] w-[0.8em] align-[0.35em]"
        strokeWidth={2.25}
      />
    </a>
  ),

  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-1 pl-5 text-text-secondary marker:text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-1 pl-5 text-text-secondary marker:font-sans marker:text-sm marker:text-primary">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,

  // Any headings inside the bio stay subordinate to the section's own h2.
  h1: ({ children }) => (
    <h3 className="mt-5 font-sans text-lg font-semibold text-text-primary first:mt-0">
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3 className="mt-5 font-sans text-lg font-semibold text-text-primary first:mt-0">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mt-4 font-sans text-base font-semibold text-text-primary first:mt-0">
      {children}
    </h4>
  ),

  code: ({ children }) => (
    <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-text-primary">
      {children}
    </code>
  ),
}

export default function AboutMarkdown() {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {aboutMarkdown}
    </ReactMarkdown>
  )
}
