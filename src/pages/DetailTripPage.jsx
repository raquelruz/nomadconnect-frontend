import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api";

import { TripDescription } from "../components/TripDetail/TripDescription";
import { TripHeader } from "../components/TripDetail/TripHeader";
import { TripPlannerSidebar } from "../components/TripDetail/TripPlannerSidebar";
import { TripModals } from "../components/TripDetail/TripModals";
import { MembersList } from "../components/Members/MembersList";
import { CommentsSection } from "../components/Comments/CommentsSection";
import { PlannerContent } from "../components/Planner/PlannerContent";
import { Loading } from "../components/ui/Loading";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";

export const DetailTripPage = () => {
	const { user } = useAuth();
	const { id } = useParams();

	const [trip, setTrip] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [selectedItinerary, setSelectedItinerary] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	const [showCreateItinerary, setShowCreateItinerary] = useState(false);
	const [showCreateDay, setShowCreateDay] = useState(false);

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

	useEffect(() => {
		if (!trip?.itineraries?.length) {
			setSelectedItinerary(null);
			return;
		}

		const stillExists = trip.itineraries.some((itinerary) => itinerary.id === selectedItinerary?.id);

		if (!stillExists) {
			setSelectedItinerary(trip.itineraries[0]);
			return;
		}

		const refreshed = trip.itineraries.find((itinerary) => itinerary.id === selectedItinerary.id);
		setSelectedItinerary(refreshed);
	}, [trip]);

	useEffect(() => {
		if (!selectedItinerary?.days?.length) {
			setSelectedDay(null);
			return;
		}

		const stillExists = selectedItinerary.days.some((day) => day.id === selectedDay?.id);

		if (!stillExists) {
			setSelectedDay(selectedItinerary.days[0]);
			return;
		}

		const refreshed = selectedItinerary.days.find((day) => day.id === selectedDay.id);
		setSelectedDay(refreshed);
	}, [selectedItinerary]);

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
						className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-5 py-2.5 text-white transition hover:bg-primary-700"
					>
						Volver a viajes
					</Link>
				}
			/>
		);
	}

	const isOwner = trip.owner?.id === user?.id;
	const itineraries = trip.itineraries || [];

	return (
		<div className="flex min-h-screen bg-bg-card/95">
			<TripPlannerSidebar
				itineraries={itineraries}
				selectedItinerary={selectedItinerary}
				setSelectedItinerary={setSelectedItinerary}
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
				isOwner={isOwner}
				refreshTrip={getTrip}
				mobileOpen={mobileSidebarOpen}
				setMobileOpen={setMobileSidebarOpen}
				onAddItinerary={() => setShowCreateItinerary(true)}
				onCreateDay={() => setShowCreateDay(true)}
			/>

			<main className="min-w-0 flex-1 pb-16 sm:pb-20">
				<TripHeader trip={trip} user={user} refreshTrip={getTrip} />

				<div className="mx-auto max-w-6xl px-4 sm:px-6">
					<TripDescription description={trip.description} />

					<TripModals
						isOwner={isOwner}
						showCreateItinerary={showCreateItinerary}
						onCloseCreateItinerary={() => setShowCreateItinerary(false)}
						showCreateDay={showCreateDay}
						onCloseCreateDay={() => setShowCreateDay(false)}
						itineraryId={selectedItinerary?.id}
						onCreated={getTrip}
					/>

					<section className="mt-8 sm:mt-10">
						<PlannerContent
							itinerary={selectedItinerary}
							selectedDay={selectedDay}
							isOwner={isOwner}
							refreshTrip={getTrip}
							tripImage={trip.image}
							tripLocation={`${trip.city}, ${trip.country}`}
							onCreateDay={() => setShowCreateDay(true)}
						/>
					</section>

					<MembersList trip={trip} />

					<CommentsSection trip={trip} user={user} />
				</div>
			</main>
		</div>
	);
};