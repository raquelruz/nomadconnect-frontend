import { CalendarDays, Pencil, Trash2, Plus } from "lucide-react";

export const DayHeader = ({ day, isOwner, onDelete, onEdit, onAddActivity }) => {
	return (
		<div className="flex flex-col gap-4 border-b border-text-primary/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<h3 className="text-lg font-bold text-text-primary">Día {day.order || ""}</h3>

				<p className="mt-1 flex items-center gap-1.5 text-sm text-text-primary/60">
					<CalendarDays size={14} />

					{new Date(day.date).toLocaleDateString("es-ES", {
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
						className="flex h-9 w-9 items-center justify-center rounded-full bg-text-primary/5 text-text-primary/60 transition hover:bg-primary-50 hover:text-primary-600"
					>
						<Pencil size={15} />
					</button>

					<button
						onClick={onDelete}
						title="Eliminar día"
						className="flex h-9 w-9 items-center justify-center rounded-full bg-text-primary/5 text-text-primary/60 transition hover:bg-red-50 hover:text-red-600"
					>
						<Trash2 size={15} />
					</button>

					<button
						onClick={onAddActivity}
						className="flex items-center gap-1.5 rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary-500/30 transition hover:bg-primary-600 active:scale-[0.98]"
					>
						<Plus size={16} />
						Añadir actividad
					</button>
				</div>
			)}
		</div>
	);
};