export const TravelerBadge = ({ tripsCount }) => {
    const getLabel = () => {
        if (tripsCount >= 5) return "Viajero frecuente";
        if (tripsCount >= 1) return "Viajero";
        return "Nuevo explorador";
    };

    return (
        <span className="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-semibold text-primary-500">
            {getLabel()}
        </span>
    );
};