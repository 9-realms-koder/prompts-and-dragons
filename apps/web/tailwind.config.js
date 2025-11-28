/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color palette
        neon: {
          pink: '#ff2a6d',
          blue: '#05d9e8',
          purple: '#7b2cbf',
          yellow: '#f9f871',
          green: '#01ffc3',
        },
        cyber: {
          dark: '#0d0221',
          darker: '#050012',
          gray: '#1a1a2e',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
