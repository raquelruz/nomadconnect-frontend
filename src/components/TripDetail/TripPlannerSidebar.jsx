import { Menu } from "lucide-react";
import { PlannerSidebar } from "../Planner/PlannerSidebar";

export const TripPlannerSidebar = ({
	itineraries,
	selectedItinerary,
	setSelectedItinerary,
	selectedDay,
	setSelectedDay,
	isOwner,
	refreshTrip,
	mobileOpen,
	setMobileOpen,
	onAddItinerary,
	onCreateDay,
}) => {
	return (
		<>
			{mobileOpen && (
				<div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
			)}

			<aside
				className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-text-primary/10 bg-bg-card transition-transform duration-300 lg:sticky lg:top-22 lg:z-40 lg:h-[calc(100vh-88px)] lg:w-60 lg:shrink-0 lg:translate-x-0 ${
					mobileOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<PlannerSidebar
					itineraries={itineraries}
					selectedItinerary={selectedItinerary}
					setSelectedItinerary={setSelectedItinerary}
					selectedDay={selectedDay}
					setSelectedDay={setSelectedDay}
					refreshTrip={refreshTrip}
					isOwner={isOwner}
					onClose={() => setMobileOpen(false)}
					onAddItinerary={onAddItinerary}
					onCreateDay={onCreateDay}
				/>
			</aside>

			<button
				onClick={() => setMobileOpen(true)}
				className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition hover:bg-primary-700 lg:hidden"
				title="Ver itinerario"
			>
				<Menu size={22} />
			</button>
		</>
	);
};