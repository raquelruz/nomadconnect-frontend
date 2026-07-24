import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import api from "../api";

import { TripDescription } from "../components/TripDetail/TripDescription";
import { TripHeader } from "../components/TripDetail/TripHeader";
import { MembersList } from "../components/Members/MembersList";
import { CommentsSection } from "../components/Comments/CommentsSection";
import { PlannerSidebar } from "../components/Planner/PlannerSidebar";
import { PlannerContent } from "../components/Planner/PlannerContent";
import { Loading } from "../components/ui/Loading";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";

import { CreateItineraryModal } from "../components/ui/Modals/CreateItineraryModal";
import { CreateDayModal } from "../components/ui/Modals/CreateDayModal";

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
			{mobileSidebarOpen && (
				<div onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
			)}

			<aside
				className={` fixed inset-y-0 left-0 z-50 w-72 border-r border-text-primary/10 bg-bg-card transition-transform duration-300 lg:sticky lg:top-22 lg:z-40 lg:h-[calc(100vh-88px)] lg:w-60 lg:shrink-0 lg:translate-x-0 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
			>
				<PlannerSidebar
					itineraries={itineraries}
					selectedItinerary={selectedItinerary}
					setSelectedItinerary={setSelectedItinerary}
					selectedDay={selectedDay}
					setSelectedDay={setSelectedDay}
					refreshTrip={getTrip}
					isOwner={isOwner}
					onClose={() => setMobileSidebarOpen(false)}
					onAddItinerary={() => setShowCreateItinerary(true)}
					onCreateDay={() => setShowCreateDay(true)}
				/>
			</aside>

			<button
				onClick={() => setMobileSidebarOpen(true)}
				className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition hover:bg-primary-700 lg:hidden"
				title="Ver itinerario"
			>
				<Menu size={22} />
			</button>

			<main className="min-w-0 flex-1 pb-16 sm:pb-20">
				<TripHeader trip={trip} user={user} refreshTrip={getTrip} />

				<div className="mx-auto max-w-6xl px-4 sm:px-6">
					<TripDescription description={trip.description} />

					{isOwner && showCreateItinerary && (
						<div className="mb-6">
							<CreateItineraryModal
								isOpen={showCreateItinerary}
								onClose={() => setShowCreateItinerary(false)}
								onCreated={() => {
									setShowCreateItinerary(false);
									getTrip();
								}}
							/>
						</div>
					)}

					{isOwner && showCreateDay && (
						<CreateDayModal
							isOpen={showCreateDay}
							itineraryId={selectedItinerary?.id}
							onClose={() => setShowCreateDay(false)}
							onCreated={() => {
								setShowCreateDay(false);
								getTrip();
							}}
						/>
					)}

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
