import { DayCard } from "../Days/DayCard";

export const DaySection = ({ day, isOwner, refreshTrip }) => {
	return <DayCard day={day} isOwner={isOwner} refreshTrip={refreshTrip} />;
};
