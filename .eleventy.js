import pluginWebc from "@11ty/eleventy-plugin-webc";
import he from "he";
import obfuscateEmail, { href } from "./src/utils/emailObfuscate.js";
// const formbouncerjs = import.meta.resolve("formbouncerjs/dist/bouncer.polyfills.min.js");

/**
 * @typedef { import("@11ty/eleventy").UserConfig } UserConfig
 */

export const config = {
	dir: {
		input: "src/templates",
		includes: "../_includes",
		// data: "_data", // Directory for global data files. Default: "_data"
		output: "dist",
	},
	templateFormats: ["md", "njk", "html", "11ty.js"],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};

export default async function (eleventyConfig) {
	const { RenderPlugin } = await import("@11ty/eleventy");

	// --- PLUGINS ---
	eleventyConfig.addPlugin(pluginWebc, {
		// This path is relative to the project-root!
		components: [
			"src/_includes/**/*.webc",
			// "npm:@11ty/is-land/*.webc",
			// "npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
		],
	});
	eleventyConfig.addPlugin(RenderPlugin);

	// --- CONFIG ---
	// Copy `src/assets/` to `dist/assets`
	eleventyConfig.addPassthroughCopy({
		"src/assets": "assets",
		// [formbouncerjs]: "assets/js/formbouncer.js",
		"node_modules/formbouncerjs/dist/bouncer.polyfills.min.js": "assets/js/formbouncer.js",
		"node_modules/altcha/dist/altcha.js": "assets/js/altcha.js",
	});

	// eleventyConfig.addWatchTarget("src/input.css");
	// eleventyConfig.setWatchThrottleWaitTime(2000); // in milliseconds
	eleventyConfig.addWatchTarget("src/");
	eleventyConfig.addWatchTarget("*.config.{js,ts}");
	// eleventyConfig.addWatchTarget("tailwind.config.js");

	// --- fILTERS ---
	// Encodes to html entities
	eleventyConfig.addFilter("encode", he.encode);
	// Call the obfuscate function from a webC component for example
	eleventyConfig.addFilter("obfuscateEmail", obfuscateEmail);
	// Produce obfuscated email link (when we don't need subject, body, etc...)
	eleventyConfig.addFilter("emailLink", function (email) {
		// Use it like so: {{ "hello@mookai.be" | emailLink }}
		const { element } = obfuscateEmail(email);
		// return element;
		return this.env.filters.safe(element);
	});
	// A Nunjucks filter to log variables in the console (and in the terminal)
	// Use it like so: {{ variable | log }}
	eleventyConfig.addFilter("log", function (value) {
		if (process.env.NODE_ENV === "production") {
			return "";
		}
		console.log(value);

		return this.env.filters.safe(`<script>console.log(${JSON.stringify(value)})</script>`);
	});

	// --- SHORTCODES ---
	// Produce obfuscated email link (when we do need subject, body, etc...)
	eleventyConfig.addShortcode("emailLink", function (email, subject, body, cc, bcc) {
		// Use it like so: {% emailLink "hello@email.com", "<subject>", "<body>", "<cc>", "<bcc>" %}
		const { element } = obfuscateEmail(email, subject, body, cc, bcc);
		return element;
	});
}
