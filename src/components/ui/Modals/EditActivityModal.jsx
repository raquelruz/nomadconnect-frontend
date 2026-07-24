import { Compass } from "lucide-react";
import { ActivityForm } from "../../Activities/ActivityForm";
import { ModalShell } from "./ModalShell";
import { useActivityForm } from "../../../hooks/Activities/useActivityForm";
import { useActivityActions } from "../../../hooks/Activities/useActivityActions";

export const EditActivityModal = ({ isOpen, activity, refreshTrip, onClose }) => {
	const { form, handleChange } = useActivityForm(activity, isOpen);

	const { updateActivity, loading } = useActivityActions({
		activity,
		refreshDay: refreshTrip,
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		await updateActivity(form);
		onClose();
	};

	if (!isOpen || !activity) return null;

	return (
		<ModalShell
			icon={Compass}
			title="Editar actividad"
			description="Modifica la información de la actividad."
			onClose={onClose}
		>
			<ActivityForm
				form={form}
				onChange={handleChange}
				onSubmit={handleSubmit}
				onCancel={onClose}
				loading={loading}
				submitText="Guardar cambios"
			/>
		</ModalShell>
	);
};
