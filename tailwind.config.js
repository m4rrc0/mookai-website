/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,njk}"],
	theme: {
		extend: {
			backgroundImage: {
				"hero-pattern": "url(/assets/images/reunion.jpg)",
			},
			gridTemplateColumns: {
				menulg: "9rem 1fr 50px",
				menuxl: "9rem 1fr 100px",
				temoignage: "9rem 1fr 1fr",
			},
			colors: {
				deums: "#D9933D",
				arriereplan: "#F7F7F7",
				piedpage: "#262626",
				orange: "#D9933D",
				sanguine: "#D94423",
				brun: "#A2724E",
				temoin: "#CFCFCF",
				blob: "#8d8298",
			},
			fontSize: {
				nav: "24px",
			},
			fontFamily: {
				test: ["MaPolice"],
				shantell: ["Shantell Sans"],
			},
		},
	},
	plugins: [],
};
