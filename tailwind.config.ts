import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // MEHAR Premium Dark Theme Design System
        mehar: {
          bg: '#0B0F14',
          'bg-secondary': '#0D1117',
          card: '#11161D',
          surface: '#161C24',
          border: '#1E2633',
          green: '#39D353',
          'green-hover': '#2ec547',
          'green-glow': 'rgba(57, 211, 83, 0.15)',
          blue: '#00A3FF',
          'blue-hover': '#0090e6',
          'blue-glow': 'rgba(0, 163, 255, 0.15)',
          'text-primary': '#E6EAF0',
          'text-secondary': '#A3AAB5',
          'text-muted': '#64748B',
        },
        // Backwards-compatible aliases mapping to dark tokens
        corporate: {
          green: {
            50: 'rgba(57, 211, 83, 0.08)',
            100: 'rgba(57, 211, 83, 0.15)',
            200: 'rgba(57, 211, 83, 0.25)',
            500: '#39D353',
            600: '#39D353',
            700: '#2ec547',
            800: '#1e8e34',
            900: '#145c22',
          },
          blue: {
            50: 'rgba(0, 163, 255, 0.08)',
            100: 'rgba(0, 163, 255, 0.15)',
            500: '#00A3FF',
            600: '#00A3FF',
            700: '#0085d1',
            800: '#0065a0',
          },
          gray: {
            25: '#0B0F14',
            50: '#0D1117',
            100: '#11161D',
            200: '#1E2633',
            300: '#2A3649',
            400: '#64748B',
            500: '#A3AAB5',
            600: '#A3AAB5',
            700: '#CBD5E1',
            800: '#E6EAF0',
            900: '#FFFFFF',
          },
        },
      },
      boxShadow: {
        'glow-green': '0 0 25px rgba(57, 211, 83, 0.25)',
        'glow-green-sm': '0 0 12px rgba(57, 211, 83, 0.2)',
        'glow-blue': '0 0 25px rgba(0, 163, 255, 0.25)',
        'glow-blue-sm': '0 0 12px rgba(0, 163, 255, 0.2)',
        'dark-card': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'dark-elevated': '0 10px 30px rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
