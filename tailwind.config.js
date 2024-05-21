import defaultTheme from "tailwindcss/defaultTheme";
import utopia from "tailwind-utopia";

/** @type {import('tailwindcss').Config} */
export default {
	content: {
		relative: true, // resolve paths relative to the tailwind.config.js file
		files: ["./src/_includes/**/*.{html,js,njk}", "./src/templates/**/*.{html,js,njk}"],
	},
	plugins: [
		// utopia({
		// 	useClamp: true,
		// 	prefix: "fluid-",
		// 	baseTextSize: "base",
		// 	generateSpacing: true,
		// 	generateAllSpacingPairs: true,
		// 	generateFallbacks: true,
		// 	// minScreen: "320px",
		// 	// maxScreen: "1240px",
		// 	// minSize: 18,
		// 	// maxSize: 20,
		// 	// minScale: 1.25,
		// 	// maxScale: 1.333,
		// 	// spacingSizes: {},
		// 	// spacingPairs: {},
		// 	// spacingCustomPairs: [],
		// }),
	],
	// TODO: Column-rule plugin ? https://github.com/mellambias/tailwind-column-rule
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
			fontSize: {
				nav: "24px",
			},
			// START
			fontFamily: {
				sans: ['"Roboto Condensed"', ...defaultTheme.fontFamily.sans],
				chantal: ["chantal", ...defaultTheme.fontFamily.sans],
			},
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
			// utopia: (theme) => ({
			// 	useClamp: true,
			// 	minScreen: theme("screens.sm"),
			// 	maxScreen: theme("screens.xl"),
			// 	minSize: 18,
			// 	maxSize: 20,
			// 	minScale: 1.25,
			// 	maxScale: 1.333,
			// 	textSizes: [
			// 		"xs", // step--2
			// 		"sm", // step--1
			// 		"base", // step-0
			// 		"lg", // step-1
			// 		"xl", // step-2
			// 		"2xl", // step-3
			// 		"3xl", // step-4
			// 		"4xl", // step-5
			// 		"5xl", // step-6
			// 	],
			// }),
			fontSize: {
				// Defaults overrides
				// xs: ["var(--fs--2)", { lineHeight: "normal" }],
				// sm: ["var(--fs--1)", { lineHeight: "normal" }],
				// base: ["var(--fs-0)", { lineHeight: "normal" }],
				// lg: ["var(--fs-1)", { lineHeight: "normal" }],
				// xl: ["var(--fs-2)", { lineHeight: "normal" }],
				// "2xl": ["var(--fs-3)", { lineHeight: "snug" }],
				// "3xl": ["var(--fs-4)", { lineHeight: "snug" }],
				// "4xl": ["var(--fs-5)", { lineHeight: "none" }],
				// "5xl": ["var(--fs-6)", { lineHeight: "none" }],
				// Custom
				// fs: {
				// 	"-2": "var(--fs--2)",
				// 	"-1": "var(--fs--1)",
				// 	0: "var(--fs-0)",
				// 	1: "var(--fs-1)",
				// 	2: "var(--fs-2)",
				// 	3: "var(--fs-3)",
				// 	4: "var(--fs-4)",
				// 	5: "var(--fs-5)",
				// 	6: "var(--fs-6)",
				// },
				// "fluid-fs-2": "var(--fs--2)",
				// "fluid-fs-1": "var(--fs--1)",
				// "fluid-fs0": "var(--fs-0)",
				// "fluid-fs1": "var(--fs-1)",
				// "fluid-fs2": "var(--fs-2)",
				// "fluid-fs3": "var(--fs-3)",
				// "fluid-fs4": "var(--fs-4)",
				// "fluid-fs5": "var(--fs-5)",
				// "fluid-fs6": "var(--fs-6)",
				//
				"fluid--2": "var(--fluid--2)",
				"fluid--1": "var(--fluid--1)",
				"fluid-0": "var(--fluid-0)",
				"fluid-1": "var(--fluid-1)",
				"fluid-2": "var(--fluid-2)",
				"fluid-3": "var(--fluid-3)",
				"fluid-4": "var(--fluid-4)",
				"fluid-5": "var(--fluid-5)",
				"fluid-6": "var(--fluid-6)",
			},
			lineHeight: {
				"neg-10": "0.90",
				"neg-20": "0.80",
				"neg-25": "0.75",
			},
			spacing: {
				// 	// Defaults overrides
				// 	0.5: "0.125rem",
				// 	1: "0.25rem",
				// 	1.5: "0.375rem",
				// 	2: "0.5rem",
				// 	2.5: "0.625rem",
				// 	3: "0.75rem",
				// 	3.5: "0.875rem",
				// 	4: "1rem",
				// 	5: "1.25rem",
				// 	6: "1.5rem",
				// 	7: "1.75rem",
				// 	8: "2rem",
				// 	9: "2.25rem",
				// 	10: "2.5rem",
				// 	11: "2.75rem",
				// 	12: "3rem",
				// 	14: "3.5rem",
				// 	16: "4rem",
				// 	20: "5rem",
				// 	24: "6rem",
				// 	28: "7rem",
				// 	32: "8rem",
				// 	36: "9rem",
				// 	40: "10rem",
				// 	44: "11rem",
				// 	48: "12rem",
				// 	52: "13rem",
				// 	56: "14rem",
				// 	60: "15rem",
				// 	64: "16rem",
				// 	72: "18rem",
				// 	80: "20rem",
				// 	96: "24rem",
				// Custom via Type scale
				"fluid--2": "var(--fluid--2)",
				"fluid--1": "var(--fluid--1)",
				"fluid-0": "var(--fluid-0)",
				"fluid-1": "var(--fluid-1)",
				"fluid-2": "var(--fluid-2)",
				"fluid-3": "var(--fluid-3)",
				"fluid-4": "var(--fluid-4)",
				"fluid-5": "var(--fluid-5)",
				"fluid-6": "var(--fluid-6)",
				// Custom via Space scale
				"fluid-3xs": "var(--fluid-3xs)",
				"fluid-2xs": "var(--fluid-2xs)",
				"fluid-xs": "var(--fluid-xs)",
				"fluid-s": "var(--fluid-s)",
				"fluid-m": "var(--fluid-m)",
				"fluid-l": "var(--fluid-l)",
				"fluid-xl": "var(--fluid-xl)",
				"fluid-2xl": "var(--fluid-2xl)",
				"fluid-3xl": "var(--fluid-3xl)",
				/* One-up pairs */
				"fluid-3xs-2xs": "var(--fluid-3xs-2xs)",
				"fluid-2xs-xs": "var(--fluid-2xs-xs)",
				"fluid-xs-s": "var(--fluid-xs-s)",
				"fluid-s-m": "var(--fluid-s-m)",
				"fluid-m-l": "var(--fluid-m-l)",
				"fluid-l-xl": "var(--fluid-l-xl)",
				"fluid-xl-2xl": "var(--fluid-xl-2xl)",
				"fluid-2xl-3xl": "var(--fluid-2xl-3xl)",
				/* Custom pairs */
				"fluid-s-l": "var(--fluid-s-l)",
			}, // p-*, m-*, w-*, h-*, max-h-*, basis-*, gap-*, inset-*, space-*, translate-x-*, scroll-m-*, scroll-p-*, indent-*
			borderRadius: {
				// none: "0",
				// sm: ".125rem",
				// DEFAULT: ".25rem",
				// lg: ".5rem",
				// full: "9999px",
				pill: "100vw",
			}, // .rounded-*
		},
	},
};
