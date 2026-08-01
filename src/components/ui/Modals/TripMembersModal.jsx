import { Users } from "lucide-react";
import { ModalShell } from "./ModalShell";

export const TripMembersModal = ({ isOpen, trip, onClose }) => {
	if (!isOpen) return null;

	const members = [trip.owner, ...(trip.members || [])];

	return (
		<ModalShell
			icon={Users}
			title="Participantes"
			description={`${members.length} ${members.length === 1 ? "persona" : "personas"} en este viaje`}
			onClose={onClose}
		>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{members.map((member, index) => (
					<div
						key={member.id || member._id}
						className="flex items-center gap-2.5 rounded-xl border border-text-primary/5 bg-text-primary/2 p-2.5 transition hover:bg-text-primary/5"
					>
						<img
							src={member.avatar}
							alt={member.username}
							className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-bg-card"
						/>

						<div className="min-w-0">
							<p className="truncate text-sm font-semibold text-text-primary">{member.username}</p>
							{index === 0 && <p className="text-xs text-primary-400">Organizador</p>}
						</div>
					</div>
				))}
			</div>
		</ModalShell>
	);
};
