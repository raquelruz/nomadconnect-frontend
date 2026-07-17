import { DayCard } from "../Days/DayCard";

export const DaysList = ({ days, refreshItinerary, refreshDay, isOwner }) => {
	return (
		<div className="mt-6 space-y-6">
			{days?.map((day, index) => (
				<DayCard
					key={day._id}
					day={day}
					dayNumber={index + 1}
					refreshItinerary={refreshItinerary}
					refreshDay={refreshDay}
					isOwner={isOwner}
				/>
			))}
		</div>
	);
};
