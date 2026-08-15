import { createContext, useCallback, useContext, useState } from "react";
import { ToastContainer } from "../components/ui/ToastContainer";

const ToastContext = createContext(null);

let nextId = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const dismissToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback(
        (message, type = "info") => {
            const id = nextId++;

            setToasts((prev) => [...prev, { id, message, type }]);

            setTimeout(() => dismissToast(id), 4000);
        },
        [dismissToast],
    );

    const toast = {
        success: (message) => showToast(message, "success"),
        error: (message) => showToast(message, "error"),
        info: (message) => showToast(message, "info"),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast debe usarse dentro de <ToastProvider>");
    return context;
};
