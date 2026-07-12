import { useState } from "react";
import { Calendar, CalendarPlus2, X } from "lucide-react";
import api from "../../api";

export const CreateDayForm = ({ itineraryId, onCreated, onCancel }) => {
	const emptyDayForm = {
		itineraryId,
		date: "",
	};

	const [form, setForm] = useState(emptyDayForm);
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

			const response = await api.post(`/days/${itineraryId}`, {
				date: form.date,
			});

			onCreated?.(response.data);

			setForm(emptyDayForm);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="border-b border-slate-100 bg-linear-to-r from-blue-50 to-white p-4 sm:px-6 sm:py-5">
				<div className="flex items-start justify-between gap-4">
					<div className="flex min-w-0 items-start gap-3">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white sm:h-11 sm:w-11">
							<CalendarPlus2 size={20} />
						</div>

						<div className="min-w-0">
							<h4 className="text-base font-bold text-slate-900 sm:text-lg">Nuevo día</h4>

							<p className="mt-1 text-sm text-slate-500">Añade un nuevo día al itinerario.</p>
						</div>
					</div>

					<button
						type="button"
						onClick={onCancel}
						title="Cerrar"
						className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
					>
						<X size={18} />
					</button>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5 p-6">
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

				<div className="flex justify-end border-t border-slate-100 pt-5">
					<button
						type="submit"
						disabled={loading}
						className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading ? "Creando..." : "Crear día"}
					</button>
				</div>
			</form>
		</div>
	);
};
