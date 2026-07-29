import { useEntityActions } from "../Shared/useEntityActions";

export const useItineraryActions = ({ itinerary, refreshTrip }) => {
	const { remove, update, loading } = useEntityActions({
		resource: "itineraries",
		id: itinerary?.id,
		onSuccess: refreshTrip,
	});

	return {
		deleteItinerary: remove,
		updateItinerary: update,
		loading,
	};
};