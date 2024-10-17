import { srcDir, site } from "../../env.js";
import metadataComputed from "./_data/metadataComputed.js";

export default async function () {
	return {
		lang: "fr",
		// eleventyExcludeFromCollections: currentDir !== srcDir,
		layout: "album/_layouts/base.njk",
		currentDir: "album",
		eleventyComputed: {
			metadata: metadataComputed,
		},
		mainMenuList: [
			{
				fr: { href: "/fr/", txt: "Accueil" },
				en: { href: "/en/", txt: "Home" },
			},
			// {
			// 	fr: { href: "/fr/partenariats/", txt: "Partenariats" },
			// 	en: { href: "/en/partnerships/", txt: "Partnerships" },
			// },
			{
				fr: { href: "/fr/photographes/", txt: "Photographes" },
				en: { href: "/en/photographers/", txt: "Photographers" },
			},
			{
				fr: { href: "/fr/ressources/", txt: "Ressources" },
				en: { href: "/en/resources/", txt: "Resources" },
			},
			{
				fr: { href: "/fr/agenda/", txt: "Agenda" },
				en: { href: "/en/calendar/", txt: "Calendar" },
			},
			// {
			// 	fr: { href: "/fr/partenariats/st-luc-liege-2024/", txt: "St Luc" },
			// 	en: { href: "/en/partnerships/st-luc-liege-2024/", txt: "St Luc" },
			// },
		],
	};
}
