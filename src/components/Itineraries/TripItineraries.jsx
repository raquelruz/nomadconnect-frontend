import { useState } from "react";
import { CreateItineraryForm } from "./CreateItineraryForm";
import { PlannerPage } from "../Planner/PlannerPage";

export const TripItineraries = ({ trip, isOwner, refreshTrip }) => {
	const [showCreate, setShowCreate] = useState(false);

	const itineraries = trip.itineraries || [];

	const [selectedItinerary, setSelectedItinerary] = useState(itineraries[0] || null);

	return (
		<section className="mt-8 sm:mt-10">
			{isOwner && showCreate && (
				<div className="mb-6 sm:mb-8">
					<CreateItineraryForm
						onCreated={() => {
							setShowCreate(false);
							refreshTrip();
						}}
						onCancel={() => setShowCreate(false)}
					/>
				</div>
			)}

			<PlannerPage
				itineraries={itineraries}
				selectedItinerary={selectedItinerary}
				setSelectedItinerary={setSelectedItinerary}
				isOwner={isOwner}
				refreshTrip={refreshTrip}
				onAddItinerary={() => {
					setShowCreate(true);
				}}
			/>
		</section>
	);
};
