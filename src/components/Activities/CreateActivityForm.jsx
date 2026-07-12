import { useState } from "react";
import { Calendar, Clock, MapPin, Euro, FileText, Compass, X } from "lucide-react";
import api from "../../api";

export const CreateActivityForm = ({ dayId, onCreated, onCancel }) => {
	const emptyForm = {
		title: "",
		description: "",
		date: "",
		time: "",
		location: "",
		price: "",
	};

	const [form, setForm] = useState(emptyForm);
	const [loading, setLoading] = useState(false);

	const handleChange = ({ target }) => {
		setForm((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading(true);

			const response = await api.post(`/activities/${dayId}`, {
				...form,
				price: Number(form.price),
			});

			onCreated?.(response.data);

			setForm(emptyForm);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
			<div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-blue-50 to-white p-4 sm:px-6 sm:py-5">
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
						<Compass size={20} />
					</div>

					<div>
						<h4 className="text-base font-bold text-slate-900 sm:text-lg">Nueva actividad</h4>

						<p className="text-sm text-slate-500">Añade una actividad al día.</p>
					</div>
				</div>

				<button
					type="button"
					onClick={onCancel}
					className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
				>
					<X size={18} />
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
				<div>
					<label className="mb-2 block text-sm font-semibold text-slate-700">Título</label>

					<div className="relative">
						<Compass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

						<input
							type="text"
							name="title"
							value={form.title}
							onChange={handleChange}
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
							onChange={handleChange}
							rows={3}
							placeholder="Describe la actividad..."
							className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700">Fecha</label>

						<div className="relative">
							<Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

							<input
								type="date"
								name="date"
								value={form.date}
								onChange={handleChange}
								required
								className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
							/>
						</div>
					</div>

					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700">Hora</label>

						<div className="relative">
							<Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

							<input
								type="time"
								name="time"
								value={form.time}
								onChange={handleChange}
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
								onChange={handleChange}
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
								onChange={handleChange}
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
						{loading ? "Creando..." : "Crear actividad"}
					</button>
				</div>
			</form>
		</div>
	);
};
