export const getRepliesButtonText = (count, expanded) => {
	if (expanded) {
		return "Ocultar respuestas";
	}

	if (count === 1) {
		return "Ver 1 respuesta";
	}

	return `Ver ${count} respuestas`;
};
