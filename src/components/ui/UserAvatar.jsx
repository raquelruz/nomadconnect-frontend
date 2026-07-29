export const UserAvatar = ({ user, size = "md", className = "" }) => {
	const sizes = {
		xs: "h-[18px] w-[18px] text-[9px]",
		sm: "h-8 w-8 text-xs",
		md: "h-10 w-10 text-sm",
		lg: "h-14 w-14 text-base",
		xl: "h-20 w-20 text-lg",
	};

	const avatarSize = sizes[size] || sizes.md;
	const initial = (user?.username || "?").charAt(0).toUpperCase();

	if (user?.avatar) {
		return (
			<img
				src={user.avatar}
				alt={user?.username || "Avatar"}
				className={`${avatarSize} shrink-0 rounded-full object-cover ${className}`}
			/>
		);
	}

	return (
		<span
			className={`${avatarSize} flex shrink-0 items-center justify-center rounded-full bg-bg-tertiary font-semibold text-text-primary ${className}`}
		>
			{initial}
		</span>
	);
};
