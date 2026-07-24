import { CommentCard } from "./CommentCard";
import { CommentBody } from "./CommentBody";

export const ReplyItem = ({ reply, user, trip, editComment, deleteComment }) => {
	const createdAt = new Date(reply.createdAt).toLocaleDateString("es-ES");

	return (
		<CommentCard user={reply.author} date={createdAt} reply>
			<CommentBody comment={reply} user={user} trip={trip} editComment={editComment} deleteComment={deleteComment} />
		</CommentCard>
	);
};