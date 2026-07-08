import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosAirplane } from "react-icons/io";
import { X } from "lucide-react";
import api from "../../api";

export const CreateItineraryForm = ({ onCreated, onCancel }) => {
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
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
			<div className="mb-8 flex items-start justify-between">
				<div>
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600">
							<IoIosAirplane />
						</div>

						<div>
							<h3 className="text-2xl font-bold text-slate-900">
								Nuevo itinerario
							</h3>

							<p className="mt-1 text-sm text-slate-500">
								Crea un itinerario para organizar los días del viaje.
							</p>
						</div>
					</div>
				</div>

				<button
					type="button"
					onClick={onCancel}
					title="Cerrar"
					className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
				>
					<X size={18} />
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="mb-2 block text-sm font-semibold text-slate-700">
						Nombre
					</label>

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
					<label className="mb-2 block text-sm font-semibold text-slate-700">
						Descripción
					</label>

					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						rows={5}
						placeholder="Describe qué visitaréis en este itinerario..."
						className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
					/>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading ? "Creando..." : "Crear itinerario"}
					</button>
				</div>
			</form>
		</div>
	);
};