import { Bell } from "lucide-react";

export const EmptyNotifications = () => {
	return (
		<div className="flex flex-col items-center justify-center py-12 px-6 text-center">
			<div className="w-14 h-14 rounded-full bg-bg-secondary flex items-center justify-center mb-4">
				<Bell size={26} className="text-text-muted" />
			</div>

			<h4 className="font-semibold text-text-primary">No tienes notificaciones</h4>

			<p className="mt-2 text-sm text-text-muted max-w-xs">Cuando alguien interactúe contigo aparecerán aquí.</p>
		</div>
	);
};
