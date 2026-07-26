import { useEffect } from 'react'
import { userData } from '../config/data.js'

/**
 * Seo
 * -------------------------------------------------------------------------
 * A tiny, dependency-free SEO manager. On mount it sets:
 *   • document.title and <html lang>
 *   • meta description + keywords
 *   • Open Graph + Twitter Card tags (rich link previews)
 *   • JSON-LD structured data (schema.org Person) so search engines can
 *     understand who the page is about.
 *
 * Everything is derived from `userData` (config/data.js) — no extra library
 * (react-helmet etc.) needed. Values are read once; this is a static page.
 */

// Create or update a <meta> tag by name or property.
function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function Seo() {
  useEffect(() => {
    const { name, title, affiliation, avatar, socials = {} } = userData
    const seo = userData.seo || {}

    const pageTitle = `${name} — ${title}`
    const description =
      seo.description || `${name}, ${title} at ${affiliation}.`
    const image = seo.ogImage || avatar
    // Resolve relative asset paths against the deployed base (Vite injects it).
    const absImage = /^https?:/.test(image)
      ? image
      : `${(seo.siteUrl || '').replace(/\/$/, '')}${
          import.meta.env.BASE_URL
        }${image.replace(/^\//, '')}`

    // --- Basic ---
    document.title = pageTitle
    if (seo.lang) document.documentElement.setAttribute('lang', seo.lang)
    setMeta('name', 'description', description)
    if (seo.keywords?.length)
      setMeta('name', 'keywords', seo.keywords.join(', '))
    setMeta('name', 'author', name)

    // --- Open Graph (Facebook, LinkedIn, Slack, …) ---
    setMeta('property', 'og:type', 'profile')
    setMeta('property', 'og:title', pageTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', absImage)
    if (seo.siteUrl) setMeta('property', 'og:url', seo.siteUrl)

    // --- Twitter Card ---
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', pageTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', absImage)
    if (seo.twitterHandle)
      setMeta('name', 'twitter:creator', seo.twitterHandle)

    // --- Canonical link ---
    if (seo.siteUrl) {
      let link = document.head.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', seo.siteUrl)
    }

    // --- JSON-LD structured data (schema.org Person) ---
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
      jobTitle: title,
      description,
      image: absImage,
      affiliation: affiliation
        ? { '@type': 'Organization', name: affiliation }
        : undefined,
      email: socials.email ? `mailto:${socials.email}` : undefined,
      url: seo.siteUrl || undefined,
      // Social/academic profiles → sameAs (helps knowledge-graph linking).
      sameAs: Object.entries(socials)
        .filter(([k, v]) => v && k !== 'email')
        .map(([, v]) => v),
    }

    let script = document.getElementById('jsonld-person')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'jsonld-person'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)
  }, [])

  return null // renders nothing; side-effects only
}
