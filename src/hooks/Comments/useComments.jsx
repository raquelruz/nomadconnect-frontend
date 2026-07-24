import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../api";

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
		if (!tripId) return;
		getComments();
	}, [tripId, getComments]);

	const runAndRefresh = async (request) => {
		try {
			await request();
			getComments();
		} catch (error) {
			console.error(error);
		}
	};

	const createComment = (text) =>
		runAndRefresh(() => api.post("/comments", { text, targetId: tripId, targetModel: "trips" }));

	const replyComment = (text, parentComment) =>
		runAndRefresh(() => api.post("/comments", { text, targetId: tripId, targetModel: "trips", parentComment }));

	const editComment = (commentId, text) => runAndRefresh(() => api.put(`/comments/${commentId}`, { text }));

	const deleteComment = (commentId) => runAndRefresh(() => api.delete(`/comments/${commentId}`));

	const threadComments = useMemo(() => {
		const parents = comments.filter((comment) => !comment.parentComment);

		return parents.map((comment) => {
			const replies = comments.filter((reply) => {
				if (!reply.parentComment) return false;
				const parentId = typeof reply.parentComment === "object" ? reply.parentComment.id : reply.parentComment;
				return parentId === comment.id;
			});

			return { ...comment, replies };
		});
	}, [comments]);

	return { loading, comments, threadComments, getComments, createComment, replyComment, editComment, deleteComment };
};