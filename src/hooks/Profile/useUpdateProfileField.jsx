import { useState } from "react";
import api from "../../api";

export const useUpdateProfileField = (profile, onUpdated) => {
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);

	const updateField = (field, value) => {
		setSaving(true);
		setError(null);

		return api
			.put(`/users/${profile.id}`, { ...profile, [field]: value })
			.then((response) => {
				onUpdated(response.data);
				return response.data;
			})
			.catch((err) => {
				setError(err.response?.data?.message || "No se pudo guardar el cambio");
				throw err;
			})
			.finally(() => setSaving(false));
	};

	return { updateField, saving, error };
};