// import * as fs from "fs";
// import * as url from "url";
// import postcss from "postcss";
// import atImport from "postcss-import";
// import postcssPresetEnv from "postcss-preset-env";
// import tailwindcss from "tailwindcss";
// import twNesting from "tailwindcss/nesting/index.js";
// import UnoCSS from "@unocss/postcss";
// import cssNano from "cssnano";
// import utopia from "postcss-utopia";
// import { PROD, srcDir } from "../../env.js";
// // postcss.config.js
// import postcssJitProps from "postcss-jit-props";
// import OpenProps from "open-props";

export async function data() {
	return { permalink: false };

	// const configFilePath = `src/${srcDir}/uno.config.ts`;
	// const destFileName = "main.css";
	// const destPath = `assets/css/${destFileName}`;
	// const inputFileName = "main.css";
	// const inputCssFileUrl = new URL(`../${srcDir}/styles/${inputFileName}`, import.meta.url);
	// const inputPathFull = url.fileURLToPath(inputCssFileUrl);
	// const inputPath = `${srcDir}/styles/${inputFileName}`;
	// const inputFileData = fs.readFileSync(inputCssFileUrl, "utf-8");

	// return {
	// 	eleventyExcludeFromCollections: true,
	// 	permalink: destPath,
	// 	// permalink: false,
	// 	configFilePath,
	// 	destPath,
	// 	inputPathFull,
	// 	inputPath,
	// 	rawCss: inputFileData,
	// };
}

// export async function render(data) {
// 	const { configFilePath, destPath, inputPath, inputPathFull, rawCss } = data;

// 	// TODO: look at postcss config or other usefull plugins
// 	return await postcss([
// 		atImport(), // has to be first I believe
// 		UnoCSS({
// 			// configFile: configFilePath,
// 			configOrPath: configFilePath,
// 		}),
// 		// utopia({ minWidth: 320, maxWidth: 1240 }),
// 		// // twNesting,
// 		// // tailwindcss,
// 		postcssPresetEnv({
// 			stage: 1,
// 			features: {
// 				// "nesting-rules": false, // Need to exclude if using 'postcss-nesting' (or 'tailwindcss/nesting')
// 				// "custom-selectors": { preserve: false },
// 			},
// 		}), // OPTIONS: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options
// 		postcssJitProps(OpenProps),
// 		...(PROD ? [cssNano] : []),
// 	])
// 		.process(rawCss, { from: inputPathFull, to: destPath })
// 		.then((result) => {
// 			return result.css;
// 		});
// }
