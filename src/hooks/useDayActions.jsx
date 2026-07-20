import { useEntityActions } from "./useEntityActions";

export const useDayActions = ({ day, refreshItinerary }) => {
	const { remove, update, loading } = useEntityActions({
		resource: "days",
		id: day.id,
		onSuccess: refreshItinerary,
	});

	return {
		deleteDay: remove,
		updateDay: update,
		loading,
	};
};
