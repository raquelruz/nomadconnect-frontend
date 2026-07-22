// Formatea una fecha como tiempo relativo: "Ahora mismo", "Hace 5 min", "Hace 3 h", etc.
export const getRelativeTime = (date) => {
	const createdAt = new Date(date);
	const now = new Date();
	const diffMs = now - createdAt;
	const diffSeconds = Math.floor(diffMs / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffSeconds < 60) return "Ahora mismo";
	if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
	if (diffHours < 24) return `Hace ${diffHours} h`;
	if (diffDays === 1) return "Ayer";
	if (diffDays < 7) return `Hace ${diffDays} días`;

	return createdAt.toLocaleDateString("es-ES", {
		day: "numeric",
		month: "short",
	});
};

export const getNotificationLink = (notification) => {
	if (!notification.trip) return null;

	return `/trips/${notification.trip}`;
};

const isSameDay = (a, b) =>
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate();

const startOfDay = (date) => {
	const copy = new Date(date);
	copy.setHours(0, 0, 0, 0);
	return copy;
};

export const groupNotificationsByDate = (notifications) => {
	const now = new Date();
	const today = startOfDay(now);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const weekAgo = new Date(today);
	weekAgo.setDate(weekAgo.getDate() - 7);

	const groups = {
		Hoy: [],
		Ayer: [],
		"Esta semana": [],
		Anteriores: [],
	};

	notifications.forEach((notification) => {
		const createdAt = new Date(notification.createdAt);

		if (isSameDay(createdAt, today)) {
			groups["Hoy"].push(notification);
		} else if (isSameDay(createdAt, yesterday)) {
			groups["Ayer"].push(notification);
		} else if (createdAt >= weekAgo) {
			groups["Esta semana"].push(notification);
		} else {
			groups["Anteriores"].push(notification);
		}
	});

	return Object.entries(groups).filter(([, items]) => items.length > 0);
};