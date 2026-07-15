import { Users } from "lucide-react";
import api from "../../api";

export const TripMembersCard = ({ trip, user, refreshTrip }) => {
	const isOwner = trip.owner?.id === user?.id || trip.owner?._id === user?.id;

	const isMember = trip.members?.some(
		(member) => member.id === user?.id || member._id === user?.id
	);

	const canJoin =
		user &&
		!isOwner &&
		!isMember &&
		trip.visibility === "public";

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

	return (
		<div className="w-full rounded-2xl border border-blue-100 bg-blue-50 p-5 lg:w-auto">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
						<Users size={18} />
					</div>

					<div>
						<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
							Participantes
						</p>

						<p className="text-xl font-bold text-slate-900">
							{(trip.members?.length || 0) + 1}
						</p>
					</div>
				</div>

				{canJoin && (
					<button
						onClick={handleJoin}
						className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
					>
						Unirme al viaje
					</button>
				)}

				{canLeave && (
					<button
						onClick={handleLeave}
						className="w-full rounded-xl border border-red-300 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-50"
					>
						Abandonar viaje
					</button>
				)}

				{isOwner && (
					<div className="w-full rounded-xl bg-white px-4 py-2 text-center text-sm font-medium text-blue-700">
						Eres el organizador
					</div>
				)}
			</div>
		</div>
	);
};