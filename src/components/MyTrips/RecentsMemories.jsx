// src/components/MyTrips/RecentsMemories.jsx
import { Link } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";

export const RecentMemories = ({ trips }) => {
	if (trips.length === 0) return null;

	return (
		<div className="mt-6">
			<div className="mb-3 flex items-center justify-between">
				<p className="text-base font-semibold text-text-primary">Recuerdos recientes</p>
				<Link to="?filter=past" className="text-xs font-medium text-primary-500 hover:underline">
					Ver todos
				</Link>
			</div>

			<div className="overflow-hidden rounded-2xl border border-border bg-bg-card">
				{trips.map((trip, index) => (
					<Link
						key={trip.id}
						to={`/trips/${trip.id}`}
						className={`group flex items-center gap-4 p-4 transition hover:bg-bg-secondary ${
							index !== trips.length - 1 ? "border-b border-border" : ""
						}`}
					>
						<div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-bg-tertiary ring-1 ring-border transition group-hover:ring-primary-500/30">
							{trip.image ? (
								<img
									src={trip.image}
									alt={trip.title}
									className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center">
									<MapPin size={20} className="text-text-muted" />
								</div>
							)}
						</div>

						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-semibold text-text-primary">{trip.title}</p>
							<p className="mt-1 flex items-center gap-1.5 truncate text-xs text-text-secondary">
								<MapPin size={11} className="shrink-0 text-text-muted" />
								{trip.country}
							</p>
							<p className="mt-0.5 text-[11px] text-text-muted">
								Finalizado:{" "}
								{new Date(trip.endDate).toLocaleDateString("es-ES", {
									month: "long",
									year: "numeric",
								})}
							</p>
						</div>

						<ChevronRight
							size={18}
							className="shrink-0 text-text-muted transition group-hover:translate-x-0.5 group-hover:text-primary-500"
						/>
					</Link>
				))}
			</div>
		</div>
	);
};
