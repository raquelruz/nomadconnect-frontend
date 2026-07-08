import { useState } from "react";
import api from "../../api";

export const CreateDayForm = ({ itineraryId, onCreated }) => {
	const emptyDayForm = {
		itineraryId,
		date: "",
	};

	const [form, setForm] = useState(emptyDayForm);
	const [loading, setLoading] = useState(false);

	let buttonText = "Crear día";

	if (loading) {
		buttonText = "Creando...";
	}

	const handleChange = ({ target }) => {
		setForm((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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
		<div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
			<div className="mb-6">
				<h4 className="text-lg font-bold text-slate-900">
					📅 Nuevo día
				</h4>

				<p className="mt-1 text-sm text-slate-500">
					Añade un nuevo día al itinerario.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
					<label className="mb-2 block text-sm font-semibold text-slate-700">
						Fecha
					</label>

					<input
						type="date"
						name="date"
						value={form.date}
						onChange={handleChange}
						required
						className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
					/>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
					>
						{buttonText}
					</button>
				</div>
			</form>
		</div>
	);
};