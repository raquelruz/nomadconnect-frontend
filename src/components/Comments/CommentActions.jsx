import { MessageCircle, Pencil, Trash2 } from "lucide-react";

export const CommentActions = ({ canReply = true, canEdit, canDelete, onReply, onEdit, onDelete }) => {
	const buttonClass = "flex items-center gap-1 text-xs font-medium transition";

	const secondaryButton = `${buttonClass} text-text-primary/45 hover:text-primary-600`;

	const dangerButton = `${buttonClass} text-text-primary/45 hover:text-red-600`;

	if (!canReply && !canEdit && !canDelete) {
		return null;
	}

	return (
		<div className="mt-2.5 flex items-center gap-4">
			{canReply && (
				<button type="button" onClick={onReply} className={secondaryButton}>
					<MessageCircle size={13} />
					Responder
				</button>
			)}

			{canEdit && (
				<button type="button" onClick={onEdit} className={secondaryButton}>
					<Pencil size={13} />
					Editar
				</button>
			)}

			{canDelete && (
				<button type="button" onClick={onDelete} className={dangerButton}>
					<Trash2 size={13} />
					Eliminar
				</button>
			)}
		</div>
	);
};
