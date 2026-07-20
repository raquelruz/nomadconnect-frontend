import { DaysList } from "../Days/DaysList";

export const ItinerarySelector = ({
	itineraries,
	selectedItinerary,
	setSelectedItinerary,
	selectedDay,
	setSelectedDay,
}) => {
	if (!itineraries || itineraries.length === 0) {
		return <p className="text-sm text-slate-500">No hay itinerarios.</p>;
	}

	return (
		<div className="flex flex-col gap-4">
			{itineraries.map((itinerary) => (
				<div key={itinerary.id}>
					<button className="text-left" onClick={() => setSelectedItinerary(itinerary)}>
						{itinerary.title}
					</button>

					{selectedItinerary?.id === itinerary.id && (
						<DaysList days={itinerary.days} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
					)}
				</div>
			))}
		</div>
	);
};
