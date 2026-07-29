import { useState } from "react";
import api from "../../api";

const emptyForm = {
	title: "",
	country: "",
	city: "",
	startDate: "",
	endDate: "",
	description: "",
	visibility: "public",
};

export const CreateTripForm = ({ onSuccess }) => {
	const [form, setForm] = useState(emptyForm);
	const [imageFile, setImageFile] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const create = async (event) => {
		event.preventDefault();
		setSubmitting(true);

		try {
			const data = new FormData();
			Object.entries(form).forEach(([key, value]) => data.append(key, value));

			if (imageFile) {
				data.append("image", imageFile);
			}

			await api.post("/trips", data);

			setForm(emptyForm);
			setImageFile(null);

			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			alert("Error al crear el viaje");
		} finally {
			setSubmitting(false);
		}
	};

	const inputClass =
		"rounded-xl border border-border bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10";

	return (
		<form onSubmit={create} className="grid gap-4 rounded-2xl border border-border bg-bg-card p-6 shadow-sm md:grid-cols-2">
			<input
				type="text"
				value={form.title}
				onChange={(event) => setForm({ ...form, title: event.target.value })}
				placeholder="Título del viaje *"
				className={inputClass}
				required
				minLength="3"
			/>

			<input
				type="text"
				value={form.country}
				onChange={(event) => setForm({ ...form, country: event.target.value })}
				placeholder="País *"
				className={inputClass}
				required
			/>

			<input
				type="text"
				value={form.city}
				onChange={(event) => setForm({ ...form, city: event.target.value })}
				placeholder="Ciudad *"
				className={inputClass}
				required
			/>

			<input
				type="date"
				value={form.startDate}
				onChange={(event) => setForm({ ...form, startDate: event.target.value })}
				className={inputClass}
				required
			/>

			<input
				type="date"
				value={form.endDate}
				onChange={(event) => setForm({ ...form, endDate: event.target.value })}
				className={inputClass}
				required
			/>

			<select
				value={form.visibility}
				onChange={(event) => setForm({ ...form, visibility: event.target.value })}
				className={inputClass}
			>
				<option value="public">Público</option>
				<option value="private">Privado</option>
			</select>

			<textarea
				value={form.description}
				onChange={(event) => setForm({ ...form, description: event.target.value })}
				placeholder="Descripción"
				rows="3"
				className={`${inputClass} resize-none md:col-span-2`}
			/>

			<label className="text-sm text-text-secondary md:col-span-2">
				Imagen (opcional)
				<input
					type="file"
					accept="image/*"
					onChange={(event) => setImageFile(event.target.files[0] || null)}
					className="mt-1 block w-full text-sm text-text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-primary-500/10 file:px-3 file:py-1.5 file:text-primary-600 hover:file:bg-primary-500/20"
				/>
			</label>

			<div className="flex justify-center md:col-span-2">
				<button
					type="submit"
					disabled={submitting}
					className="rounded-xl bg-primary-600 px-12 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{submitting ? "Creando viaje..." : "Crear viaje"}
				</button>
			</div>
		</form>
	);
};