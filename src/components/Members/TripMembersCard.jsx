import { useState } from "react";
import { Users } from "lucide-react";
import { useTripMembers } from "../../hooks/useTripMembers";
import { MembersAvatarGroup } from "./MembersAvatarsGroup";
import { MembersInfo } from "./MembersInfo";
import { JoinLeaveButton } from "./JoinLeaveButton";
import { TripMembersModal } from "../ui/Modals/TripMembersModal";

export const TripMembersCard = ({ trip, user, refreshTrip }) => {
	const [showMembersModal, setShowMembersModal] = useState(false);

	const { loading, isOwner, canJoin, canLeave, hasFreePlaces, joinTrip, leaveTrip } = useTripMembers(
		trip,
		user,
		refreshTrip,
	);

	return (
		<>
			<div className="w-full rounded-2xl border border-blue-100 bg-blue-50 p-5 lg:w-auto">
				<div className="flex flex-col gap-5">
					<button onClick={() => setShowMembersModal(true)} className="flex items-center gap-3 text-left">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
							<Users size={18} />
						</div>

						<div>
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">Participantes</p>

							<p className="text-xl font-bold text-slate-900">{trip.members?.length + 1}</p>
						</div>
					</button>

					<MembersAvatarGroup owner={trip.owner} members={trip.members} />

					<MembersInfo members={trip.members} maxMembers={trip.maxMembers} />

					<JoinLeaveButton
						isOwner={isOwner}
						canJoin={canJoin}
						canLeave={canLeave}
						hasFreePlaces={hasFreePlaces}
						loading={loading}
						onJoin={joinTrip}
						onLeave={leaveTrip}
					/>
				</div>
			</div>

			<TripMembersModal
				isOpen={showMembersModal}
				onClose={() => setShowMembersModal(false)}
				owner={trip.owner}
				members={trip.members}
			/>
		</>
	);
};
