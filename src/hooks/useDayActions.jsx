import { useState } from "react";
import api from "../api";

export const useDayActions = ({ day, refreshItinerary }) => {
	const [loading, setLoading] = useState(false);

	const deleteDay = async () => {
		try {
			setLoading(true);

			await api.delete(`/days/${day._id}`);

			refreshItinerary();
		} catch (error) {
			console.error("Error deleting day:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateDay = async (data) => {
		try {
			setLoading(true);

			await api.put(`/days/${day._id}`, data);

			refreshItinerary();
		} catch (error) {
			console.error("Error updating day:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		deleteDay,
		updateDay,
		loading,
	};
};
