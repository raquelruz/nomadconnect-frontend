import { ItineraryCard } from "./ItineraryCard";
import { FaMap } from "react-icons/fa";

export const TripItinerary = ({ itineraries, refreshTrip, isOwner }) => {
	if (!itineraries?.length) {
		return (
			<div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:mt-8 sm:p-10">
				<div className="mb-4 flex justify-center text-4xl text-primary-500 sm:text-5xl">
					<FaMap />
				</div>

				<h3 className="text-lg font-bold text-slate-800 sm:text-xl">
					Todavía no hay itinerarios
				</h3>

				<p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500 sm:max-w-md sm:text-base">
					Organiza tu viaje creando el primer itinerario.
					Podrás añadir días, actividades y lugares que visitar.
				</p>
			</div>
		);
	}

	return (
		<div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
			{itineraries.map((itinerary) => (
				<ItineraryCard
					key={itinerary.id}
					itinerary={itinerary}
					refreshTrip={refreshTrip}
					isOwner={isOwner}
				/>
			))}
		</div>
	);
};