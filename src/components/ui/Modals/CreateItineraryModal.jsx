import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosAirplane } from "react-icons/io";
import api from "../../../api";
import { CreateItineraryForm } from "../../Itineraries/CreateItineraryForm";
import { ModalShell } from "./ModalShell";

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
		<ModalShell icon={IoIosAirplane} title="Nuevo itinerario" description="Crea un itinerario para organizar el viaje." onClose={handleClose}>
			<CreateItineraryForm form={form} loading={loading} onChange={handleChange} onSubmit={handleSubmit} onCancel={handleClose} />
		</ModalShell>
	);
};