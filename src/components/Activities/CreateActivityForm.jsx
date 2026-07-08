import { useState } from "react";
import api from "../../api";

export const CreateActivityForm = ({ dayId, onCreated }) => {
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

	let buttonText = "Crear actividad";

	if (loading) {
		buttonText = "Creando...";
	}

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
		<div className="rounded-2xl border border-slate-200 bg-white p-6">
			<h4 className="mb-5 text-lg font-bold text-slate-900">
				✨ Nueva actividad
			</h4>

			<form onSubmit={handleSubmit} className="space-y-4">

				<input
					type="text"
					name="title"
					value={form.title}
					onChange={handleChange}
					placeholder="Nombre de la actividad"
					required
					className="w-full rounded-xl border border-slate-300 px-4 py-3"
				/>

				<textarea
					name="description"
					value={form.description}
					onChange={handleChange}
					placeholder="Descripción"
					rows={3}
					className="w-full rounded-xl border border-slate-300 px-4 py-3"
				/>

				<div className="grid grid-cols-2 gap-4">

					<input
						type="date"
						name="date"
						value={form.date}
						onChange={handleChange}
						required
						className="rounded-xl border border-slate-300 px-4 py-3"
					/>

					<input
						type="time"
						name="time"
						value={form.time}
						onChange={handleChange}
						required
						className="rounded-xl border border-slate-300 px-4 py-3"
					/>

				</div>

				<input
					type="text"
					name="location"
					value={form.location}
					onChange={handleChange}
					placeholder="Ubicación"
					className="w-full rounded-xl border border-slate-300 px-4 py-3"
				/>

				<input
					type="number"
					name="price"
					value={form.price}
					onChange={handleChange}
					placeholder="Precio"
					className="w-full rounded-xl border border-slate-300 px-4 py-3"
				/>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
					>
						{buttonText}
					</button>
				</div>

			</form>
		</div>
	);
};