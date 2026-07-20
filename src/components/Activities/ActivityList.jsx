import { ActivityCard } from "./ActivityCard";

export const ActivityList = ({ activities, isOwner, refreshDay }) => {
	if (!activities || activities.length === 0) {
		return (
			<div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
				<p className="text-sm text-slate-400">Todavía no hay actividades para este día.</p>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{activities.map((activity) => (
				<ActivityCard key={activity.id} activity={activity} isOwner={isOwner} refreshDay={refreshDay} />
			))}
		</div>
	);
};
