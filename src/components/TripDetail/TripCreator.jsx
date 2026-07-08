import { FaUserPlus } from "react-icons/fa6";

export const TripCreator = ({ owner }) => {

	if (!owner) return null;

	return (
		<div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">

			<div className="flex items-center gap-3">

				<img
					src={owner.avatar}
					alt={owner.fullName}
					className="w-12 h-12 rounded-full object-cover"
				/>

				<div>
					<p className="font-semibold text-slate-800">
						{owner.fullName}
					</p>

					<p className="text-sm text-slate-400">
						@{owner.username}
					</p>
				</div>

			</div>


			<button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
				<FaUserPlus />
				Seguir
			</button>

		</div>
	);
};