import { PlannerSidebar } from "./PlannerSidebar";
import { PlannerContent } from "./PlannerContent";
import { useEffect, useState } from "react";

export const PlannerPage = ({ itineraries, selectedItinerary, setSelectedItinerary, isOwner, refreshTrip }) => {
	const [selectedDay, setSelectedDay] = useState(null);

	useEffect(() => {
		if (!selectedItinerary) {
			setSelectedDay(null);
			return;
		}

		if (selectedItinerary.days.length > 0) {
			setSelectedDay(selectedItinerary.days[0]);
		}
	}, [selectedItinerary]);

	return (
		<div className="grid lg:grid-cols-[300px_1fr] gap-6">
			<PlannerSidebar
				itineraries={itineraries}
				selectedItinerary={selectedItinerary}
				setSelectedItinerary={setSelectedItinerary}
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
			/>
			<PlannerContent
				itinerary={selectedItinerary}
				selectedDay={selectedDay}
				isOwner={isOwner}
				refreshTrip={refreshTrip}
			/>
		</div>
	);
};
