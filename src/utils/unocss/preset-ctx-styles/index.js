import { definePreset } from "unocss";
import { rules as layoutRules } from "./layouts.js";

const defaultOptions = {};

export default definePreset((options) => {
	const config = Object.assign({}, defaultOptions, options);
	return {
		name: "unocss-preset-ctx-styles",
		shortcuts: [
			// you could still have object style
			// {
			// 	box: "block",
			// },
			// dynamic shortcuts
			// [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
		],
		rules: [...layoutRules],
		// variants: [],
		// it supports most of the configuration you could have in the root config
	};
});

export { defaultOptions };
