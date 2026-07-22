import { useNavigate } from "react-router-dom";

import { NotificationItem } from "./NotificationItem";
import { EmptyNotifications } from "./EmptyNotifications";
import { NotificationSkeleton } from "./NotificationSkeleton";

export const NotificationDropdown = ({
	open,
	notifications,
	unreadCount,
	loading,
	error,
	markAsRead,
	markAllAsRead,
	deleteNotification,
	onNavigate,
}) => {
	const navigate = useNavigate();

	if (!open) return null;

	return (
		<div className="fixed top-18 right-2 w-105 max-h-[calc(100vh-90px)] overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-2xl z-999 flex flex-col">
			<div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
				<div>
					<h3 className="text-base font-semibold text-text-primary">Notificaciones</h3>

					<p className="mt-0.5 text-xs text-text-muted">
						{unreadCount > 0 ? `${unreadCount} sin leer` : "Estás al día"}
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

			<div className="min-h-0 flex-1 overflow-y-auto py-2">
				{!loading && error && (
					<div className="px-6 py-8 text-center">
						<p className="text-sm font-medium text-text-primary">
							No se pudieron cargar tus notificaciones
						</p>
						<p className="mt-1 text-xs text-text-muted">
							Comprueba tu conexión e inténtalo de nuevo más tarde.
						</p>
					</div>
				)}

				{loading && <NotificationSkeleton count={4} />}

				{!loading && !error && notifications.length === 0 && <EmptyNotifications />}

				{!loading &&
					!error &&
					notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							notification={notification}
							markAsRead={markAsRead}
							deleteNotification={deleteNotification}
						/>
					))}
			</div>

			{!loading && !error && notifications.length > 0 && (
				<div className="shrink-0 border-t border-border p-3">
					<button
						onClick={() => {
							onNavigate?.();
							navigate("/notifications");
						}}
						className="w-full rounded-xl py-2.5 text-sm font-medium text-primary-500 transition hover:bg-bg-secondary"
					>
						Ver todas las notificaciones
					</button>
				</div>
			)}
		</div>
	);
};
