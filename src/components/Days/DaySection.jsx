import { CalendarDays } from "lucide-react";
import { DayView } from "../Planner/MainContent/DayView";

export const DaySection = ({ day, isOwner, refreshTrip }) => {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white">
			<header className="flex items-center justify-between border-b border-slate-200 p-6">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-sky-100 p-2">
						<CalendarDays size={20} className="text-sky-600" />
					</div>

					<div>
						<h2 className="text-xl font-semibold">{day.title}</h2>

						<p className="text-sm text-slate-500">{day.activities.length} actividades</p>
					</div>
				</div>
			</header>

			<div className="p-6">
				<DayView day={day} isOwner={isOwner} refreshTrip={refreshTrip} />
			</div>
		</div>
	);
};
