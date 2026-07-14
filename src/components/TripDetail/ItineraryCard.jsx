import { useState } from "react";
import { IoIosAirplane } from "react-icons/io";
import { Pencil, Trash2, Plus } from "lucide-react";
import { CreateDayForm } from "../Days/CreateDayForm";
import { DayCard } from "../Days/DayCard";
import { ConfirmModal } from "../ui/ConfirmModal";
import api from "../../api";

export const ItineraryCard = ({ itinerary, refreshTrip, isOwner }) => {
	const [showCreateDay, setShowCreateDay] = useState(false);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [form, setForm] = useState({
		title: itinerary.title,
		description: itinerary.description || "",
	});

	const hasDays = itinerary.days?.length > 0;

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

			await api.put(`/itineraries/${itinerary.id}`, form);

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
			await api.delete(`/itineraries/${itinerary.id}`);
			refreshTrip();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:rounded-3xl">
			<div className="border-b border-slate-100 bg-linear-to-r from-blue-50 to-white px-4 py-4 sm:px-6 sm:py-5">
				<div className="flex flex-col gap-5 border-b border-slate-100 bg-linear-to-r from-blue-50 to-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
					<div className="flex min-w-0 items-center gap-3">
						<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white">
							<IoIosAirplane />
						</div>

						<div className="min-w-0">
							<h3 className="truncate text-xl font-bold text-slate-900">{itinerary.title}</h3>

							{itinerary.description && (
								<p className="mt-1 text-sm text-slate-500">{itinerary.description}</p>
							)}

							<div className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
								{itinerary.days?.length || 0} días
							</div>
						</div>
					</div>

					{isOwner && (
						<div className="flex w-full items-center gap-2 sm:w-auto">
							<button
								onClick={() => setShowCreateDay(true)}
								className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 sm:w-auto"
							>
								<Plus size={18} />
								Añadir día
							</button>

							<button
								onClick={() => setEditing(!editing)}
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
							>
								<Pencil size={18} />
							</button>

							<button
								onClick={() => setShowDeleteModal(true)}
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-white text-red-500 transition hover:bg-red-50"
							>
								<Trash2 size={18} />
							</button>
						</div>
					)}
				</div>
			</div>

			{isOwner && editing && (
				<form onSubmit={handleUpdate} className="space-y-4 border-b border-slate-100 bg-slate-50 p-4 sm:p-6">
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700">Nombre</label>

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
							rows={4}
							className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
					>
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</form>
			)}

			{isOwner && showCreateDay && (
				<div className="border-b border-slate-100 bg-slate-50 p-4 sm:p-6">
					<CreateDayForm
						itineraryId={itinerary.id}
						onCreated={() => {
							setShowCreateDay(false);
							refreshTrip();
						}}
						onCancel={() => setShowCreateDay(false)}
					/>
				</div>
			)}

			<div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
				{hasDays &&
					itinerary.days.map((day) => (
						<DayCard key={day.id} day={day} refreshTrip={refreshTrip} isOwner={isOwner} />
					))}

				{!hasDays && (
					<div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center sm:px-6 sm:py-12">
						<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
							📅
						</div>

						<h4 className="text-base font-semibold text-slate-800 sm:text-lg">
							Este itinerario todavía está vacío
						</h4>

						<p className="mt-2 max-w-md text-sm text-slate-500">
							Crea el primer día para empezar a organizar las actividades de este itinerario.
						</p>
					</div>
				)}
			</div>

			<ConfirmModal
				isOpen={showDeleteModal}
				title="Eliminar itinerario"
				message="Se eliminarán también todos los días y actividades asociados. ¿Quieres continuar?"
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={async () => {
					await handleDelete();
					setShowDeleteModal(false);
				}}
			/>
		</div>
	);
};
