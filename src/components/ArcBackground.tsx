/**
 * ArcBackground
 * -------------------------------------------------------------------------
 * Purely decorative, flat background: soft sweeping arcs and gentle overlapping
 * circles in very low opacity warm pastels. Uses inline SVG with a
 * `preserveAspectRatio="none"`-free viewBox so shapes scale gracefully, and
 * `vw`/`vh`-anchored positioning so it covers any screen size.
 *
 * Kept behind all content (`-z-10`) and `aria-hidden` so it never distracts
 * from or interferes with the page. No heavy gradients — just flat strokes.
 */
export default function ArcBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Top-right sweeping arcs. Opacity is theme-aware (see --arc-opacity):
          clearly visible in light mode, subtle in dark. */}
      <svg
        className="absolute -right-24 -top-32 h-[70vh] w-[70vh] motion-safe:animate-drift-slow"
        style={{ opacity: 'var(--arc-opacity)' }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" stroke="var(--arc-2)" strokeWidth="2.5" />
        <circle cx="200" cy="200" r="140" stroke="var(--arc-1)" strokeWidth="2.5" />
        <circle cx="200" cy="200" r="100" stroke="var(--arc-3)" strokeWidth="2.5" />
      </svg>

      {/* Bottom-left overlapping circles */}
      <svg
        className="absolute -bottom-40 -left-32 h-[60vh] w-[60vh] motion-safe:animate-drift-slow"
        style={{ opacity: 'var(--arc-opacity)', animationDelay: '-8s' }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="160" cy="240" r="150" stroke="var(--arc-1)" strokeWidth="2.5" />
        <circle cx="240" cy="180" r="150" stroke="var(--arc-3)" strokeWidth="2.5" />
      </svg>

      {/* A single wide, soft wave arc across the middle (slightly subtler) */}
      <svg
        className="absolute left-0 top-1/3 h-[40vh] w-full"
        style={{ opacity: 'calc(var(--arc-opacity) * 0.7)' }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 300 C 300 180, 600 380, 900 240 S 1200 160, 1200 220"
          stroke="var(--arc-2)"
          strokeWidth="2.5"
        />
        <path
          d="M0 340 C 350 240, 650 420, 950 300 S 1200 240, 1200 280"
          stroke="var(--arc-1)"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  )
}
