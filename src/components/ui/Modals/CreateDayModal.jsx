import { useState } from "react";
import { CalendarPlus, X } from "lucide-react";
import api from "../../../api";
import { CreateDayForm } from "../../Days/CreateDayForm";

export const CreateDayModal = ({ isOpen, itineraryId, onCreated, onClose }) => {
	const emptyForm = {
		title: "",
		date: "",
	};

	const [form, setForm] = useState(emptyForm);
	const [loading, setLoading] = useState(false);

	const handleChange = ({ target }) => {
		setForm((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const resetForm = () => {
		setForm(emptyForm);
	};

	const handleClose = () => {
		resetForm();
		onClose();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading(true);

			const response = await api.post(`/days/${itineraryId}`, {
				title: form.title,
				date: form.date,
			});

			onCreated?.(response.data);

			resetForm();
			onClose();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
			<div className="w-full max-w-md rounded-2xl bg-bg-card">
				<div className="flex items-center justify-between border-b border-text-primary/10 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
							<CalendarPlus size={20} />
						</div>

						<div>
							<h2 className="text-lg font-bold text-text-primary">Nuevo día</h2>
							<p className="text-sm text-text-primary/60">Añade un día a este itinerario.</p>
						</div>
					</div>

					<button
						type="button"
						onClick={handleClose}
						className="flex h-9 w-9 items-center justify-center rounded-full text-text-primary/50 transition hover:bg-text-primary/5 hover:text-text-primary"
					>
						<X size={18} />
					</button>
				</div>

				<div className="p-6">
					<CreateDayForm
						form={form}
						loading={loading}
						onChange={handleChange}
						onSubmit={handleSubmit}
						onCancel={handleClose}
					/>
				</div>
			</div>
		</div>
	);
};
