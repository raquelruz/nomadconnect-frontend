import { DayCard } from "../Days/DayCard";

export const DaysList = ({ days, refreshTrip, isOwner }) => {
	console.log("DAYS:", days);

	return (
		<div className="space-y-8">
			{days?.map((day, index) => (
				<DayCard
					key={day.id}
					day={day}
					dayNumber={index + 1}
					refreshItinerary={refreshTrip}
					isOwner={isOwner}
				/>
			))}
		</div>
	);
};
