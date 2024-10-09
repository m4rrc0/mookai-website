import Image from "@11ty/eleventy-img";
const defaultMetaImg = "src/album/_images/ALBUM_BOX3D_droite_2000.png";
const defaultMetaImgAlt = "La boite du jeu ALBUM";

export default async ({ metadata, page, site, eleventy, status, lang, altLangs, ...rest }) => {
	// console.log({ metadata, page, site, eleventy, status, lang, ...rest });

	const url = metadata.url || (page.url ? site.url + page.url : undefined);
	const robots = metadata.robots || (status === "noindex" ? "noindex" : undefined);
	// TODO: compute this automatically by looking into the right directory
	const fontsPreloads = [
		'/assets/fonts/DIN_2014.otf:rel="preload":as="font":type="font/otf":crossorigin',
		'/assets/fonts/Flabby_Bums_handwriting.ttf:rel="preload":as="font":type="font/ttf":crossorigin',
	];
	// console.log(lang);
	const locale = lang || "en";
	const imgSrc = metadata.img || defaultMetaImg;

	const outDir = eleventy.directories.output;
	// TODO: Memoize image transforms ?
	let imgStats = await Image(imgSrc, {
		urlPath: "/assets/images/",
		outputDir: `${outDir}/assets/images/`,
		widths: [1000],
		formats: ["auto"],
	});
	// This is due to the structure of imgStats
	const imgKey = Object.keys(imgStats)[0];
	/**
	 * Represents image statistics for a specific image file.
	 * @typedef {Object} ImgStats
	 * @property {string} format - The format of the image (e.g., "png").
	 * @property {number} width - The width of the image.
	 * @property {number} height - The height of the image.
	 * @property {string} url - The relative URL of the image.
	 * @property {string} sourceType - The source type of the image (e.g., "image/png").
	 * @property {string} srcset - The srcset of the image.
	 * @property {string} filename - The filename of the image.
	 * @property {string} outputPath - The output path of the image.
	 * @property {number} size - The size of the image in bytes.
	 */
	const imgStat = imgStats[imgKey]?.[0] || {};
	const img = site.url + imgStat.url;
	const img_width = imgStat.width;
	const img_height = imgStat.height;
	const img_alt = metadata.img_alt || defaultMetaImgAlt || "";
	const og_image_type = imgStat.sourceType;

	// console.log({ eleventy, outDir, imgStat });

	return {
		...metadata,
		// General
		// -----------------------------------------------
		// title: "", // Defined on template
		url,
		// name: "", // <meta name="author">
		// desc: "", // or description // Defined on template
		// img: site.url + "/assets/images/ALBUM_BOX3D_droite_2000.png",
		img,
		img_width,
		img_height,
		img_alt,
		generator: eleventy.generator,
		comments: true,
		// preconnect: [
		// 	{ url: "https://fonts.googleapis.com/", crossorigin: true },
		// 	"https://google.com",
		// ],
		// dns_prefetch: ['foo.com', 'example.com'],
		robots,
		// crawlers: { googlebot: "noindex", "googlebot-news": "nosnippet" },
		css: [
			"/assets/css/main.css",
			...(typeof metadata.css === "string" ? [metadata.css] : metadata.css || []),
			...fontsPreloads,
			// 'icons.css:rel="preload":as="style"'
		],
		// inline_css: [".foo {color: blue}", "h1:hover {color: blue}"],
		// js: ['foo.js', 'bar.js:async:type="module"', 'fizz.js:defer'],
		inline_js: [
			"(function(H){H.className=H.className.replace(/\\bno-js\\b/,'js')})(document.documentElement)",
			...(typeof metadata.inline_js === "string" ? [metadata.inline_js] : metadata.inline_js || []),
			// 'console.log("hello, world");',
			// { type: "application/json", id: "some-id", js: '{"data": "hello"}' },
		],
		custom: [
			// NOTE: <link rel="alternate" hreflang="lang_code" href="url_of_page" />
			...(altLangs || []).map(({ href, hreflang }) => ({
				tag: "link",
				attrs: { rel: "alternate", hreflang, href },
			})),
		],
		// Open Graph
		// -----------------------------------------------
		locale, // Default: "en_US",
		// type: "", // default: "website" // Accepts: article, product, website
		site_name: "ALBUM - Le jeu",
		// og_title: "", // default: title
		// og_desc: "", // default: desc
		// og_image: "", // default: img
		// og_image_alt: "",
		// og_image_width: "",
		// og_image_height: "",
		og_image_type,
		// og_secure_image_url: "",
		// og_audio: "",
		// og_video: "",
		// og_determiner: "",
		// og_alternate_locales: "", // TODO:
		// og_comment: "Open Graph",

		// Twitter
		// -----------------------------------------------
		twitter_card_type: "summary_large_image",
		// twitter_handle,
		// creator_handle,
		// twitter_title,
		// twitter_image,
		// twitter_image_alt,
		// twitter_desc,
		// twitter_attr_name,
		// twitter_comment,
	};
};
