import { ItinerarySelector } from "./ItinerarySelector";
import { DaySelector } from "./DaySelector";

export const PlannerSidebar = ({
	itineraries,
	selectedItinerary,
	setSelectedItinerary,
	selectedDay,
	setSelectedDay,
}) => {
	return (
		<aside className="sticky top-24 h-fit rounded-2xl border border-slate-200 bg-white p-6">
			<h2 className="mb-6 text-xl font-semibold text-slate-800">Planner</h2>

			<div className="space-y-6">
				<div>
					<h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">Itinerarios</h3>

					<ItinerarySelector
						itineraries={itineraries}
						selectedItinerary={selectedItinerary}
						setSelectedItinerary={setSelectedItinerary}
					/>
				</div>

				<div>
					<h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">Días</h3>

					<DaySelector
						days={selectedItinerary?.days}
						selectedDay={selectedDay}
						setSelectedDay={setSelectedDay}
					/>
				</div>
			</div>
		</aside>
	);
};
