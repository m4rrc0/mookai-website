const fileName = "robots.txt";

export const data = () => {
	return {
		permalink: `${fileName}`,
	};
};

export const render = (data) => {
	const { site } = data;

	// const redirString = settings?.redirects?.code;
	// console.log({ data });

	// TODO:
	return `Sitemap: ${site.url}/sitemap.xml
User-agent: *
Allow: /
`;
};
