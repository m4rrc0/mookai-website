import { defineConfig } from "unocss";
import { theme as defaultTheme } from "@unocss/preset-mini";
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
		filesystem: [`src/${srcDir}/**/*.{html,js,njk,webc}`],
	},
	presets: [
		defaultConfig(),
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
	theme: {
		fontFamily: {
			sans: '"Roboto Condensed",' + defaultTheme.fontFamily.sans,
			chantal: "chantal," + defaultTheme.fontFamily.sans,
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
	},
});
