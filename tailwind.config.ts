import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Theme Tokens (Driven by CSS variables in globals.css)
        theme: {
          // Surfaces & Backgrounds
          base: 'var(--bg-base)',
          surface: 'var(--bg-secondary)',
          section: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
          'card-subtle': 'var(--bg-card-subtle)',
          elevated: 'var(--bg-elevated)',
          input: 'var(--bg-input)',
          modal: 'var(--bg-modal)',

          // Borders
          border: 'var(--border)',
          'border-subtle': 'var(--border-subtle)',
          'border-strong': 'var(--border-strong)',

          // Text & Typography (Explicitly Defined - NEVER alias to a background variable)
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-muted': 'var(--text-muted)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',

          // Brand Colors
          green: 'var(--brand-green)',
          'green-hover': 'var(--brand-green-hover)',
          'green-light': 'var(--brand-green-light)',
          'green-border': 'var(--brand-green-border)',
          'green-contrast': 'var(--brand-green-contrast)',
          blue: 'var(--brand-blue)',
          'blue-hover': 'var(--brand-blue-hover)',
          'blue-light': 'var(--brand-blue-light)',
          'blue-border': 'var(--brand-blue-border)',
          'blue-contrast': 'var(--brand-blue-contrast)',
        },

        // Clean Corporate Light Palette
        corporate: {
          green: {
            50: '#ECFDF5',
            100: '#D1FAE5',
            200: '#A7F3D0',
            500: '#10B981',
            600: '#059669', // MEHAR Corporate Green
            700: '#047857',
            800: '#065F46',
            900: '#064E3B',
          },
          blue: {
            50: '#F0F9FF',
            100: '#E0F2FE',
            500: '#0EA5E9',
            600: '#0284C7', // Industrial Accent Blue
            700: '#0369A1',
            800: '#075985',
          },
          gray: {
            25: '#FCFCFD',
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
