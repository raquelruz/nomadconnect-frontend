import { createPortal } from "react-dom";

export const ConfirmModal = ({ isOpen, title, message, error, onConfirm, onCancel, loading = false }) => {
	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
				<h3 className="text-xl font-bold text-slate-900">{title}</h3>

				<p className="mt-3 text-slate-500">{message}</p>

				{error && (
					<p className="mt-3 text-sm font-medium text-red-500">{error}</p>
				)}

				<div className="mt-6 flex justify-end gap-3">
					<button
						onClick={onCancel}
						disabled={loading}
						className="rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-300"
					>
						Cancelar
					</button>

					<button
						onClick={onConfirm}
						disabled={loading}
						className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 disabled:opacity-50"
					>
						{loading ? "Eliminando..." : "Eliminar"}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};
