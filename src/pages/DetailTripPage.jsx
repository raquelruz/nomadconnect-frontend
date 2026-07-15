import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api";
import { TripStats } from "../components/TripDetail/TripStats";
import { TripDescription } from "../components/TripDetail/TripDescription";
import { TripHeader } from "../components/TripDetail/TripHeader";
import { TripItineraries } from "../components/Itineraries/TripItineraries";
import { Loading } from "../components/ui/Loading";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";

export const DetailTripPage = () => {
	const { user } = useAuth();
	const { id } = useParams();
	const [trip, setTrip] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getTrip = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await api.get(`/trips/${id}`);
			setTrip(response.data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getTrip();
	}, [id]);

	if (loading) {
		return <Loading message="Cargando viaje..." />;
	}

	if (error) {
		return <ErrorState title="Ha ocurrido un error" message={error} />;
	}

	if (!trip) {
		return (
			<EmptyState
				emoji="🌍"
				title="Viaje no encontrado"
				description="El viaje que buscas no existe o ha sido eliminado."
				action={
					<Link
						to="/trips"
						className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-white transition hover:bg-slate-700"
					>
						Volver a viajes
					</Link>
				}
			/>
		);
	}

	const isOwner = trip.owner?.id === user?.id || trip.owner?._id === user?.id;

	const isMember = trip.members?.some((member) => member.id === user?.id || member._id === user?.id);

	const canJoin = user && !isOwner && !isMember && trip.visibility === "public";

	const canLeave = user && isMember;

	const handleJoin = async () => {
		try {
			await api.post(`/trips/${trip.id}/join`);
			getTrip();
		} catch (error) {
			console.error(error);
		}
	};

	const handleLeave = async () => {
		try {
			await api.delete(`/trips/${trip.id}/leave`);
			getTrip();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 pb-16 sm:pb-20">
			<main className="mx-auto max-w-6xl px-4 sm:px-6">
				<TripHeader trip={trip} user={user} refreshTrip={getTrip} />
				
				<TripStats trip={trip} />

				<TripDescription description={trip.description} />

				<TripItineraries trip={trip} isOwner={isOwner} refreshTrip={getTrip} />
			</main>
		</div>
	);
};
