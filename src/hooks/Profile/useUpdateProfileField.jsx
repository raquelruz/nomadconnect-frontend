import { useState } from "react";
import api from "../../api";

export const useUpdateProfileField = (profile, onUpdated) => {
	const [saving, setSaving] = useState(false);

	const updateField = async (field, value) => {
		setSaving(true);
		try {
			const response = await api
				.put(`/users/${profile.id}`, { ...profile, [field]: value });
			onUpdated(response.data);
			return response.data;
		} finally {
			return setSaving(false);
		}
	};

	return { updateField, saving };
};