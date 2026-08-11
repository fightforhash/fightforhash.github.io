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
        sans: ['IBM Plex Mono', 'Nanum Gothic Coding', 'monospace'],
        mono: ['IBM Plex Mono', 'Nanum Gothic Coding', 'ui-monospace', 'monospace'],
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
          DEFAULT: '#00f0ff', // Electric Cyan — normal / links / accents
          bright: '#c8fbff',  // headings, high emphasis
          body: '#8fc7d4',    // long-form body copy
          dim: '#2f6b78',     // metadata, inactive
          glow: 'rgba(0, 240, 255, 0.45)',
          line: 'rgba(0, 240, 255, 0.18)',
        },
        amber: {
          DEFAULT: '#ff9d1e', // status / warning / in-progress
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
