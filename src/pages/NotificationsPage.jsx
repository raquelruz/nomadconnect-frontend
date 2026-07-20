import { Bell, CheckCheck } from "lucide-react";

import { useNotifications } from "../hooks/useNotifications";

import { NotificationItem } from "../components/Notifications/NotificationItem";
import { EmptyNotifications } from "../components/Notifications/EmptyNotifications";
import { Loading } from "../components/ui/Loading";

export const NotificationsPage = () => {
	const {
		notifications,
		loading,
		markAsRead,
		markAllAsRead,
		deleteNotification,
	} = useNotifications();

	const unread = notifications.filter((n) => !n.isRead).length;

	return (
		<div className="min-h-screen bg-bg-secondary">
			<div className="mx-auto max-w-6xl px-6 py-10">

				{/* Hero */}

				<div className="rounded-3xl border border-border bg-bg-primary p-8 shadow-sm">

					<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

						<div className="flex items-center gap-5">

							<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500">

								<Bell size={30} />

							</div>

							<div>

								<h1 className="text-3xl font-bold text-text-primary">
									Notificaciones
								</h1>

								<p className="mt-2 text-text-muted">
									Mantente al día de toda la actividad de tus viajes.
								</p>

							</div>

						</div>

						<div className="flex items-center gap-8">

							<div className="text-center">
								<p className="text-3xl font-bold text-text-primary">
									{notifications.length}
								</p>

								<p className="text-sm text-text-muted">
									Total
								</p>
							</div>

							<div className="text-center">
								<p className="text-3xl font-bold text-primary-500">
									{unread}
								</p>

								<p className="text-sm text-text-muted">
									Sin leer
								</p>
							</div>

							{notifications.length > 0 && (
								<button
									onClick={markAllAsRead}
									className="flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-3 text-white transition hover:opacity-90"
								>
									<CheckCheck size={18} />

									Marcar todas
								</button>
							)}

						</div>

					</div>

				</div>

				{/* Lista */}

				<div className="mt-8 rounded-3xl border border-border bg-bg-primary shadow-sm overflow-hidden">

					{loading && (
						<div className="py-20">
							<Loading message="Cargando notificaciones..." />
						</div>
					)}

					{!loading && notifications.length === 0 && (
						<div className="py-24">
							<EmptyNotifications />
						</div>
					)}

					{!loading &&
						notifications.map((notification) => (
							<NotificationItem
								key={notification._id}
								notification={notification}
								markAsRead={markAsRead}
								deleteNotification={deleteNotification}
							/>
						))}
				</div>

			</div>
		</div>
	);
};