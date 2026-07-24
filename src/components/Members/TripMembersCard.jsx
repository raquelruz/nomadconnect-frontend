import { Users, UserPlus, Crown } from "lucide-react";
import api from "../../api";

export const TripMembersCard = ({ trip, user, refreshTrip }) => {
	const isOwner = trip.owner?.id === user?.id || trip.owner?._id === user?.id;

	const isMember = trip.members?.some((member) => member.id === user?.id || member._id === user?.id);

	const canJoin = user && !isOwner && !isMember && trip.visibility === "public";

	const canLeave = user && isMember;

	const handleJoin = async () => {
		try {
			await api.post(`/trips/${trip.id}/join`);
			refreshTrip();
		} catch (error) {
			console.error(error);
		}
	};

	const handleLeave = async () => {
		try {
			await api.delete(`/trips/${trip.id}/leave`);
			refreshTrip();
		} catch (error) {
			console.error(error);
		}
	};

	const members = trip.members || [];

	const totalMembers = members.length + 1;

	const maxMembers = trip.maxMembers || null;

	const availablePlaces = maxMembers ? maxMembers - totalMembers : null;

	return (
		<div className="rounded-2xl border border-primary-500/15 bg-primary-500/4 p-5">
			<div className="flex items-center gap-3">
				<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm shadow-primary-600/30">
					<Users size={18} />
				</div>

				<div>
					<p className="text-xs font-bold uppercase tracking-wide text-text-primary/40">Participantes</p>

					<p className="text-xl font-bold text-text-primary">
						{totalMembers}
						{maxMembers && <span className="text-text-primary/40"> / {maxMembers}</span>}
					</p>
				</div>
			</div>

			<div className="mt-5 flex items-center justify-between">
				<div className="flex -space-x-3">
					<img
						src={trip.owner.avatar}
						alt={trip.owner.username}
						className="h-9 w-9 rounded-full object-cover ring-2 ring-bg-card"
					/>

					{members.slice(0, 4).map((member) => (
						<img
							key={member.id || member._id}
							src={member.avatar}
							alt={member.username}
							className="h-9 w-9 rounded-full object-cover ring-2 ring-bg-card"
						/>
					))}

					{members.length > 4 && (
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-text-primary/10 text-xs font-semibold text-text-primary/70 ring-2 ring-bg-card">
							+{members.length - 4}
						</div>
					)}
				</div>

				{availablePlaces !== null && (
					<p className="text-xs font-medium text-text-primary/50">{availablePlaces} plazas libres</p>
				)}
			</div>

			<div className="mt-5">
				{canJoin && (
					<button
						onClick={handleJoin}
						className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98]"
					>
						<UserPlus size={18} />
						Unirme al viaje
					</button>
				)}

				{canLeave && (
					<button
						onClick={handleLeave}
						className="w-full rounded-xl border border-red-500/25 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
					>
						Abandonar viaje
					</button>
				)}

				{isOwner && (
					<div className="flex items-center justify-center gap-1.5 rounded-xl bg-bg-card px-4 py-3 text-sm font-semibold text-primary-400">
						<Crown size={15} />
						Eres el organizador
					</div>
				)}
			</div>
		</div>
	);
};
