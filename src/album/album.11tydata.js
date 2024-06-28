import { srcDir } from "../../env.js";
const currentDir = "album";

export default {
	// eleventyExcludeFromCollections: currentDir !== srcDir,
	layout: "album/_layouts/base.njk",
	permalink: function ({ page: { fileSlug, filePathStem, outputFileExtension } }) {
		const regex = new RegExp(`^/${currentDir}/`);
		const stem = filePathStem.replace(regex, "");
		const pl = `${stem}.${outputFileExtension}`;
		// console.log(stem, pl, fileSlug, filePathStem, outputFileExtension);
		//           fileSlug: "album",
		//   filePathStem: "/album/index",
		//   outputFileExtension: "html",
		return currentDir === srcDir ? pl : false;
	},
};
