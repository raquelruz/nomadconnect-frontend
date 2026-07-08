import { ItineraryCard } from "./ItineraryCard";
import { FaMap } from "react-icons/fa";


export const TripItinerary = ({ itineraries, refreshTrip, isOwner }) => {
	if (!itineraries?.length) {
	return (
		<div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center flexshadow-sm">

			<div className="mb-4 flex justify-center text-5xl text-primary-500">
				<FaMap />
			</div>

			<h3 className="text-xl font-bold text-slate-800">
				Todavía no hay itinerarios
			</h3>

			<p className="mx-auto mt-2 max-w-md text-slate-500">
				Organiza tu viaje creando el primer itinerario. 
				Podrás añadir días, actividades y lugares que visitar.
			</p>

		</div>
	);
}

	return (
		<div className="mt-8 space-y-6">
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