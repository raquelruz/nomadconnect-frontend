import { Plus } from "lucide-react";
import { ActivityCard } from "../Activities/ActivityCard";

export const DayTimeline = ({ activities, refreshDay, isOwner, onAddActivity }) => {
	const renderAddRow = () => {
		if (!isOwner) {
			return null;
		}

		return (
			<button
				onClick={onAddActivity}
				className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-4 font-medium text-slate-500 transition hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600"
			>
				<Plus size={16} />
				Añadir actividad
			</button>
		);
	};

	if (!activities?.length) {
		return (
			<div className="mt-6 space-y-3">
				<div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
					<p className="text-sm text-slate-400">Todavía no hay actividades para este día.</p>
				</div>

				{renderAddRow()}
			</div>
		);
	}

	return (
		<div className="mt-6 space-y-3">
			{activities.map((activity) => (
				<ActivityCard key={activity.id} activity={activity} refreshDay={refreshDay} isOwner={isOwner} />
			))}

			{renderAddRow()}
		</div>
	);
};