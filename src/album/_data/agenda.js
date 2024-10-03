import { sheetApiKey } from "../../../env.js";
const spreadsheetId = "13heVkrh--l01YTxhXSdJlKi6zTICjsdItuFHDsHDR8w"; // Replace with your spreadsheet ID
const sheetName = "Agenda"; // Replace with your sheet name

export async function agenda() {
	const sheetData = await fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${sheetApiKey}`
	)
		.then((response) => response.json())
		.then((data) => data.values)
		.catch((error) => console.error("Error:", error));

	const sheetHeader = sheetData.shift();
	let dates = sheetData.map((row) =>
		sheetHeader.reduce((accu, key, index) => {
			accu[key] = row[index];
			return accu;
		}, {})
	);

	dates = dates.map((d) => {
		const name = d.name || d.Name;
		const dateStart = d.dateStart || d["Start date"]?.split("/").reverse().join("-");
		const dateEnd = d.dateEnd || d["End date"]?.split("/").reverse().join("-");
		// const timeStart = (d.timeStart || d["Start Time"])?.slice(0, 5);
		// const timeEnd = (d.timeEnd || d["End Time"])?.slice(0, 5);
		const sortField = `${dateStart}`;
		const place = {
			name: d.place?.name || d["Location Name"],
			address: d.place?.address || d["Location"],
			country: d.place?.country || d["Country"],
			gmapQuery: null,
		};
		place.gmapQuery = `${place.address}+${place.name}+${place.country}`;

		return {
			name,
			place,
			dateStart,
			dateEnd,
			// timeStart,
			// timeEnd,
			linkOrganizer: d["Link Organizer (FR)"] || null,
			sortField,
			description_fr: d.description_fr,
			description_en: d.description_en,
		};
	});

	const today = new Date().toISOString().split("T")[0];
	dates = dates.filter((d) => d.dateStart >= today);

	return dates;
}
