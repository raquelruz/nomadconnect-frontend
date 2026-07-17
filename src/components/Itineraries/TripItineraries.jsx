import { useState } from "react";
import { CreateItineraryForm } from "./CreateItineraryForm";
import { ItineraryList } from "./ItineraryList";

export const TripItineraries = ({ trip, isOwner, refreshTrip }) => {
	const [showCreate, setShowCreate] = useState(false);

	return (
		<section className="mt-8 sm:mt-10">
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h2 className="text-xl font-bold text-slate-800 sm:text-2xl">Itinerarios</h2>

				{isOwner && !showCreate && (
					<button
						onClick={() => setShowCreate(true)}
						className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 sm:w-auto sm:py-2.5"
					>
						+ Añadir itinerario
					</button>
				)}
			</div>

			{isOwner && showCreate && (
				<div className="mb-6 sm:mb-8">
					<CreateItineraryForm
						onCreated={() => {
							setShowCreate(false);
							refreshTrip();
						}}
						onCancel={() => {
							setShowCreate(false);
						}}
					/>
				</div>
			)}

			<ItineraryList itineraries={trip.itineraries} refreshTrip={refreshTrip} isOwner={isOwner} />
		</section>
	);
};
