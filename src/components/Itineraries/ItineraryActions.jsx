import { Pencil, Trash2 } from "lucide-react";

export const ItineraryActions = ({ onEdit, onDelete, loading }) => {
	return (
		<div className="flex gap-2">
			<button onClick={onEdit} className="p-2">
				<Pencil size={16} />
			</button>

			<button onClick={onDelete} disabled={loading} className="p-2 text-red-500">
				<Trash2 size={16} />
			</button>
		</div>
	);
};
