import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

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
			<p className="text-center text-gray-500 mt-10">
				Cargando viaje...
			</p>
		);

	if (error)
		return (
			<p className="text-center text-red-500 mt-10">
				{error}
			</p>
		);

	if (!trip)
		return (
			<p className="text-center text-gray-500 mt-10">
				Viaje no encontrado
			</p>
		);

	return (
		<div className="min-h-screen bg-gray-50 py-10 px-4">
			<div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
				
				<img
					src={trip.image}
					alt={trip.title}
					className="w-full h-[450px] object-cover"
				/>

				<div className="p-8">
					
					<Link
						to="/trips"
						className="text-sm text-primary-500 hover:underline"
					>
						← Volver a viajes
					</Link>

					<div className="mt-6 flex justify-between items-start gap-4">
						<div>
							<h1 className="text-4xl font-bold text-gray-900">
								{trip.title}
							</h1>

							<p className="mt-2 text-lg text-gray-500">
								📍 {trip.destination}
							</p>
						</div>
					</div>


					<div className="mt-6 bg-gray-100 rounded-xl p-4">
						<p className="font-medium text-gray-700">
							📅 Fechas
						</p>

						<p className="text-gray-600 mt-1">
							{trip.startDate} - {trip.endDate}
						</p>
					</div>


					<div className="mt-8">
						<h2 className="text-2xl font-semibold text-gray-900">
							Descripción
						</h2>

						<p className="mt-3 text-gray-600 leading-relaxed">
							{trip.description}
						</p>
					</div>

				</div>
			</div>
		</div>
	);
};