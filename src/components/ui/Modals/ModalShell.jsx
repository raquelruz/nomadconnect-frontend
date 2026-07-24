import { X } from "lucide-react";

export const ModalShell = ({ icon: Icon, title, description, onClose, children }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-card/60 p-4">
			<div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-bg-card">
				<div className="flex items-center justify-between border-b border-border bg-bg-card p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-text-primary">
							<Icon size={20} />
						</div>

						<div>
							<h2 className="text-lg font-bold text-text-primary/90">{title}</h2>
							<p className="text-sm text-text-primary/70">{description}</p>
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
