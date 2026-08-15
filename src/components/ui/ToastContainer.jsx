import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ICONS = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
};

const STYLES = {
    success: "border-success-500/30 text-success-500",
    error: "border-error-500/30 text-error-500",
    info: "border-primary-500/30 text-primary-500",
};

export const ToastContainer = ({ toasts, onDismiss }) => {
    if (toasts.length === 0) return null;

    return createPortal(
        <div className="fixed top-4 right-4 z-999 flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
            {toasts.map((toast) => {
                const Icon = ICONS[toast.type] || Info;
                const styles = STYLES[toast.type] || STYLES.info;

                return (
                    <div
                        key={toast.id}
                        className={`flex items-start gap-3 rounded-xl border bg-bg-card p-4 shadow-lg backdrop-blur-md ${styles}`}
                    >
                        <Icon size={18} className="mt-0.5 shrink-0" />

                        <p className="flex-1 text-sm font-medium text-text-primary">{toast.message}</p>

                        <button
                            onClick={() => onDismiss(toast.id)}
                            aria-label="Cerrar notificación"
                            className="shrink-0 text-text-muted transition hover:text-text-primary"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>,
        document.body,
    );
};
