import { Pencil, Trash2 } from "lucide-react";

export const ItineraryActions = ({ onEdit, onDelete }) => {
	return (
		<div className="flex items-center gap-1">
			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					onEdit();
				}}
				className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
			>
				<Pencil size={16} />
			</button>

			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					onDelete();
				}}
				className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-600"
			>
				<Trash2 size={16} />
			</button>
		</div>
	);
};
