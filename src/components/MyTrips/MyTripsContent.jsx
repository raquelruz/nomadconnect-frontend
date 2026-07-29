import { TripCard } from "../Trips/TripCard";
import { TripsEmptyState } from "./TripsEmptyState";

export const MyTripsContent = ({ trips, filteredTrips, onDelete, viewerId }) => {
    if (trips.length === 0) {
        return <TripsEmptyState variant="none" />;
    }

    if (filteredTrips.length === 0) {
        return <TripsEmptyState variant="filtered" />;
    }

    return <TripCard trips={filteredTrips} onDelete={onDelete} showPhase columns={2} viewerId={viewerId} />;
};