import { useEffect, useState } from "react";
import api from "../../api"

export const useProfile = (userId) => {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!userId) return;

		setLoading(true);
		setError(null);

		api
			.get(`/users/${userId}`)
			.then((response) => setProfile(response.data))
			.catch((err) => setError(err.message || "Error cargando el perfil"))
			.finally(() => setLoading(false));
	}, [userId]);

	return { profile, setProfile, loading, error };
};