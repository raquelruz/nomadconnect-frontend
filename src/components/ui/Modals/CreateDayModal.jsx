import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import api from "../../../api";
import { CreateDayForm } from "../../Days/CreateDayForm";
import { ModalShell } from "./ModalShell";

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
		<ModalShell icon={CalendarPlus} title="Nuevo día" description="Añade un día a este itinerario." onClose={handleClose}>
			<CreateDayForm form={form} loading={loading} onChange={handleChange} onSubmit={handleSubmit} onCancel={handleClose} />
		</ModalShell>
	);
};