/** @type {import('tailwindcss').Config} */
export default {
  // This design is light-only with an optional warmer "creamy" theme, both
  // driven by the `data-theme` attribute on <html>. No dark mode.
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // All colors map to CSS custom properties defined in src/styles/index.css,
      // so the light / creamy-warm switch happens instantly by swapping vars.
      // (We keep the `primary` name for the accent so leaf components need no
      // changes — the value is now a warm coral, not lavender.)
      colors: {
        primary: 'var(--color-primary)', // warm coral accent
        'primary-soft': 'var(--color-primary-soft)',
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        'bg-card': 'var(--color-bg-card)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        // Slightly stronger, warm section divider.
        divider: 'var(--divider)',
      },
      fontFamily: {
        // Inter for headings/UI, Lora for readable serif body, Dancing Script
        // for the cursive brand logo in the nav.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        // Soft, warm, low-contrast shadows for the airy card look.
        soft: '0 4px 20px -8px rgba(180, 120, 100, 0.18)',
        lift: '0 16px 40px -12px rgba(180, 120, 100, 0.30)',
      },
      keyframes: {
        // Gentle drift for the decorative background arcs (very subtle).
        'drift-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
      },
      animation: {
        'drift-slow': 'drift-slow 22s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
