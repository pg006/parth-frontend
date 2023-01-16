/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '2k': '1920px',
      '4k': '2560px',
    },
    fontFamily: {
      primary: ['Helvetica', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}


