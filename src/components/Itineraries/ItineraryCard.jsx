import { ItineraryHeader } from "./ItineraryHeader";
import { ItineraryActions } from "./ItineraryActions";
import { DaysList } from "./DaysList";
import { useItineraryActions } from "../../hooks/useItineraryActions";

export const ItineraryCard = ({ itinerary, refreshTrip, refreshItinerary, refreshDay, isOwner, onEdit }) => {
	const { deleteItinerary, loading } = useItineraryActions({
		itinerary,
		refreshTrip,
	});

	return (
		<section className="bg-white rounded-3xl p-6 border shadow-sm">
			<div className="flex justify-between">
				<ItineraryHeader title={itinerary.title} startDate={itinerary.startDate} endDate={itinerary.endDate} />

				{isOwner && <ItineraryActions onEdit={onEdit} onDelete={deleteItinerary} loading={loading} />}
			</div>

			<DaysList
				days={itinerary.days}
				refreshItinerary={refreshItinerary}
				refreshDay={refreshDay}
				isOwner={isOwner}
			/>
		</section>
	);
};
