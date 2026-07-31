import { Compass } from "lucide-react";

export const TripThumbnailProfile = ({ trip }) => {
	if (trip.image) {
		return (
			<div className="relative h-28 w-full overflow-hidden bg-bg-tertiary">
				<img
					src={trip.image}
					alt={trip.title}
					className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
			</div>
		);
	}

	let fallbackContent = <Compass size={28} className="text-white/90" />;

	if (trip.title) {
		fallbackContent = (
			<span className="text-3xl font-bold text-white drop-shadow-sm">
				{trip.title[0].toUpperCase()}
			</span>
		);
	}

	return (
		<div className="relative h-28 w-full overflow-hidden bg-linear-to-br from-primary-400 via-primary-500 to-primary-700 flex items-center justify-center">
			<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_25%_25%,white,transparent_40%)]" />
			{fallbackContent}
		</div>
	);
};