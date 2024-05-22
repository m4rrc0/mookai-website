/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 	{
    relative: true, // resolve paths relative to the tailwind.config.js file
    files: ["./src/_includes/**/*.{html,js,njk}", "./src/templates/**/*.{html,js,njk}"],
},
  theme: {
    extend: {

      backgroundImage:{
        'hero-pattern': "url(/assets/images/reunion.jpg)",
      },
      gridTemplateColumns: {
        menulg: "9rem 1fr 50px",
        menuxl: "9rem 1fr 100px",
        temoignage : "9rem 1fr 1fr",
        apropos : "9rem 1fr",
        valeurs : "9rem 416px 316px 404px",
      },
      gridTemplateRows: {
        'vals': 'repeat(12, 72px)',
      },
      colors: {
        deums: "#D9933D",
        arriereplan: "#F7F7F7",
        piedpage: "#262626",
        orange: "#D9933D",
        sanguine: "#D94423",
        brun: "#A2724E",
        brunclair: "#978076",
        temoin: "#CFCFCF",
        blob: "#8d8298",
        beige: "#ECD5C3",
        bordeau: "#731e16",
      },
      fontSize: {
        nav: "24px",
      },
      fontFamily:{
        test:["MaPolice"],
        shantell:['Shantell Sans'],
      }
    },
  },
  plugins: [],
};
