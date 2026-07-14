import { Pencil, Trash2 } from "lucide-react";

export const ActivityActions = ({ isOwner, editing, onToggleEdit, onDelete }) => {
	if (!isOwner) return null;

	return (
		<div className="flex shrink-0 gap-2 self-end md:self-start">
			<button
				type="button"
				onClick={onToggleEdit}
				title={editing ? "Cancelar edición" : "Editar actividad"}
				className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
			>
				<Pencil size={18} />
			</button>

			<button
				type="button"
				onClick={onDelete}
				title="Eliminar actividad"
				className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-white text-red-500 transition hover:border-red-300 hover:bg-red-50"
			>
				<Trash2 size={18} />
			</button>
		</div>
	);
};
