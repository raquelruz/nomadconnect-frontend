import { MapPin } from "lucide-react";

export const SidebarFooter = () => {
	return (
		<div className="flex items-center justify-center gap-1.5 border-t border-text-primary/10 pt-4 text-xs text-text-primary/40">
			<MapPin size={12} />
			NomadConnect Planner
		</div>
	);
};