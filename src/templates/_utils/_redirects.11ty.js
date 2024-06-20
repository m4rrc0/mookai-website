const fileName = "_redirects";

export const data = () => {
	return {
		permalink: `${fileName}`,
	};
};

export const render = (data) => {
	// const { settings } = data;

	// const redirString = settings?.redirects?.code;
	// console.log({ redirString });

	return `# Auto generated redirects from CMS

# Global Redirects
------------------
# $ {redirString}

# Local Redirects
------------------
    `;
};
