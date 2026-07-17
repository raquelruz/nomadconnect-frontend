import { ActivityHeader } from "./ActivityHeader";

import { ActivityInfo } from "./ActivityInfo";

import { ActivityImages } from "./ActivityImages";

import { ActivityActions } from "./ActivityActions";

import { useActivityActions } from "../../hooks/useActivityActions";

export const ActivityCard = ({ activity, refreshDay, isOwner }) => {
	const { deleteActivity, loading } = useActivityActions({
		activity,
		refreshDay,
	});

	return (
		<article
			className="
				bg-white
				rounded-2xl
				p-5
				shadow-sm
				border
				border-gray-100
			"
		>
			<div
				className="
				flex
				justify-between
				gap-4
			"
			>
				<ActivityHeader title={activity.title} date={activity.date} time={activity.time} />

				{isOwner && <ActivityActions onDelete={deleteActivity} loading={loading} activity={activity} />}
			</div>

			{activity.description && (
				<p
					className="
					mt-4
					text-gray-600
				"
				>
					{activity.description}
				</p>
			)}

			<div className="mt-4">
				<ActivityInfo
					location={activity.location}
					price={activity.price}
					maxParticipants={activity.maxParticipants}
				/>
			</div>

			<ActivityImages images={activity.images} />
		</article>
	);
};
