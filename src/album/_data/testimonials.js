import { sheetApiKey } from "../../../env.js";
import eleventyFetch from "../../utils/eleventyFetch.js";
const spreadsheetId = "13heVkrh--l01YTxhXSdJlKi6zTICjsdItuFHDsHDR8w";
const sheetName = "Témoignages";

export async function testimonials() {
	const sheetData = await eleventyFetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${sheetApiKey}`
	)
		// .then((response) => response.json())
		.then((data) => data.values)
		.catch((error) => console.error("Error:", error));

	const sheetHeader = sheetData.shift();
	let data = sheetData.map((row) =>
		sheetHeader.reduce((accu, key, index) => {
			accu[key] = row[index];
			return accu;
		}, {})
	);

	data = data.sort(() => 0.5 - Math.random());

	return data;
}
