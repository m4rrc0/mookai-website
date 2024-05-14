/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {

      backgroundImage:{
        'hero-pattern': "url(/assets/images/reunion.jpg)",
      },
      gridTemplateColumns: {
        menulg: "100px 1fr 50px",
        menuxl: "100px 1fr 100px",
        temoignage : "100px 1fr 1fr",
      },
      colors: {
        deums: "#D9933D",
        arriereplan: "#F7F7F7",
        piedpage: "#262626",
        orange: "#D9933D",
        sanguine: "#D94423",
        brun: "#A2724E",
        temoin: "#00000029",
      },
      fontSize: {
        nav: "24px",
      },
      fontFamily:{
        test:["MaPolice"],
        shantell:['Shantell Sans']
      }
    },
  },
  plugins: [],
};
