import { srcDir } from "../../env.js";

export default function () {
	return {
		permalink: function ({
			page: { fileSlug, filePathStem, outputFileExtension, ...page },
			currentDir,
			permalink,
		}) {
			// Early return if permalink is defined as false lower in the data cascade

			if (permalink === false) {
				return false;
			}
			if (filePathStem.startsWith("/_utils/")) {
				return permalink;
			}
			// fileSlug: "album",
			const regex = new RegExp(`^/${currentDir}/`);
			// filePathStem: "/album/index",
			const stem = filePathStem.replace(regex, "");
			// outputFileExtension: "html",
			const pl = `${stem}.${outputFileExtension}`;

			return currentDir === srcDir ? pl : false;
		},
		// <link rel="alternate" hreflang="lang_code" href="url_of_page" />
		altLangs: async ({ pageRef, lang, collections }) => {
			const alts = await collections.all
				.filter((p) => pageRef && pageRef === p.data?.pageRef)
				.map((p) => {
					const href = p.page.url;
					const hreflang = p.data.lang;
					return {
						href,
						hreflang,
						isSelf: lang === hreflang,
						// html: `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`,
					};
				});

			alts.sort((a, b) => {
				const order = { fr: 0, en: 1 };
				return order[a.hreflang] - order[b.hreflang];
			});

			return alts;
		},
	};
}
