import { Compass } from "lucide-react";
import { ActivityForm } from "../../Activities/ActivityForm";
import { ModalShell } from "./ModalShell";
import { useCreateActivity } from "../../../hooks/useCreateActivity";

export const CreateActivityModal = ({ isOpen, dayId, dayDate, onCreated, onClose }) => {
	const { form, handleChange, previews, handleImagesChange, handleRemoveImage, loading, handleSubmit, close } =
		useCreateActivity({ dayId, dayDate, onCreated, onClose });

	if (!isOpen) return null;

	return (
		<ModalShell icon={Compass} title="Nueva actividad" description="Añade una actividad al día." onClose={close}>
			<ActivityForm
				form={form}
				onChange={handleChange}
				onSubmit={handleSubmit}
				onCancel={close}
				loading={loading}
				submitText="Crear actividad"
				showImages
				previews={previews}
				onImagesChange={handleImagesChange}
				onRemoveImage={handleRemoveImage}
			/>
		</ModalShell>
	);
};