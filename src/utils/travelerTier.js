export const getTravelerTier = (tripsCount) => {
	if (tripsCount === 0) return "Nuevo pasajero";
	if (tripsCount >= 5) return "Viajero frecuente";
	return "Viajero";
};