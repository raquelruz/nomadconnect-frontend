import { MessageCircle, Pencil, Trash2 } from "lucide-react";

export const CommentActions = ({ canEdit, canDelete, onReply, onEdit, onDelete }) => {
	return (
		<div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
			<button
				onClick={onReply}
				className="flex items-center gap-1 font-medium text-slate-500 hover:text-blue-600"
			>
				<MessageCircle size={14} />
				Responder
			</button>

			{canEdit && (
				<button
					onClick={onEdit}
					className="flex items-center gap-1 font-medium text-slate-500 hover:text-blue-600"
				>
					<Pencil size={14} />
					Editar
				</button>
			)}

			{canDelete && (
				<button
					onClick={onDelete}
					className="flex items-center gap-1 font-medium text-slate-500 hover:text-red-600"
				>
					<Trash2 size={14} />
					Eliminar
				</button>
			)}
		</div>
	);
};
