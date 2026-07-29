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
				className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary/5 text-text-primary/40 transition hover:bg-primary-500/15 hover:text-primary-400"
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
				className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary/5 text-text-primary/40 transition hover:bg-red-500/15 hover:text-red-400 disabled:opacity-50"
			>
				<Trash2 size={15} />
			</button>
		</div>
	);
};