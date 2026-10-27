/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          900: '#0c4a6e',
        },
        maarif: {
          gold: '#f59e0b',
          emerald: '#10b981',
          ruby: '#ef4444',
          sapphire: '#3b82f6'
        }
      },
      fontFamily: {
        sans: [
          '"Segoe UI Variable Text"',
          '"Segoe UI Variable"',
          '"Segoe UI"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Plus Jakarta Sans"',
          'Inter',
          'Roboto',
          'Helvetica',
          'Arial',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Apple Color Emoji"',
          '"Noto Color Emoji"',
          'sans-serif'
        ],
        fluent: [
          '"Segoe UI Variable Display"',
          '"Segoe UI Variable Text"',
          '"Segoe UI"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          'sans-serif'
        ]
      }
    },
  },
  plugins: [],
}
