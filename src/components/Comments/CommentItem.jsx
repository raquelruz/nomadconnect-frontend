import { useState } from "react";
import { ReplyItem } from "./ReplyItem";
import { CommentCard } from "./CommentCard";
import { CommentBody } from "./CommentBody";
import { CommentForm } from "./CommentForm";
import { getRepliesButtonText } from "../../utils/comments";

export const CommentItem = ({ comment, user, trip, editComment, deleteComment, replyComment }) => {
	const [replying, setReplying] = useState(false);
	const [showReplies, setShowReplies] = useState(false);

	const createdAt = new Date(comment.createdAt).toLocaleDateString("es-ES");
	const repliesButtonText = getRepliesButtonText(comment.replies.length, showReplies);

	return (
		<div className="space-y-3">
			<CommentCard user={comment.author} date={createdAt}>
				<CommentBody
					comment={comment}
					user={user}
					trip={trip}
					editComment={editComment}
					deleteComment={deleteComment}
					canReply
					onReply={() => setReplying((value) => !value)}
				/>

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
