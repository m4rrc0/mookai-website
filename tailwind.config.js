/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        menulg: "100px 1fr 50px",
        menuxl: "100px 1fr 100px"
      },
      colors: {
        deums: "#D9933D",
        arriereplan: "#F7F7F7"
      },
      fontFamily: {
        sans: ["Roboto Condensed", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        nav: "24px",
      },
    },
  },
  plugins: [],
};
