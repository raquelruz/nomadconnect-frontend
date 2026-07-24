import { createPortal } from "react-dom";
import { ModalOverlay } from "./ModalOverlay";

export const ConfirmModal = ({ isOpen, title, message, error, onConfirm, onCancel, loading = false }) => {
	if (!isOpen) return null;

	return createPortal(
		<ModalOverlay>
			<div className="w-full max-w-md rounded-2xl bg-bg-card p-6 shadow-xl">
				<h3 className="text-xl font-bold text-text-primary">{title}</h3>

				<p className="mt-3 text-text-secondary">{message}</p>

				{error && <p className="mt-3 text-sm font-medium text-red-500">{error}</p>}

				<div className="mt-6 flex justify-end gap-3">
					<button
						onClick={onCancel}
						disabled={loading}
						className="rounded-lg bg-text-primary/5 px-4 py-2 font-semibold text-text-primary transition hover:bg-text-primary/10"
					>
						Cancelar
					</button>

					<button
						onClick={onConfirm}
						disabled={loading}
						className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
					>
						{loading ? "Eliminando..." : "Eliminar"}
					</button>
				</div>
			</div>
		</ModalOverlay>,
		document.body,
	);
};