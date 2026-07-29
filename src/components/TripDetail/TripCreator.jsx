import { FaUserPlus } from "react-icons/fa6";

export const TripCreator = ({ owner }) => {
	if (!owner) return null;

	return (
		<div className="mt-6 flex flex-col gap-4 border-t border-text-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex min-w-0 items-center gap-3.5">
				<div className="relative shrink-0">
					<img
						src={owner.avatar}
						alt={owner.username}
						className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-500/20 sm:h-14 sm:w-14"
					/>
					<span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 ring-2 ring-bg-card">
						<FaUserPlus className="text-[8px] text-white" />
					</span>
				</div>

				<div className="min-w-0">
					<p className="text-xs font-bold uppercase tracking-wide text-text-primary/40">Creado por</p>
					<p className="truncate font-semibold text-text-primary">
						{owner.name} {owner.surname}
					</p>
					<p className="truncate text-sm text-text-primary/50">@{owner.username}</p>
				</div>
			</div>

			<button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] sm:w-auto">
				<FaUserPlus size={13} />
				Seguir
			</button>
		</div>
	);
};
