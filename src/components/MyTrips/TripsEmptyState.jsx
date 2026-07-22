// src/components/MyTrips/TripsEmptyState.jsx
import { Link } from "react-router-dom";
import { Compass, Plus } from "lucide-react";

export const TripsEmptyState = ({ variant = "none" }) => {
    if (variant === "filtered") {
        return (
            <div className="px-4 py-16 text-center">
                <p className="text-text-secondary">No tienes viajes en esta categoría todavía.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border px-4 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500">
                <Compass size={26} />
            </div>

            <h3 className="mb-1 text-lg font-semibold text-text-primary">Todavía no tienes viajes</h3>

            <p className="mb-6 max-w-sm text-sm text-text-secondary">
                Cuando organices tu primer viaje, aparecerá aquí con su destino, fechas y compañeros de ruta.
            </p>

            <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary-600 to-primary-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
                <Plus size={14} />
                Explorar destinos
            </Link>
        </div>
    );
};