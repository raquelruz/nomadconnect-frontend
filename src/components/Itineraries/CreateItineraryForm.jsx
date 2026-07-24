export const CreateItineraryForm = ({ form, loading, onChange, onSubmit, onCancel }) => {
	return (
		<form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
			<div>
				<label className="mb-2 block text-sm font-medium text-text-primary/80">Nombre</label>

				<input
					type="text"
					name="title"
					value={form.title}
					onChange={onChange}
					placeholder="Ej. Roma histórico"
					required
					className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-primary/30 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
				/>
			</div>

			<div>
				<label className="mb-2 block text-sm font-medium text-text-primary/80">Descripción</label>

				<textarea
					name="description"
					value={form.description}
					onChange={onChange}
					rows={5}
					placeholder="Describe qué visitaréis en este itinerario..."
					className="w-full resize-none rounded-xl border border-text-primary/10 bg-transparent px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-primary/30 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
				/>
			</div>

			<div className="flex justify-end gap-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="rounded-xl px-4 py-2.5 text-sm font-semibold text-text-primary/60 transition hover:bg-text-primary/5"
					>
						Cancelar
					</button>
				)}

				<button
					type="submit"
					disabled={loading}
					className="w-full rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 sm:w-auto"
				>
					{loading ? "Creando..." : "Crear itinerario"}
				</button>
			</div>
		</form>
	);
};