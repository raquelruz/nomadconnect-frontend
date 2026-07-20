// src/pages/ExplorePage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import { TripCard } from "../components/Trips/TripCard";
import { ExploreHeader } from "../components/Trips/ExploreHeader";
import { CreateTripModal } from "../components/ui/Modals/CreateTripsModal";
import { useAuth } from "../auth/AuthContext";

export const ExplorePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateTrip, setShowCreateTrip] = useState(false);

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const date = searchParams.get("date") || "";

    const loadTrips = async () => {
        setLoading(true);

        try {
            const response = await api.get("/trips", {
                params: { search, date },
            });

            const publicTrips = (response.data || []).filter((trip) => trip.visibility === "public");

            setTrips(publicTrips);
        } catch (error) {
            console.error("Error cargando viajes:", error);
            setTrips([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTrips();
    }, [search, date]);

    const remove = async (id) => {
        if (!confirm("¿Eliminar este viaje? Se borrarán también sus tareas, comentarios y updates.")) {
            return;
        }

        try {
            await api.delete(`/trips/${id}`);
            loadTrips();
        } catch (error) {
            alert(error.message || "Error al eliminar el viaje");
        }
    };

    if (loading) return <p className="text-gray-500">Cargando viajes...</p>;

    return (
        <div className="min-h-screen bg-bg-primary">
            <ExploreHeader tripCount={trips.length} />

            <div className="max-w-7xl mx-auto px-8 pb-10 pt-8">
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                    <div>
                        <h2 className="text-base font-semibold text-text-primary">Viajes públicos</h2>
                        <p className="text-sm text-text-secondary">
                            {search || date ? "Resultados según tu búsqueda" : "Explora lo que la comunidad está organizando"}
                        </p>
                    </div>

                    {user && (
                        <button
                            onClick={() => setShowCreateTrip(true)}
                            className="shrink-0 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-700"
                        >
                            + Nuevo viaje
                        </button>
                    )}

                    {!user && (
                        <button
                            onClick={() => navigate("/login")}
                            className="shrink-0 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors duration-200 hover:bg-bg-secondary"
                        >
                            Inicia sesión
                        </button>
                    )}
                </div>

                {trips.length === 0 && (
                    <p className="text-text-secondary text-center py-12">No hay viajes públicos todavía.</p>
                )}

                {trips.length > 0 && <TripCard trips={trips} onDelete={remove} />}
            </div>

            <CreateTripModal
                isOpen={showCreateTrip}
                onClose={() => setShowCreateTrip(false)}
                onSuccess={() => {
                    setShowCreateTrip(false);
                    loadTrips();
                }}
            />
        </div>
    );
};