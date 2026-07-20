export const UserAvatar = ({ user, size = "md", className = "" }) => {
	const sizes = {
		sm: "h-8 w-8",
		md: "h-10 w-10",
		lg: "h-14 w-14",
		xl: "h-20 w-20",
	};

	let avatarSize = sizes.md;

	if (sizes[size]) {
		avatarSize = sizes[size];
	}

	return (
		<img
			src={user?.avatar || "/default-avatar.png"}
			alt={user?.username}
			className={`${avatarSize} shrink-0 rounded-full object-cover ${className}`}
		/>
	);
};
