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
	toEscapedSelector as e,
} from "unocss";
import defaultTheme from "tailwindcss/defaultTheme";
// import { presetFluid } from "unocss-preset-fluid";
import { presetFluid } from "../utils/unocss/preset-fluid/index.js";
import computeRanges from "../utils/unocss/preset-fluid/computeRanges.js";
import { srcDir } from "../../env.js";

const applyValsToKeys = (keysArr, valuesObj) => {
	const result = {};
	for (let i = 0; i < keysArr.length; i++) {
		result[keysArr[i]] = valuesObj;
	}
	return result;
};

const fluidConfig = {
	minFontSize: 18,
	maxFontSize: 20,
	minTypeScale: 1.25,
	maxTypeScale: 1.333,
	positiveSteps: 15,
	negativeSteps: 10,
	// prefix: "fluid",
	relativeTo: "viewport",
	usePx: false,
	rounding: 2,
};
const ranges = computeRanges(fluidConfig);

export default defineConfig({
	content: {
		filesystem: [
			// "./src/_includes/**/*.{html,js,njk}",
			// "./src/templates/**/*.{html,js,njk}"
			// `./**/*.{html,js,njk,webc}`,
			`src/${srcDir}/**/*.{html,js,njk,webc}`,
			// `./_components/**/*.{html,js,njk,webc}`,
			// `./_layouts/**/*.{html,js,njk,webc}`,
			// `./_partials/**/*.{html,js,njk,webc}`,
			// `./_svg/**/*.{html,js,njk,webc}`,
		],
	},
	// NOTE: cli config not tested
	// cli: {
	// 	entry: {
	// 		patterns: ["src/styles/main.css"], // Glob patterns to match files
	// 		outFile: "dist/test.css", // The output filename for the generated UnoCSS file
	// 	},
	// },
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
		presetFluid({
			minWidth: 320,
			maxWidth: 1240,
			extendMinWidth: 200,
			extendMaxWidth: 1920,
			remBase: 16,
			useRemByDefault: false,
			commentHelpers: true,
			ranges: {
				// xs: [12, 16],
				// sm: [14, 18],
				// md: [18, 24],
				// lg: [22, 30],
				...ranges,
			},
		}),
		presetIcons({
			prefix: "i-",
			// extraProperties: {
			// 	display: "inline-block",
			// },
		}),
	],
	// transformers: [transformerDirectives(), transformerVariantGroup()],
	layers: {
		pre: -1,
		preflights: 0,
		reset: 1,
		base: 2,
		layouts: 3,
		components: 5,
		default: 9, // defaults are probably always utilities
		utilities: 10,
		utils: 10,
	},
	preflights: [
		{
			layer: "preflight",
			getCSS: () => `
a[href^="mailto:"] b { display: none; }
form p[role="status"]:empty { display: none; }
form .hp { position: absolute; left: -99999px; }
`,
		},
		// {
		// 	layer: "my-layer",
		// 	getCSS: async () => (await fetch("my-style.css")).text(),
		// },
		// 		{
		// 			getCSS: ({ theme }) => `
		// * {
		// 	color: ${theme.colors?.gray?.[700] ?? "#333"};
		// 	padding: 0;
		// 	margin: 0;
		// }
		// 	    `,
		// 		},
	],
	theme: {
		fontFamily: {
			sans: ['"Roboto Condensed"', ...defaultTheme.fontFamily.sans].join(","),
			chantal: ["chantal", ...defaultTheme.fontFamily.sans].join(","),
		},
		breakpoints: {
			xs: "480px",
			sm: "640px", // Default
			md: "768px", // Default
			lg: "1024px", // Default
			xl: "1280px", // Default
			"2xl": "1536px", // Default
		},
		colors: {
			// TODO: delete these
			// deums: "#D9933D",
			// arriereplan: "#F7F7F7",
			// piedpage: "#262626",
			// orange: "#D9933D",
			// sanguine: "#D94423",
			// brun: "#A2724E",
			// temoin: "#CFCFCF",
			// blob: "#8d8298",
			//
			white: "hsla(0, 0%, 100%, 1)",
			black: "hsla(0, 0%, 15%, 1)",
			curcuma: {
				"light-hsla": "36, 80%, 50%",
				light: "hsla(36, 80%, 50%, 1)",
				mid: "hsla(33, 67%, 55%, 1)",
				DEFAULT: "hsla(33, 67%, 55%, 1)",
				dark: "hsla(36, 95%, 42%, 1)",
				darker: "hsla(36,95%,34%,1)",
			},
			coral: {
				"light-hsla": "11, 67%, 55%",
				light: "hsla(11, 67%, 55%, 1)",
				// mid: "hsla(11, 72%, 49%, 1)",
				mid: "hsla(11, 72%, 48%, 1)",
				DEFAULT: "hsla(11, 72%, 48%, 1)",
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
				"light-hsla": "18, 14%, 53%",
				light: "hsla(18, 14%, 53%, 1)",
				mid: "hsla(26, 35%, 47%, 1)",
				DEFAULT: "hsla(26, 35%, 47%, 1)",
				dark: "hsla(4, 21%, 44%, 1)",
			},
		}, // backgroundColor, borderColor, textColor, ...
		fontSize: {
			test: "5rem",
			// "fluid--2": "var(--fluid--2)",
			// "fluid--1": "var(--fluid--1)",
			// "fluid-0": "var(--fluid-0)",
			// "fluid-1": "var(--fluid-1)",
			// "fluid-2": "var(--fluid-2)",
			// "fluid-3": "var(--fluid-3)",
			// "fluid-4": "var(--fluid-4)",
			// "fluid-5": "var(--fluid-5)",
			// "fluid-6": "var(--fluid-6)",
		},
		lineHeight: {
			"neg-10": "0.90",
			"neg-20": "0.80",
			"neg-25": "0.75",
		},
		fontWeight: {
			100: "100",
			200: "200",
			300: "300",
			400: "400",
			500: "500",
			600: "600",
			700: "700",
			800: "800",
			900: "900",
		},
		// Sizing
		// ...applyValsToKeys(
		// 	[
		// 		"width",
		// 		"height",
		// 		"maxWidth",
		// 		"maxHeight",
		// 		"minWidth",
		// 		"minHeight",
		// 		"inlineSize",
		// 		"blockSize",
		// 		"maxInlineSize",
		// 		"maxBlockSize",
		// 		"minInlineSize",
		// 		"minBlockSize",
		// 	],
		// 	{
		// 		"fluid--2": "var(--fluid--2)",
		// 		"fluid--1": "var(--fluid--1)",
		// 		"fluid-0": "var(--fluid-0)",
		// 		"fluid-1": "var(--fluid-1)",
		// 		"fluid-2": "var(--fluid-2)",
		// 		"fluid-3": "var(--fluid-3)",
		// 		"fluid-4": "var(--fluid-4)",
		// 		"fluid-5": "var(--fluid-5)",
		// 		"fluid-6": "var(--fluid-6)",
		// 	}
		// ),
		height: {
			"1": "initial",
			"2": "initial",
			"3": "initial",
			"4": "initial",
			"5": "initial",
			"6": "initial",
		},
		// spacing: {
		// 	// Custom via Type scale
		// 	"fluid--2": "var(--fluid--2)",
		// 	"fluid--1": "var(--fluid--1)",
		// 	"fluid-0": "var(--fluid-0)",
		// 	"fluid-1": "var(--fluid-1)",
		// 	"fluid-2": "var(--fluid-2)",
		// 	"fluid-3": "var(--fluid-3)",
		// 	"fluid-4": "var(--fluid-4)",
		// 	"fluid-5": "var(--fluid-5)",
		// 	"fluid-6": "var(--fluid-6)",
		// 	// Custom via Space scale
		// 	"fluid-3xs": "var(--fluid-3xs)",
		// 	"fluid-2xs": "var(--fluid-2xs)",
		// 	"fluid-xs": "var(--fluid-xs)",
		// 	"fluid-s": "var(--fluid-s)",
		// 	"fluid-m": "var(--fluid-m)",
		// 	"fluid-l": "var(--fluid-l)",
		// 	"fluid-xl": "var(--fluid-xl)",
		// 	"fluid-2xl": "var(--fluid-2xl)",
		// 	"fluid-3xl": "var(--fluid-3xl)",
		// 	/* One-up pairs */
		// 	"fluid-3xs-2xs": "var(--fluid-3xs-2xs)",
		// 	"fluid-2xs-xs": "var(--fluid-2xs-xs)",
		// 	"fluid-xs-s": "var(--fluid-xs-s)",
		// 	"fluid-s-m": "var(--fluid-s-m)",
		// 	"fluid-m-l": "var(--fluid-m-l)",
		// 	"fluid-l-xl": "var(--fluid-l-xl)",
		// 	"fluid-xl-2xl": "var(--fluid-xl-2xl)",
		// 	"fluid-2xl-3xl": "var(--fluid-2xl-3xl)",
		// 	/* Custom pairs */
		// 	"fluid-s-l": "var(--fluid-s-l)",
		// }, // p-*, m-*, w-*, h-*, max-h-*, basis-*, gap-*, inset-*, space-*, translate-x-*, scroll-m-*, scroll-p-*, indent-*
		borderRadius: {
			pill: "100vw",
		}, // .rounded-*
	},
	rules: [
		// ["pop", { color: "red" }],
		// [/^pop-(\w+)$/, ([, word]) => ({ color: word }), { layer: "colors" }],
		[
			/^sideways-lr$/,
			(match, { symbols }) => {
				return [
					{ "writing-mode": "sideways-lr" },
					{
						[symbols.parent]: "@supports (not (writing-mode: sideways-lr))",
						"writing-mode": "vertical-rl",
						transform: "rotate(-180deg)",
					},
				];
			},
		],
	],
	variants: [
		// hover:
		// (matcher) => {
		// 	if (!matcher.startsWith("hover:")) return matcher;
		// 	return {
		// 		// slice `hover:` prefix and passed to the next variants and rules
		// 		matcher: matcher.slice(6),
		// 		selector: (s) => `${s}:hover`,
		// 	};
		// },
	],
	shortcuts: {
		// shortcuts to multiple utilities
		// btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
		// "btn-green": "text-white bg-green-500 hover:bg-green-700",
		// single utility alias
		// red: "text-red-100",
	},
	// postprocess(util) {
	// 	console.log(util);
	// },
});
