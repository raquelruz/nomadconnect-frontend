import { useState } from "react";
import { Check, X } from "lucide-react";
import { CommentActions } from "./CommentActions";

export const ReplyItem = ({ reply, user, trip, editComment, deleteComment }) => {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(reply.text);

	const isAuthor = reply.author?.id === user?.id;
	const isOwner = trip.owner?.id === user?.id;
	const canDelete = isAuthor || isOwner;

	const createdAt = new Date(reply.createdAt).toLocaleDateString("es-ES");

	const saveEdit = async () => {
		await editComment(reply.id, text);
		setEditing(false);
	};

	const cancelEdit = () => {
		setEditing(false);
		setText(reply.text);
	};

	let parentUsername = "Comentario";

	if (reply.parentComment?.author?.username) {
		parentUsername = reply.parentComment.author.username;
	}

	return (
		<div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
			<div className="flex gap-3">
				<img
					src={reply.author?.avatar || "/default-avatar.png"}
					alt={reply.author?.username}
					className="h-10 w-10 shrink-0 rounded-full object-cover"
				/>

				<div className="flex-1">
					<p className="font-semibold text-slate-800">{reply.author?.username}</p>

					<p className="mt-1 text-xs font-medium text-blue-600">↳ Respondiendo a @{parentUsername}</p>

					{!editing && <p className="mt-2 text-sm text-slate-600">{reply.text}</p>}

					{editing && (
						<div className="mt-2">
							<textarea
								value={text}
								onChange={(event) => setText(event.target.value)}
								rows={3}
								className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm"
							/>

							<div className="mt-2 flex gap-2">
								<button
									onClick={saveEdit}
									className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white"
								>
									<Check size={15} />
									Guardar
								</button>

								<button
									onClick={cancelEdit}
									className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm"
								>
									<X size={15} />
									Cancelar
								</button>
							</div>
						</div>
					)}

					<CommentActions
						date={createdAt}
						canEdit={isAuthor}
						canDelete={canDelete}
						showReply={false}
						onEdit={() => setEditing(true)}
						onDelete={() => deleteComment(reply.id)}
					/>
				</div>
			</div>
		</div>
	);
};
