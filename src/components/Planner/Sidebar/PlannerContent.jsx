import { DaySection } from "../../Days/DaySection";

export const PlannerContent = ({ itinerary, selectedDay, isOwner, refreshTrip }) => {
	if (!itinerary) {
		return <div className="rounded-2xl border border-slate-200 bg-white p-6">Selecciona un itinerario.</div>;
	}

	if (!selectedDay) {
		return <div className="rounded-2xl border border-slate-200 bg-white p-6">Selecciona un día.</div>;
	}

	return <DaySection day={selectedDay} isOwner={isOwner} refreshTrip={refreshTrip} />;
};
