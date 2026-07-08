import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export const CreateItineraryForm = ({ onCreated }) => {
	const { id } = useParams();

	const emptyItineraryForm = {
		tripId: id,
		title: "",
		description: "",
	};

	const [form, setForm] = useState(emptyItineraryForm);
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

			const response = await api.post(`/itineraries/${id}`, {
				title: form.title,
				description: form.description,
			});

			onCreated?.(response.data);

			setForm(emptyItineraryForm);
		} catch (error) {
			console.error(error || "Error al crear el formulario");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-8">
			<div className="mb-8">
				<h3 className="text-2xl font-bold text-slate-900">✈️ Nuevo itinerario</h3>

				<p className="text-slate-500 mt-2">Crea un itinerario para organizar los días del viaje.</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>

					<input
						type="text"
						name="title"
						value={form.title}
						onChange={handleChange}
						placeholder="Ej. Roma histórico"
						required
						className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
					/>
				</div>

				<div>
					<label className="block text-sm font-semibold text-slate-700 mb-2">Descripción</label>

					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						rows={5}
						placeholder="Describe qué visitaréis en este itinerario..."
						className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
					/>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
					>
						{loading ? "Creando..." : "Crear itinerario"}
					</button>
				</div>
			</form>
		</div>
	);
};
