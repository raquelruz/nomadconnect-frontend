import { CreateItineraryModal } from "../ui/Modals/CreateItineraryModal";
import { CreateDayModal } from "../ui/Modals/CreateDayModal";

export const TripModals = ({
	isOwner,
	showCreateItinerary,
	onCloseCreateItinerary,
	showCreateDay,
	onCloseCreateDay,
	itineraryId,
	onCreated,
}) => {
	if (!isOwner) {
		return null;
	}

	return (
		<>
			{showCreateItinerary && (
				<div className="mb-6">
					<CreateItineraryModal
						isOpen={showCreateItinerary}
						onClose={onCloseCreateItinerary}
						onCreated={() => {
							onCloseCreateItinerary();
							onCreated();
						}}
					/>
				</div>
			)}

			{showCreateDay && (
				<CreateDayModal
					isOpen={showCreateDay}
					itineraryId={itineraryId}
					onClose={onCloseCreateDay}
					onCreated={() => {
						onCloseCreateDay();
						onCreated();
					}}
				/>
			)}
		</>
	);
};