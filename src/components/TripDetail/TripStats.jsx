import { FaCalendarDays, FaUsers, FaDollarSign } from "react-icons/fa6";

const calculateDuration = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	const diff = end - start;

	return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const TripStats = ({ trip }) => {
	const stats = [
		{
			icon: FaCalendarDays,
			value: `${calculateDuration(trip.startDate, trip.endDate)} días`,
			label: "Duration",
		},
		{
			icon: FaUsers,
			value: trip.maxParticipants,
			label: "Max. participantes",
		},
		{
			icon: FaDollarSign,
			value: `${trip.baseCost}€`,
			label: "Base Cost",
		},
	];

	return (
		<div className="grid grid-cols-3 gap-4 mt-10">
			{stats.map((item) => {
				const Icon = item.icon;

				return (
					<div
						key={item.label}
						className="bg-white rounded-2xl p-6 text-center shadow-sm flex flex-col items-center "
					>
						<div className=" w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 ">
							<Icon className="text-slate-700 text-xl" />
						</div>

						<p className="font-bold text-slate-800">{item.value}</p>

						<p className="text-sm text-gray-400 mt-1">{item.label}</p>
					</div>
				);
			})}
		</div>
	);
};
