/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#5B8A68',
          darkGreen: '#2D4A36',
          cream: '#FDFBF7',
          beige: '#F4EFE6',
          earth: '#8B5A2B',
          accent: '#D4A373',
          gold: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
};
