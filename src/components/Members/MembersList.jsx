import { MemberItem } from "./MemberItem";

export const MembersList = ({ owner, members = [] }) => {
	return (
		<div className="space-y-3">
			{owner && <MemberItem member={owner} isOwner />}

			{members.map((member) => (
				<MemberItem key={member.id || member._id} member={member} />
			))}
		</div>
	);
};
