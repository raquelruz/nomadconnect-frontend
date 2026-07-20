import { ItineraryRow } from "./ItineraryRow";

export const ItinerarySelector = ({
	itineraries,
	selectedItinerary,
	setSelectedItinerary,
	selectedDay,
	setSelectedDay,
	isOwner,
	refreshTrip,
	onEditItinerary,
}) => {
	if (!itineraries || itineraries.length === 0) {
		return <p className="text-sm text-slate-500">No hay itinerarios.</p>;
	}

	return (
		<div className="flex flex-col gap-4">
			{itineraries.map((itinerary) => (
				<ItineraryRow
					key={itinerary.id}
					itinerary={itinerary}
					isSelected={selectedItinerary?.id === itinerary.id}
					onSelect={() => setSelectedItinerary(itinerary)}
					selectedDay={selectedDay}
					setSelectedDay={setSelectedDay}
					isOwner={isOwner}
					refreshTrip={refreshTrip}
					onEdit={onEditItinerary}
				/>
			))}
		</div>
	);
};
