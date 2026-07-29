import { getTravelerTier } from "../../utils/travelerTier";

export const TravelerBadge = ({ tripsCount }) => {
	return (
		<span className="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-semibold text-primary-500">
			{getTravelerTier(tripsCount)}
		</span>
	);
};