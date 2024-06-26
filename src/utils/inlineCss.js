import * as fs from "fs";
import * as url from "url";
import postcss from "postcss";
import atImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import UnoCSS from "@unocss/postcss";
import cssNano from "cssnano";
// import utopia from "postcss-utopia";
import { PROD, srcDir } from "../../env.js";

const destFileName = "main.css";
const destPath = `assets/css/${destFileName}`;
const inputFileName = "main.css";
const inputCssFileUrl = new URL(`../${srcDir}/styles/${inputFileName}`, import.meta.url);
const inputPathFull = url.fileURLToPath(inputCssFileUrl);
const inputPath = `${srcDir}/styles/${inputFileName}`;
const inputFileData = fs.readFileSync(inputCssFileUrl, "utf-8");

export default async function inlineCss(content) {
	if ((this.page.outputPath || "").endsWith(".html")) {
		const rawCss = inputFileData;

		let css = await postcss([
			atImport(), // has to be first I believe
			UnoCSS(),
			// utopia({ minWidth: 320, maxWidth: 1240 }),
			// // twNesting,
			// // tailwindcss,
			postcssPresetEnv({
				stage: 1,
				features: {
					// "nesting-rules": false, // Need to exclude if using 'postcss-nesting' (or 'tailwindcss/nesting')
					// "custom-selectors": { preserve: false },
				},
			}), // OPTIONS: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options
			...(PROD ? [cssNano] : []),
			// cssNano,
		])
			.process(rawCss, { from: inputPathFull })
			.then((result) => {
				return result.css;
			});

		// css = escapeHTML(css);
		// css = css.substring(0, 1000);
		// console.log(css.length);

		const c = content.replace(
			"<!-- inlineCss -->",
			`<!-- inlineCss -->\n<style type="text/css">\n${css}\n</style>\n`
		);
		return c;
	}

	// If not an HTML output, return content as-is
	return content;
}
// Source: https://stackoverflow.com/questions/5251520/how-do-i-escape-some-html-in-javascript
function escapeHTML(s) {
	let lookup = {
		"&": "&amp;",
		'"': "&quot;",
		"'": "&apos;",
		"<": "&lt;",
		">": "&gt;",
	};
	return s.replace(/[&"'<>]/g, (c) => lookup[c]);
}
function eeescapeHTML(s) {
	return s.replace(/[^0-9A-Za-z ]/g, (c) => "&#" + c.charCodeAt(0) + ";");
}
