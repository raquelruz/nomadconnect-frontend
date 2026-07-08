import { useState } from "react";
import { CreateActivityForm } from "../Activities/CreateActivityForm";
import { ActivityCard } from "../Activities/ActivityCard";
import api from "../../api";
import { ConfirmModal } from "../ui/ConfirmModal";

export const DayCard = ({ day, refreshTrip, isOwner }) => {
	const [showActivityForm, setShowActivityForm] = useState(false);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		date: day.date?.slice(0, 10),
	});

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	let buttonText = "+ Actividad";

	if (showActivityForm) {
		buttonText = "Cancelar";
	}

	let hasActivities = false;

	if (day.activities && day.activities.length > 0) {
		hasActivities = true;
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
		<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
				<div>
					<h4 className="text-lg font-bold text-slate-900">
						📅{" "}
						{new Date(day.date).toLocaleDateString("es-ES", {
							weekday: "long",
							day: "numeric",
							month: "long",
						})}
					</h4>

					<p className="text-sm text-slate-500">{day.activities?.length || 0} actividades</p>
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

			{isOwner && editing && (
				<form onSubmit={handleUpdate} className="border-b border-slate-100 bg-slate-50 p-6 space-y-4">
					<label className="block text-sm font-semibold text-slate-700">Fecha</label>

					<input
						type="date"
						name="date"
						value={form.date}
						onChange={handleChange}
						className="w-full rounded-lg border px-3 py-2"
					/>

					<button disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white">
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</form>
			)}

			{isOwner && showActivityForm && (
				<div className="border-b border-slate-100 bg-slate-50 p-6">
					<CreateActivityForm
						dayId={day.id}
						onCreated={() => {
							setShowActivityForm(false);
							refreshTrip();
						}}
					/>
				</div>
			)}

			<div className="space-y-4 p-6">
				{isOwner && (
					<button
						onClick={() => setShowActivityForm(!showActivityForm)}
						className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
					>
						{buttonText}
					</button>
				)}

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
					<div className="rounded-xl border-2 border-dashed border-slate-200 py-8 text-center">
						<p className="text-slate-500">No hay actividades para este día.</p>
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
