const ressourcesVisualsDir = "/album/_assets/images/ressources-visuals";
const ressourcesVisualsDistDir = "/assets/images/ressources-visuals";

export const ressourcesVisuals = [
	// "ALBUM_2024_logo.png",
	// "ALBUM_Icons.png",
	{ fileName: "ALBUM_BOX_back.png", alt: "" },
	{ fileName: "ALBUM_BOX_cover.png", alt: "" },
	{ fileName: "ALBUM_BOX3D_droite.png", alt: "" },
	{ fileName: "ALBUM_BOX3D_gauche.png", alt: "" },
	{ fileName: "ALBUM_ECLATE_up.png", alt: "" },
	{ fileName: "ALBUM_ECLATE.png", alt: "" },
	{ fileName: "ALBUM_tagline.png", alt: "" },
	{ fileName: "ALBUM_WORD_back.png", alt: "" },
	{ fileName: "ALBUM_WORD_reve.png", alt: "" },
].map((r) => ({
	...r,
	src: `${ressourcesVisualsDir}/${r.fileName}`,
	href: `${ressourcesVisualsDistDir}/${r.fileName}`,
}));
