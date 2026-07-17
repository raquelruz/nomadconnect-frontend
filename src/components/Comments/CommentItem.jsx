import { useState } from "react";
import { Check, X } from "lucide-react";
import { ReplyForm } from "./ReplyForm";
import { ReplyItem } from "./ReplyItem";
import { CommentActions } from "./CommentActions";
import { CommentCard } from "./CommentCard";
import { useCommentEditor } from "../../hooks/useCommentEditor";
import { useCommentPermissions } from "../../hooks/useCommentPermissions";

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

	let repliesButtonText = `Ver ${comment.replies.length} respuesta`;

	if (comment.replies.length !== 1) {
		repliesButtonText += "s";
	}

	if (showReplies) {
		repliesButtonText = "Ocultar respuestas";
	}

	return (
		<div className="space-y-4">
			<CommentCard user={comment.author}>
				{!editing && <p className="mt-2 text-sm leading-relaxed text-slate-600">{comment.text}</p>}

				{editing && (
					<div className="mt-3">
						<textarea
							value={text}
							onChange={(event) => setText(event.target.value)}
							rows={3}
							className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm"
						/>

						<div className="mt-3 flex gap-2">
							<button
								type="button"
								onClick={saveEditing}
								className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
							>
								<Check size={15} />
								Guardar
							</button>

							<button
								type="button"
								onClick={cancelEditing}
								className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
							>
								<X size={15} />
								Cancelar
							</button>
						</div>
					</div>
				)}

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
						<ReplyForm comment={comment} replyComment={replyComment} close={() => setReplying(false)} />
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
