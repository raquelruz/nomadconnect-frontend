import { useState } from "react";
import { ReplyItem } from "./ReplyItem";
import { CommentActions } from "./CommentActions";
import { CommentCard } from "./CommentCard";
import { CommentEditableBody } from "./CommentEditableBody";
import { CommentForm } from "./CommentForm";
import { useCommentEditor } from "../../hooks/useCommentEditor";
import { useCommentPermissions } from "../../hooks/useCommentPermissions";
import { getRepliesButtonText } from "../../utils/comments";

export const CommentItem = ({ comment, user, trip, editComment, deleteComment, replyComment }) => {
	const [replying, setReplying] = useState(false);
	const [showReplies, setShowReplies] = useState(false);

	const { editing, text, setText, startEditing, cancelEditing, saveEditing } = useCommentEditor({
		id: comment.id,
		initialText: comment.text,
		onSave: editComment,
	});

	const { isAuthor, canDelete } = useCommentPermissions(comment, trip, user);

	const createdAt = new Date(comment.createdAt).toLocaleDateString("es-ES");
	const repliesButtonText = getRepliesButtonText(comment.replies.length, showReplies);

	return (
		<div className="space-y-3">
			<CommentCard user={comment.author} date={createdAt}>
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
						canReply
						canEdit={isAuthor}
						canDelete={canDelete}
						onReply={() => setReplying((value) => !value)}
						onEdit={startEditing}
						onDelete={() => deleteComment(comment.id)}
					/>
				)}

				{replying && (
					<div className="mt-3">
						<CommentForm
							onSubmit={(replyText) => replyComment(replyText, comment.id)}
							placeholder={`Responder a ${comment.author?.username}...`}
							autoFocus
							onCancel={() => setReplying(false)}
							submitLabel="Responder"
							sendingLabel="Enviando..."
							variant="compact"
						/>
					</div>
				)}

				{comment.replies.length > 0 && (
					<button
						type="button"
						onClick={() => setShowReplies((value) => !value)}
						className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary-600 transition hover:text-primary-700"
					>
						<span className="h-px w-4 bg-primary-200" />
						{repliesButtonText}
					</button>
				)}

				{showReplies && (
					<div className="mt-3 space-y-3">
						{comment.replies.map((reply) => (
							<ReplyItem
								key={reply.id}
								reply={reply}
								user={user}
								trip={trip}
								editComment={editComment}
								deleteComment={deleteComment}
							/>
						))}
					</div>
				)}
			</CommentCard>
		</div>
	);
};
