import { useState } from "react";
import { CommentEditableBody } from "./CommentEditableBody";
import { CommentActions } from "./CommentActions";
import { useCommentEditor } from "../../hooks/Comments/useCommentEditor";
import { useCommentPermissions } from "../../hooks/Comments/useCommentPermissions";
import { ConfirmModal } from "../ui/ConfirmModal";

export const CommentBody = ({ comment, user, trip, editComment, deleteComment, canReply = false, onReply }) => {
	const { editing, text, setText, startEditing, cancelEditing, saveEditing } = useCommentEditor({
		id: comment.id,
		initialText: comment.text,
		onSave: editComment,
	});

	const { isAuthor, canDelete } = useCommentPermissions(comment, trip, user);

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const handleConfirmDelete = async () => {
		setDeleting(true);
		await deleteComment(comment.id);
		setDeleting(false);
		setConfirmOpen(false);
	};

	return (
		<>
			<CommentEditableBody
				editing={editing}
				text={text}
				setText={setText}
				displayText={comment.text}
				onSave={saveEditing}
				onCancel={cancelEditing}
			/>

			{!editing && (
				<CommentActions
					canReply={canReply}
					canEdit={isAuthor}
					canDelete={canDelete}
					onReply={onReply}
					onEdit={startEditing}
					onDelete={() => setConfirmOpen(true)}
				/>
			)}

			<ConfirmModal
				isOpen={confirmOpen}
				title="Eliminar comentario"
				message="¿Seguro que quieres eliminar este comentario? Esta acción no se puede deshacer."
				onConfirm={handleConfirmDelete}
				onCancel={() => setConfirmOpen(false)}
				loading={deleting}
			/>
		</>
	);
};
