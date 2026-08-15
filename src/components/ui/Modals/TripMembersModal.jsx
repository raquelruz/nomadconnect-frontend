import { useState } from "react";
import { Ban, Users, UserX } from "lucide-react";
import { ModalShell } from "./ModalShell";
import { ConfirmModal } from "../ConfirmModal";
import { UserAvatar } from "../UserAvatar";
import { useBlockedUsers } from "../../../hooks/useBlockedUsers";
import { useToast } from "../../../context/ToastContext";

export const TripMembersModal = ({ isOpen, trip, user, onClose }) => {
	const { blockedIds, loading, blockUser } = useBlockedUsers();
	const toast = useToast();
	const [targetToBlock, setTargetToBlock] = useState(null);

	if (!isOpen) return null;

	const members = [trip.owner, ...(trip.members || [])];

	const handleConfirmBlock = async () => {
		try {
			await blockUser(targetToBlock.id || targetToBlock._id);
			toast.success(`Has bloqueado a @${targetToBlock.username}`);
		} catch (error) {
			toast.error(error.message || "Error al bloquear el usuario");
		} finally {
			setTargetToBlock(null);
		}
	};

	return (
		<>
			<ModalShell
				icon={Users}
				title="Participantes"
				description={`${members.length} ${members.length === 1 ? "persona" : "personas"} en este viaje`}
				onClose={onClose}
			>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{members.map((member, index) => {
						const memberId = member.id || member._id;
						const isMe = memberId === (user?.id || user?._id);
						const alreadyBlocked = blockedIds.includes(memberId);

						return (
							<div
								key={memberId}
								className="flex items-center gap-2.5 rounded-xl border border-text-primary/5 bg-text-primary/2 p-2.5 transition hover:bg-text-primary/5"
							>
								<UserAvatar user={member} size="sm" className="ring-2 ring-bg-card" />

								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-semibold text-text-primary">
										{member.username}
									</p>
									{index === 0 && <p className="text-xs text-primary-400">Organizador</p>}
								</div>

								{!isMe && !alreadyBlocked && (
									<button
										onClick={() => setTargetToBlock(member)}
										title="Bloquear usuario"
										className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-text-primary/40 transition hover:bg-red-500/10 hover:text-red-500"
									>
										<Ban size={16} />
										<span>Bloquear</span>
									</button>
								)}

								{!isMe && alreadyBlocked && (
									<span className="shrink-0 text-xs font-medium text-text-primary/40">Bloqueado</span>
								)}
							</div>
						);
					})}
				</div>
			</ModalShell>

			<ConfirmModal
				isOpen={!!targetToBlock}
				title="Bloquear usuario"
				message={`¿Seguro que quieres bloquear a @${targetToBlock?.username}? No podrá unirse a viajes donde tú participes.`}
				onConfirm={handleConfirmBlock}
				onCancel={() => setTargetToBlock(null)}
				loading={loading}
			/>
		</>
	);
};