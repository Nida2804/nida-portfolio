/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          DEFAULT: '#c41b15',
          dark: '#a81310',
          light: '#d6241e',
          deep: '#7f0907',
          surface: '#b81611',
          crimson: '#9b100d'
        },
        gold: {
          light: '#f5d9a8',
          DEFAULT: '#d4af37',
          dark: '#b58e24'
        },
        velvet: {
          black: '#120404',
          night: '#1c0808'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Cinzel"', '"Italiana"', 'serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
