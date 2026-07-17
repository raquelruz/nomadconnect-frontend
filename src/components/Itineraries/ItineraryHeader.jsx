import { Plane, CalendarDays } from "lucide-react";

export const ItineraryHeader = ({ title, startDate, endDate }) => {
	return (
		<header>
			<div className=" flex items-center gap-2">
				<Plane size={20} />

				<h2 className=" text-xl font-semibold">{title || "Itinerario"}</h2>
			</div>

			{startDate && endDate && (
				<div className=" mt-2 flex items-center gap-2 text-sm text-gray-500">
					<CalendarDays size={16} />

					<span>
						{new Date(startDate).toLocaleDateString()}-{new Date(endDate).toLocaleDateString()}
					</span>
				</div>
			)}
		</header>
	);
};
