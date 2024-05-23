import js from "@eslint/js";
import unocss from "@unocss/eslint-config/flat";
import prettier from "eslint-config-prettier";

export default [
	js.configs.recommended,
	unocss,
	prettier,
	{
		env: {
			es2021: true,
			node: true,
		},
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			"no-async-promise-executor": "warn",
			"no-prototype-builtins": "warn",
		},
	},
];
