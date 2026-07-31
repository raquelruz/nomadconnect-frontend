import { createPortal } from "react-dom";
import { TriangleAlert } from "lucide-react";
import { ModalOverlay } from "./ModalOverlay";

export const ConfirmModal = ({ isOpen, title, message, error, onConfirm, onCancel, loading = false }) => {
	if (!isOpen) return null;

	return createPortal(
		<ModalOverlay>
			<div className="w-full max-w-md rounded-2xl bg-bg-card p-6 shadow-xl">
				<div className="flex flex-col items-center text-center">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-500/10 text-error-500">
						<TriangleAlert size={22} />
					</div>

					<h3 className="mt-4 text-lg font-bold text-text-primary">{title}</h3>

					<p className="mt-2 text-sm text-text-secondary">{message}</p>

					{error && <p className="mt-3 text-sm font-medium text-error-500">{error}</p>}
				</div>

				<div className="mt-6 flex gap-3">
					<button
						onClick={onCancel}
						disabled={loading}
						className="flex-1 rounded-lg bg-text-primary/5 px-4 py-2.5 font-semibold text-text-primary transition hover:bg-text-primary/10 disabled:opacity-50"
					>
						Cancelar
					</button>

					<button
						onClick={onConfirm}
						disabled={loading}
						className="flex-1 rounded-lg bg-error-500 px-4 py-2.5 font-semibold text-white transition hover:bg-error-600 disabled:opacity-50"
					>
						{loading ? "Eliminando..." : "Eliminar"}
					</button>
				</div>
			</div>
		</ModalOverlay>,
		document.body,
	);
};
