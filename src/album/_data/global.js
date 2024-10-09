import { photographers, gamePictures } from "./gamePictures.js";
import { pressReviews } from "./ressources.js";
import { agenda } from "./agenda.js";
import { ressourcesVisuals } from "./ressourcesVisuals.js";
import { testimonials } from "./testimonials.js";

export default async function () {
	return {
		photographers,
		gamePictures,
		ressourcesVisuals,
		pressReviews: await pressReviews(),
		agenda: await agenda(),
		testimonials: await testimonials(),
	};
}
