// uno.config.ts
import {
	defineConfig,
	presetMini,
	presetUno, // Equivalet to presetWind. Includes presetMini.
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	content: {
		filesystem: ["**/*.{html,js,njk}"],
		// filesystem: ["src/**/*.{html,js,njk}"],
	},
	// NOTE: cli config not tested
	cli: {
		entry: {
			// patterns: ["src/styles/*.css"], // Glob patterns to match files
			patterns: ["src/**/*.{html,js,njk,css}"],
			outFile: "dist/assets/css/main.css", // The output filename for the generated UnoCSS file
		},
	},
	presets: [
		presetUno({
			// dark: {light: '.light', dark: '.dark'}, // Custom DarkModeSelectors
			// preflight: false,
		}),
		// presetWebFonts({
		// 	provider: "google", // default provider
		// 	fonts: {
		// 		// these will extend the default theme
		// 		sans: "Roboto",
		// 		mono: ["Fira Code", "Fira Mono:400,700"],
		// 		// custom ones
		// 		lobster: "Lobster",
		// 		lato: [
		// 			{
		// 				name: "Lato",
		// 				weights: ["400", "700"],
		// 				italic: true,
		// 			},
		// 			{
		// 				name: "sans-serif",
		// 				provider: "none",
		// 			},
		// 		],
		// 	},
		// }),
	],
	// transformers: [transformerDirectives(), transformerVariantGroup()],
	// layers: {
	// 	pre: -1,
	// 	preflights: 0,
	// 	reset: 1,
	// 	base: 2,
	// 	layouts: 3,
	// 	components: 5,
	// 	default: 9, // defaults are probably always utilities
	// 	utilities: 10,
	// 	utils: 10,
	// },
	// preflights: [
	// 	{
	// 		layer: "my-layer",
	// 		getCSS: async () => (await fetch("my-style.css")).text(),
	// 	},
	// 	{
	// 		getCSS: ({ theme }) => `
	// * {
	// 	color: ${theme.colors?.gray?.[700] ?? "#333"};
	// 	padding: 0;
	// 	margin: 0;
	// }
	//     `,
	// 	},
	// ],
	theme: {
		// ...
		colors: {
			// TODO: delete these
			deums: "#D9933D",
			arriereplan: "#F7F7F7",
			piedpage: "#262626",
			orange: "#D9933D",
			sanguine: "#D94423",
			brun: "#A2724E",
			temoin: "#CFCFCF",
			blob: "#8d8298",
			//
			white: "hsla(0, 0%, 100%, 1)",
			black: "hsla(0, 0%, 15%, 1)",
			curcuma: {
				light: "hsla(36, 80%, 50%, 1)",
				mid: "hsla(33, 67%, 55%, 1)",
				DEFAULT: "hsla(33, 67%, 55%, 1)",
				dark: "hsla(36, 95%, 42%, 1)",
			},
			coral: {
				light: "hsla(11, 67%, 55%, 1)",
				mid: "hsla(11, 72%, 49%, 1)",
				DEFAULT: "hsla(11, 72%, 49%, 1)",
				dark: "hsla(5, 68%, 27%, 1)",
			},
			mouse: {
				light: "hsla(0, 0%, 95%, 1)",
				DEFAULT: "hsla(0, 0%, 95%, 1)",
				// light: "hsla(0, 0%, 0%, 0.16)",
			},
			aubergine: {
				DEFAULT: "hsla(270, 10%, 55%, 1)",
			},
			sand: {
				light: "hsla(18, 14%, 53%, 1)",
				mid: "hsla(26, 35%, 47%, 1)",
				DEFAULT: "hsla(26, 35%, 47%, 1)",
				dark: "hsla(4, 21%, 44%, 1)",
			},
		}, // backgroundColor, borderColor, textColor, ...
	},
	rules: [
		["pop", { color: "red" }],
		[/^pop-(\w+)$/, ([, word]) => ({ color: word }), { layer: "base" }],
	],
	// variants: [
	// 	// hover:
	// 	(matcher) => {
	// 		if (!matcher.startsWith("hover:")) return matcher;
	// 		return {
	// 			// slice `hover:` prefix and passed to the next variants and rules
	// 			matcher: matcher.slice(6),
	// 			selector: (s) => `${s}:hover`,
	// 		};
	// 	},
	// ],
	// shortcuts: {
	// 	// shortcuts to multiple utilities
	// 	btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
	// 	"btn-green": "text-white bg-green-500 hover:bg-green-700",
	// 	// single utility alias
	// 	red: "text-red-100",
	// },
});
