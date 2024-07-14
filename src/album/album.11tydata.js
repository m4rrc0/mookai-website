import Image from "@11ty/eleventy-img";
import { srcDir, site } from "../../env.js";
const currentDir = "album";

const defaultMetaImg = "src/album/_images/ALBUM_BOX3D_droite_2000.png";
const defaultMetaImgAlt = "La boite du jeu ALBUM";

const photographsRaw = [
	{
		name: "Aluxum",
		country: "",
		pictures: ["003"],
	},
	{
		name: "Arnaud Ghys",
		country: "Belgique",
		pictures: ["029", "058", "068", "082", "087"],
	},
	{
		name: "Artmarie",
		country: "",
		pictures: ["004", "005"],
	},
	{
		name: "Cinobi",
		country: "",
		pictures: ["013", "014"],
	},
	{
		name: "Clément Mahoudeau",
		country: "France",
		pictures: [
			"001",
			"006",
			"007",
			"008",
			"009",
			"010",
			"011",
			"015",
			"016",
			"017",
			"018",
			"019",
			"020",
			"021",
			"022",
		],
	},
	{
		name: "CVino",
		country: "",
		pictures: ["012"],
	},
	{
		name: "Dageldog",
		country: "",
		pictures: ["023"],
	},
	{
		name: "Daniel de la Hoz",
		country: "",
		pictures: ["024"],
	},
	{
		name: "Daniel Balakov",
		country: "",
		pictures: ["084"],
	},
	{
		name: "Elena Dijour",
		country: "",
		pictures: ["025"],
	},
	{
		name: "EnjoyLife2",
		country: "",
		pictures: ["086"],
	},
	{
		name: "Emir Memedovski",
		country: "",
		pictures: ["026"],
	},
	{
		name: "Film Studio",
		country: "",
		pictures: ["027"],
	},
	{
		name: "Firn",
		country: "",
		pictures: ["028"],
	},
	{
		name: "Florin1961",
		country: "",
		pictures: [],
	},
	{
		name: "Flux Factory",
		country: "",
		pictures: [],
	},
	{
		name: "Frazao Studio Latino",
		country: "",
		pictures: ["030"],
	},
	{
		name: "Gajic",
		country: "",
		pictures: ["098"],
	},
	{
		name: "Gorodenkoff Studio",
		country: "",
		pictures: ["085"],
	},
	{
		name: "Inconnu / Libre de droit",
		country: "",
		pictures: ["088"],
	},
	{
		name: "Jacob Lund",
		country: "",
		pictures: ["031"],
	},
	{
		name: "Kemal Yildirim",
		country: "",
		pictures: ["032"],
	},
	{
		name: "Kevin Klopper",
		country: "",
		pictures: ["033", "034"],
	},
	{
		name: "Kristian Sekulic",
		country: "",
		pictures: ["090"],
	},
	{
		name: "LadyEnvy09",
		country: "",
		pictures: ["035"],
	},
	{
		name: "Lisa Delong",
		country: "",
		pictures: ["036"],
	},
	{
		name: "Marco",
		country: "",
		pictures: ["037"],
	},
	{
		name: "Marian Paino",
		country: "Roumanie",
		pictures: [
			"002",
			"038",
			"039",
			"040",
			"041",
			"042",
			"043",
			"044",
			"045",
			"046",
			"047",
			"048",
			"049",
			"050",
			"051",
			"057",
			"059",
		],
	},
	{
		name: "Mihai Andritoiou",
		country: "",
		pictures: ["091"],
	},
	{
		name: "Mikkel William",
		country: "",
		pictures: ["092"],
	},
	{
		name: "Miodrag Ignjatovic",
		country: "",
		pictures: ["093"],
	},
	{
		name: "Morfous",
		country: "",
		pictures: [],
	},
	{
		name: "Nazar Abbas",
		country: "Autralie",
		pictures: ["089"],
	},
	{
		name: "Nicolas Loran",
		country: "",
		pictures: [],
	},
	{
		name: "Oleh Slobodeniuk",
		country: "",
		pictures: ["060"],
	},
	{
		name: "Peeter Viisimaa",
		country: "",
		pictures: ["061"],
	},
	{
		name: "Philippo Bacci",
		country: "",
		pictures: ["062"],
	},
	{
		name: "Piranka",
		country: "",
		pictures: ["094", "095"],
	},
	{
		name: "Praetorian",
		country: "",
		pictures: ["063"],
	},
	{
		name: "Ramon Carretero",
		country: "",
		pictures: ["066"],
	},
	{
		name: "Skynesher",
		country: "",
		pictures: ["067"],
	},
	{
		name: "Sol Stock",
		country: "",
		pictures: ["069"],
	},
	{
		name: "SrdjanPav",
		country: "",
		pictures: ["071", "072"],
	},
	{
		name: "Steve Cole",
		country: "",
		pictures: ["096"],
	},
	{
		name: "Stock Colors",
		country: "",
		pictures: ["073"],
	},
	{
		name: "Svetikd",
		country: "",
		pictures: ["097"],
	},
	{
		name: "South Agency",
		country: "",
		pictures: ["070"],
	},
	{
		name: "Thibaut Quintens",
		country: "Belgique",
		pictures: ["064", "065"],
	},
	{
		name: "Valentina Stankovic",
		country: "",
		pictures: ["074"],
	},
	{
		name: "View Apart",
		country: "",
		pictures: ["075"],
	},
	{
		name: "Willow Pix",
		country: "",
		pictures: ["076"],
	},
	{
		name: "Xavier Istasse",
		country: "Belgique",
		pictures: ["077", "078", "079", "080", "081", "083"],
	},
];

const gamePictures = [
	{ id: "001", photograph: "Clément Mahoudeau" },
	{ id: "002", photograph: "Marian Paino" },
	{ id: "003", photograph: "Aluxum" },
	{ id: "004", photograph: "Artmarie" },
	{ id: "005", photograph: "Artmarie" },
	{ id: "006", photograph: "Clément Mahoudeau" },
	{ id: "007", photograph: "Clément Mahoudeau" },
	{ id: "008", photograph: "Clément Mahoudeau" },
	{ id: "009", photograph: "Clément Mahoudeau" },
	{ id: "010", photograph: "Clément Mahoudeau" },
	{ id: "011", photograph: "Clément Mahoudeau" },
	{ id: "012", photograph: "CVino" },
	{ id: "013", photograph: "Cinobi" },
	{ id: "014", photograph: "Cinobi" },
	{ id: "015", photograph: "Clément Mahoudeau" },
	{ id: "016", photograph: "Clément Mahoudeau" },
	{ id: "017", photograph: "Clément Mahoudeau" },
	{ id: "018", photograph: "Clément Mahoudeau" },
	{ id: "019", photograph: "Clément Mahoudeau" },
	{ id: "020", photograph: "Clément Mahoudeau" },
	{ id: "021", photograph: "Clément Mahoudeau" },
	{ id: "022", photograph: "Clément Mahoudeau" },
	{ id: "023", photograph: "Dageldog" },
	{ id: "024", photograph: "Daniel de la Hoz" },
	{ id: "025", photograph: "Elena Dijour" },
	{ id: "026", photograph: "Emir Memedovski" },
	{ id: "027", photograph: "Film Studio" },
	{ id: "028", photograph: "Firn" },
	{ id: "029", photograph: "Arnaud Ghys" },
	{ id: "030", photograph: "Frazao Studio Latino" },
	{ id: "031", photograph: "Jacob Lund" },
	{ id: "032", photograph: "Kemal Yildirim" },
	{ id: "033", photograph: "Kevin Klopper" },
	{ id: "034", photograph: "Kevin Klopper" },
	{ id: "035", photograph: "LadyEnvy09" },
	{ id: "036", photograph: "Lisa Delong" },
	{ id: "037", photograph: "Marco" },
	{ id: "038", photograph: "Marian Paino" },
	{ id: "039", photograph: "Marian Paino" },
	{ id: "040", photograph: "Marian Paino" },
	{ id: "041", photograph: "Marian Paino" },
	{ id: "042", photograph: "Marian Paino" },
	{ id: "043", photograph: "Marian Paino" },
	{ id: "044", photograph: "Marian Paino" },
	{ id: "045", photograph: "Marian Paino" },
	{ id: "046", photograph: "Marian Paino" },
	{ id: "047", photograph: "Marian Paino" },
	{ id: "048", photograph: "Marian Paino" },
	{ id: "049", photograph: "Marian Paino" },
	{ id: "050", photograph: "Marian Paino" },
	{ id: "051", photograph: "Marian Paino" },
	{ id: "052", photograph: "Marian Paino" },
	{ id: "053", photograph: "Marian Paino" },
	{ id: "054", photograph: "Marian Paino" },
	{ id: "055", photograph: "Marian Paino" },
	{ id: "056", photograph: "Marian Paino" },
	{ id: "057", photograph: "Marian Paino" },
	{ id: "058", photograph: "Arnaud Ghys" },
	{ id: "059", photograph: "Marian Paino" },
	{ id: "060", photograph: "Oleh Slobodeniuk" },
	{ id: "061", photograph: "Peeter Viisimaa" },
	{ id: "062", photograph: "Philippo Bacci" },
	{ id: "063", photograph: "Praetorian" },
	{ id: "064", photograph: "Thibaut Quintens" },
	{ id: "065", photograph: "Thibaut Quintens" },
	{ id: "066", photograph: "Ramon Carretero" },
	{ id: "067", photograph: "Skynesher" },
	{ id: "068", photograph: "Arnaud Ghys" },
	{ id: "069", photograph: "Sol Stock" },
	{ id: "070", photograph: "South Agency" },
	{ id: "071", photograph: "SrdjanPav" },
	{ id: "072", photograph: "SrdjanPav" },
	{ id: "073", photograph: "Stock Colors" },
	{ id: "074", photograph: "Valentina Stankovic" },
	{ id: "075", photograph: "View Apart" },
	{ id: "076", photograph: "WillowPix" },
	{ id: "077", photograph: "Xavier Istasse" },
	{ id: "078", photograph: "Xavier Istasse" },
	{ id: "079", photograph: "Xavier Istasse" },
	{ id: "080", photograph: "Xavier Istasse" },
	{ id: "081", photograph: "Xavier Istasse" },
	{ id: "082", photograph: "Arnaud Ghys" },
	{ id: "083", photograph: "Xavier Istasse" },
	{ id: "084", photograph: "Daniel Balakov" },
	{ id: "085", photograph: "Gorodenkoff Studio" },
	{ id: "086", photograph: "EnjoyLife2" },
	{ id: "087", photograph: "Arnaud Ghys" },
	{ id: "088", photograph: "Inconnu / Libre de droit" },
	{ id: "089", photograph: "Nazar Abbas" },
	{ id: "090", photograph: "Kristian Sekulic" },
	{ id: "091", photograph: "Mihai Andritoiou" },
	{ id: "092", photograph: "Mikkel William" },
	{ id: "093", photograph: "Miodrag Ignjatovic" },
	{ id: "094", photograph: "Piranka" },
	{ id: "095", photograph: "Piranka" },
	{ id: "096", photograph: "Steve Cole" },
	{ id: "097", photograph: "Svetikd" },
	{ id: "098", photograph: "Gavic" },
];

const photographsObj = gamePictures.reduce((accu, current) => {
	const currentName = current.photograph;
	accu[currentName] = accu[currentName] || [];
	accu[currentName].push(current.id);
	return accu;
}, {});

const photographs = Object.entries(photographsObj)
	.map(([k, v]) => ({ name: k, pictures: v }))
	.sort((a, b) => a.name.localeCompare(b.name));

export default function () {
	return {
		lang: "fr",
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
		eleventyComputed: {
			metadata: async ({ metadata, page, site, eleventy, status, lang }) => {
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

				// TODO: Memoize image transforms ?
				let imgStats = await Image(imgSrc, {
					urlPath: "/assets/images/",
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
						...(typeof metadata.inline_js === "string"
							? [metadata.inline_js]
							: metadata.inline_js || []),
						// 'console.log("hello, world");',
						// { type: "application/json", id: "some-id", js: '{"data": "hello"}' },
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
			},
		},
		photographs,
		gamePictures,
	};
}
