import { useState } from "react";
import { Clock, MapPin, Pencil, Trash2, Euro, Compass } from "lucide-react";
import { ConfirmModal } from "../ui/ConfirmModal";
import { ActivityViewer } from "./ActivityViewer";
import { ActivityCarousel } from "./ActivityCarousel";
import { ActivityActions } from "./ActivityActions";
import { ActivityHeader } from "./ActivityHeader";
import api from "../../api";

export const ActivityCard = ({ activity, refreshTrip, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [viewerOpen, setViewerOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

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

	const openViewer = (index = 0) => {
		setCurrentImage(index);
		setViewerOpen(true);
	};

	return (
		<>
			<div className="border-b border-slate-200 py-5 last:border-b-0">
				<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-1 gap-4">
						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
							<Compass size={20} />
						</div>

						<ActivityHeader activity={activity} onImageClick={openViewer} />
					</div>

					<ActivityActions
						isOwner={isOwner}
						editing={editing}
						onToggleEdit={() => setEditing(!editing)}
						onDelete={() => setShowDeleteModal(true)}
					/>
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

			<ActivityViewer
				isOpen={viewerOpen}
				images={activity.images || []}
				currentImage={currentImage}
				setCurrentImage={setCurrentImage}
				onClose={() => setViewerOpen(false)}
			/>

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
