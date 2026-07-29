// src/components/Trips/TripCard.jsx
import { Link } from "react-router-dom";
import { Calendar, Users, MapPin, Trash2 } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { getStampInfo } from "../../utils/tripPhase";
import { getTripDurationInDays } from "../../utils/tripStats";
import { UserAvatar } from "../ui/UserAvatar";

const phaseDotColor = {
	upcoming: "bg-info-500",
	ongoing: "bg-success-500",
	completed: "bg-text-muted",
};

const columnClasses = {
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
};

export const TripCard = ({ trips, onDelete, showPhase = false, columns = 3, viewerId = null }) => {
	const { user } = useAuth();

	if (!Array.isArray(trips) || trips.length === 0) {
		return (
			<div className="mt-16 text-center text-text-secondary">
				<p className="text-lg">No hay viajes disponibles</p>
				<p className="text-sm opacity-70">Prueba a buscar otro destino</p>
			</div>
		);
	}

	return (
		<div className={`mt-12 grid grid-cols-1 gap-6 px-4 ${columnClasses[columns] || columnClasses[3]}`}>
			{trips.map((trip) => {
				const stamp = showPhase ? getStampInfo(trip) : null;
				const duration = getTripDurationInDays(trip);
				const owner = typeof trip.owner === "object" ? trip.owner : null;
				const ownerId = owner?.id ?? trip.owner;
				const canDelete = onDelete && user && ownerId === user.id;
				const spotsTaken = trip.members?.length ?? 0;
				const role = viewerId ? (ownerId === viewerId ? "owner" : "member") : null;

				return (
					<Link
						key={trip.id}
						to={`/trips/${trip.id}`}
						className="group block overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/30 hover:shadow-xl"
					>
						<div className="relative aspect-[4/3.2] overflow-hidden bg-bg-tertiary">
							{trip.image && (
								<img
									src={trip.image}
									alt={trip.city}
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									onError={(event) => {
										event.target.style.display = "none";
									}}
								/>
							)}

							{!trip.image && (
								<div className="flex h-full w-full items-center justify-center">
									<MapPin size={32} className="text-text-muted" />
								</div>
							)}

							<div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-text-primary backdrop-blur">
								<Calendar size={11} />
								{new Date(trip.startDate).toLocaleDateString("es-ES", {
									day: "numeric",
									month: "short",
								})}
								{" – "}
								{new Date(trip.endDate).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
							</div>

							<div className="absolute bottom-3 right-3 rounded-full bg-primary-600 px-2.5 py-1 text-[11px] font-semibold text-white">
								{duration} día{duration === 1 ? "" : "s"}
							</div>

							{canDelete && (
								<button
									onClick={(event) => {
										event.preventDefault();
										onDelete(trip.id);
									}}
									title="Eliminar viaje"
									className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg-card/90 text-error-500 opacity-0 backdrop-blur transition hover:bg-error-500 hover:text-white group-hover:opacity-100"
								>
									<Trash2 size={14} />
								</button>
							)}
						</div>

						<div className="p-4">
							{(showPhase || role) && (
								<div className="mb-1.5 flex items-center gap-1.5">
									{showPhase && (
										<>
											<span
												className={`inline-block h-1.5 w-1.5 rounded-full ${phaseDotColor[stamp.tone]}`}
											/>
											<span className="text-[11px] text-text-secondary">{stamp.label}</span>
										</>
									)}

									{role && (
										<span
											className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${
												role === "owner"
													? "bg-primary-500/10 text-primary-500"
													: "bg-bg-secondary text-text-secondary"
											}`}
										>
											{role === "owner" ? "Organizas este viaje" : "Participas en este viaje"}
										</span>
									)}
								</div>
							)}

							<h3 className="truncate text-[15px] font-semibold text-text-primary transition group-hover:text-primary-500">
								{trip.city}, {trip.country}
							</h3>

							<p className="mt-0.5 truncate text-xs text-text-muted">{trip.title}</p>

							<div className="mt-2.5 border-t border-border pt-2.5">
								<div className="flex items-center justify-between">
									{owner ? (
										<div className="flex items-center gap-1.5 text-xs text-text-secondary">
											<UserAvatar user={owner} size="xs" />
											{owner.username}
										</div>
									) : (
										<span />
									)}

									<span className="flex items-center gap-1 text-xs text-text-secondary">
										<Users size={12} />
										{spotsTaken}/{trip.maxMembers}
									</span>
								</div>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
