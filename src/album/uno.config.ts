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
	// rules: [...layoutsRules, ...utilitiesRules],
	theme: {
		fontFamily: {
			sans: '"DIN 2014",' + defaultTheme.fontFamily.sans,
			bums: '"Flabby Bums",' + defaultTheme.fontFamily.sans,
		},
		colors: {
			white: "hsla(0, 0%, 100%, 1)",
			black: "hsla(0, 0%, 15%, 1)",
			crail: {
				"50": "#fcf5f4",
				"100": "#fae9e6",
				"200": "#f7d7d1",
				"300": "#f0bcb1",
				"400": "#e59484",
				"500": "#d7715c",
				"600": "#c3553f",
				"700": "#b24b36",
				"800": "#883c2c",
				"900": "#72362a",
				"950": "#3d1912",
			},
			raspberry: {
				100: "hsl(10.3,61.4%,77.6%, 1)", // generated
				200: "hsl(10.3,61.4%,77.6%, 1)",
				300: "hsl(10.4,75.1%,65.3%, 1)",
				400: "hsl(10.2,53.4%,45.5%, 1)",
				500: "hsl(10.1,42.6%,32.5%, 1)", // generated
				600: "hsl(357.9,32.9%,33.9%, 1)",
				700: "hsl(357.3,62%,27.8%, 1)",
				800: "hsl(357.9,32.9%,23.5%, 1)", // generated
				900: "hsl(357.9,32.9%,18.5%, 1)", // generated
			},
			teal: {
				200: "hsla(160, 100%, 50%, 1)",
				300: "hsla(160, 100%, 40%, 1)",
				400: "hsla(160, 100%, 30%, 1)",
				500: "hsla(160, 100%, 20%, 1)",
				600: "hsla(160, 100%, 10%, 1)",
				700: "hsla(160, 100%, 5%, 1)",
				800: "hsla(160, 100%, 2%, 1)",
			},
			lime: {
				200: "hsla(80, 100%, 50%, 1)",
				300: "hsla(80, 100%, 40%, 1)",
				400: "hsla(80, 100%, 30%, 1)",
				500: "hsla(80, 100%, 20%, 1)",
				600: "hsla(80, 100%, 10%, 1)",
				700: "hsla(80, 100%, 5%, 1)",
				800: "hsla(80, 100%, 2%, 1)",
			},

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
	},
});
