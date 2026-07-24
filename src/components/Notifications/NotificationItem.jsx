import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, MessageCircle, PartyPopper, Bell, CheckCircle2, UserPlus, UserMinus } from "lucide-react";

import { getRelativeTime, getNotificationLink } from "../../utils/notifications";
import { ConfirmModal } from "../ui/ConfirmModal";

const icons = {
	new_comment: MessageCircle,
	trip_completed: PartyPopper,
	new_update: Bell,
	task_completed: CheckCircle2,
	member_joined: UserPlus,
	member_left: UserMinus,
};

export const NotificationItem = ({ notification, markAsRead, deleteNotification, onNavigate }) => {
	const Icon = icons[notification.type] ?? MessageCircle;
	const navigate = useNavigate();

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const handleOpen = () => {
		if (!notification.isRead) {
			markAsRead(notification.id);
		}

		const link = getNotificationLink(notification);
		if (link) {
			onNavigate?.();
			navigate(link);
		}
	};

	const handleConfirmDelete = async () => {
		setDeleting(true);
		await deleteNotification(notification.id);
		setDeleting(false);
		setConfirmOpen(false);
	};

	return (
		<div
			className={`group flex items-stretch gap-1 border-b border-border px-6 py-5 transition hover:bg-bg-secondary ${
				!notification.isRead && "bg-primary-500/5"
			}`}
		>
			<button
				type="button"
				onClick={handleOpen}
				className="flex flex-1 gap-4 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-primary-500"
			>
				<img
					src={notification.sender?.avatar || "/default-avatar.png"}
					alt=""
					className="h-12 w-12 shrink-0 rounded-full object-cover"
				/>

				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-semibold text-text-primary">{notification.sender?.username}</span>

						<Icon size={16} className="shrink-0 text-primary-500" />
					</div>

					<p className="mt-1 text-sm text-text-secondary">{notification.message}</p>

					<span className="mt-3 block text-xs text-text-muted">
						{getRelativeTime(notification.createdAt)}
					</span>
				</div>
			</button>

			<button
				type="button"
				onClick={() => setConfirmOpen(true)}
				aria-label="Eliminar notificación"
				className="self-start p-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
			>
				<Trash2 size={16} className="text-text-muted hover:text-red-500" />
			</button>

			<ConfirmModal
				isOpen={confirmOpen}
				title="Eliminar notificación"
				message="Esta acción no se puede deshacer."
				onConfirm={handleConfirmDelete}
				onCancel={() => setConfirmOpen(false)}
				loading={deleting}
			/>
		</div>
	);
};
