import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../auth/AuthContext";

const NotificationsContext = createContext(null);

const PAGE_SIZE = 15;

export const NotificationsProvider = ({ children }) => {
	const { user } = useAuth();

	const [notifications, setNotifications] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const [unreadOnly, setUnreadOnly] = useState(false);
	const [unreadCount, setUnreadCount] = useState(0);

	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState(null);

	const fetchUnreadCount = useCallback(async () => {
		if (!user) {
			setUnreadCount(0);
			return;
		}

		try {
			const { data } = await api.get(`/notifications/unread/${user.id}`);
			setUnreadCount(data);
		} catch (err) {
			console.error("Error loading unread count:", err);
		}
	}, [user]);

	const fetchNotifications = useCallback(
		async (nextUnreadOnly = false) => {
			if (!user) {
				setNotifications([]);
				return;
			}

			try {
				setLoading(true);
				setError(null);

				const { data } = await api.get(`/notifications/user/${user.id}`, {
					params: { page: 1, limit: PAGE_SIZE, unreadOnly: nextUnreadOnly },
				});

				setNotifications(data.notifications);
				setPage(1);
				setHasMore(data.hasMore);
				setUnreadOnly(nextUnreadOnly);
			} catch (err) {
				console.error("Error loading notifications:", err);
				setError(err);
			} finally {
				setLoading(false);
			}
		},
		[user],
	);

	const loadMore = useCallback(async () => {
		if (!user || loadingMore || !hasMore) return;

		const nextPage = page + 1;

		try {
			setLoadingMore(true);

			const { data } = await api.get(`/notifications/user/${user.id}`, {
				params: { page: nextPage, limit: PAGE_SIZE, unreadOnly },
			});

			setNotifications((prev) => [...prev, ...data.notifications]);
			setPage(nextPage);
			setHasMore(data.hasMore);
		} catch (err) {
			console.error("Error loading more notifications:", err);
		} finally {
			setLoadingMore(false);
		}
	}, [user, page, hasMore, loadingMore, unreadOnly]);

	useEffect(() => {
		fetchNotifications(false);
		fetchUnreadCount();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const markAsRead = useCallback(async (notificationId) => {
		try {
			await api.patch(`/notifications/${notificationId}/read`);

			setNotifications((prev) =>
				prev.map((notification) =>
					notification.id === notificationId ? { ...notification, isRead: true } : notification,
				),
			);
			setUnreadCount((count) => Math.max(count - 1, 0));
		} catch (err) {
			console.error("Error marking notification as read:", err);
		}
	}, []);

	const markAllAsRead = useCallback(async () => {
		const unreadNotifications = notifications.filter((notification) => !notification.isRead);

		if (unreadNotifications.length === 0) return;

		const results = await Promise.allSettled(
			unreadNotifications.map((notification) =>
				api.patch(`/notifications/${notification.id}/read`).then(() => notification.id),
			),
		);

		const succeededIds = new Set(
			results.filter((result) => result.status === "fulfilled").map((result) => result.value),
		);

		const failedCount = results.length - succeededIds.size;
		if (failedCount > 0) {
			console.error(`${failedCount} notificación(es) no se pudieron marcar como leídas`);
		}

		setNotifications((prev) =>
			prev.map((notification) =>
				succeededIds.has(notification.id) ? { ...notification, isRead: true } : notification,
			),
		);

		setUnreadCount((count) => Math.max(count - succeededIds.size, 0));
	}, [notifications]);

	const deleteNotification = useCallback(
		async (notificationId) => {
			try {
				await api.delete(`/notifications/${notificationId}`);

				const target = notifications.find((notification) => notification.id === notificationId);

				setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId));

				if (target && !target.isRead) {
					setUnreadCount((count) => Math.max(count - 1, 0));
				}

				return true;
			} catch (err) {
				console.error("Error deleting notification:", err);
				return false;
			}
		},
		[notifications],
	);

	const value = {
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
	};

	return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => {
	const context = useContext(NotificationsContext);
	if (!context) throw new Error("useNotifications debe usarse dentro de <NotificationsProvider>");
	return context;
};