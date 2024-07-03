// import {
// 	defineConfig,
// 	presetMini,
// 	presetUno, // Equivalet to presetWind. Includes presetMini.
// 	presetAttributify,
// 	presetIcons,
// 	presetTypography,
// 	presetWebFonts,
// 	transformerDirectives,
// 	transformerVariantGroup,
// 	toEscapedSelector as e,
// } from "unocss";
import { theme as defaultTheme } from "@unocss/preset-mini";
// import { presetFluid } from "unocss-preset-fluid";
import { presetFluid } from "./preset-fluid/index.js";
// import presetCtxStyles from "./preset-ctx-styles/index.ts";
import computeRanges from "./preset-fluid/computeRanges.js";
import { srcDir } from "../../../env.js";

// import { Preset, definePreset } from "unocss";

// export default definePreset((options) => {
// 	return {
// 		name: "unocss-preset-default-config",
// 	};
// });

const tempRules = [];
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
	rounding: 4,
};
const ranges = computeRanges(fluidConfig);

const defaultOptions = {};
export const presetDefaultConfig = (options?: Object | undefined) => {
	const config = Object.assign({}, defaultOptions, options);
	return {
		name: "unocss-preset-default-config",
		// content: {
		// 	filesystem: [
		// 		// "./src/_includes/**/*.{html,js,njk}",
		// 		// "./src/templates/**/*.{html,js,njk}"
		// 		// `./**/*.{html,js,njk,webc}`,
		// 		`src/${srcDir}/**/*.{html,js,njk,webc}`,
		// 		// `./_components/**/*.{html,js,njk,webc}`,
		// 		// `./_layouts/**/*.{html,js,njk,webc}`,
		// 		// `./_partials/**/*.{html,js,njk,webc}`,
		// 		// `./_svg/**/*.{html,js,njk,webc}`,
		// 	],
		// },
		// NOTE: cli config not tested
		// cli: {
		// 	entry: {
		// 		patterns: ["src/styles/main.css"], // Glob patterns to match files
		// 		outFile: "dist/test.css", // The output filename for the generated UnoCSS file
		// 	},
		// },
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
				layer: "preflights",
				// 	getCSS: ({ theme }) => `* {color: ${theme.colors?.gray?.[700]};}`,
				// 	getCSS: async () => (await fetch("my-style.css")).text(),
				getCSS: () => `
a[href^="mailto:"] b { display: none; }
form p[role="status"]:empty { display: none; }
form .hp { position: absolute; left: -99999px; }
`,
			},
		],
		theme: {
			breakpoints: {
				xs: "480px",
				sm: "640px", // Default
				md: "768px", // Default
				lg: "1024px", // Default
				xl: "1280px", // Default
				"2xl": "1536px", // Default
			},
			fontSize: {},
			lineHeight: {
				"neg-5": "0.95",
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
			// Overwrite to be able to use .h1, .h2, etc
			height: {
				"0": "initial",
				"1": "initial",
				"2": "initial",
				"3": "initial",
				"4": "initial",
				"5": "initial",
				"6": "initial",
			},
		},
		rules: [
			// ["pop", { color: "red" }],
			// [/^pop-(\w+)$/, ([, word]) => ({ color: word }), { layer: "colors" }],
			...tempRules,
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
	};
};

export default presetDefaultConfig;
