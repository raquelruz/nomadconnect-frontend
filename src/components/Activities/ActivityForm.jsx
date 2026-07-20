import { Clock, MapPin, Euro, FileText, Compass, ImagePlus, X } from "lucide-react";

const FieldLabel = ({ icon: Icon, children }) => (
	<label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
		<Icon size={14} className="text-blue-500" />
		{children}
	</label>
);

export const ActivityForm = ({
	form,
	onChange,
	onSubmit,
	onCancel,
	loading,
	submitText,
	showImages = false,
	previews = [],
	onImagesChange,
	onRemoveImage,
}) => {
	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="space-y-5 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
				<div>
					<FieldLabel icon={Compass}>Título</FieldLabel>

					<input
						type="text"
						name="title"
						value={form.title}
						onChange={onChange}
						required
						placeholder="Ej. Visita al Coliseo"
						className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
					/>
				</div>

				<div>
					<FieldLabel icon={FileText}>Descripción</FieldLabel>

					<textarea
						name="description"
						value={form.description}
						onChange={onChange}
						rows={3}
						placeholder="Describe la actividad..."
						className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div>
					<FieldLabel icon={Clock}>Hora</FieldLabel>

					<input
						type="time"
						name="time"
						value={form.time}
						onChange={onChange}
						required
						className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
					/>
				</div>

				<div>
					<FieldLabel icon={MapPin}>Ubicación</FieldLabel>

					<input
						type="text"
						name="location"
						value={form.location}
						onChange={onChange}
						placeholder="Ej. Plaza Mayor"
						className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
					/>
				</div>

				<div>
					<FieldLabel icon={Euro}>Precio</FieldLabel>

					<div className="relative">
						<input
							type="number"
							name="price"
							value={form.price}
							onChange={onChange}
							placeholder="0"
							className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-9 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
						/>

						<span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
							€
						</span>
					</div>
				</div>
			</div>

			{showImages && (
				<div>
					<FieldLabel icon={ImagePlus}>Imágenes</FieldLabel>

					<label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
						<ImagePlus size={22} className="mb-2 text-slate-400" />

						<span className="text-sm font-medium text-slate-600">Haz clic para subir imágenes</span>

						<span className="mt-0.5 text-xs text-slate-400">PNG, JPG hasta 10MB</span>

						<input type="file" multiple accept="image/*" onChange={onImagesChange} className="hidden" />
					</label>

					{previews.length > 0 && (
						<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
							{previews.map((preview, index) => (
								<div
									key={preview}
									className="group relative overflow-hidden rounded-xl border border-slate-200"
								>
									<img src={preview} alt="Preview" className="h-24 w-full object-cover" />

									{onRemoveImage && (
										<button
											type="button"
											onClick={() => onRemoveImage(index)}
											className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
										>
											<X size={13} />
										</button>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			)}

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
					className="rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? "Guardando..." : submitText}
				</button>
			</div>
		</form>
	);
};
