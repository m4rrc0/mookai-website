import pluginWebc from "@11ty/eleventy-plugin-webc";
import he from "he";
import obfuscateEmail, { href } from "./src/utils/emailObfuscate.js";
import inlineCss from "./src/utils/inlineCss.js";
// const formbouncerjs = import.meta.resolve("formbouncerjs/dist/bouncer.polyfills.min.js");
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
// import Image from "@11ty/eleventy-img";
import directoryOutputPlugin from "@11ty/eleventy-plugin-directory-output";
import { site, srcDir } from "./env.js";

/**
 * @typedef { import("@11ty/eleventy").UserConfig } UserConfig
 */
export const config = {
	dir: {
		// input: "src/templates",
		input: "src",
		// includes: "../_includes",
		includes: "",
		// data: "_data", // Directory for global data files. Default: "_data"
		output: "dist",
	},
	templateFormats: ["md", "njk", "html", "11ty.js"],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};

export default async function (eleventyConfig) {
	// let src = "https://images.unsplash.com/photo-1608178398319-48f814d0750c";
	// let src = "./src/assets/images/hero-creative.jpg";
	// let stats = await Image(src, {
	// 	widths: [300],
	// });

	// console.log(stats);

	const { RenderPlugin } = await import("@11ty/eleventy");

	eleventyConfig.setQuietMode(true);
	eleventyConfig.addPlugin(directoryOutputPlugin);
	// --- PLUGINS --- //
	eleventyConfig.addPlugin(pluginWebc, {
		// This path is relative to the project-root!
		components: [
			"src/**/*.webc",
			// "npm:@11ty/is-land/*.webc",
			// "npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
			// "npm:@11ty/eleventy-img/*.webc",
		],
	});
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Output path relative to the site root
		urlPath: "/assets/images/",

		// optional, output image formats
		// formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],
		widths: [480, 768, 1280, "auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
			sizes: "100vw",
		},
	});

	// --- CONFIG ---
	// Copy `src/assets/` to `dist/assets`
	eleventyConfig.addPassthroughCopy({
		[`src/${srcDir}/_assets`]: "assets",
		// [formbouncerjs]: "assets/js/formbouncer.js",
		"node_modules/formbouncerjs/dist/bouncer.polyfills.min.js": "assets/js/formbouncer.js",
		// "node_modules/altcha/dist/altcha.js": "assets/js/altcha.js",
	});

	// eleventyConfig.addWatchTarget("src/input.css");
	// eleventyConfig.setWatchThrottleWaitTime(2000); // in milliseconds
	eleventyConfig.addWatchTarget("src/");
	// eleventyConfig.addWatchTarget("src/utils/**/*.{js,ts}");
	eleventyConfig.addWatchTarget("*.config.{js,ts}");
	// eleventyConfig.addWatchTarget("tailwind.config.js");

	// --- DATA ---
	eleventyConfig.addGlobalData("site", site);
	eleventyConfig.addGlobalData("srcDir", srcDir);

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

		let seen = [];

		const str = JSON.stringify(value, function (key, val) {
			if (val != null && typeof val == "object") {
				if (seen.indexOf(val) >= 0) {
					return;
				}
				seen.push(val);
			}
			return val;
		});
		// return this.env.filters.safe(`<script>console.table(${value})</script>`);
		// return this.env.filters.safe(`<script>console.log(${JSON.stringify(value)})</script>`);
		return this.env.filters.safe(`<script>console.log(${str})</script>`);
	});

	// --- SHORTCODES ---
	// Produce obfuscated email link (when we do need subject, body, etc...)
	eleventyConfig.addShortcode("emailLink", function (email, subject, body, cc, bcc) {
		// Use it like so: {% emailLink "hello@email.com", "<subject>", "<body>", "<cc>", "<bcc>" %}
		const { element } = obfuscateEmail(email, subject, body, cc, bcc);
		return element;
	});

	// --- TRANSFORMS ---
	// eleventyConfig.addTransform("inlineCss", inlineCss);
}
