import { Link } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import { getStampInfo } from "../../utils/tripPhase";

const stampTone = {
	upcoming: "border-info text-info bg-info/10",
	ongoing: "border-success text-success bg-success/10",
	completed: "border-text-muted text-text-muted bg-text-muted/10",
	pendingClose: "border-warning text-warning bg-warning/10",
};

export const LikedTripsSection = ({ trips = [] }) => {
	const hasLikedTrips = trips.length > 0;

	let content = (
		<div className="rounded-2xl border border-dashed border-border py-12 text-center">
			<Heart size={28} className="mx-auto mb-3 text-text-muted" />
			<p className="text-text-secondary text-sm font-medium">Aún no has dado like a ningún viaje</p>
			<p className="text-text-muted text-xs mt-1">
				Explora viajes y pulsa el corazón para guardarlos aquí
			</p>
		</div>
	);

	if (hasLikedTrips) {
		content = (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{trips.map((trip) => {
					const stamp = getStampInfo(trip);

					return (
						<Link
							key={trip.id}
							to={`/trips/${trip.id}`}
							className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div className="relative h-40 overflow-hidden bg-bg-tertiary">
								{trip.image && (
									<img
										src={trip.image}
										alt={trip.title}
										className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>
								)}

								<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

								<span
									className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm ${stampTone[stamp.tone]}`}
								>
									{stamp.label}
								</span>

								<div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
									<Heart size={12} fill="currentColor" className="text-error-400" />
									{trip.likesCount || 0}
								</div>

								<div className="absolute bottom-3 left-3 right-3">
									<p className="truncate text-base font-bold text-white drop-shadow-sm">
										{trip.title}
									</p>
								</div>
							</div>

							<div className="p-3 flex items-center justify-between">
								<div className="flex items-center gap-1.5 text-text-muted min-w-0">
									<MapPin size={13} className="shrink-0" />
									<p className="truncate text-xs">
										{trip.city}, {trip.country}
									</p>
								</div>

								<p className="shrink-0 text-[11px] text-text-muted">
									{new Date(trip.startDate).toLocaleDateString("es-ES", {
										day: "numeric",
										month: "short",
									})}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		);
	}

	return (
		<div className="p-6 mb-6">
			<div className="flex items-center gap-2 mb-4">
				<Heart size={18} className="text-text-primary" fill="currentColor" />
				<h3 className="font-bold text-text-primary">Viajes que te han gustado</h3>
			</div>

			{content}
		</div>
	);
};