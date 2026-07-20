import { useEntityActions } from "./useEntityActions";

export const useActivityActions = ({ activity, refreshDay }) => {
	const { remove, update, loading } = useEntityActions({
		resource: "activities",
		id: activity.id,
		onSuccess: refreshDay,
	});

	return {
		deleteActivity: remove,
		updateActivity: update,
		loading,
	};
};
