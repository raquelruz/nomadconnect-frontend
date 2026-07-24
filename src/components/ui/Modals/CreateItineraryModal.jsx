import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosAirplane } from "react-icons/io";
import { X } from "lucide-react";
import api from "../../../api"
import { CreateItineraryForm } from "../../Itineraries/CreateItineraryForm";

export const CreateItineraryModal = ({ isOpen, onCreated, onClose }) => {
	const { id } = useParams();

	const emptyForm = {
		title: "",
		description: "",
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

			const response = await api.post(`/itineraries/${id}`, {
				title: form.title,
				description: form.description,
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
			<div className="w-full max-w-2xl rounded-2xl bg-bg-card shadow-xl">
				<div className="flex items-center justify-between border-b border-text-primary/10 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm shadow-primary-600/30">
							<IoIosAirplane size={20} />
						</div>

						<div>
							<h2 className="text-lg font-bold text-text-primary">Nuevo itinerario</h2>
							<p className="text-sm text-text-primary/60">Crea un itinerario para organizar el viaje.</p>
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
					<CreateItineraryForm
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