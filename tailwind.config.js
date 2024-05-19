import defaultTheme from "tailwindcss/defaultTheme";
import utopia from "tailwind-utopia";

/** @type {import('tailwindcss').Config} */
export default {
	content: {
		relative: true, // resolve paths relative to the tailwind.config.js file
		files: ["./src/_includes/**/*.{html,js,njk}", "./src/templates/**/*.{html,js,njk}"],
		// files: ["./src/**/*.{html,js,njk}"],
	},
	plugins: [
		utopia({
			useClamp: true,
			prefix: "fluid-",
			baseTextSize: "base",
			generateSpacing: true,
			generateAllSpacingPairs: true,
			generateFallbacks: true,
			// minScreen: "320px",
			// maxScreen: "1240px",
			// minSize: 18,
			// maxSize: 20,
			// minScale: 1.25,
			// maxScale: 1.333,
			// spacingSizes: {},
			// spacingPairs: {},
			// spacingCustomPairs: [],
		}),
	],
	// TODO: Column-rule plugin ? https://github.com/mellambias/tailwind-column-rule
	theme: {
		// fontSize: {
		// 	// Defaults overrides
		// 	xs: ["var(--fs--2)", { lineHeight: "normal" }],
		// 	sm: ["var(--fs--1)", { lineHeight: "normal" }],
		// 	base: ["var(--fs-0)", { lineHeight: "normal" }],
		// 	lg: ["var(--fs-1)", { lineHeight: "normal" }],
		// 	xl: ["var(--fs-2)", { lineHeight: "normal" }],
		// 	"2xl": ["var(--fs-3)", { lineHeight: "snug" }],
		// 	"3xl": ["var(--fs-4)", { lineHeight: "snug" }],
		// 	"4xl": ["var(--fs-5)", { lineHeight: "none" }],
		// 	"5xl": ["var(--fs-6)", { lineHeight: "none" }],
		// 	// Custom
		// 	"fs-2": "var(--fs--2)",
		// 	"fs-1": "var(--fs--1)",
		// 	fs0: "var(--fs-0)",
		// 	fs1: "var(--fs-1)",
		// 	fs2: "var(--fs-2)",
		// 	fs3: "var(--fs-3)",
		// 	fs4: "var(--fs-4)",
		// 	fs5: "var(--fs-5)",
		// 	fs6: "var(--fs-6)",
		// },
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
				gray: {
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
			utopia: (theme) => ({
				useClamp: true,
				minScreen: theme("screens.sm"),
				maxScreen: theme("screens.xl"),
				minSize: 18,
				maxSize: 20,
				minScale: 1.25,
				maxScale: 1.333,
				textSizes: [
					"xs", // step--2
					"sm", // step--1
					"base", // step-0
					"lg", // step-1
					"xl", // step-2
					"2xl", // step-3
					"3xl", // step-4
					"4xl", // step-5
					"5xl", // step-6
				],
			}),
			lineHeight: {
				"neg-10": "0.90",
				"neg-20": "0.80",
				"neg-25": "0.75",
			},
			// spacing: {
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
			// 	// Custom via Type scale
			// 	// "fs-2": "var(--fs--2)",
			// 	// "fs-1": "var(--fs--1)",
			// 	// fs0: "var(--fs-0)",
			// 	// fs1: "var(--fs-1)",
			// 	// fs2: "var(--fs-2)",
			// 	// fs3: "var(--fs-3)",
			// 	// fs4: "var(--fs-4)",
			// 	// fs5: "var(--fs-5)",
			// 	// // Custom via Space scale
			// 	// "sp-3xs": "var(--sp-3xs)",
			// 	// "sp-3": "var(--sp-3xs)",
			// 	// "sp-2xs": "var(--sp-2xs)",
			// 	// "sp-2": "var(--sp-2xs)",
			// 	// "sp-xs": "var(--sp-xs)",
			// 	// "sp-1": "var(--sp-xs)",
			// 	// "sp-s": "var(--sp-s)",
			// 	// sp0: "var(--sp-s)",
			// 	// "sp-m": "var(--sp-m)",
			// 	// sp1: "var(--sp-m)",
			// 	// "sp-l": "var(--sp-l)",
			// 	// sp2: "var(--sp-l)",
			// 	// "sp-xl": "var(--sp-xl)",
			// 	// sp3: "var(--sp-xl)",
			// 	// "sp-2xl": "var(--sp-2xl)",
			// 	// sp4: "var(--sp-2xl)",
			// 	// "sp-3xl": "var(--sp-3xl)",
			// 	// sp5: "var(--sp-3xl)",
			// 	// /* One-up pairs */
			// 	// "sp-3xs-2xs": "var(--sp-3xs-2xs)",
			// 	// "sp-2xs-xs": "var(--sp-2xs-xs)",
			// 	// "sp-xs-s": "var(--sp-xs-s)",
			// 	// "sp-s-m": "var(--sp-s-m)",
			// 	// "sp-m-l": "var(--sp-m-l)",
			// 	// "sp-l-xl": "var(--sp-l-xl)",
			// 	// "sp-xl-2xl": "var(--sp-xl-2xl)",
			// 	// "sp-2xl-3xl": "var(--sp-2xl-3xl)",
			// 	// /* Custom pairs */
			// 	// "sp-s-l": "var(--sp-s-l)",
			// }, // p-*, m-*, w-*, h-*, max-h-*, basis-*, gap-*, inset-*, space-*, translate-x-*, scroll-m-*, scroll-p-*, indent-*
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
