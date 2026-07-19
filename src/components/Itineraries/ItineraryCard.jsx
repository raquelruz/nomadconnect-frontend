import { useState } from "react";
import { Plus } from "lucide-react";

import { ItineraryHeader } from "./ItineraryHeader";
import { ItineraryActions } from "./ItineraryActions";
import { DaysList } from "./DaysList";
import { CreateDayForm } from "../Days/CreateDayForm";

import { useItineraryActions } from "../../hooks/useItineraryActions";

export const ItineraryCard = ({ itinerary, refreshTrip, isOwner, onEdit }) => {
	const [showCreateDay, setShowCreateDay] = useState(false);

	const { deleteItinerary, loading } = useItineraryActions({
		itinerary,
		refreshTrip,
	});

	return (
		<section
			className="
				overflow-hidden
				rounded-3xl
				bg-white
				shadow-sm
				ring-1
				ring-slate-100
			"
		>
			<header
				className="
					flex
					items-start
					justify-between
					gap-4
					p-6
					sm:p-8
				"
			>
				<ItineraryHeader title={itinerary.title} startDate={itinerary.startDate} endDate={itinerary.endDate} />

				{isOwner && <ItineraryActions onEdit={onEdit} onDelete={deleteItinerary} loading={loading} />}
			</header>

			{isOwner && (
				<div
					className="
						border-t
						border-slate-100
						p-6
						sm:px-8
						sm:py-6
					"
				>
					{showCreateDay ? (
						<CreateDayForm
							itineraryId={itinerary.id}
							onCreated={() => {
								setShowCreateDay(false);
								refreshTrip();
							}}
							onCancel={() => setShowCreateDay(false)}
						/>
					) : (
						<button
							onClick={() => setShowCreateDay(true)}
							className="
								flex
								items-center
								gap-2
								rounded-xl
								bg-blue-600
								px-4
								py-3
								font-semibold
								text-white
								transition
								hover:bg-blue-700
							"
						>
							<Plus size={18} />
							Añadir día
						</button>
					)}
				</div>
			)}

			<div
				className="
					border-t
					border-slate-100
					p-6
					sm:p-8
				"
			>
				<DaysList days={itinerary.days} refreshTrip={refreshTrip} isOwner={isOwner} />
			</div>
		</section>
	);
};
