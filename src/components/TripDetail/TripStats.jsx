import { FaCalendarDays, FaUsers } from "react-icons/fa6";

import { CalendarDays, Users, CircleCheck, Clock3, Flag } from "lucide-react";

const calculateDuration = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	const diff = end - start;

	return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getTripStatus = (trip) => {
	const today = new Date();

	const start = new Date(trip.startDate);
	const end = new Date(trip.endDate);

	today.setHours(0, 0, 0, 0);
	start.setHours(0, 0, 0, 0);
	end.setHours(0, 0, 0, 0);

	if (today < start) {
		return {
			label: "Próximamente",
			icon: Clock3,
			color: "text-blue-600",
		};
	}

	if (today > end) {
		return {
			label: "Finalizado",
			icon: Flag,
			color: "text-slate-500",
		};
	}

	return {
		label: "En curso",
		icon: CircleCheck,
		color: "text-green-600",
	};
};

export const TripStats = ({ trip }) => {
	const status = getTripStatus(trip);
	const StatusIcon = status.icon;

	const stats = [
		{
			icon: FaCalendarDays,
			value: `${calculateDuration(trip.startDate, trip.endDate)} días`,
			label: "Duración",
		},
		{
			icon: FaUsers,
			value: trip.maxParticipants,
			label: "Máx. participantes",
		},
		{
			icon: StatusIcon,
			value: status.label,
			label: "Estado",
			color: status.color,
		},
	];

	return (
		<div className="mt-10 grid grid-cols-3 gap-4">
			{stats.map((item) => {
				const Icon = item.icon;

				return (
					<div
						key={item.label}
						className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm transition hover:shadow-md"
					>
						<div
							className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${
								item.color ? "bg-slate-50" : "bg-slate-100"
							}`}
						>
							<Icon size={20} className={item.color ?? "text-slate-700"} />
						</div>

						<p className={`font-bold ${item.color ?? "text-slate-800"}`}>{item.value}</p>

						<p className="mt-1 text-sm text-slate-400">{item.label}</p>
					</div>
				);
			})}
		</div>
	);
};
