import { UserAvatar } from "../ui/UserAvatar";

export const CommentCard = ({ user, reply = false, children }) => {
	const classes = ["rounded-xl border p-4"];

	if (reply) {
		classes.push("border-blue-100 bg-blue-50");
	}

	if (!reply) {
		classes.push("border-slate-200 bg-slate-50");
	}

	return (
		<div className={classes.join(" ")}>
			<div className="flex gap-3">
				<UserAvatar user={user} />

				<div className="flex-1">
					<p className="font-semibold text-slate-800">{user?.username}</p>

					{children}
				</div>
			</div>
		</div>
	);
};
