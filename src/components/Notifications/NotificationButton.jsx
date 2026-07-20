import { useState } from "react";
import { Bell } from "lucide-react";

import { useNotifications } from "../../hooks/useNotifications";
import { NotificationDropdown } from "./NotificationDropdown";

export const NotificationButton = () => {
    const [open, setOpen] = useState(false);

    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
    } = useNotifications();

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-text-secondary backdrop-blur-md shadow-md transition-all duration-300 hover:bg-white/10 hover:text-text-primary hover:shadow-lg active:scale-95"
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
                notifications={notifications}
                markAsRead={markAsRead}
                markAllAsRead={markAllAsRead}
                deleteNotification={deleteNotification}
            />
        </div>
    );
};