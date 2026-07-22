import { useEffect, useMemo, useState } from "react";
import { CheckCheck } from "lucide-react";

import { useNotifications } from "../hooks/useNotifications";
import { groupNotificationsByDate } from "../utils/notifications";

import { NotificationItem } from "../components/Notifications/NotificationItem";
import { NotificationSkeleton } from "../components/Notifications/NotificationSkeleton";
import { EmptyNotifications } from "../components/Notifications/EmptyNotifications";

const TABS = [
	{ key: "all", label: "Todas" },
	{ key: "unread", label: "No leídas" },
];

export const NotificationsPage = () => {
	const [tab, setTab] = useState("all");

	const {
		notifications,
		unreadCount,
		hasMore,
		loading,
		loadingMore,
		error,
		fetchNotifications,
		loadMore,
		markAsRead,
		markAllAsRead,
		deleteNotification,
	} = useNotifications();

	// Al cambiar de pestaña, pedimos la primera página con el filtro correcto
	// directamente al backend (en vez de filtrar en el cliente sobre lo ya cargado).
	useEffect(() => {
		fetchNotifications(tab === "unread");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	const groups = useMemo(() => groupNotificationsByDate(notifications), [notifications]);

	const showEmptyState = !loading && !error && notifications.length === 0;

	let emptyState = null;
	if (showEmptyState && tab === "unread") {
		emptyState = (
			<div className="flex flex-col items-center justify-center py-12 px-6 text-center">
				<h4 className="font-semibold text-text-primary">No tienes notificaciones sin leer</h4>
				<p className="mt-2 text-sm text-text-muted max-w-xs">Estás al día con toda tu actividad.</p>
			</div>
		);
	} else if (showEmptyState) {
		emptyState = <EmptyNotifications />;
	}

	return (
		<div className="min-h-screen bg-bg-secondary">
			<div className="mx-auto max-w-3xl px-6 py-10">
				{/* Header */}

				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl font-bold text-text-primary">Notificaciones</h1>

						<p className="mt-1 text-sm text-text-muted">
							{unreadCount > 0 ? `${unreadCount} sin leer` : "Estás al día"}
						</p>
					</div>

					<div className="flex items-center gap-3">
						<div className="flex gap-1 rounded-full border border-border bg-bg-primary p-1">
							{TABS.map((t) => {
								const isActive = tab === t.key;

								return (
									<button
										key={t.key}
										onClick={() => setTab(t.key)}
										className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
											isActive
												? "bg-primary-500 text-white"
												: "text-text-muted hover:text-text-primary"
										}`}
									>
										{t.label}
										{t.key === "unread" && (
											<span
												className={`ml-1.5 text-xs ${
													isActive ? "text-white/70" : "text-text-muted/70"
												}`}
											>
												{unreadCount}
											</span>
										)}
									</button>
								);
							})}
						</div>

						{unreadCount > 0 && (
							<button
								onClick={markAllAsRead}
								className="flex items-center gap-1.5 rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
							>
								<CheckCheck size={16} />
								Marcar todas
							</button>
						)}
					</div>
				</div>

				{/* Lista */}

				<div className="mt-6 overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-sm">
					{!loading && error && (
						<div className="px-6 py-16 text-center">
							<p className="text-sm font-medium text-text-primary">
								No se pudieron cargar tus notificaciones
							</p>
							<p className="mt-1 text-xs text-text-muted">
								Comprueba tu conexión e inténtalo de nuevo más tarde.
							</p>
						</div>
					)}

					{loading && <NotificationSkeleton count={6} />}

					{emptyState}

					{!loading &&
						!error &&
						groups.map(([label, items]) => (
							<div key={label}>
								<div className="border-b border-border bg-bg-secondary/60 px-6 py-2">
									<span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
										{label}
									</span>
								</div>

								{items.map((notification) => (
									<NotificationItem
										key={notification.id}
										notification={notification}
										markAsRead={markAsRead}
										deleteNotification={deleteNotification}
									/>
								))}
							</div>
						))}

					{!loading && !error && hasMore && (
						<div className="border-t border-border p-3">
							<button
								onClick={loadMore}
								disabled={loadingMore}
								className="w-full rounded-xl py-2.5 text-sm font-medium text-primary-500 transition hover:bg-bg-secondary disabled:opacity-50"
							>
								{loadingMore ? "Cargando..." : "Cargar más"}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
