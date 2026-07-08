import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

import { TripCreator } from "../components/TripDetail/TripCreator";
import { TripStats } from "../components/TripDetail/TripStats";
import { TripDescription } from "../components/TripDetail/TripDescription";
import { TripItinerary } from "../components/TripDetail/TripItinerary";

export const DetailTripPage = () => {
	const { id } = useParams();

	const [trip, setTrip] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		api.get(`/trips/${id}`)
			.then((response) => setTrip(response.data))
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	}, [id]);


	if (loading)
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-slate-600 font-medium">Cargando viaje...</p>
				</div>
			</div>
		);


	if (error)
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
				<div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-md">
					<div className="text-4xl mb-4">⚠️</div>

					<h2 className="text-xl font-semibold text-slate-800 mb-2">
						Ha ocurrido un error
					</h2>

					<p className="text-slate-500">
						{error}
					</p>
				</div>
			</div>
		);


	if (!trip)
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
				<div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-md">
					<div className="text-5xl mb-4">🌍</div>

					<h2 className="text-xl font-semibold text-slate-800 mb-2">
						Viaje no encontrado
					</h2>

					<p className="text-slate-500 mb-6">
						El viaje que buscas no existe o ha sido eliminado.
					</p>

					<Link
						to="/trips"
						className="inline-flex items-center justify-center bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-700 transition"
					>
						Volver a viajes
					</Link>
				</div>
			</div>
		);


	return (
		<div className="bg-slate-50 min-h-screen pb-20">
			<div className="relative">

				<img
					src={trip.image}
					alt={trip.title}
					className="w-full h-112.5 object-cover"
				/>

				<Link
					to="/trips"
					className="absolute top-6 left-6 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
				>
					←
				</Link>


				<button className="absolute top-6 right-6 bg-white w-10 h-10 rounded-full shadow">
					♡
				</button>

			</div>


			<main className="max-w-5xl mx-auto px-4">

				<div className="bg-white rounded-3xl shadow-xl p-8 -mt-20 relative">

					<div className="flex justify-between">

						<div>
							<h1 className="text-3xl font-bold text-blue-950">
								{trip.title}
							</h1>
						</div>


						<span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg h-fit">
							★ 4.9
						</span>

					</div>


					{trip.owner && <TripCreator owner={trip.owner} />}

				</div>


				<TripStats trip={trip} />


				<TripDescription description={trip.description} />


				<TripItinerary itinerary={trip.itinerary} />

			</main>

		</div>
	);
};