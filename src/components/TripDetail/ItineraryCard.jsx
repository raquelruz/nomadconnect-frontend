import { useState } from "react";
import { CreateDayForm } from "../Days/CreateDayForm";
import { DayCard } from "../Days/DayCard";
import api from "../../api";
import { ConfirmModal } from "../ui/ConfirmModal";

export const ItineraryCard = ({ itinerary, refreshTrip, isOwner }) => {
	const [showCreateDay, setShowCreateDay] = useState(false);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		title: itinerary.title,
		description: itinerary.description || "",
	});

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	let buttonText = "+ Añadir día";

	if (showCreateDay) {
		buttonText = "Cancelar";
	}

	let hasDays = false;

	if (itinerary.days && itinerary.days.length > 0) {
		hasDays = true;
	}

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
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="p-6">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h3 className="text-2xl font-bold text-slate-900">{itinerary.title}</h3>

						{itinerary.description && <p className="mt-2 text-slate-500">{itinerary.description}</p>}
					</div>

					{isOwner && (
						<div className="flex gap-2">
							<button
								onClick={() => setEditing(!editing)}
								className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold"
							>
								Editar
							</button>

							<button
								onClick={() => setShowDeleteModal(true)}
								className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white"
							>
								Eliminar
							</button>
						</div>
					)}
				</div>
			</div>

			{isOwner && editing && (
				<form onSubmit={handleUpdate} className="border-b border-slate-100 bg-slate-50 p-6 space-y-4">
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

					<button disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white">
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</form>
			)}

			<div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
				<div className="flex items-center justify-between">
					<h4 className="font-semibold text-slate-700">Días del itinerario</h4>

					{isOwner && (
						<button
							onClick={() => setShowCreateDay(!showCreateDay)}
							className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
						>
							{buttonText}
						</button>
					)}
				</div>
			</div>

			{isOwner && showCreateDay && (
				<div className="border-b border-slate-100 bg-slate-50 p-6">
					<CreateDayForm
						itineraryId={itinerary.id}
						onCreated={() => {
							setShowCreateDay(false);
							refreshTrip();
						}}
					/>
				</div>
			)}

			<div className="space-y-4 p-6">
				{hasDays &&
					itinerary.days.map((day) => (
						<DayCard key={day.id} day={day} refreshTrip={refreshTrip} isOwner={isOwner} />
					))}

				{!hasDays && (
					<div className="rounded-xl border-2 border-dashed border-slate-200 py-10 text-center">
						<div className="mb-3 text-4xl">📅</div>

						<h5 className="font-semibold text-slate-700">Aún no hay días</h5>

						<p className="mt-2 text-sm text-slate-500">
							Añade el primer día para empezar a organizar este itinerario.
						</p>
					</div>
				)}
			</div>

			<ConfirmModal
				isOpen={showDeleteModal}
				title="Eliminar itinerario"
				message="Se eliminarán todos sus días y actividades. ¿Quieres continuar?"
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={async () => {
					await handleDelete();
					setShowDeleteModal(false);
				}}
			/>
		</div>
	);
};
