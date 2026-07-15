import { Crown } from "lucide-react";

export const MemberItem = ({ member, isOwner = false }) => {
	return (
		<div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
			<div className="flex items-center gap-3">
				<img
					src={member.avatar || "/default-avatar.png"}
					alt={member.username}
					className="h-12 w-12 rounded-full object-cover"
				/>

				<div className="min-w-0">
					<p className="truncate font-semibold text-slate-800">
						{member.name} {member.surname}
					</p>

					<p className="truncate text-sm text-slate-500">@{member.username}</p>
				</div>
			</div>

			{isOwner && (
				<div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
					<Crown size={14} />
					Organizador
				</div>
			)}

			{!isOwner && <span className="text-sm font-medium text-slate-500">Miembro</span>}
		</div>
	);
};
