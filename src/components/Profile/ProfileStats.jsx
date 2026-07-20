import { getTotalDays } from "../../utils/tripStats";

const Stat = ({ value, label, divider = false }) => (
	<div className={`text-center ${divider ? "border-x border-border" : ""}`}>
		<div className="text-xl font-semibold text-text-primary">{value}</div>
		<div className="mt-0.5 text-[11px] text-text-muted">{label}</div>
	</div>
);

export const ProfileStats = ({ trips }) => {
	const countriesVisited = new Set(trips.map((trip) => trip.country).filter(Boolean)).size;
	const totalDays = getTotalDays(trips);

	return (
		<div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5">
			<Stat value={trips.length} label="Viajes" />
			<Stat value={countriesVisited} label="Países" divider />
			<Stat value={totalDays} label="Días viajando" />
		</div>
	);
};