import { ActivityCard } from "../Activities/ActivityCard";

export const DayTimeline = ({ activities, refreshDay, isOwner }) => {
	if (!activities?.length) {
		return (
			<p
				className="
				text-sm
				text-gray-500
				mt-4
			"
			>
				No hay actividades todavía
			</p>
		);
	}

	return (
		<div
			className="
				mt-6
				space-y-4
				border-l
				pl-6
			"
		>
			{activities.map((activity) => (
				<ActivityCard key={activity._id} activity={activity} refreshDay={refreshDay} isOwner={isOwner} />
			))}
		</div>
	);
};
