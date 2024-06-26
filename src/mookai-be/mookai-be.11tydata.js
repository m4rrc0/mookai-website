import { srcDir } from "../../env.js";
const currentDir = "mookai-be";

export default {
	// eleventyExcludeFromCollections: currentDir !== srcDir,
	layout: "mookai-be/_layouts/base.njk",
	permalink: function ({ page: { fileSlug, filePathStem, outputFileExtension } }) {
		const regex = new RegExp(`^/${currentDir}/`);
		const stem = filePathStem.replace(regex, "");
		const pl = `${stem}.${outputFileExtension}`;
		// console.log(stem, pl, fileSlug, filePathStem, outputFileExtension);
		//           fileSlug: "mookai-be",
		//   filePathStem: "/mookai-be/index",
		//   outputFileExtension: "html",
		return currentDir === srcDir ? pl : false;
	},
};
