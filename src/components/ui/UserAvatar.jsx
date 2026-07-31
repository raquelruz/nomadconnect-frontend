const DefaultAvatarIcon = ({ className = "" }) => (
	<svg
		viewBox="0 0 40 40"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
	>
		<circle cx="20" cy="20" r="20" fill="var(--color-primary-100)" />
		<circle cx="20" cy="16" r="6.5" fill="var(--color-primary-400)" />
		<path
			d="M6.5 34.5C8.5 27 13.8 23 20 23C26.2 23 31.5 27 33.5 34.5"
			fill="var(--color-primary-400)"
		/>
	</svg>
);

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

	if (!user?.avatar) {
		return (
			<DefaultAvatarIcon
				className={`${avatarSize} shrink-0 rounded-full object-cover ${className}`}
			/>
		);
	}

	return (
		<img
			src={user.avatar}
			alt={user?.username}
			className={`${avatarSize} shrink-0 rounded-full object-cover ${className}`}
		/>
	);
};
