import { UserAvatar } from "../ui/UserAvatar";

export const CommentCard = ({ user, date, reply = false, children }) => {
	return (
		<div
			className={`rounded-2xl p-4 transition ${
				reply
					? "border-l-2 border-primary-300 bg-primary-500/3 pl-4"
					: "border border-text-primary/10 bg-bg-card"
			}`}
		>
			<div className="flex gap-3">
				<UserAvatar user={user} />

				<div className="min-w-0 flex-1">
					<div className="flex items-baseline gap-2">
						<p className="truncate font-semibold text-text-primary">{user?.username}</p>
						<span className="shrink-0 text-xs text-text-primary/40">{date}</span>
					</div>

					{children}
				</div>
			</div>
		</div>
	);
};
