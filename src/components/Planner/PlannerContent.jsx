import { useState } from "react";
import { DayView } from "../Days/DayView";
import { DayEditForm } from "../Days/DayEditForm";
import { CreateActivityModal } from "../ui/Modals/CreateActivityModal";
import { EditActivityModal } from "../ui/Modals/EditActivityModal";
import { useDayActions } from "../../hooks/useDayActions";

export const PlannerContent = ({ itinerary, selectedDay, isOwner, refreshTrip }) => {
	const [showEditDay, setShowEditDay] = useState(false);
	const [showCreateActivity, setShowCreateActivity] = useState(false);
	const [editingActivity, setEditingActivity] = useState(null);

	const { deleteDay, updateDay, loading } = useDayActions({
		day: selectedDay ?? {},
		refreshItinerary: refreshTrip,
	});

	if (!itinerary) {
		return <div className="rounded-2xl border border-slate-200 bg-white p-6">Selecciona un itinerario.</div>;
	}

	if (!selectedDay) {
		return <div className="rounded-2xl border border-slate-200 bg-white p-6">Selecciona un día.</div>;
	}

	return (
		<>
			<DayView
				day={selectedDay}
				isOwner={isOwner}
				refreshDay={refreshTrip}
				onEdit={() => setShowEditDay(true)}
				onDelete={deleteDay}
				onAddActivity={() => setShowCreateActivity(true)}
				onEditActivity={setEditingActivity}
			/>

			{showEditDay && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
					<DayEditForm
						day={selectedDay}
						updateDay={updateDay}
						loading={loading}
						onClose={() => setShowEditDay(false)}
					/>
				</div>
			)}

			<CreateActivityModal
				isOpen={showCreateActivity}
				dayId={selectedDay.id}
				dayDate={selectedDay.date}
				onCreated={refreshTrip}
				onClose={() => setShowCreateActivity(false)}
			/>

			<EditActivityModal
				isOpen={!!editingActivity}
				activity={editingActivity}
				refreshTrip={refreshTrip}
				onClose={() => setEditingActivity(null)}
			/>
		</>
	);
};
