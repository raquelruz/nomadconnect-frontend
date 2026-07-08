import { ItineraryCard } from "./ItineraryCard";

export const TripItinerary = ({ itineraries, refreshTrip, isOwner }) => {
	if (!itineraries?.length) {
		return (
			<div className="mt-8 rounded-2xl bg-white p-6 shadow">
				<p className="text-slate-500">
					Este viaje todavía no tiene itinerarios.
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