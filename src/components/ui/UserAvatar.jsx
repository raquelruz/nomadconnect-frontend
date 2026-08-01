const sizeClasses = {
	sm: { avatar: "h-8 w-8", text: "text-xs" },
	md: { avatar: "h-10 w-10", text: "text-sm" },
	lg: { avatar: "h-14 w-14", text: "text-lg" },
	xl: { avatar: "h-20 w-20", text: "text-2xl" },
};

export const UserAvatar = ({ user, size = "md", className = "" }) => {
	const sizes = sizeClasses[size] || sizeClasses.md;

	if (!user?.avatar) {
		const initial = (user?.username || "?").charAt(0).toUpperCase();

		return (
			<div
				className={`flex ${sizes.avatar} shrink-0 items-center justify-center rounded-full bg-primary-500 font-bold text-white ${sizes.text} ${className}`}
			>
				{initial}
			</div>
		);
	}

	return (
		<img
			src={user.avatar}
			alt={user?.username}
			className={`${sizes.avatar} shrink-0 rounded-full object-cover ${className}`}
		/>
	);
};
