import { useState } from "react";
import { Clock, MapPin, Pencil, Trash2, Euro, Compass } from "lucide-react";
import { ConfirmModal } from "../ui/ConfirmModal";
import api from "../../api";

export const ActivityCard = ({ activity, refreshTrip, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

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
		<>
			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
				<div className="flex items-start justify-between border-b border-slate-100 bg-linear-to-r from-slate-50 to-white px-5 py-4">
					<div className="flex gap-4">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
							<Compass size={20} />
						</div>

						<div>
							<h5 className="text-lg font-bold text-slate-900">{activity.title}</h5>

							{activity.description && (
								<p className="mt-1 text-sm leading-relaxed text-slate-500">{activity.description}</p>
							)}
						</div>
					</div>

					{isOwner && (
						<div className="flex gap-2">
							<button
								onClick={() => setEditing(!editing)}
								title="Editar actividad"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-500 text-primary-600 transition hover:bg-blue-50"
							>
								<Pencil size={18} />
							</button>

							<button
								onClick={() => setShowDeleteModal(true)}
								title="Eliminar actividad"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-error-500 text-error-500 transition hover:bg-red-50"
							>
								<Trash2 size={18} />
							</button>
						</div>
					)}
				</div>

				<div className="flex flex-wrap gap-3 px-5 py-4">
					<div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
						<Clock size={15} />
						{activity.time}
					</div>

					{activity.location && (
						<div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
							<MapPin size={15} />
							{activity.location}
						</div>
					)}

					{activity.price > 0 && (
						<div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
							<Euro size={15} />
							{activity.price}
						</div>
					)}
				</div>

				{isOwner && editing && (
					<form onSubmit={handleUpdate} className="border-t border-slate-100 bg-slate-50 p-5">
						<div className="space-y-4">
							<div>
								<label className="mb-2 block text-sm font-semibold text-slate-700">Título</label>

								<input
									name="title"
									value={form.title}
									onChange={handleChange}
									className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-semibold text-slate-700">Descripción</label>

								<textarea
									name="description"
									value={form.description}
									onChange={handleChange}
									rows={3}
									className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
								/>
							</div>

							<div className="grid gap-4 md:grid-cols-3">
								<div>
									<label className="mb-2 block text-sm font-semibold text-slate-700">Hora</label>

									<input
										type="time"
										name="time"
										value={form.time}
										onChange={handleChange}
										className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-semibold text-slate-700">Ubicación</label>

									<input
										name="location"
										value={form.location}
										onChange={handleChange}
										className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-semibold text-slate-700">
										Precio (€)
									</label>

									<input
										type="number"
										name="price"
										value={form.price}
										onChange={handleChange}
										className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
									/>
								</div>
							</div>

							<button
								disabled={loading}
								className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
							>
								{loading ? "Guardando..." : "Guardar cambios"}
							</button>
						</div>
					</form>
				)}
			</div>

			<ConfirmModal
				isOpen={showDeleteModal}
				title="Eliminar actividad"
				message="¿Seguro que quieres eliminar esta actividad? Esta acción no se puede deshacer."
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={async () => {
					await handleDelete();
					setShowDeleteModal(false);
				}}
			/>
		</>
	);
};
