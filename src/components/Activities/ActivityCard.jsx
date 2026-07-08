import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import api from "../../api";

export const ActivityCard = ({ activity, refreshTrip, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		title: activity.title,
		description: activity.description,
		time: activity.time,
		location: activity.location,
		price: activity.price,
	});

	const handleChange = ({ target }) => {
		setForm((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const handleUpdate = async (event) => {
		event.preventDefault();

		try {
			setLoading(true);

			await api.put(`/activities/${activity.id}`, form);

			setEditing(false);
			refreshTrip();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		try {
			await api.delete(`/activities/${activity.id}`);

			refreshTrip();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5">
			<div className="flex justify-between gap-4">
				<div>
					<h5 className="text-lg font-bold text-slate-900">{activity.title}</h5>

					{activity.description && <p className="mt-2 text-sm text-slate-500">{activity.description}</p>}
				</div>

				{activity.price > 0 && <span className="font-semibold text-blue-600">{activity.price}€</span>}
			</div>

			<div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-500">
				<div className="flex items-center gap-2">
					<Clock size={16} />
					{activity.time}
				</div>

				{activity.location && (
					<div className="flex items-center gap-2">
						<MapPin size={16} />
						{activity.location}
					</div>
				)}
			</div>

			{isOwner && (
				<div className="mt-5 flex gap-3">
					<button
						onClick={() => setEditing(!editing)}
						className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold"
					>
						Editar
					</button>

					<button
						onClick={handleDelete}
						className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white"
					>
						Eliminar
					</button>
				</div>
			)}

			{isOwner && editing && (
				<form onSubmit={handleUpdate} className="mt-5 space-y-3 border-t pt-5">
					<input
						name="title"
						value={form.title}
						onChange={handleChange}
						className="w-full rounded-lg border px-3 py-2"
					/>

					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						className="w-full rounded-lg border px-3 py-2"
					/>

					<input
						name="time"
						type="time"
						value={form.time}
						onChange={handleChange}
						className="w-full rounded-lg border px-3 py-2"
					/>

					<input
						name="location"
						value={form.location}
						onChange={handleChange}
						className="w-full rounded-lg border px-3 py-2"
					/>

					<input
						name="price"
						type="number"
						value={form.price}
						onChange={handleChange}
						className="w-full rounded-lg border px-3 py-2"
					/>

					<button disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white">
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</form>
			)}
		</div>
	);
};
