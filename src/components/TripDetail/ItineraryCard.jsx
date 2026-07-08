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
		<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
			{/* HEADER */}
			<div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white px-6 py-5">
				<div className="flex items-start justify-between gap-6">
					<div className="flex items-start gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
							<IoIosAirplane />
						</div>

						<div>
							<h3 className="text-2xl font-bold text-slate-900">{itinerary.title}</h3>

							{itinerary.description && (
								<p className="mt-2 max-w-2xl text-slate-500">{itinerary.description}</p>
							)}

							<div className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
								{itinerary.days?.length || 0} días
							</div>
						</div>
					</div>

					{isOwner && (
						<div className="flex gap-3">
							<button
								onClick={() => setShowCreateDay(true)}
								className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
							>
								<Plus size={18} />
								Añadir día
							</button>

							<button
								onClick={() => setEditing(!editing)}
								title="Editar itinerario"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500 text-blue-600 transition hover:bg-blue-50"
							>
								<Pencil size={18} />
							</button>

							<button
								onClick={() => setShowDeleteModal(true)}
								title="Eliminar itinerario"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500 text-red-500 transition hover:bg-red-50"
							>
								<Trash2 size={18} />
							</button>
						</div>
					)}
				</div>
			</div>

			{isOwner && editing && (
				<form onSubmit={handleUpdate} className="border-b border-slate-100 bg-slate-50 p-6 space-y-4">
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700">Nombre</label>

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
							rows={4}
							className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-none focus:border-blue-500"
						/>
					</div>

					<button
						disabled={loading}
						className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
					>
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</form>
			)}

			{isOwner && showCreateDay && (
				<div className="border-b border-slate-100 bg-slate-50 p-6">
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

			{/* DÍAS */}
			<div className="space-y-5 p-6">
				{hasDays &&
					itinerary.days.map((day) => (
						<DayCard key={day.id} day={day} refreshTrip={refreshTrip} isOwner={isOwner} />
					))}

				{!hasDays && (
					<div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
							📅
						</div>

						<h4 className="text-lg font-semibold text-slate-800">Este itinerario todavía está vacío</h4>

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
