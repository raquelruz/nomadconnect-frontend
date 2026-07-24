import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../api"

export const useComments = (tripId) => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	const getComments = useCallback(async () => {
		try {
			setLoading(true);

			const { data } = await api.get(`/comments/trip/${tripId}`);

			setComments(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [tripId]);

	useEffect(() => {
		if (!tripId) {
			return;
		}

		getComments();
	}, [tripId, getComments]);

	const createComment = async (text) => {
		try {
			await api.post("/comments", {
				text,
				targetId: tripId,
				targetModel: "trips",
			});

			getComments();
		} catch (error) {
			console.error(error);
		}
	};

	const replyComment = async (text, parentComment) => {
		try {
			await api.post("/comments", {
				text,
				targetId: tripId,
				targetModel: "trips",
				parentComment,
			});

			getComments();
		} catch (error) {
			console.error(error);
		}
	};

	const editComment = async (commentId, text) => {
		try {
			await api.put(`/comments/${commentId}`, {
				text,
			});

			getComments();
		} catch (error) {
			console.error(error);
		}
	};

	const deleteComment = async (commentId) => {
		try {
			await api.delete(`/comments/${commentId}`);

			getComments();
		} catch (error) {
			console.error(error);
		}
	};

	const threadComments = useMemo(() => {
		const parents = comments.filter((comment) => !comment.parentComment);

		return parents.map((comment) => {
			const replies = comments.filter((reply) => {
				if (!reply.parentComment) {
					return false;
				}

				let parentId = reply.parentComment;

				if (typeof parentId === "object") {
					parentId = parentId.id;
				}

				return parentId === comment.id;
			});

			return {
				...comment,
				replies,
			};
		});
	}, [comments]);

	return {
		loading,
		comments,
		threadComments,
		getComments,
		createComment,
		replyComment,
		editComment,
		deleteComment,
	};
};