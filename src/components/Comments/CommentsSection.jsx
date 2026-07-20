// src/components/Comments/CommentsSection.jsx
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { useComments } from "../../hooks/useComments";

export const CommentsSection = ({ trip, user }) => {
	const { loading, threadComments, createComment, editComment, deleteComment, replyComment } = useComments(trip.id);

	return (
		<section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h2 className="text-xl font-bold text-slate-800">Comentarios ({threadComments.length})</h2>
			</div>

			{user && <CommentForm onSubmit={createComment} />}

			{loading && <p className="text-sm text-slate-500">Cargando comentarios...</p>}

			{!loading && threadComments.length === 0 && (
				<p className="text-sm text-slate-500">Aún no hay comentarios. Sé el primero en comentar.</p>
			)}

			{!loading && threadComments.length > 0 && (
				<div className="mt-6 space-y-4">
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
