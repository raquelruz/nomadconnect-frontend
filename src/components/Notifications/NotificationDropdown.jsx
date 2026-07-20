import { useNavigate } from "react-router-dom";

import { NotificationItem } from "./NotificationItem";
import { EmptyNotifications } from "./EmptyNotifications";
import { Loading } from "../ui/Loading";

export const NotificationDropdown = ({
	open,
	notifications,
	loading,
	markAsRead,
	markAllAsRead,
	deleteNotification,
}) => {
	const navigate = useNavigate();

	if (!open) return null;

	return (
		<div className="fixed top-18 right-2 w-105 max-h-[calc(100vh-90px)] overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-2xl z-999">
			<div className="flex items-center justify-between border-b border-border px-5 py-4">
				<div>
					<h3 className="text-base font-semibold text-text-primary">
						Notificaciones
					</h3>

					<p className="mt-0.5 text-xs text-text-muted">
						{notifications.length}{" "}
						{notifications.length === 1
							? "notificación"
							: "notificaciones"}
					</p>
				</div>

				{notifications.length > 0 && (
					<button
						onClick={markAllAsRead}
						className="text-xs font-medium text-primary-500 transition hover:underline"
					>
						Marcar todas
					</button>
				)}
			</div>

			<div className="max-h-125 overflow-y-auto py-2">
				{loading && (
					<div className="py-8">
						<Loading message="Cargando notificaciones..." />
					</div>
				)}

				{!loading && notifications.length === 0 && (
					<EmptyNotifications />
				)}

				{!loading &&
					notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							notification={notification}
							markAsRead={markAsRead}
							deleteNotification={deleteNotification}
						/>
					))}
			</div>

			{!loading && notifications.length > 0 && (
				<div className="border-t border-border p-3">
					<button
						onClick={() => navigate("/notifications")}
						className="w-full rounded-xl py-2.5 text-sm font-medium text-primary-500 transition hover:bg-bg-secondary"
					>
						Ver todas las notificaciones
					</button>
				</div>
			)}
		</div>
	);
};