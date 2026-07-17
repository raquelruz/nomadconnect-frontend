import { DayHeader } from "./DayHeader";

import { DayTimeline } from "./DayTimeline";

import { useDayActions } from "../../hooks/useDayActions";

export const DayCard = ({ day, dayNumber, refreshItinerary, refreshDay, isOwner, onEdit }) => {
	const { deleteDay, loading } = useDayActions({
		day,
		refreshItinerary,
	});

	return (
		<section
			className="
				bg-white
				rounded-3xl
				p-6
				border
				shadow-sm
			"
		>
			<DayHeader
				dayNumber={dayNumber}
				date={day.date}
				title={day.title}
				isOwner={isOwner}
				onDelete={deleteDay}
				onEdit={onEdit}
			/>

			<DayTimeline activities={day.activities} refreshDay={refreshDay} isOwner={isOwner} />
		</section>
	);
};
