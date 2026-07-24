import { DayHeader } from "./DayHeader";
import { ActivityList } from "../Activities/ActivityList";

export const DayView = ({ day, isOwner, refreshDay, onEdit, onDelete, onAddActivity, onEditActivity }) => {
	if (!day) {
		return (
			<div className="flex h-full items-center justify-center rounded-2xl border border-text-primary/10 bg-bg-card">
				<p className="text-text-primary/40">Selecciona un día para ver el plan</p>
			</div>
		);
	}

	return (
		<section className="rounded-3xl border border-text-primary/10 bg-bg-card p-6">
			<DayHeader day={day} isOwner={isOwner} onEdit={onEdit} onDelete={onDelete} onAddActivity={onAddActivity} />

			<div className="mt-6">
				<ActivityList
					activities={day.activities}
					isOwner={isOwner}
					refreshDay={refreshDay}
					onEditActivity={onEditActivity}
				/>
			</div>
		</section>
	);
};