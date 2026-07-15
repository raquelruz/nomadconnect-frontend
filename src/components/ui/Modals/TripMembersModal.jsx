import { X, Users } from "lucide-react";
import { MembersList } from "../../Members/MembersList";

export const TripMembersModal = ({ isOpen, onClose, owner, members = [] }) => {
	if (!isOpen) return null;

	const totalMembers = members.length + 1;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
			<div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
				<div className="flex items-center justify-between border-b border-slate-100 p-5">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
							<Users size={20} />
						</div>

						<div>
							<h3 className="font-bold text-slate-900">Participantes</h3>

							<p className="text-sm text-slate-500">{totalMembers} personas</p>
						</div>
					</div>

					<button
						onClick={onClose}
						className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
					>
						<X size={18} />
					</button>
				</div>

				<div className="max-h-[70vh] overflow-y-auto p-5">
					<MembersList owner={owner} members={members} />
				</div>
			</div>
		</div>
	);
};
