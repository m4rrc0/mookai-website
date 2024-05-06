/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors:{
        'deums' : '#D9933D',
      },
      fontFamily: {
        'sans': ['Roboto Condensed', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize:{
        "nav": "24px",
      }
    },
  },
  plugins: [require("daisyui")],
}

