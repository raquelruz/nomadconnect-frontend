export const CreateItineraryForm = ({ form, loading, onChange, onSubmit, onCancel }) => {
	return (
		<form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
			<div>
				<label className="mb-2 block text-sm font-semibold text-slate-700">Nombre</label>

				<input
					type="text"
					name="title"
					value={form.title}
					onChange={onChange}
					placeholder="Ej. Roma histórico"
					required
					className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
				/>
			</div>

			<div>
				<label className="mb-2 block text-sm font-semibold text-slate-700">Descripción</label>

				<textarea
					name="description"
					value={form.description}
					onChange={onChange}
					rows={5}
					placeholder="Describe qué visitaréis en este itinerario..."
					className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
				/>
			</div>

			<div className="flex justify-end">
				<button
					type="submit"
					disabled={loading}
					className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
				>
					{loading ? "Creando..." : "Crear itinerario"}
				</button>
			</div>
		</form>
	);
};
