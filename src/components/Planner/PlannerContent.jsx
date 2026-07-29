import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { DayView } from "../Days/DayView";
import { DayEditForm } from "../Days/DayEditForm";
import { CreateActivityModal } from "../ui/Modals/CreateActivityModal";
import { EditActivityModal } from "../ui/Modals/EditActivityModal";
import { ModalOverlay } from "../ui/ModalOverlay";
import { useDayActions } from "../../hooks/Days/useDayActions";

export const PlannerContent = ({ itinerary, selectedDay, isOwner, refreshTrip, onCreateDay }) => {
	const [showEditDay, setShowEditDay] = useState(false);
	const [showCreateActivity, setShowCreateActivity] = useState(false);
	const [editingActivity, setEditingActivity] = useState(null);

	const { deleteDay, updateDay, loading } = useDayActions({
		day: selectedDay ?? {},
		refreshItinerary: refreshTrip,
	});

	if (!itinerary) {
		return (
			<div className="rounded-2xl border border-text-primary/10 bg-bg-card p-6 text-center text-text-primary/60">
				Selecciona un itinerario.
			</div>
		);
	}

	if (!selectedDay) {
		return (
			<div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-text-primary/15 bg-bg-card p-10 text-center">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-500">
					<CalendarPlus size={22} />
				</div>

				<div>
					<p className="font-semibold text-text-primary">Aún no hay días en este itinerario</p>
					<p className="mt-1 text-sm text-text-primary/60">
						Crea el primer día para empezar a añadir actividades.
					</p>
				</div>

				{isOwner && (
					<button
						onClick={onCreateDay}
						className="mt-1 flex items-center gap-1.5 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-500/30 transition hover:bg-primary-600 active:scale-[0.98]"
					>
						<CalendarPlus size={16} />
						Crear día
					</button>
				)}
			</div>
		);
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
				<ModalOverlay>
					<DayEditForm
						day={selectedDay}
						updateDay={updateDay}
						loading={loading}
						onClose={() => setShowEditDay(false)}
					/>
				</ModalOverlay>
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
