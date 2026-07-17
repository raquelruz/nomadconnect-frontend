import { MessageCircle, Pencil, Trash2 } from "lucide-react";

export const CommentActions = ({ date, canReply = true, canEdit, canDelete, onReply, onEdit, onDelete }) => {
	const buttonClass = "flex items-center gap-1 font-medium transition";

	const secondaryButton = `${buttonClass} text-slate-500 hover:text-blue-600`;

	const dangerButton = `${buttonClass} text-slate-500 hover:text-red-600`;

	return (
		<div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
			<span>{date}</span>

			{canReply && (
				<button type="button" onClick={onReply} className={secondaryButton}>
					<MessageCircle size={14} />
					Responder
				</button>
			)}

			{canEdit && (
				<button type="button" onClick={onEdit} className={secondaryButton}>
					<Pencil size={14} />
					Editar
				</button>
			)}

			{canDelete && (
				<button type="button" onClick={onDelete} className={dangerButton}>
					<Trash2 size={14} />
					Eliminar
				</button>
			)}
		</div>
	);
};
