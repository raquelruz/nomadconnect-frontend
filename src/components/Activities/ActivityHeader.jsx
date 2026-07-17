import { Clock, CalendarDays } from "lucide-react";

export const ActivityHeader = ({ title, date, time }) => {
	return (
		<div>
			<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
			<div className=" flex gap-4 mt-2 text-sm text-gray-500">
				<div className="flex gap-1 items-center">
					<CalendarDays size={15} />

					<span>{new Date(date).toLocaleDateString()}</span>
				</div>

				<div className="flex gap-1 items-center">
					<Clock size={15} />

					<span>{time}</span>
				</div>
			</div>
		</div>
	);
};
