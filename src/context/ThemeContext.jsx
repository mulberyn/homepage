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
 * Global theme state — a simple warm Light / Dark toggle:
 *   • theme — "light" | "dark"
 *
 * The visual change is done purely with CSS custom properties (see
 * src/styles/index.css). This provider keeps the `data-theme` attribute on
 * <html> in sync with state and persists the choice to localStorage.
 */

const ThemeContext = createContext(null)

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
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
      isDark: theme === 'dark',
      toggleTheme: () =>
        setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
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
