/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './constants.tsx',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        void: '#04060a',
        grid: {
          bg: '#04060a',
          panel: '#070c12',
          raise: '#0b131c',
        },
        zinc: {
          850: '#1f2022',
          950: '#070c12',
        },
        neon: {
          // Rack theme: the console palette is now green CRT phosphor.
          DEFAULT: '#8cff9e',
          bright: '#d6ffdd',
          body: '#9fd9a8',
          dim: '#5c8f66',
          glow: 'rgba(140, 255, 158, 0.45)',
          line: 'rgba(140, 255, 158, 0.2)',
        },
        amber: {
          DEFAULT: '#ffb020', // LED amber
          bright: '#ffc978',
          dim: '#7d4d12',
          glow: 'rgba(255, 157, 30, 0.45)',
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(0,240,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.18) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
