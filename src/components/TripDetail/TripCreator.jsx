import { FaUserPlus } from "react-icons/fa6";

export const TripCreator = ({ owner }) => {
	if (!owner) return null;

	return (
		<div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex min-w-0 items-center gap-3">
				<img
					src={owner.avatar}
					alt={owner.username} 
					className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
				/>

				<div className="min-w-0">
					<p className="text-xs text-text-tertiary/60 font-bold uppercase">Creado por</p>
					<p className="truncate font-semibold text-slate-800">{owner.name} {owner.surname}</p>

					<p className="truncate text-sm text-slate-400">@{owner.username}</p>
				</div>
			</div>

			<button className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto">
				<FaUserPlus />
				Seguir
			</button>
		</div>
	);
};
