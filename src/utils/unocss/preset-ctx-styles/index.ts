// import type { PresetOptions } from "@unocss/core";
// import { definePreset } from "unocss";
import { rules as layoutsRules } from "./layouts.js";
import { rules as utilitiesRules } from "./utilities.js";

const defaultOptions = {};

export const presetCtxStyles = (options) => {
	const config = Object.assign({}, defaultOptions, options);
	return {
		name: "unocss-preset-ctx-styles",
		// shortcuts: [
		// you could still have object style
		// {
		// 	box: "block",
		// },
		// dynamic shortcuts
		// [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
		// ],
		rules: [...layoutsRules, ...utilitiesRules],
		// variants: [],
		// it supports most of the configuration you could have in the root config
	};
};

export default presetCtxStyles;
export { defaultOptions, layoutsRules, utilitiesRules };
