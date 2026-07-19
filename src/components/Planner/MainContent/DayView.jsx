import { CalendarDays } from "lucide-react";
import { DayHeader } from "../../Days/DayHeader";
import { ActivityCard } from "../../Activities/ActivityCard";

export const DayView = ({ day, isOwner, refreshDay, onEdit, onDelete, onAddActivity }) => {
	if (!day) {
		return (
			<div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white">
				<p className="text-slate-400">Selecciona un día para ver el plan</p>
			</div>
		);
	}

	return (
		<section className="rounded-3xl border border-slate-200 bg-white p-6">
			<DayHeader
				dayNumber={day.number}
				date={day.date}
				title={day.title}
				isOwner={isOwner}
				onEdit={onEdit}
				onDelete={onDelete}
				onAddActivity={onAddActivity}
			/>

			<div className="mt-6 space-y-3">
				{day.activities?.length > 0 ? (
					day.activities.map((activity) => (
						<ActivityCard key={activity.id} activity={activity} refreshDay={refreshDay} isOwner={isOwner} />
					))
				) : (
					<div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
						<p className="text-sm text-slate-400">Todavía no hay actividades para este día.</p>
					</div>
				)}
			</div>

			{isOwner && (
				<button
					onClick={onAddActivity}
					className="mt-6 flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-medium text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
				>
					+ Añadir actividad
				</button>
			)}
		</section>
	);
};
