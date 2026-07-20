import { useState } from "react";
import { createPortal } from "react-dom";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { ItinerarySelector } from "../Itineraries/ItinerarySelector";
import { ItineraryEditForm } from "../Itineraries/ItineraryEditForm";
import { useItineraryActions } from "../../hooks/useItineraryActions";

export const PlannerSidebar = ({
	itineraries,
	selectedItinerary,
	setSelectedItinerary,
	selectedDay,
	setSelectedDay,
	isOwner,
	onAddItinerary,
	refreshTrip,
}) => {
	const [editingItinerary, setEditingItinerary] = useState(null);

	const { updateItinerary, loading } = useItineraryActions({
		itinerary: editingItinerary,
		refreshTrip,
	});

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
					isOwner={isOwner}
					refreshTrip={refreshTrip}
					onEditItinerary={setEditingItinerary}
				/>
			</div>

			<SidebarFooter />

			{editingItinerary &&
				createPortal(
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
						<ItineraryEditForm
							itinerary={editingItinerary}
							updateItinerary={updateItinerary}
							loading={loading}
							onClose={() => setEditingItinerary(null)}
						/>
					</div>,
					document.body,
				)}
		</aside>
	);
};