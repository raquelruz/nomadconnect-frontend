import { Pencil } from "lucide-react";
import { ModalShell } from "./ModalShell";
import { EditTripForm } from "../../TripDetail/EditTripForm";

export const EditTripModal = ({ isOpen, trip, onClose, onUpdated }) => {
	if (!isOpen) return null;

	return (
		<ModalShell icon={Pencil} title="Editar viaje" description="El título y las fechas no se pueden modificar." onClose={onClose}>
			<EditTripForm
				trip={trip}
				onCancel={onClose}
				onSuccess={(updatedTrip) => {
					onUpdated?.(updatedTrip);
					onClose();
				}}
			/>
		</ModalShell>
	);
};
