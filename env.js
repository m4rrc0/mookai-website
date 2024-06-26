export const NODE_ENV = process.env.NODE_ENV;
export const ELEVENTY_RUN_MODE = process.env.ELEVENTY_RUN_MODE;
// TODO: More solid strategy to evaluate if building for prod
export const PROD = process.env.PROD || NODE_ENV === "production" || ELEVENTY_RUN_MODE === "build";
export const site = {
	url: process.env.SITE_URL,
};
export const srcDir = process.env.SRC_DIR;
