import pluginWebc from "@11ty/eleventy-plugin-webc";
import he from "he";
import obfuscateEmail, { href } from "./src/utils/emailObfuscate.js";
import inlineCss from "./src/utils/inlineCss.js";
// const formbouncerjs = import.meta.resolve("formbouncerjs/dist/bouncer.polyfills.min.js");
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import metagen from "eleventy-plugin-metagen";
import directoryOutputPlugin from "@11ty/eleventy-plugin-directory-output";
// import isValidDate from "date-fns/isValid";
// import parseISODate from "date-fns/parseISO";
// import formatDate from "date-fns/format";
// import * as dateLocales from "date-fns/locale";
// import { isValid as isValidDate, parseISO as parseISODate, format as formatDate } from "date-fns";
import { DateTime } from "luxon";
import posthtml from "posthtml";
import htmlnano from "htmlnano";
import altAlways from "posthtml-alt-always";
import { noopener } from "posthtml-noopener";
// import posthtmlw3c from "posthtml-w3c";
import { site, srcDir, PROD, BUILD_CONTEXT } from "./env.js";
import runUnoCss from "./src/utils/unocss/runUnoCss.js";

// console.log({ site, srcDir });

// INSPIRATION
// TODO: Bundling CSS and JS + Memoization
// https://chrisburnell.com/article/memoizing-asset-bundles/

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
		//
		transformOnRequest: false,

		// Output path relative to the site root
		urlPath: "/assets/images/",

		// optional, output image formats
		// formats: ["webp", "jpeg"],
		// Our guess is that we gat either a jpg or png and keep the format with auto but use webp first (as webp supports alphe.)
		formats: ["webp", "auto"],

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
	eleventyConfig.addPlugin(metagen);

	// --- CONFIG ---
	// Copy `src/assets/` to `dist/assets`
	eleventyConfig.addPassthroughCopy({
		[`src/${srcDir}/_assets`]: "assets",
		// formbouncer
		// [formbouncerjs]: "assets/js/formbouncer.js",
		"node_modules/formbouncerjs/dist/bouncer.polyfills.min.js": "assets/js/formbouncer.js",
		// altcha
		// "node_modules/altcha/dist/altcha.js": "assets/js/altcha.js",
		// lite-yt-embed
		"node_modules/lite-youtube-embed/src/lite-yt-embed.css": "assets/css/lite-yt-embed.css",
		"node_modules/lite-youtube-embed/src/lite-yt-embed.js": "assets/js/lite-yt-embed.js",
		// Luxon
		// TODO: optionally import Luxon
		// "node_modules/luxon/build/global/luxon.min.js": "assets/js/luxon.js",
	});

	eleventyConfig.ignores.add("**/_assets/**/*");
	eleventyConfig.ignores.add("**/_components/**/*");
	eleventyConfig.ignores.add("**/_images/**/*");
	eleventyConfig.ignores.add("**/_layouts/**/*");
	eleventyConfig.ignores.add("**/_partials/**/*");
	eleventyConfig.ignores.add("**/_svg/**/*");
	// eleventyConfig.addWatchTarget("src/input.css");
	// eleventyConfig.setWatchThrottleWaitTime(2000); // in milliseconds
	eleventyConfig.addWatchTarget("src/");
	// eleventyConfig.addWatchTarget("**/_partials/**/*");

	// eleventyConfig.addWatchTarget("src/utils/**/*.{js,ts}");
	eleventyConfig.addWatchTarget("*.config.{js,ts}");
	// eleventyConfig.addWatchTarget("tailwind.config.js");

	// --- UNOCSS ---
	eleventyConfig.on("eleventy.after", runUnoCss);
	// --- DATA ---
	eleventyConfig.addGlobalData("BUILD_CONTEXT", BUILD_CONTEXT);
	eleventyConfig.addGlobalData("site", site);
	eleventyConfig.addGlobalData("srcDir", srcDir);
	eleventyConfig.addGlobalData("year", new Date().getFullYear());
	// Global data from project
	let globalDataObject = {};
	try {
		const { default: globalData } = await import(`./src/${srcDir}/_data/global.js`);
		globalDataObject = globalData || {};
	} catch (err) {
		console.log("No global data. Skipping...");
	}
	for (const [key, value] of Object.entries(globalDataObject)) {
		eleventyConfig.addGlobalData(key, await value);
	}

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
	// date filter
	// eleventyConfig.addFilter("dateFns", function (dateString, format, localeRaw) {
	// 	if (!dateString) {
	// 		// TODO: should we default to now()?
	// 		return undefined;
	// 	}
	// 	const date = parseISODate(dateString);
	// 	// TODO: can we automatically get the context to grab the curent locale of the page?
	// 	const locale = localeRaw?.id || localeRaw || "en";
	// 	let formatedDate = undefined;
	// 	try {
	// 		formatedDate = formatDate(date, format, { locale: dateLocales[locale] });
	// 	} catch (error) {
	// 		console.error(error);
	// 		if (!isValidDate(date)) {
	// 			console.error(`\nERROR: The date string '${dateString}' is invalid\n`);
	// 		}
	// 	}
	// 	return formatedDate;
	// });
	// Luxon dateTime filter
	// LINK: Format tokens are here: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
	eleventyConfig.addFilter("date", function (dateString, locale, stringFormat, zone) {
		return DateTime.fromISO(dateString, { locale: locale || "en", zone: zone || "utc" }).toFormat(
			stringFormat || "dd LLLL yyyy"
		);
	});
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	// --- SHORTCODES ---
	// Produce obfuscated email link (when we do need subject, body, etc...)
	eleventyConfig.addShortcode("emailLink", function (email, subject, body, cc, bcc) {
		// Use it like so: {% emailLink "hello@email.com", "<subject>", "<body>", "<cc>", "<bcc>" %}
		const { element } = obfuscateEmail(email, subject, body, cc, bcc);
		return element;
	});

	// --- TRANSFORMS --- //
	// eleventyConfig.addTransform("inlineCss", inlineCss);
	// POSTHTML
	eleventyConfig.addTransform("posthtml", async function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			const prodPlugins = [
				htmlnano(/*{
					// removeComments: false, // Disable the module "removeComments"
					collapseWhitespace: "conservative", // Pass options to the module "collapseWhitespace"
				}*/),
				altAlways(),
				noopener(),
				// posthtmlw3c(), // NOTE: does not seem to be working...
				// TODO: https://github.com/mohsen1/posthtml-favicons
			];
			let minified = await posthtml([
				...(PROD ? prodPlugins : []),
				// TODO: look at adding https://github.com/Grawl/posthtml-richtypo
				// TODO: ??? Optioal table of Contents depending on a flag in template ??? https://github.com/posthtml/posthtml-toc
			]).process(content /*, options */);

			minified?.messages.forEach((msg) => {
				console.warn(msg);
			});

			return minified.html;
		}

		// If not an HTML output, return content as-is
		return content;
	});
}
