import { useState } from "react";
import { createPortal } from "react-dom";
import { DayHeader } from "./DayHeader";
import { DayTimeline } from "./DayTimeline";
import { DayEditForm } from "./DayEditForm";
import { useDayActions } from "../../hooks/useDayActions";

export const DayCard = ({ day, dayNumber, refreshItinerary, refreshDay, isOwner, onAddActivity }) => {
	const [showEditForm, setShowEditForm] = useState(false);

	const { deleteDay, updateDay, loading } = useDayActions({
		day,
		refreshItinerary,
	});

	const renderEditModal = () => {
		if (!showEditForm) {
			return null;
		}

		return createPortal(
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
				<DayEditForm day={day} updateDay={updateDay} loading={loading} onClose={() => setShowEditForm(false)} />
			</div>,
			document.body,
		);
	};

	return (
		<section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
			<DayHeader
				dayNumber={dayNumber}
				date={day.date}
				title={day.title}
				isOwner={isOwner}
				onDelete={deleteDay}
				onEdit={() => setShowEditForm(true)}
				onAddActivity={onAddActivity}
			/>

			<DayTimeline
				activities={day.activities}
				refreshDay={refreshDay}
				isOwner={isOwner}
				onAddActivity={onAddActivity}
			/>

			{renderEditModal()}
		</section>
	);
};
