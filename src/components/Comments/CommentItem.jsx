import { useState } from "react";
import { Check, X } from "lucide-react";
import { ReplyForm } from "./ReplyForm";
import { CommentActions } from "./CommentActions";
import { ReplyItem } from "./ReplyItem";

export const CommentItem = ({
	comment,
	user,
	trip,
	editComment,
	deleteComment,
	replyComment,
}) => {
	const [editing, setEditing] = useState(false);
	const [replying, setReplying] = useState(false);
	const [showReplies, setShowReplies] = useState(false);
	const [text, setText] = useState(comment.text);

	const isAuthor = comment.author?.id === user?.id;
	const isOwner = trip.owner?.id === user?.id;
	const canDelete = isAuthor || isOwner;

	const createdAt = new Date(comment.createdAt).toLocaleDateString("es-ES");

	const saveEdit = async () => {
		await editComment(comment.id, text);
		setEditing(false);
	};

	const cancelEdit = () => {
		setEditing(false);
		setText(comment.text);
	};

	let repliesButtonText = `Ver ${comment.replies.length} respuesta`;

	if (comment.replies.length !== 1) {
		repliesButtonText += "s";
	}

	if (showReplies) {
		repliesButtonText = "Ocultar respuestas";
	}

	return (
		<div className="space-y-4">
			<div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
				<div className="flex gap-3">
					<img
						src={comment.author?.avatar || "/default-avatar.png"}
						alt={comment.author?.username}
						className="h-10 w-10 shrink-0 rounded-full object-cover"
					/>

					<div className="flex-1">
						<p className="font-semibold text-slate-800">
							{comment.author?.username}
						</p>

						{!editing && (
							<p className="mt-2 text-sm leading-relaxed text-slate-600">
								{comment.text}
							</p>
						)}

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
										onClick={saveEdit}
										className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
									>
										<Check size={15} />
										Guardar
									</button>

									<button
										onClick={cancelEdit}
										className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
									>
										<X size={15} />
										Cancelar
									</button>
								</div>
							</div>
						)}

						<div className="mt-3">
							<CommentActions
								date={createdAt}
								canEdit={isAuthor}
								canDelete={canDelete}
								showReply
								onReply={() => setReplying((value) => !value)}
								onEdit={() => setEditing(true)}
								onDelete={() => deleteComment(comment.id)}
							/>
						</div>

						{replying && (
							<div className="mt-4">
								<ReplyForm
									comment={comment}
									replyComment={replyComment}
									close={() => setReplying(false)}
								/>
							</div>
						)}

						{comment.replies.length > 0 && (
							<div className="mt-5 flex items-center gap-4">
								<div className="h-px flex-1 bg-slate-200" />

								<button
									onClick={() => setShowReplies((value) => !value)}
									className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
								>
									{repliesButtonText}
								</button>

								<div className="h-px flex-1 bg-slate-200" />
							</div>
						)}
					</div>
				</div>
			</div>

			{showReplies && (
				<div className="space-y-3">
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
		</div>
	);
};