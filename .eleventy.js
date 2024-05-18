/**
 * @typedef { import("@11ty/eleventy").UserConfig } UserConfig
 */

export default function (eleventyConfig) {
	// Copy `src/assets/` to `dist/assets`
	eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

	// eleventyConfig.addWatchTarget("src/input.css");
	// eleventyConfig.setWatchThrottleWaitTime(2000); // in milliseconds
	eleventyConfig.addWatchTarget("src/styles/main.css");

	// A Nunjucks filter to log variables in the console (and in the terminal)
	// Use it like so: {{ variable | log | safe }}
	eleventyConfig.addFilter("log", (value) => {
		if (process.env.NODE_ENV === "production") {
			return "";
		}
		console.log(value);
		return `<script>console.log(${JSON.stringify(value)})</script>`;
	});

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
		templateFormats: ["md", "njk", "html", "11ty.js"],
		// Moteur de modèle Markdown
		markdownTemplateEngine: "njk",
		// Moteur de modèle HTML
		htmlTemplateEngine: "njk",
	};
}
