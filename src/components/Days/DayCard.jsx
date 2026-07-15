import { useState } from "react";
import { CreateActivityModal } from "../Modals/CreateActivityModal";
import { ActivityCard } from "../Activities/ActivityCard";
import { FaCalendarAlt } from "react-icons/fa";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ConfirmModal } from "../ui/ConfirmModal";
import api from "../../api";

export const DayCard = ({ day, refreshTrip, isOwner }) => {
	const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [form, setForm] = useState({
		date: day.date?.slice(0, 10),
	});

	const hasActivities = day.activities?.length > 0;

	const formattedDate = new Date(day.date).toLocaleDateString("es-ES", {
		weekday: "long",
		day: "numeric",
		month: "long",
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

			await api.put(`/days/${day.id}`, form);

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
			await api.delete(`/days/${day.id}`);
			refreshTrip();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="overflow-hidden rounded-2xl border-b border-slate-200 pb-6 last:border-b-0">
			<div className="flex flex-col gap-5 rounded-2xl bg-blue-50/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
				{" "}
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-blue-600 text-white">
						<span className="text-xl font-bold">{new Date(day.date).getDate()}</span>
					</div>

					<div className="min-w-0">
						<h4 className="wrap-break-word text-base font-bold capitalize text-slate-900 sm:text-lg">
							{formattedDate}
						</h4>

						<div className="mt-1 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
							{day.activities?.length || 0} actividades
						</div>
					</div>
				</div>

				{isOwner && (
					<div className="flex w-full items-center gap-2 sm:w-auto">
						<button
							onClick={() => setShowCreateActivityModal(true)}
							className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 sm:w-auto"
						>
							<Plus size={18} />
							Añadir actividad
						</button>

						<button
							onClick={() => setEditing(!editing)}
							title={editing ? "Cancelar edición" : "Editar día"}
							className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
						>
							<Pencil size={18} />
						</button>

						<button
							onClick={() => setShowDeleteModal(true)}
							title="Eliminar día"
							className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-white text-red-500 transition hover:bg-red-50"
						>
							<Trash2 size={18} />
						</button>
					</div>
				)}
			</div>

			{isOwner && editing && (
				<form onSubmit={handleUpdate} className="border-b border-slate-100 bg-slate-50 p-4 sm:p-6">
					<div className="space-y-3 pt-5">
						<div>
							<label className="mb-2 block text-sm font-semibold text-slate-700">Fecha del día</label>

							<input
								type="date"
								name="date"
								value={form.date}
								onChange={handleChange}
								className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
							/>
						</div>

						<button
							disabled={loading}
							className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
						>
							{loading ? "Guardando..." : "Guardar cambios"}
						</button>
					</div>
				</form>
			)}

			<CreateActivityModal
				isOpen={showCreateActivityModal}
				dayId={day.id}
				onCreated={refreshTrip}
				onClose={() => setShowCreateActivityModal(false)}
			/>

			<div className="space-y-4 p-4 sm:p-6">
				{hasActivities &&
					day.activities.map((activity) => (
						<ActivityCard
							key={activity.id}
							activity={activity}
							refreshTrip={refreshTrip}
							isOwner={isOwner}
						/>
					))}

				{!hasActivities && (
					<div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center sm:px-6 sm:py-10">
						<div className="mb-3 text-4xl">🗺️</div>

						<h5 className="font-semibold text-slate-700">Este día está vacío</h5>

						<p className="mt-2 max-w-sm text-sm text-slate-500">
							Añade actividades para crear el plan perfecto del día.
						</p>
					</div>
				)}
			</div>

			<ConfirmModal
				isOpen={showDeleteModal}
				title="Eliminar día"
				message="Se eliminarán también sus actividades asociadas. ¿Quieres continuar?"
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={async () => {
					await handleDelete();
					setShowDeleteModal(false);
				}}
			/>
		</div>
	);
};
