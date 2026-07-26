/**
 * asset(path)
 * -------------------------------------------------------------------------
 * Resolve a root-relative asset path ("/images/foo.svg") against the Vite
 * deploy base (`import.meta.env.BASE_URL`). On GitHub Pages the site lives
 * under "/<repo>/", so a hard-coded leading slash would 404 — this prefixes
 * the base exactly once. External URLs and already-relative paths pass
 * through untouched.
 */
export function asset(path) {
  if (!path || /^(?:[a-z]+:)?\/\//i.test(path) || !path.startsWith('/')) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + path
}
