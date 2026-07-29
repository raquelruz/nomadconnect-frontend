export const useCommentPermissions = (comment, trip, user) => {
	const isAuthor = comment.author?.id === user?.id;
	const isOwner = trip.owner?.id === user?.id;

	const canDelete = isAuthor || isOwner;

	return { isAuthor, isOwner, canDelete };
};
