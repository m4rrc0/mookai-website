import { sheetApiKey } from "../../../env.js";
const spreadsheetId = "13heVkrh--l01YTxhXSdJlKi6zTICjsdItuFHDsHDR8w"; // Replace with your spreadsheet ID
const sheetName = "Ressources"; // Replace with your sheet name

export async function pressReviews() {
	const sheetData = await fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${sheetApiKey}`
	)
		.then((response) => response.json())
		.then((data) => data.values)
		.catch((error) => console.error("Error:", error));

	const sheetHeader = sheetData.shift();
	let data = sheetData.map((row) =>
		sheetHeader.reduce((accu, key, index) => {
			accu[key] = row[index];
			return accu;
		}, {})
	);

	data = data.map((d) => {
		const date = d.date?.split("/").reverse().join("-");
		const url = d.link || (d.fileName && `/assets/documents/press-articles/${d.fileName}`);

		return {
			...d,
			date,
			sortField: date,
			url,
		};
	});

	return data;
}
