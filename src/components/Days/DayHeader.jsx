import { CalendarDays, Pencil, Trash2 } from "lucide-react";

export const DayHeader = ({ dayNumber, date, title, isOwner, onDelete, onEdit }) => {
	return (
		<header className=" flex justify-between items-start">
			<div>
				<div className=" flex items-center gap-2">
					<CalendarDays size={18} />

					<h3 className=" font-semibold text-lg">Día {dayNumber}</h3>
				</div>

				<p className=" text-sm text-gray-500 mt-1">{new Date(date).toLocaleDateString()}</p>

				{title && <p className=" mt-2 text-gray-700">{title}</p>}
			</div>

			{isOwner && (
				<div className=" flex gap-2">
					<button onClick={onEdit} className="p-2">
						<Pencil size={16} />
					</button>

					<button onClick={onDelete} className="p-2 text-red-500">
						<Trash2 size={16} />
					</button>
				</div>
			)}
		</header>
	);
};
