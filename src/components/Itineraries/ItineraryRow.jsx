import { DaysList } from "../Days/DaysList";
import { ItineraryActions } from "./ItineraryActions";
import { useItineraryActions } from "../../hooks/useItineraryActions";

export const ItineraryRow = ({
	itinerary,
	isSelected,
	onSelect,
	selectedDay,
	setSelectedDay,
	isOwner,
	refreshTrip,
	onEdit,
}) => {
	const { deleteItinerary, loading } = useItineraryActions({ itinerary, refreshTrip });

	return (
		<div>
			<div className="flex items-center justify-between gap-2">
				<button
					className={`flex-1 truncate text-left text-sm font-medium transition ${
						isSelected ? "text-sky-700" : "text-slate-700 hover:text-slate-900"
					}`}
					onClick={onSelect}
				>
					{itinerary.title}
				</button>

				{isOwner && (
					<ItineraryActions onEdit={() => onEdit(itinerary)} onDelete={deleteItinerary} deleting={loading} />
				)}
			</div>

			{isSelected && <DaysList days={itinerary.days} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />}
		</div>
	);
};
