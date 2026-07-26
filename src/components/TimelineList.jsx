/**
 * TimelineList
 * -------------------------------------------------------------------------
 * Wraps timeline entries (Experience, Publications). The dashed connector line
 * is drawn per-item (each entry extends a dashed segment down to the next
 * entry's node), so the line starts at the first node and ends cleanly at the
 * last node — no trailing tail. `space-y-7` (1.75rem) MUST match the gap used
 * in each item's connector height calc.
 */
export default function TimelineList({ children }) {
  return <ul className="space-y-7">{children}</ul>
}
