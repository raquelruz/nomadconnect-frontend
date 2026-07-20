import { CommentCard } from "./CommentCard";
import { CommentActions } from "./CommentActions";
import { CommentEditableBody } from "./CommentEditableBody";
import { useCommentEditor } from "../../hooks/useCommentEditor";
import { useCommentPermissions } from "../../hooks/useCommentPermissions";

export const ReplyItem = ({ reply, user, trip, editComment, deleteComment }) => {
	const { editing, text, setText, startEditing, cancelEditing, saveEditing } = useCommentEditor({
		id: reply.id,
		initialText: reply.text,
		onSave: editComment,
	});

	const { isAuthor, canDelete } = useCommentPermissions(reply, trip, user);

	const createdAt = new Date(reply.createdAt).toLocaleDateString("es-ES");

	return (
		<div className="ml-10">
			<CommentCard user={reply.author} reply>
				<CommentEditableBody
					editing={editing}
					text={text}
					setText={setText}
					displayText={reply.text}
					onSave={saveEditing}
					onCancel={cancelEditing}
				/>

				<CommentActions
					date={createdAt}
					canReply={false}
					canEdit={isAuthor}
					canDelete={canDelete}
					onEdit={startEditing}
					onDelete={() => deleteComment(reply.id)}
				/>
			</CommentCard>
		</div>
	);
};
