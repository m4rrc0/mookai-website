import {
	defineConfig,
	// presetMini,
	presetUno, // Equivalet to presetWind. Includes presetMini.
	// presetAttributify,
	presetIcons,
	// presetTypography,
	// presetWebFonts,
	// transformerDirectives,
	transformerVariantGroup,
	// toEscapedSelector,
} from "unocss";
// import transformerVariantGroup from "@unocss/transformer-variant-group";
import { theme as defaultTheme } from "@unocss/preset-mini";
import presetCtxStyles, {
	layoutsRules,
	utilitiesRules,
} from "../utils/unocss/preset-ctx-styles/index.ts";
import { presetFluid } from "../utils/unocss/preset-fluid/index.js";
import computeRanges from "../utils/unocss/preset-fluid/computeRanges.js";
import { srcDir } from "../../env.js";

import defaultConfig from "../utils/unocss/preset-default-config.ts";

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

export const config = {
	// content: {
	// 	filesystem: [
	// 		`src/${srcDir}/**/*.{html,js,njk,webc}`,
	// 		// `src/${srcDir}/_components/**/*.{html,js,njk,webc}`,
	// 		// `src/${srcDir}/_layouts/**/*.{html,js,njk,webc}`,
	// 		// `src/${srcDir}/_partials/**/*.{html,js,njk,webc}`,
	// 		// `src/${srcDir}/_svg/**/*.{html,js,njk,webc}`,
	// 	],
	// },
	transformers: [transformerVariantGroup()],
	presets: [
		defaultConfig(),
		presetUno({
			// dark: {light: '.light', dark: '.dark'}, // Custom DarkModeSelectors
			// preflight: false,
		}),
		presetIcons({
			prefix: "i-",
			// extraProperties: {
			// 	display: "inline-block",
			// },
		}),
		// presetCtxStyles({}),
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
	],
	rules: [
		// ...layoutsRules,
		...utilitiesRules,
	],
	theme: {
		fontFamily: {
			sans: '"DIN 2014",' + defaultTheme.fontFamily.sans,
			bums: '"Flabby Bums",' + defaultTheme.fontFamily.sans,
		},
		colors: {
			white: "hsla(0, 0%, 100%, 1)",
			black: "hsla(0, 0%, 15%, 1)",
			mouse: {
				DEFAULT: "hsla(0, 0%, 44%, 1)", // "#707070",
			},
			teal: {
				dark: "hsla(184, 37%, 25%, 1)", // "#285457",
				DEFAULT: "hsla(175, 63%, 34%, 1)", // "#208B82",
				light: "hsla(161, 47%, 83%, 1)", // "#C0E8DB"
				lighter: "hsla(136, 38%, 94%, 1)", // "#EBF6EE"
			},
			scarlet: {
				DEFAULT: "hsla(353, 64%, 26%, 1)", // "#6F1822",
			},
		}, // backgroundColor, borderColor, textColor, ...
	},
};

export default defineConfig({
	content: {
		filesystem: [
			`src/${srcDir}/**/*.{html,js,njk,webc}`,
			// `src/${srcDir}/_components/**/*.{html,js,njk,webc}`,
			// `src/${srcDir}/_layouts/**/*.{html,js,njk,webc}`,
			// `src/${srcDir}/_partials/**/*.{html,js,njk,webc}`,
			// `src/${srcDir}/_svg/**/*.{html,js,njk,webc}`,
		],
	},
	...config,
});
