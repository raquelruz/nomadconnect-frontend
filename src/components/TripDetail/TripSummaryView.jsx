import { Link } from "react-router-dom";
import { Lock, MapPin, Sparkles, UserPlus, Users } from "lucide-react";
import { TripHeader } from "./TripHeader";
import { TripDescription } from "./TripDescription";

export const TripSummaryView = ({ trip, user, refreshTrip, canJoin, hasFreePlaces, joining, onJoin }) => {
	const members = trip.members || [];
	const totalMembers = members.length + 1;

	let ctaIcon = <Sparkles size={22} className="text-primary-500" />;
	let ctaTitle = "Únete a la aventura";
	let ctaButton = (
		<Link
			to="/login"
			className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700 hover:shadow-lg"
		>
			<UserPlus size={18} />
			Inicia sesión para unirte
		</Link>
	);

	if (user && canJoin) {
		ctaButton = (
			<button
				onClick={onJoin}
				disabled={joining}
				className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700 hover:shadow-lg disabled:opacity-60"
			>
				<UserPlus size={18} />
				{joining ? "Uniéndote..." : "Únete y colabora en este viaje"}
			</button>
		);
	}

	if (user && !canJoin && !hasFreePlaces) {
		ctaIcon = <Lock size={22} className="text-text-muted" />;
		ctaTitle = "Viaje completo";
		ctaButton = (
			<p className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-secondary px-6 py-3 text-sm font-medium text-text-muted">
				<Lock size={16} />
				Este viaje ya no tiene plazas libres
			</p>
		);
	}

	return (
		<div className="min-h-screen bg-bg-primary">
			<TripHeader trip={trip} user={user} refreshTrip={refreshTrip} />

			<div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20">
				<TripDescription description={trip.description} />

				<div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-bg-card p-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
							<Users size={20} />
						</div>
						<div>
							<p className="text-lg font-bold text-text-primary">
								{totalMembers} / {trip.maxMembers}
							</p>
							<p className="text-xs text-text-muted">Viajeros se han unido al viaje</p>
						</div>
					</div>

					<div className="flex -space-x-3">
						<img
							src={trip.owner?.avatar}
							alt={trip.owner?.username}
							className="h-9 w-9 rounded-full object-cover ring-2 ring-bg-card"
						/>

						{members.slice(0, 4).map((member) => (
							<img
								key={member.id || member._id}
								src={member.avatar}
								alt={member.username}
								className="h-9 w-9 rounded-full object-cover ring-2 ring-bg-card"
							/>
						))}

						{members.length > 4 && (
							<div className="flex h-9 w-9 items-center justify-center rounded-full bg-text-muted/10 text-xs font-semibold text-text-secondary ring-2 ring-bg-card">
								+{members.length - 4}
							</div>
						)}
					</div>

					<div className="flex items-center gap-2 text-sm text-text-muted">
						<MapPin size={15} />
						{trip.city}, {trip.country}
					</div>
				</div>

				<div className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-bg-card">
					<div className="pointer-events-none select-none space-y-3 p-6 opacity-40 blur-[2px]">
						<div className="h-4 w-2/3 rounded bg-text-muted/30" />
						<div className="h-4 w-1/2 rounded bg-text-muted/30" />
						<div className="h-4 w-3/4 rounded bg-text-muted/30" />
						<div className="h-24 w-full rounded-xl bg-text-muted/20" />
					</div>

					<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-linear-to-t from-bg-card via-bg-card/95 to-transparent p-8 text-center">
						<div className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-secondary">
							{ctaIcon}
						</div>

						<div>
							<h3 className="text-lg font-bold text-text-primary">{ctaTitle}</h3>
							<p className="mt-1 max-w-sm text-sm text-text-secondary">
								El itinerario completo, las tareas y el chat del grupo se desbloquean al unirte.
							</p>
						</div>

						{ctaButton}
					</div>
				</div>
			</div>
		</div>
	);
};