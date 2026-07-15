export const MembersAvatarGroup = ({ owner, members = [], maxVisible = 4 }) => {
	const avatars = [owner, ...members].filter(Boolean);

	const visibleAvatars = avatars.slice(0, maxVisible);
	const remaining = avatars.length - visibleAvatars.length;

	return (
		<div className="flex items-center">
			{visibleAvatars.map((member, index) => (
				<div key={member.id || member._id} className={`relative ${index > 0 ? "-ml-3" : ""}`}>
					<img
						src={member.avatar || "/default-avatar.png"}
						alt={member.username}
						className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
					/>
				</div>
			))}

			{remaining > 0 && (
				<div className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm font-semibold text-slate-700 shadow-sm">
					+{remaining}
				</div>
			)}
		</div>
	);
};
