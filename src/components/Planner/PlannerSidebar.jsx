import { useState } from "react";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { ItinerarySelector } from "../Itineraries/ItinerarySelector";

export const PlannerSidebar = ({
	itineraries,
	selectedItinerary,
	setSelectedItinerary,
	selectedDay,
	setSelectedDay,
	isOwner,
	onAddItinerary,
}) => {
	const [editingItinerary, setEditingItinerary] = useState(null);

	return (
		<aside className="sticky top-24 flex h-fit flex-col rounded-2xl border border-slate-200 bg-white p-4">
			<SidebarHeader isOwner={isOwner} onAddItinerary={onAddItinerary} />

			<div className="my-5 flex-1">
				<ItinerarySelector
					itineraries={itineraries}
					selectedItinerary={selectedItinerary}
					setSelectedItinerary={setSelectedItinerary}
					selectedDay={selectedDay}
					setSelectedDay={setSelectedDay}
				/>
			</div>

			<SidebarFooter />
		</aside>
	);
};
