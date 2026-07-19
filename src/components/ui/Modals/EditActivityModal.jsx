import { useEffect, useState } from "react";
import { Compass, X } from "lucide-react";
import { ActivityForm } from "../../Activities/ActivityForm";
import api from "../../../api";


export const EditActivityModal = ({ isOpen, activity, refreshTrip, onClose }) => {
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		title: "",
		description: "",
		time: "",
		location: "",
		price: "",
	});

	useEffect(() => {
		if (!activity) return;

		setForm({
			title: activity.title || "",
			description: activity.description || "",
			time: activity.time || "",
			location: activity.location || "",
			price: activity.price || "",
		});
	}, [activity, isOpen]);

	const handleChange = ({ target }) => {
		setForm((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading(true);

			await api.put(`/activities/${activity.id}`, form);

			refreshTrip();
			onClose();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen || !activity) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
			<div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
				<div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-blue-50 to-white p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
							<Compass size={20} />
						</div>

						<div>
							<h2 className="text-lg font-bold text-slate-900">Editar actividad</h2>

							<p className="text-sm text-slate-500">Modifica la información de la actividad.</p>
						</div>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
					>
						<X size={18} />
					</button>
				</div>

				<div className="p-6">
					<ActivityForm
						form={form}
						onChange={handleChange}
						onSubmit={handleSubmit}
						onCancel={onClose}
						loading={loading}
						submitText="Guardar cambios"
					/>
				</div>
			</div>
		</div>
	);
};
