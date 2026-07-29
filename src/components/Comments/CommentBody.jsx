import { CommentEditableBody } from "./CommentEditableBody";
import { CommentActions } from "./CommentActions";
import { useCommentEditor } from "../../hooks/Comments/useCommentEditor";
import { useCommentPermissions } from "../../hooks/Comments/useCommentPermissions";

export const CommentBody = ({ comment, user, trip, editComment, deleteComment, canReply = false, onReply }) => {
	const { editing, text, setText, startEditing, cancelEditing, saveEditing } = useCommentEditor({
		id: comment.id,
		initialText: comment.text,
		onSave: editComment,
	});

	const { isAuthor, canDelete } = useCommentPermissions(comment, trip, user);

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
					onDelete={() => deleteComment(comment.id)}
				/>
			)}
		</>
	);
};