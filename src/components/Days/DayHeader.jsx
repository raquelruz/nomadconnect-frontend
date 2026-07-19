import { CalendarDays, Pencil, Trash2, Plus } from "lucide-react";

export const DayHeader = ({ day, isOwner, onDelete, onEdit, onAddActivity }) => {
	return (
		<div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:justify-between">
			<div>
				<h3 className="text-lg font-bold text-slate-800">Día {day.order || ""}</h3>

				<p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
					<CalendarDays size={14} />

					{new Date(day.date).toLocaleDateString("es-ES", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</p>
			</div>

			{isOwner && (
				<div className="flex gap-2">
					<button onClick={onEdit}>
						<Pencil size={15} />
					</button>

					<button onClick={onDelete}>
						<Trash2 size={15} />
					</button>

					<button onClick={onAddActivity}>
						<Plus size={16} />
						Añadir
					</button>
				</div>
			)}
		</div>
	);
};
