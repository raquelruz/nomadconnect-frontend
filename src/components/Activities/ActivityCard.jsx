import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { useActivityActions } from "../../hooks/useActivityActions";
import { ActivityActions } from "./ActivityActions";
import { ActivityCarousel } from "./ActivityCarousel";
import { ActivityViewer } from "./ActivityViewer";

const formatTime = (time) => {
	if (!time) return null;

	const [hourStr, minuteStr] = time.split(":");
	const hour = parseInt(hourStr, 10);
	const period = hour >= 12 ? "PM" : "AM";
	const displayHour = hour % 12 === 0 ? 12 : hour % 12;

	return `${String(displayHour).padStart(2, "0")}:${minuteStr} ${period}`;
};

const formatPrice = (price) => {
	const value = Number(price) || 0;
	return value === 0 ? "Gratis" : `${value} €`;
};

export const ActivityCard = ({ activity, refreshDay, isOwner, onEdit }) => {
	const { deleteActivity, loading } = useActivityActions({ activity, refreshDay });

	const [viewerOpen, setViewerOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	const images = activity.images || [];
	const time = formatTime(activity.time);
	const price = formatPrice(activity.price);

	const openViewer = (index) => {
		setCurrentImage(index);
		setViewerOpen(true);
	};

	return (
		<>
			<div className="flex flex-col overflow-hidden rounded-2xl bg-bg-card shadow-sm ring-1 ring-slate-100 transition hover:shadow-md sm:flex-row">
				<div className="sm:w-56 sm:shrink-0">
					{images.length > 0 ? (
						<ActivityCarousel
							images={images}
							title={activity.title}
							onImageClick={openViewer}
							badge={price}
							height="h-40 sm:h-full"
						/>
					) : (
						<div className="flex h-40 items-center justify-center bg-bg-card/90 text-text-primary sm:h-full">
							<Clock size={22} />
						</div>
					)}
				</div>

				<div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-4 sm:p-5">
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0">
							<div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
								<Clock size={12} />
								{time || "Sin hora"}
							</div>

							<h4 className="mt-0.5 truncate text-lg font-bold text-text-primary">{activity.title}</h4>
						</div>

						<ActivityActions
							isOwner={isOwner}
							onEdit={onEdit}
							onDelete={deleteActivity}
							deleting={loading}
							variant="compact"
						/>
					</div>

					{activity.description && (
						<p className="line-clamp-2 text-sm text-slate-500">{activity.description}</p>
					)}

					{activity.location && (
						<span className="mt-1 flex items-center gap-1 text-xs text-slate-400">
							<MapPin size={12} />
							{activity.location}
						</span>
					)}

					{images.length === 0 && (
						<span className="mt-1 w-fit rounded-full bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-600">
							{price}
						</span>
					)}
				</div>
			</div>

			<ActivityViewer
				isOpen={viewerOpen}
				images={images}
				currentImage={currentImage}
				setCurrentImage={setCurrentImage}
				onClose={() => setViewerOpen(false)}
			/>
		</>
	);
};