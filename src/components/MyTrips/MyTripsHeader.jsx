import { Luggage, MapPin, Calendar } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { getTravelerTier } from "../../utils/travelerTier";

const StatChip = ({ icon: Icon, value, label }) => (
	<div className="flex items-center gap-3 rounded-xl bg-primary-500/10 px-4 py-3">
		<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-card text-primary-500">
			<Icon size={16} />
		</div>
		<div>
			<p className="text-lg font-bold leading-none text-text-primary">{value}</p>
			<p className="mt-1 text-[11px] text-text-muted">{label}</p>
		</div>
	</div>
);

export const MyTripsHeader = ({ user, tripCount, destinationCount, totalDays, loading }) => {
	const displayName = user?.name ? `${user.name} ${user.surname || ""}`.trim() : "Viajero/a";

	return (
		<div className="rounded-2xl border border-border bg-bg-card p-6 shadow-sm sm:p-8">
			<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
				<div className="flex shrink-0 items-center gap-4">
					<UserAvatar user={user} size="lg" />

					<div>
						<span className="inline-block rounded-full text-[10px] font-semibold uppercase tracking-widest text-primary-500">
							{loading ? "…" : getTravelerTier(tripCount)}
						</span>
						<h2 className="font-title whitespace-nowrap text-xl font-bold leading-tight text-text-primary sm:text-2xl">
							{loading ? "Cargando…" : displayName}
						</h2>
					</div>
				</div>

				<div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap">
					<StatChip icon={Luggage} value={loading ? "—" : tripCount} label="Viajes" />
					<StatChip icon={MapPin} value={loading ? "—" : destinationCount} label="Destinos" />
					<StatChip icon={Calendar} value={loading ? "—" : totalDays} label="Días de viaje" />
				</div>
			</div>
		</div>
	);
};