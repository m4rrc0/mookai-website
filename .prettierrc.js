/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	singleQuote: false,
	semi: true,
	endOfLine: "lf",
	tabWidth: 2,
	trailingComma: "es5",
	arrowParens: "always",
	printWidth: 100,
	plugins: ["prettier-plugin-jinja-template", "prettier-plugin-tailwindcss"],
	overrides: [
		{
			files: ["*.njk", "*.html"],
			options: {
				parser: "html",
			},
		},
	],
};

export default config;
