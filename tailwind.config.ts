import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-archivo)', 'Archivo', 'Inter', 'sans-serif'],
      },
      colors: {
        accent: '#0ea5e9',
        'accent-secondary': '#14b8a6',
        background: '#0a0a0a',
        card: '#18181b',
        hover: '#27272a',
        primary: '#f4f4f5',
        secondary: '#a1a1aa',
        border: '#3f3f46',
      },
    },
  },
  plugins: [],
};

export default config;
