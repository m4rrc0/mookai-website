export default {
	dates: [
		{
			name: "Ludo-Ludo",
			place: {
				name: "Halles St-Géry",
				address: "Place Saint-Géry 1, 1000 Bruxelles",
			},
			dateStart: "2024-09-07",
		},
		{
			name: "Gembloux Ludic",
			place: {
				name: "Gembloux",
				address: "Grand Rue 21, 5030 Gembloux",
			},
			dateStart: "2024-09-07",
		},
		{
			name: "Festival du jeu de Cestas",
			place: {
				name: "Gironde",
				address: "Rue ... , 12345 ...",
				country: "France",
			},
			dateStart: "2024-09-13",
			dateEnd: "2024-09-15",
		},
		{
			Name: "Ludo-Ludo",
			"Start date": "07/09/2024",
			"Start Time": "14:00:00",
			"End Time": "18:00:00",
			"End date": "",
			"Location Name": "Saint-Géry",
			Location: "Place Saint-Géry 1",
			Notes: "",
		},
		{
			Name: "Gembloux Ludic",
			"Start date": "07/09/2024",
			"Start Time": "",
			"End Time": "",
			"End date": "",
			"Location Name": "Gembloux",
			Location: "Grand rue 21, 5030 Gembloux",
			Notes: "",
		},
		{
			Name: "Festival du jeu de Cestas",
			"Start date": "13/09/2024",
			"Start Time": "",
			"End Time": "",
			"End date": "15/09/2024",
			"Location Name": "Gironde",
			Location: "Halle du Centre Culturel",
			Notes: "",
		},
	].map((d) => {
		const name = d.name || d.Name;
		const dateStart = d.dateStart || d["Start date"]?.split("/").reverse().join("-");
		const dateEnd = d.dateEnd || d["End date"]?.split("/").reverse().join("-");
		const timeStart = (d.timeStart || d["Start Time"])?.slice(0, 5);
		const timeEnd = (d.timeEnd || d["End Time"])?.slice(0, 5);
		const sortField = `${dateStart}${timeStart ?? ""}${timeEnd ?? ""}${timeEnd ?? ""}`;
		return {
			name,
			place: {
				name: d.place?.name || d["Location Name"],
				address: d.place?.address || d["Location"],
				country: d.place?.country || d["Country"],
			},
			dateStart,
			dateEnd,
			timeStart,
			timeEnd,
			sortField,
		};
	}),
};
