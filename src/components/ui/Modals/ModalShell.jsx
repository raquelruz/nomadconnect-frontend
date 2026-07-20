import { X } from "lucide-react";

export const ModalShell = ({ icon: Icon, title, description, onClose, children }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
			<div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
				<div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-blue-50 to-white p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
							<Icon size={20} />
						</div>

						<div>
							<h2 className="text-lg font-bold text-slate-900">{title}</h2>
							<p className="text-sm text-slate-500">{description}</p>
						</div>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
					>
						<X size={18} />
					</button>
				</div>

				<div className="p-6">{children}</div>
			</div>
		</div>
	);
};
