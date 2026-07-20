import { Users } from "lucide-react";

export const MembersInfo = ({ members = [], maxMembers }) => {
	const occupied = members.length;
	const available = Math.max(maxMembers - occupied, 0);
	const isFull = occupied >= maxMembers;

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2 text-slate-700">
				<Users size={18} className="text-blue-600" />

				<span className="font-semibold">
					{occupied} / {maxMembers} plazas
				</span>
			</div>

			<div className="h-2 overflow-hidden rounded-full bg-slate-200">
				<div
					className={`h-full rounded-full transition-all ${isFull ? "bg-red-500" : "bg-blue-600"}`}
					style={{
						width: `${Math.min((occupied / maxMembers) * 100, 100)}%`,
					}}
				/>
			</div>

			<p className={`text-sm font-medium ${isFull ? "text-red-600" : "text-slate-500"}`}>
				{isFull
					? "Viaje completo"
					: `Quedan ${available} ${available === 1 ? "plaza disponible" : "plazas disponibles"}`}
			</p>
		</div>
	);
};
