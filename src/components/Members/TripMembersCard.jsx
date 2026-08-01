import { useState } from "react";
import { Users, UserPlus, Crown, CheckCircle2 } from "lucide-react";
import { useTripMembers } from "../../hooks/useTripMembers";
import { ConfirmModal } from "../ui/ConfirmModal";
import api from "../../api";

export const TripMembersCard = ({ trip, user, refreshTrip }) => {
	const { isOwner, canJoin, canLeave, loading, joinTrip, leaveTrip } = useTripMembers(trip, user, refreshTrip);

	const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false);
	const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
	const [closing, setClosing] = useState(false);

	const members = trip.members || [];
	const totalMembers = members.length + 1;
	const maxMembers = trip.maxMembers || null;
	const availablePlaces = maxMembers ? maxMembers - totalMembers : null;
	const isClosed = trip.status === "completed";

	const handleConfirmLeave = async () => {
		await leaveTrip();
		setConfirmLeaveOpen(false);
	};

	const handleConfirmClose = async () => {
		try {
			setClosing(true);
			await api.put(`/trips/${trip.id}`, { status: "completed" });
			await refreshTrip();
		} catch (error) {
			alert(error.message || "Error al cerrar el viaje");
		} finally {
			setClosing(false);
			setConfirmCloseOpen(false);
		}
	};

	return (
		<>
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

				<div className="mt-5 space-y-2">
					{canJoin && (
						<button
							onClick={joinTrip}
							disabled={loading}
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:opacity-50"
						>
							<UserPlus size={18} />
							{loading ? "Uniéndote..." : "Unirme al viaje"}
						</button>
					)}

					{canLeave && (
						<button
							onClick={() => setConfirmLeaveOpen(true)}
							disabled={loading}
							className="w-full rounded-xl border border-red-500/25 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
						>
							{loading ? "Abandonando..." : "Abandonar viaje"}
						</button>
					)}

					{isOwner && (
						<div className="flex items-center justify-center gap-1.5 rounded-xl bg-bg-card px-4 py-3 text-sm font-semibold text-primary-400">
							<Crown size={15} />
							Eres el organizador
						</div>
					)}

					{isOwner && !isClosed && (
						<button
							onClick={() => setConfirmCloseOpen(true)}
							className="flex w-full items-center justify-center gap-2 rounded-xl border border-success-500/25 px-4 py-3 text-sm font-semibold text-success-500 transition hover:bg-success-500/10"
						>
							<CheckCircle2 size={16} />
							Cerrar viaje
						</button>
					)}

					{isClosed && (
						<div className="flex items-center justify-center gap-1.5 rounded-xl bg-success-500/10 px-4 py-3 text-sm font-semibold text-success-500">
							<CheckCircle2 size={15} />
							Viaje finalizado
						</div>
					)}
				</div>
			</div>

			<ConfirmModal
				isOpen={confirmLeaveOpen}
				title="Abandonar viaje"
				message="¿Seguro que quieres abandonar este viaje? Perderás acceso a su planificación, tareas y comentarios."
				onConfirm={handleConfirmLeave}
				onCancel={() => setConfirmLeaveOpen(false)}
				loading={loading}
			/>

			<ConfirmModal
				isOpen={confirmCloseOpen}
				title="Cerrar viaje"
				message="Se notificará a todos los participantes de que el viaje ha finalizado. Podrás seguir viendo su contenido con normalidad."
				onConfirm={handleConfirmClose}
				onCancel={() => setConfirmCloseOpen(false)}
				loading={closing}
			/>
		</>
	);
};
