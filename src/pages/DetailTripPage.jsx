import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import api from "../api";
import { TripCreator } from "../components/TripDetail/TripCreator";
import { TripStats } from "../components/TripDetail/TripStats";
import { TripDescription } from "../components/TripDetail/TripDescription";
import { TripItinerary } from "../components/TripDetail/TripItinerary";
import { CreateItineraryForm } from "../components/TripDetail/CreateItineraryForm";

export const DetailTripPage = () => {
	const { user } = useAuth();
	const { id } = useParams();
	const [trip, setTrip] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showItineraryForm, setShowItineraryForm] = useState(false);

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

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
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50">
				<div className="flex flex-col items-center gap-4">
					<div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

					<p className="font-medium text-slate-600">Cargando viaje...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
				<div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-md sm:p-8">
					<div className="mb-4 text-4xl">⚠️</div>

					<h2 className="mb-2 text-xl font-semibold text-slate-800">Ha ocurrido un error</h2>

					<p className="text-slate-500">{error}</p>
				</div>
			</div>
		);
	}

	if (!trip) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
				<div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-md sm:p-8">
					<div className="mb-4 text-5xl">🌍</div>

					<h2 className="mb-2 text-xl font-semibold text-slate-800">Viaje no encontrado</h2>

					<p className="mb-6 text-slate-500">El viaje que buscas no existe o ha sido eliminado.</p>

					<Link
						to="/trips"
						className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-white transition hover:bg-slate-700"
					>
						Volver a viajes
					</Link>
				</div>
			</div>
		);
	}

	const isOwner = trip.owner?.id === user?.id || trip.owner?._id === user?.id;

	return (
		<div className="min-h-screen bg-slate-50 pb-16 sm:pb-20">
			<div className="relative">
				<img src={trip.image} alt={trip.title} className="h-56 w-full object-cover sm:h-72 lg:h-112.5" />

				<Link
					to="/trips"
					className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:shadow-lg sm:left-6 sm:top-6"
				>
					←
				</Link>

				<button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:shadow-lg sm:right-6 sm:top-6">
					♡
				</button>
			</div>

			<main className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="relative -mt-10 rounded-2xl bg-white p-5 shadow-xl sm:-mt-20 sm:rounded-3xl sm:p-8">
					<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
						<div className="flex-1 min-w-0">
							<h1 className="wrap-break-word text-3xl font-bold text-blue-950 sm:text-4xl">
								{trip.title}
							</h1>

							<div className="mt-4 flex flex-col gap-3 text-slate-500 sm:flex-row sm:flex-wrap sm:gap-6">
								<div className="flex items-center gap-2">
									<MapPin size={18} className="shrink-0 text-blue-600" />

									<span className="font-medium wrap-break-word">
										{trip.city}, {trip.country}
									</span>
								</div>

								<div className="flex items-center gap-2">
									<Calendar size={18} className="shrink-0 text-blue-600" />

									<span className="font-medium wrap-break-word">
										{formatDate(trip.startDate)} — {formatDate(trip.endDate)}
									</span>
								</div>
							</div>
						</div>

						<div className="w-full rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 lg:w-auto">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
									<Users size={18} />
								</div>

								<div>
									<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
										Participantes
									</p>

									<p className="text-xl font-bold text-slate-900">{trip.members?.length || 1}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 sm:mt-8">{trip.owner && <TripCreator owner={trip.owner} />}</div>
				</div>
				<TripStats trip={trip} />

				<TripDescription description={trip.description} />

				{/* Itinerarios */}
				<section className="mt-8 sm:mt-10">
					<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="text-xl font-bold text-slate-800 sm:text-2xl">Itinerarios</h2>

						{isOwner && !showItineraryForm && (
							<button
								onClick={() => setShowItineraryForm(true)}
								className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 sm:w-auto sm:py-2.5"
							>
								+ Añadir itinerario
							</button>
						)}
					</div>

					{isOwner && showItineraryForm && (
						<div className="mb-6 sm:mb-8">
							<CreateItineraryForm
								onCreated={() => {
									setShowItineraryForm(false);
									getTrip();
								}}
								onCancel={() => setShowItineraryForm(false)}
							/>
						</div>
					)}

					<TripItinerary itineraries={trip.itineraries} refreshTrip={getTrip} isOwner={isOwner} />
				</section>
			</main>
		</div>
	);
};
