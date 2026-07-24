// src/components/Comments/CommentsSection.jsx
import { MessageSquare } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { useComments } from "../../hooks/useComments";

export const CommentsSection = ({ trip, user }) => {
	const { loading, threadComments, createComment, editComment, deleteComment, replyComment } = useComments(trip.id);

	return (
		<section className="mt-8 rounded-2xl border border-text-primary/10 bg-bg-card p-6 shadow-sm">
			<div className="mb-6 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
					<MessageSquare size={18} />
				</div>

				<div>
					<h2 className="text-lg font-bold text-text-primary">Comentarios</h2>
					<p className="text-sm text-text-primary/50">
						{threadComments.length === 0
							? "Sé el primero en comentar"
							: `${threadComments.length} ${threadComments.length === 1 ? "comentario" : "comentarios"}`}
					</p>
				</div>
			</div>

			{user && (
				<div className="mb-6">
					<CommentForm onSubmit={createComment} user={user} />
				</div>
			)}

			{loading && <p className="text-sm text-text-primary/50">Cargando comentarios...</p>}

			{!loading && threadComments.length === 0 && (
				<div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-text-primary/15 py-10 text-center">
					<MessageSquare size={22} className="text-text-primary/25" />
					<p className="text-sm text-text-primary/50">Aún no hay comentarios en este viaje.</p>
				</div>
			)}

			{!loading && threadComments.length > 0 && (
				<div className="space-y-4">
					{threadComments.map((comment) => (
						<CommentItem
							key={comment.id}
							comment={comment}
							user={user}
							trip={trip}
							editComment={editComment}
							deleteComment={deleteComment}
							replyComment={replyComment}
						/>
					))}
				</div>
			)}
		</section>
	);
};
