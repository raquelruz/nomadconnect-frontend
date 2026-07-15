import { Calendar, Clock, MapPin, Euro, FileText, Compass, Image } from "lucide-react";

export const ActivityForm = ({
	form,
	onChange,
	onSubmit,
	onCancel,
	loading,
	submitText,
	showDate = false,
	showImages = false,
	previews = [],
	onImagesChange,
}) => {
	return (
		<form onSubmit={onSubmit} className="space-y-5">
			<div>
				<label className="mb-2 block text-sm font-semibold text-slate-700">Título</label>

				<div className="relative">
					<Compass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

					<input
						type="text"
						name="title"
						value={form.title}
						onChange={onChange}
						required
						placeholder="Ej. Visita al Coliseo"
						className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
					/>
				</div>
			</div>

			<div>
				<label className="mb-2 block text-sm font-semibold text-slate-700">Descripción</label>

				<div className="relative">
					<FileText size={18} className="absolute left-3 top-4 text-slate-400" />

					<textarea
						name="description"
						value={form.description}
						onChange={onChange}
						rows={3}
						placeholder="Describe la actividad..."
						className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
					/>
				</div>
			</div>

			{showImages && (
				<div>
					<label className="mb-2 block text-sm font-semibold text-slate-700">Imágenes</label>

					<div className="relative">
						<Image size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

						<input
							type="file"
							multiple
							accept="image/*"
							onChange={onImagesChange}
							className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:font-semibold file:text-blue-600 focus:border-blue-500"
						/>
					</div>

					{previews.length > 0 && (
						<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
							{previews.map((preview) => (
								<div key={preview} className="overflow-hidden rounded-xl border border-slate-200">
									<img src={preview} alt="Preview" className="h-24 w-full object-cover" />
								</div>
							))}
						</div>
					)}
				</div>
			)}

			<div className={`grid grid-cols-1 gap-4 ${showDate ? "sm:grid-cols-2" : ""}`}>
				{showDate && (
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700">Fecha</label>

						<div className="relative">
							<Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

							<input
								type="date"
								name="date"
								value={form.date}
								onChange={onChange}
								required
								className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
							/>
						</div>
					</div>
				)}

				<div>
					<label className="mb-2 block text-sm font-semibold text-slate-700">Hora</label>

					<div className="relative">
						<Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

						<input
							type="time"
							name="time"
							value={form.time}
							onChange={onChange}
							required
							className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
						/>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label className="mb-2 block text-sm font-semibold text-slate-700">Ubicación</label>

					<div className="relative">
						<MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

						<input
							type="text"
							name="location"
							value={form.location}
							onChange={onChange}
							placeholder="Ej. Plaza Mayor"
							className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
						/>
					</div>
				</div>

				<div>
					<label className="mb-2 block text-sm font-semibold text-slate-700">Precio (€)</label>

					<div className="relative">
						<Euro size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

						<input
							type="number"
							name="price"
							value={form.price}
							onChange={onChange}
							placeholder="0"
							className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
				<button
					type="button"
					onClick={onCancel}
					className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
				>
					Cancelar
				</button>

				<button
					type="submit"
					disabled={loading}
					className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? "Guardando..." : submitText}
				</button>
			</div>
		</form>
	);
};
