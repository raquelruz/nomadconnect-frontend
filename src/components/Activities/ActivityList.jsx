import { CalendarX } from "lucide-react";
import { ActivityCard } from "./ActivityCard";

export const ActivityList = ({ activities, isOwner, refreshDay, onEditActivity }) => {
	if (!activities || activities.length === 0) {
		return (
			<div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-text-primary/15 bg-bg-card py-10 text-center">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-text-primary/5 text-text-primary/40">
					<CalendarX size={18} />
				</div>

				<p className="text-sm text-text-primary/60">Todavía no hay actividades para este día.</p>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{activities.map((activity) => (
				<ActivityCard
					key={activity.id}
					activity={activity}
					isOwner={isOwner}
					refreshDay={refreshDay}
					onEdit={() => onEditActivity?.(activity)}
				/>
			))}
		</div>
	);
};