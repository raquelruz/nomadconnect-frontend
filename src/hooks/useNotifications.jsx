import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api";
import { useAuth } from "../auth/AuthContext";

export const useNotifications = () => {
	const { user } = useAuth();

	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchNotifications = useCallback(async () => {
		if (!user) {
			setNotifications([]);
			return;
		}

		try {
			setLoading(true);
			setError(null);
			
			const { data } = await api.get(`/notifications/user/${user.id}`);

			setNotifications(data);
		} catch (err) {
			console.error("Error loading notifications:", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchNotifications();
	}, [fetchNotifications]);

	const markAsRead = useCallback(async (notificationId) => {
		try {
			await api.patch(`/notifications/${notificationId}/read`);

			setNotifications((prev) =>
				prev.map((notification) =>
					notification._id === notificationId ? { ...notification, isRead: true } : notification,
				),
			);
		} catch (err) {
			console.error("Error marking notification as read:", err);
		}
	}, []);

	const markAllAsRead = useCallback(async () => {
		try {
			const unreadNotifications = notifications.filter((notification) => !notification.isRead);

			await Promise.all(
				unreadNotifications.map((notification) => api.patch(`/notifications/${notification._id}/read`)),
			);

			setNotifications((prev) =>
				prev.map((notification) => ({
					...notification,
					isRead: true,
				})),
			);
		} catch (err) {
			console.error("Error marking all notifications as read:", err);
		}
	}, [notifications]);

	const deleteNotification = useCallback(async (notificationId) => {
		try {
			await api.delete(`/notifications/${notificationId}`);

			setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
		} catch (err) {
			console.error("Error deleting notification:", err);
		}
	}, []);

	const unreadCount = useMemo(() => {
		return notifications.filter((notification) => !notification.isRead).length;
	}, [notifications]);

	return {
		notifications,
		unreadCount,
		loading,
		error,
		fetchNotifications,
		markAsRead,
		markAllAsRead,
		deleteNotification,
	};
};
