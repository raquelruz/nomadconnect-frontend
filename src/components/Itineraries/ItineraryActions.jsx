import { Pencil, Trash2 } from "lucide-react";

export const ItineraryActions = ({ onEdit, onDelete, deleting = false }) => {
	return (
		<div className="flex shrink-0 items-center gap-1">
			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					onEdit();
				}}
				title="Editar itinerario"
				className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
			>
				<Pencil size={15} />
			</button>

			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					onDelete();
				}}
				disabled={deleting}
				title="Eliminar itinerario"
				className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
			>
				<Trash2 size={15} />
			</button>
		</div>
	);
};
