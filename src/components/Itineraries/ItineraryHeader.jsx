import { Plane, CalendarDays } from "lucide-react";

export const ItineraryHeader = ({ title, startDate, endDate }) => {
	return (
		<header>
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
					<Plane size={20} />
				</div>

				<div>
					<h2 className="text-xl font-bold text-slate-800">{title || "Itinerario"}</h2>

					{startDate && endDate && (
						<div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
							<CalendarDays size={15} />

							<span>
								{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
							</span>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
