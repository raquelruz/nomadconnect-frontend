import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import { NotificationDropdown } from "./NotificationDropdown";
import { navIconButtonClass } from "../ui/Buttons/navIconButtonsStyles";

export const NotificationButton = () => {
	const [open, setOpen] = useState(false);
	const containerRef = useRef(null);

	const hookResult = useNotifications();

	const {
		notifications,
		unreadCount,
		loading,
		error,
		markAsRead,
		markAllAsRead,
		deleteNotification,
	} = hookResult;

	// Cierra el dropdown al hacer click fuera o al pulsar Escape
	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		const handleEscape = (event) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open]);

	return (
		<div className="relative" ref={containerRef}>
			<button
				onClick={() => setOpen((prev) => !prev)}
				aria-label="Notificaciones"
				aria-haspopup="true"
				aria-expanded={open}
				className={navIconButtonClass}
			>
				<Bell size={18} />

				{unreadCount > 0 && (
					<span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
						{unreadCount}
					</span>
				)}
			</button>

			<NotificationDropdown
				open={open}
				loading={loading}
				error={error}
				notifications={notifications}
				unreadCount={unreadCount}
				markAsRead={markAsRead}
				markAllAsRead={markAllAsRead}
				deleteNotification={deleteNotification}
				onNavigate={() => setOpen(false)}
			/>
		</div>
	);
};