const fileName = "/sitemap.xml";

export const data = () => {
	return {
		permalink: `${fileName}`,
	};
};

export const render = (data) => {
	const { site, collections } = data;

	// const redirString = settings?.redirects?.code;
	const items = collections.all
		.map((item) => {
			if (/noindex|draft|private/.test(item.data.status)) {
				return "";
			}

			return `<url>
		<loc>${site.url}${item.url}</loc>
		<lastmod>${item.date.toISOString()}</lastmod>
	</url>`;
		})
		.join("");

	// TODO: Add changefreq and priority?
	// <changefreq>{{ item.data.sitemapChangefreq | default("monthly") }}</changefreq>
	// <priority>{{ item.data.sitemapPriority | default(0.8) }}</priority>

	return `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${items}
</urlset>`;
};
