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
        // MEHAR Dark Industrial Theme Tokens
        navy: {
          950: '#04070F',
          900: '#080D1A', // Base Background
          850: '#0C1324',
          800: '#0F172A', // Card Base
          750: '#131F37', // Elevated Card Surface
          700: '#1E293B', // Border / Muted Surface
          600: '#334155',
        },
        electric: {
          green: {
            DEFAULT: '#00F59B', // Primary Energy Accent
            glow: 'rgba(0, 245, 155, 0.25)',
            hover: '#00D887',
            muted: '#059669',
          },
          blue: {
            DEFAULT: '#00D2FF', // Technology Accent
            glow: 'rgba(0, 210, 255, 0.25)',
            hover: '#00B4D8',
            muted: '#0284C7',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(0, 245, 155, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(0, 210, 255, 0.3)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'industrial-mesh': 'radial-gradient(circle at 50% 0%, rgba(0, 210, 255, 0.08) 0%, transparent 60%), radial-gradient(circle at 100% 100%, rgba(0, 245, 155, 0.05) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
