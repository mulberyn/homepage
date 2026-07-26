import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

/**
 * ThemeContext
 * -------------------------------------------------------------------------
 * Global theme state for this light-only design:
 *   • theme — "light" (fresh) | "warm" (creamy)
 *
 * The visual change is done purely with CSS custom properties (see
 * src/styles/index.css). This provider keeps the `data-theme` attribute on
 * <html> in sync with state and persists the choice to localStorage.
 */

const ThemeContext = createContext(null)

const getInitialTheme = () => {
  try {
    return localStorage.getItem('theme') === 'warm' ? 'warm' : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // Reflect theme -> <html data-theme> + persist.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isWarm: theme === 'warm',
      toggleTheme: () =>
        setTheme((t) => (t === 'warm' ? 'light' : 'warm')),
      setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

// Convenience hook. Throws if used outside the provider to catch mistakes early.
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return ctx
}
