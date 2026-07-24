import { Compass, Plus } from "lucide-react";

export const SidebarHeader = ({ isOwner, onAddItinerary }) => {
	return (
		<div className="flex items-center justify-between gap-3 pb-4">
			<div className="flex items-center gap-2.5">
				<h2 className="text-base font-bold text-text-primary">Itinerarios</h2>
			</div>

			{isOwner && (
				<button
					onClick={onAddItinerary}
					title="Nuevo itinerario"
					className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-600"
				>
					<Plus size={16} />
				</button>
			)}
		</div>
	);
};