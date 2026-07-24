import { useState } from "react";
import { createPortal } from "react-dom";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { ItinerarySelector } from "../Itineraries/ItinerarySelector";
import { ItineraryEditForm } from "../Itineraries/ItineraryEditForm";
import { ModalOverlay } from "../ui/ModalOverlay";
import { useItineraryActions } from "../../hooks/Itineraries/useItineraryActions";

export const PlannerSidebar = ({
	itineraries,
	selectedItinerary,
	setSelectedItinerary,
	selectedDay,
	setSelectedDay,
	isOwner,
	onAddItinerary,
	refreshTrip,
	onCreateDay,
}) => {
	const [editingItinerary, setEditingItinerary] = useState(null);

	const { updateItinerary, loading } = useItineraryActions({
		itinerary: editingItinerary,
		refreshTrip,
	});

	return (
		<aside className="sticky top-24 flex h-fit flex-col rounded-2xl bg-bg-card p-4">
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
					onCreateDay={onCreateDay}
				/>
			</div>

			<SidebarFooter />

			{editingItinerary &&
				createPortal(
					<ModalOverlay>
						<ItineraryEditForm
							itinerary={editingItinerary}
							updateItinerary={updateItinerary}
							loading={loading}
							onClose={() => setEditingItinerary(null)}
						/>
					</ModalOverlay>,
					document.body,
				)}
		</aside>
	);
};
