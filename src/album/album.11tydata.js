import { srcDir, site } from "../../env.js";
import metadataComputed from "./_data/metadataComputed.js";
import { photographers, gamePictures } from "./_data/gamePictures.js";
import { pressReviews } from "./_data/ressources.js";
import { ressourcesVisuals } from "./_data/ressourcesVisuals.js";
const currentDir = "album";

export default async function () {
	return {
		lang: "fr",
		// eleventyExcludeFromCollections: currentDir !== srcDir,
		layout: "album/_layouts/base.njk",
		permalink: function ({ page: { fileSlug, filePathStem, outputFileExtension } }) {
			// fileSlug: "album",
			const regex = new RegExp(`^/${currentDir}/`);
			// filePathStem: "/album/index",
			const stem = filePathStem.replace(regex, "");
			// outputFileExtension: "html",
			const pl = `${stem}.${outputFileExtension}`;

			return currentDir === srcDir ? pl : false;
		},
		eleventyComputed: {
			metadata: metadataComputed,
		},
		photographers,
		gamePictures,
		ressourcesVisuals,
		pressReviews: await pressReviews(),
	};
}
