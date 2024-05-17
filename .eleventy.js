/**
 * @typedef { import("@11ty/eleventy").UserConfig } UserConfig
 */

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets/");
	// eleventyConfig.addPassthroughCopy("src/css/");

	eleventyConfig.addWatchTarget("src/input.css");
	eleventyConfig.setWatchThrottleWaitTime(2000); // in milliseconds

	// Retourne un objet contenant les options de configuration pour Eleventy
	return {
		// Répertoires d'entrée, d'inclusions et de sortie
		dir: {
			input: "src/templates", // Répertoire contenant les fichiers source
			includes: "../_includes", // Répertoire contenant les fragments de code réutilisables. Default: "_includes"
			// data: "_data", // Directory for global data files. Default: "_data"
			output: "dist", // Répertoire où seront générés les fichiers HTML
		},
		// Formats de fichier de modèle pris en charge
		templateFormats: ["md", "njk", "html"],
		// Moteur de modèle Markdown
		markdownTemplateEngine: "njk",
		// Moteur de modèle HTML
		htmlTemplateEngine: "njk",
	};
}
