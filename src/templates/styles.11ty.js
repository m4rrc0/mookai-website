import * as fs from "fs";
import * as url from "url";
// import { exec } from "node:child_process";
import { exec, execSync } from "child_process";
import { PROD } from "../env.js";
// console.log({ tailwindcss });

function uno() {
	// const output = execSync("ls", { encoding: "utf-8" }); // the default is 'buffer'
	execSync(`npm run unocss`, { encoding: "utf-8" });
	console.log("Output was:\n", output);
	// exec("cat *.js bad_file | wc -l", function (error, stdout, stderr) {
	// 	console.log("stdout: " + stdout);
	// 	console.log("stderr: " + stderr);
	// 	if (error !== null) {
	// 		console.log("exec error: " + error);
	// 	}
	// });
}

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
	// return await postcss([])
	uno();
	return "";
}
