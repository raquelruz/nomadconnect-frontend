import { useState } from "react";
import { Check, X } from "lucide-react";
import { CommentCard } from "./CommentCard";
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

	return (
		<div className="ml-10">
			<CommentCard user={reply.author} reply>
				{!editing && <p className="mt-2 text-sm leading-relaxed text-slate-600">{reply.text}</p>}

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
								onClick={saveEdit}
								className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
							>
								<Check size={15} />
								Guardar
							</button>

							<button
								type="button"
								onClick={cancelEdit}
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
					canEdit={isAuthor}
					canDelete={canDelete}
					onEdit={() => setEditing(true)}
					onDelete={() => deleteComment(reply.id)}
				/>
			</CommentCard>
		</div>
	);
};
