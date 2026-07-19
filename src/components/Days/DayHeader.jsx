import { CalendarDays, Pencil, Trash2, Plus } from "lucide-react";

export const DayHeader = ({ dayNumber, date, title, isOwner, onDelete, onEdit, onAddActivity }) => {
	return (
		<div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
			<div className="min-w-0">
				<h3 className="text-lg font-bold text-slate-800">
					Día {dayNumber}
					{title ? `: ${title}` : ""}
				</h3>

				<p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
					<CalendarDays size={14} />
					{new Date(date).toLocaleDateString("es-ES", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</p>
			</div>

			{isOwner && (
				<div className="flex shrink-0 items-center gap-2">
					<button
						onClick={onEdit}
						title="Editar día"
						className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
					>
						<Pencil size={15} />
					</button>

					<button
						onClick={onDelete}
						title="Eliminar día"
						className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:border-red-300 hover:bg-red-50"
					>
						<Trash2 size={15} />
					</button>

					<button
						onClick={onAddActivity}
						className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
					>
						<Plus size={16} />
						Añadir actividad
					</button>
				</div>
			)}
		</div>
	);
};
