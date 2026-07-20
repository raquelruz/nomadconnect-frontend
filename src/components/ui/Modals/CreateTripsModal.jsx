import { MdFlightTakeoff } from "react-icons/md";
import { ModalShell } from "./ModalShell";
import { CreateTripForm } from "../../Trips/CreateTripForm";

export const CreateTripModal = ({ isOpen, onClose, onSuccess }) => {
	if (!isOpen) return null;

	return (
		<ModalShell
			icon={MdFlightTakeoff}
			title="Nuevo viaje"
			description="Organiza tu próxima aventura desde cero."
			onClose={onClose}
		>
			<CreateTripForm
				onSuccess={() => {
					onSuccess?.();
					onClose();
				}}
			/>
		</ModalShell>
	);
};