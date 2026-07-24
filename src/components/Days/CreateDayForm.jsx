export const CreateDayForm = ({ form, loading, onChange, onSubmit, onCancel }) => {
	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div>
				<label className="mb-2 block text-sm font-medium text-text-primary/80">Título</label>

				<input
					type="text"
					name="title"
					value={form.title}
					onChange={onChange}
					placeholder="Ej. Llegada y check-in"
					className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-primary/30 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
				/>
			</div>

			<div>
				<label className="mb-2 block text-sm font-medium text-text-primary/80">Fecha</label>

				<input
					type="date"
					name="date"
					value={form.date}
					onChange={onChange}
					required
					className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
				/>
			</div>

			<div className="flex justify-end gap-2 pt-2">
				<button
					type="button"
					onClick={onCancel}
					className="rounded-xl px-4 py-2.5 text-sm font-semibold text-text-primary/70 transition hover:bg-text-primary/5"
				>
					Cancelar
				</button>

				<button
					type="submit"
					disabled={loading}
					className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? "Creando..." : "Crear día"}
				</button>
			</div>
		</form>
	);
};