import EleventyFetch from "@11ty/eleventy-fetch";
import { FETCH_CACHE_DIR, FETCH_CACHE_DURATION } from "../../env.js";

export default async function (url, options) {
	return EleventyFetch(url, {
		directory: FETCH_CACHE_DIR,
		duration: FETCH_CACHE_DURATION,
		type: "json", // JSON is parsed
		...options,
	});
}
