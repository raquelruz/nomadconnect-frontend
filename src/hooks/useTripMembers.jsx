import { useMemo, useState } from "react";
import api from "../api"
import { useToast } from "../context/ToastContext"; 

export const useTripMembers = (trip, user, refreshTrip) => {
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const isOwner = useMemo(() => {
		if (!trip || !user) return false;

		return trip.owner?.id === user.id || trip.owner?.id === user.id;
	}, [trip, user]);

	const isMember = useMemo(() => {
		if (!trip || !user) return false;

		return trip.members?.some((member) => member.id === user.id || member.id === user.id);
	}, [trip, user]);

	const hasFreePlaces = useMemo(() => {
		if (!trip) return false;

		return (trip.members?.length || 0) < trip.maxMembers;
	}, [trip]);

	const canJoin = useMemo(() => {
		return user && !isOwner && !isMember && trip?.visibility === "public" && hasFreePlaces;
	}, [user, isOwner, isMember, trip, hasFreePlaces]);

	const canLeave = useMemo(() => {
		return user && isMember;
	}, [user, isMember]);

	const joinTrip = async () => {
		try {
			setLoading(true);

			await api.post(`/trips/${trip.id}/join`);

			await refreshTrip();
		} catch (error) {
			toast.error(error.message || "No se ha podido unir al viaje");
		} finally {
			setLoading(false);
		}
	};

	const leaveTrip = async () => {
		try {
			setLoading(true);

			await api.delete(`/trips/${trip.id}/leave`);

			await refreshTrip();
		} catch (error) {
			toast.error(error.message || "No se ha podido abandonar el viaje");
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,

		isOwner,
		isMember,

		canJoin,
		canLeave,

		hasFreePlaces,

		joinTrip,
		leaveTrip,
	};
};