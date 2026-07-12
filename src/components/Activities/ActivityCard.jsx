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
			<div className="border-b border-slate-200 py-5 last:border-b-0">
				<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-1 gap-4">
						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
							<Compass size={20} />
						</div>

						<div className="min-w-0 flex-1">
							<h5 className="text-lg font-semibold text-slate-900">{activity.title}</h5>

							<div className="mt-3 flex flex-wrap gap-2">
								<div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
									<Clock size={14} />
									{activity.time}
								</div>

								{activity.location && (
									<div className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
										<MapPin size={14} className="shrink-0" />
										<span className="truncate">{activity.location}</span>
									</div>
								)}

								{activity.price > 0 && (
									<div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
										<Euro size={14} />
										{activity.price} €
									</div>
								)}
							</div>

							{activity.description && (
								<p className="mt-4 text-sm leading-relaxed text-slate-600">{activity.description}</p>
							)}
						</div>
					</div>

					{isOwner && (
						<div className="flex shrink-0 gap-2 self-end md:self-start">
							<button
								onClick={() => setEditing(!editing)}
								title={editing ? "Cancelar edición" : "Editar actividad"}
								className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
							>
								<Pencil size={18} />
							</button>

							<button
								onClick={() => setShowDeleteModal(true)}
								title="Eliminar actividad"
								className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-white text-red-500 transition hover:border-red-300 hover:bg-red-50"
							>
								<Trash2 size={18} />
							</button>
						</div>
					)}
				</div>
				{isOwner && editing && (
					<form onSubmit={handleUpdate} className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
						<h6 className="mb-5 text-base font-semibold text-slate-800">Editar actividad</h6>

						<div className="space-y-4">
							<div>
								<label className="mb-2 block text-sm font-semibold text-slate-700">Título</label>

								<input
									name="title"
									value={form.title}
									onChange={handleChange}
									className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-semibold text-slate-700">Descripción</label>

								<textarea
									name="description"
									value={form.description}
									onChange={handleChange}
									rows={3}
									className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<div>
									<label className="mb-2 block text-sm font-semibold text-slate-700">Hora</label>

									<input
										type="time"
										name="time"
										value={form.time}
										onChange={handleChange}
										className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-semibold text-slate-700">Ubicación</label>

									<input
										name="location"
										value={form.location}
										onChange={handleChange}
										className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
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
										className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
									/>
								</div>
							</div>

							<div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row">
								<button
									type="submit"
									disabled={loading}
									className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
								>
									{loading ? "Guardando..." : "Guardar cambios"}
								</button>

								<button
									type="button"
									onClick={() => setEditing(false)}
									className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
								>
									Cancelar
								</button>
							</div>
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
