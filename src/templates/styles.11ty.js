import * as fs from "fs";
import * as url from "url";
import postcss from "postcss";
import atImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import tailwindcss from "tailwindcss";
import twNesting from "tailwindcss/nesting/index.js";
import cssNano from "cssnano";
import utopia from "postcss-utopia";
import { PROD } from "../env.js";

// console.log({ tailwindcss });

export async function data() {
	const destFileName = "main.css";
	const destPath = `assets/css/${destFileName}`;
	const inputFileName = "main.css";
	const inputCssFileUrl = new URL(`../styles/${inputFileName}`, import.meta.url);
	const inputPathFull = url.fileURLToPath(inputCssFileUrl);
	const inputPath = `styles/${inputFileName}`;
	const inputFileData = fs.readFileSync(inputCssFileUrl, "utf-8");

	return {
		permalink: destPath,
		destPath,
		inputPathFull,
		inputPath,
		rawCss: inputFileData,
	};
}

export async function render(data) {
	const { destPath, inputPath, inputPathFull, rawCss } = data;

	// TODO: look at postcss config or other usefull plugins
	return await postcss([
		atImport(),
		utopia({ minWidth: 320, maxWidth: 1240 }),
		twNesting,
		tailwindcss,
		postcssPresetEnv({
			stage: 1,
			features: { "nesting-rules": false }, // Need to exclude if using 'postcss-nesting' (or 'tailwindcss/nesting')
		}), // OPTIONS: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options
		...(PROD ? [cssNano] : []),
	])
		.process(rawCss, { from: inputPathFull, to: destPath })
		.then((result) => {
			return result.css;
		});
}
