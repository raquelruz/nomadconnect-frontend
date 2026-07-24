import { Map, ChevronDown, Plus } from "lucide-react";
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
	onCreateDay,
}) => {
	const { deleteItinerary, loading } = useItineraryActions({ itinerary, refreshTrip });

	return (
		<div
			className={`rounded-xl border transition ${
				isSelected ? "border-primary-500/25 bg-primary-500/10" : "border-transparent"
			}`}
		>
			<div className="flex items-center gap-2 p-2">
				<button className="flex min-w-0 flex-1 items-center gap-2" onClick={onSelect}>
					<span
						className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
							isSelected ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-500"
						}`}
					>
						<Map size={13} />
					</span>

					<span
						className={`truncate text-left text-sm font-semibold ${
							isSelected ? "text-blue-700" : "text-slate-700"
						}`}
					>
						{itinerary.title}
					</span>

					<ChevronDown
						size={14}
						className={`ml-auto shrink-0 text-slate-400 transition-transform ${
							isSelected ? "rotate-180" : ""
						}`}
					/>
				</button>

				{isOwner && (
					<ItineraryActions onEdit={() => onEdit(itinerary)} onDelete={deleteItinerary} deleting={loading} />
				)}
			</div>

			{isSelected && (
				<div className="pb-2 pl-4 pr-4">
					<DaysList days={itinerary.days} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
				</div>
			)}

			{isOwner && (
				<div className="px-4 pb-3">
					<button
						onClick={() => onCreateDay?.(itinerary)}
						className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary-500/25 bg-primary-500/10 py-2 text-xs font-semibold text-primary-400 transition hover:border-primary-500/40 hover:bg-primary-500/15 hover:text-primary-300"
					>
						<Plus size={13} />
						Crear día
					</button>
				</div>
			)}
		</div>
	);
};
