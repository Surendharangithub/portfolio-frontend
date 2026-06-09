/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary:   '#c0c1ff',
        'primary-dark': '#494bd6',
        tertiary:  '#3cddc7',
        surface: {
          DEFAULT: '#131313',
          dim:     '#0e0e0e',
          low:     '#1c1b1b',
          mid:     '#201f1f',
          high:    '#2a2a2a',
          highest: '#353534',
        },
        'on-surface':     '#e5e2e1',
        'on-surface-var': '#c7c4d7',
        outline:     '#908fa0',
        'outline-var': '#464554',
      },
      maxWidth: {
        container: '1440px',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.02em',
        widest:   '0.1em',
      },
    },
  },
  plugins: [],
}
