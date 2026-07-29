import { X } from "lucide-react";

export const ModalShell = ({ icon: Icon, title, description, onClose, children }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
			<div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-bg-card shadow-xl">
				<div className="flex items-center justify-between border-b border-text-primary/10 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm shadow-primary-600/30">
							<Icon size={20} />
						</div>

						<div>
							<h2 className="text-lg font-bold text-text-primary">{title}</h2>
							<p className="text-sm text-text-primary/60">{description}</p>
						</div>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="flex h-9 w-9 items-center justify-center rounded-full text-text-primary/50 transition hover:bg-text-primary/5 hover:text-text-primary"
					>
						<X size={18} />
					</button>
				</div>

				<div className="p-6">{children}</div>
			</div>
		</div>
	);
};