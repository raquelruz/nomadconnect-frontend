import { useState } from "react";
import api from "../api";

export const useItineraryActions = ({ itinerary, refreshTrip }) => {
	const [loading, setLoading] = useState(false);

	const deleteItinerary = async () => {
		try {
			setLoading(true);

			await api.delete(`/itineraries/${itinerary.id}`);

			refreshTrip();
		} catch (error) {
			console.error("Error deleting itinerary:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateItinerary = async (data) => {
		try {
			setLoading(true);

			await api.put(`/itineraries/${itinerary.id}`, data);

			refreshTrip();
		} catch (error) {
			console.error("Error updating itinerary:", error);
		} finally {
			setLoading(false);
		}
	};

	return { deleteItinerary, updateItinerary, loading };
};
