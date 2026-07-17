import { MapPin, Euro, Users } from "lucide-react";

export const ActivityInfo = ({ location, price, maxParticipants }) => {
	return (
		<div className="space-y-2 text-sm text-gray-600">
			{location && (
				<div className="flex gap-2 items-center">
					<MapPin size={16} />
					<span>{location}</span>
				</div>
			)}

			<div className="flex gap-2 items-center">
				<Euro size={16} />

				<span>{price || 0} €</span>
			</div>

			{maxParticipants > 0 && (
				<div className="flex gap-2 items-center">
					<Users size={16} />

					<span>{maxParticipants} personas</span>
				</div>
			)}
		</div>
	);
};
