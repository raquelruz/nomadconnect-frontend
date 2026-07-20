import { useState } from "react";
import api from "../api";

export const useEntityActions = ({ resource, id, onSuccess }) => {
	const [loading, setLoading] = useState(false);

	const run = async (request) => {
		try {
			setLoading(true);

			const response = await request();

			onSuccess?.();

			return response?.data;
		} catch (error) {
			console.error(`Error in ${resource}/${id}:`, error);
		} finally {
			setLoading(false);
		}
	};

	const remove = () => run(() => api.delete(`/${resource}/${id}`));

	const update = (data) => run(() => api.put(`/${resource}/${id}`, data));

	return { remove, update, loading };
};
