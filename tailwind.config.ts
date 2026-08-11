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
        // MEHAR Clean Green + White Corporate Palette
        corporate: {
          green: {
            50: '#ECFDF5',
            100: '#D1FAE5',
            200: '#A7F3D0',
            500: '#10B981',
            600: '#059669', // Primary MEHAR Green
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
            50: '#F8FAFC',  // Light Section Background
            100: '#F1F5F9', // Card Subtle Background
            200: '#E2E8F0', // Border Light
            300: '#CBD5E1', // Border Active
            400: '#94A3B8', // Subtext Muted
            500: '#64748B', // Secondary Text
            600: '#475569', // Body Regular
            700: '#334155', // Body Dark
            800: '#1E293B', // Headings Sub
            900: '#0F172A', // Main Headings & Dark Text
          },
        },
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
