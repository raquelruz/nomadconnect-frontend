import { useState } from "react";
import { CreateDayForm } from "../Days/CreateDayForm";
import { DayCard } from "../Days/DayCard";

export const ItineraryCard = ({ itinerary, refreshTrip, isOwner }) => {
	const [showCreateDay, setShowCreateDay] = useState(false);

	let buttonText = "+ Añadir día";

	if (showCreateDay) {
		buttonText = "Cancelar";
	}

	let hasDays = false;

	if (itinerary.days && itinerary.days.length > 0) {
		hasDays = true;
	}

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="p-6">
				<h3 className="text-2xl font-bold text-slate-900">
					{itinerary.title}
				</h3>

				{itinerary.description && (
					<p className="mt-2 text-slate-500">
						{itinerary.description}
					</p>
				)}
			</div>

			<div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
				<div className="flex items-center justify-between">
					<h4 className="font-semibold text-slate-700">
						Días del itinerario
					</h4>

					{isOwner && (
						<button
							onClick={() =>
								setShowCreateDay(!showCreateDay)
							}
							className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
						>
							{buttonText}
						</button>
					)}
				</div>
			</div>

			{showCreateDay && (
				<div className="border-b border-slate-100 bg-slate-50 p-6">
					<CreateDayForm
						itineraryId={itinerary.id}
						onCreated={() => {
							setShowCreateDay(false);
							refreshTrip();
						}}
					/>
				</div>
			)}

			<div className="space-y-4 p-6">
				{hasDays &&
					itinerary.days.map((day) => (
						<DayCard
							key={day.id}
							day={day}
							refreshTrip={refreshTrip}
						/>
					))}

				{!hasDays && (
					<div className="rounded-xl border-2 border-dashed border-slate-200 py-10 text-center">
						<div className="mb-3 text-4xl">
							📅
						</div>

						<h5 className="font-semibold text-slate-700">
							Aún no hay días
						</h5>

						<p className="mt-2 text-sm text-slate-500">
							Añade el primer día para empezar a organizar este itinerario.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};