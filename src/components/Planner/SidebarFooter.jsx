import { MapPin } from "lucide-react";

export const SidebarFooter = () => {
	return (
		<div className="flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-xs text-slate-400">
			<MapPin size={12} />
			NomadConnect Planner
		</div>
	);
};