import { Clock, Euro, MapPin } from "lucide-react";
import { ActivityCarousel } from "./ActivityCarousel";

export const ActivityHeader = ({ activity, openViewer }) => {
	return (
		<div className="min-w-0 flex-1">
			<h5 className="text-lg font-semibold text-slate-900">
				{activity.title}
			</h5>

			<ActivityCarousel
				images={activity.images}
				title={activity.title}
				onImageClick={openViewer}
			/>

			<div className="mt-3 flex flex-wrap gap-2">
				<div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
					<Clock size={14} />
					{activity.time}
				</div>

				{activity.location && (
					<div className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
						<MapPin size={14} className="shrink-0" />
						<span className="truncate">{activity.location}</span>
					</div>
				)}

				{activity.price > 0 && (
					<div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
						<Euro size={14} />
						{activity.price} €
					</div>
				)}
			</div>

			{activity.description && (
				<p className="mt-4 text-sm leading-relaxed text-slate-600">
					{activity.description}
				</p>
			)}
		</div>
	);
};