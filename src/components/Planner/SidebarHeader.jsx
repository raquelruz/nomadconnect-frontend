export const SidebarHeader = ({ isOwner, onAddItinerary }) => {
	return (
		<div className="border-b border-slate-200 pb-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold text-slate-800">Planner</h2>

				{isOwner && (
<button
	onClick={() => {
		if (onAddItinerary) {
			onAddItinerary();
		}
	}}
>
	+
</button>
				)}
			</div>
		</div>
	);
};
