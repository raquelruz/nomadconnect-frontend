export const FormActions = ({ onCancel, cancelLabel = "Cancelar", submitLabel, loading, loadingLabel, fullWidthSubmit = false }) => {
	return (
		<div className="flex justify-end gap-2 pt-2">
			{onCancel && (
				<button
					type="button"
					onClick={onCancel}
					className="rounded-xl px-4 py-2.5 text-sm font-semibold text-text-primary/70 transition hover:bg-text-primary/5"
				>
					{cancelLabel}
				</button>
			)}

			<button
				type="submit"
				disabled={loading}
				className={`rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${fullWidthSubmit ? "w-full sm:w-auto" : ""}`}
			>
				{loading ? loadingLabel : submitLabel}
			</button>
		</div>
	);
};