import { useState } from "react";
import api from "../api";

export const useActivityActions = ({ activity, refreshDay, onClose }) => {
	const [loading, setLoading] = useState(false);

	const deleteActivity = async () => {
		try {
			setLoading(true);

			await api.delete(`/activities/${activity.id}`);

			refreshDay();
		} catch (error) {
			console.error("Error deleting activity:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateActivity = async (data) => {
		try {
			setLoading(true);

			await api.put(`/activities/${activity._id}`, data);

			refreshDay();

			if (onClose) {
				onClose();
			}
		} catch (error) {
			console.error("Error updating activity:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		deleteActivity,
		updateActivity,
		loading,
	};
};
