import * as fs from "fs";
import * as url from "url";
import postcss from "postcss";
import atImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import tailwindcss from "tailwindcss";
import cssNano from "cssnano";
import { PROD } from "../env.js";

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
		tailwindcss,
		postcssPresetEnv(), // OPTIONS: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options
		...(PROD ? [cssNano] : []),
	])
		.process(rawCss, { from: inputPathFull, to: destPath })
		.then((result) => {
			return result.css;
		});
}
