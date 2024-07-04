import { PROD, srcDir } from "../../env.js";
const fileName = "_redirects";

export const data = () => {
	return {
		permalink: `${fileName}`,
	};
};

export const render = (data) => {
	const redirects = [];
	data.collections.all.forEach((p) => {
		const localRedirects = p?.data?.redirects;
		if (!p.outputPath) return;
		if (!localRedirects) return;

		if (!Array.isArray(localRedirects)) {
			console.warn("localRedirects is not an array !");
		}
		localRedirects.forEach((redirRule) => {
			const to = redirRule?.to || p.url;
			const from = redirRule?.from || p.url;
			const code = redirRule?.code || 301; // 301 is a permanent redirect. Probably what we want by default.

			if (to === from) return;
			redirects.push({ from, to, code });
		});
	});

	const localRedirString = redirects.map((r) => `${r.from} ${r.to} ${r.code}`).join("\n");

	// const { settings } = data;

	// const redirString = settings?.redirects?.code;
	// console.log({ redirString });

	return `# Auto generated redirects

# Global Redirects
------------------


# Local Redirects
------------------
${localRedirString}
    `;
};
