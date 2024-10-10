import { photographers, gamePictures } from "./gamePictures.js";
import { pressReviews } from "./ressources.js";
import { agenda } from "./agenda.js";
import { ressourcesVisuals } from "./ressourcesVisuals.js";
import { testimonials } from "./testimonials.js";

export default {
	photographers,
	gamePictures,
	ressourcesVisuals,
	pressReviews: pressReviews(),
	agenda: agenda(),
	testimonials: testimonials(),
};
