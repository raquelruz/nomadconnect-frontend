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
		<div className="space-y-4">
			<CommentCard user={comment.author}>
				<CommentEditableBody
					editing={editing}
					text={text}
					setText={setText}
					displayText={comment.text}
					onSave={saveEditing}
					onCancel={cancelEditing}
				/>

				<CommentActions
					date={createdAt}
					canReply
					canEdit={isAuthor}
					canDelete={canDelete}
					onReply={() => setReplying((value) => !value)}
					onEdit={startEditing}
					onDelete={() => deleteComment(comment.id)}
				/>

				{replying && (
					<div className="mt-4">
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
					<div className="mt-5 flex items-center gap-4">
						<div className="h-px flex-1 bg-slate-200" />

						<button
							type="button"
							onClick={() => setShowReplies((value) => !value)}
							className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
						>
							{repliesButtonText}
						</button>

						<div className="h-px flex-1 bg-slate-200" />
					</div>
				)}

				{showReplies && (
					<div className="mt-4 space-y-3">
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
