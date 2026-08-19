import type { Config } from 'tailwindcss';

// Knovate brand palette — cream/tan/terracotta with dark-brown ink, mirrored
// from the platform login screen.
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f7f3ec',
        sand: '#efe7d8',
        ink: '#2b2620',
        muted: '#6c6455',
        gold: { DEFAULT: '#c98a3a', dark: '#b5701f' },
        terracotta: '#c0492f',
        sage: '#8ba888',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1180px' },
    },
  },
  plugins: [],
};
export default config;
