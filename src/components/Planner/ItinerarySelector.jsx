export const ItinerarySelector = ({ itineraries, selectedItinerary, setSelectedItinerary }) => {
	if (!itineraries || itineraries.length === 0) {
		return <p className="text-sm text-slate-500">No hay itinerarios.</p>;
	}

	return (
		<div className="flex flex-col gap-2">
			{itineraries.map((itinerary) => {
				let buttonClass = "rounded-xl border border-transparent px-4 py-3 text-left hover:bg-slate-100";

				if (selectedItinerary?.id === itinerary.id) {
					buttonClass = "rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-left";
				}

				return (
					<button key={itinerary.id} className={buttonClass} onClick={() => setSelectedItinerary(itinerary)}>
						<p className="font-medium">{itinerary.title}</p>

						<p className="text-sm text-slate-500">{itinerary.days.length} días</p>
					</button>
				);
			})}
		</div>
	);
};
