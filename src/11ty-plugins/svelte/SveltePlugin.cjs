const EleventySvelteComponent = require("./SvelteComponent.cjs");

class CssManager {
	constructor() {
		this.reset();
	}

	reset() {
		this.pages = {};
	}

	addPageCss(pageUrl, css) {
		if (!this.pages[pageUrl]) {
			this.pages[pageUrl] = new Set();
		}
		this.pages[pageUrl].add(css);
	}

	getCssForPage(pageUrl) {
		return Array.from(this.pages[pageUrl] || []).join("\n");
	}
}

module.exports = function (eleventyConfig, options) {
	console.log({ outpuDir: options?.componentsOutputDir });
	// Page-level CSS
	let pageCss = new CssManager();
	eleventyConfig.on("eleventy.before", () => pageCss.reset());
	eleventyConfig.addFilter("getSvelteCss", (pageUrl) => pageCss.getCssForPage(pageUrl));
	// End page-level CSS

	eleventyConfig.addFilter("svelte", async function (filename, pageUrl) {
		console.log({ filename, pageUrl });

		let ssr = !!pageUrl;

		let c = new EleventySvelteComponent(filename, { ...options, ssr }, eleventyConfig);

		let component = c.get();

		// Add to page-level CSS
		if (pageUrl) {
			pageCss.addPageCss(pageUrl, component.css);
		}

		return component;
	});
};
