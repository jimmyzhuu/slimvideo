/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mac-blue': '#007AFF',
        'mac-gray': {
          50: '#F5F5F7',
          100: '#E5E5E5',
          200: '#D1D1D6',
          300: '#C7C7CC',
          400: '#AEAEB2',
          500: '#8E8E93',
          600: '#636366',
          700: '#48484A',
          800: '#3A3A3C',
          900: '#2C2C2E',
        }
      },
      backdropBlur: {
        'mac': '20px'
      }
    },
  },
  plugins: [],
  darkMode: 'media'
}

