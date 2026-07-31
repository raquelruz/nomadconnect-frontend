import { useEffect, useState } from "react";
import api from "../api";

export const useTripLikes = (trip, user) => {
	const [loading, setLoading] = useState(false);
	const [liked, setLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(0);

	useEffect(() => {
		if (!trip) return;

		const initialLiked = user?.likedtrips?.some((tripId) => tripId === trip.id);

		setLiked(initialLiked);
		setLikesCount(trip.likesCount || 0);
	}, [trip, user]);

	const toggleLike = async () => {
		if (!user || loading) return;

		try {
			setLoading(true);

			const response = await api.post(`/trips/${trip.id}/like`);

			setLiked(response.data.liked);
			setLikesCount(response.data.likesCount);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, liked, likesCount, toggleLike };
};
