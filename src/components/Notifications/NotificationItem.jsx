import { Trash2, MessageCircle, UserPlus, Heart } from "lucide-react";

const icons = {
    new_comment: MessageCircle,
    invitation: UserPlus,
    like: Heart,
};

export const NotificationItem = ({
    notification,
    markAsRead,
    deleteNotification,
}) => {
    const Icon = icons[notification.type] ?? MessageCircle;

    return (
        <div
            onClick={() => {
                if (!notification.isRead) {
                    markAsRead(notification._id);
                }
            }}
            className={`group cursor-pointer border-b border-border px-6 py-5 transition hover:bg-bg-secondary ${
                !notification.isRead && "bg-primary/5"
            }`}
        >
            <div className="flex gap-4">

                <img
                    src={
                        notification.sender?.avatar ||
                        "/default-avatar.png"
                    }
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                />

                <div className="flex-1">

                    <div className="flex items-start justify-between">

                        <div>

                            <div className="flex items-center gap-2">

                                <span className="font-semibold text-text-primary">
                                    {notification.sender?.username}
                                </span>

                                <Icon
                                    size={16}
                                    className="text-primary-500"
                                />

                            </div>

                            <p className="mt-1 text-sm text-text-secondary">
                                {notification.message}
                            </p>

                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification._id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition"
                        >
                            <Trash2
                                size={16}
                                className="text-text-muted hover:text-red-500"
                            />
                        </button>

                    </div>

                    <span className="mt-3 block text-xs text-text-muted">
                        Hace 5 minutos
                    </span>

                </div>

            </div>
        </div>
    );
};