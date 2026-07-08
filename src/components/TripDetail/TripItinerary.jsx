export const TripItinerary = ({ itinerary, refreshTrip }) => {
    if (!itinerary?.length) {
        return (
            <div className="bg-white rounded-2xl shadow p-6 mt-8">
                <h2 className="text-2xl font-bold mb-4">
                    Itinerarios
                </h2>

                <p className="text-slate-500">
                    Este viaje todavía no tiene itinerarios.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 mt-8">
            {itinerary.map((item) => (
                <ItineraryCard
                    key={item._id}
                    itinerary={item}
                    refreshTrip={refreshTrip}
                />
            ))}
        </div>
    );
};