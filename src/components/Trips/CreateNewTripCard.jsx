import { useState } from "react";
import { MdFlightTakeoff } from "react-icons/md";
import { CreateTripModal } from "../ui/Modals/CreateTripsModal";

export const CreateNewTripCard = ({ onSuccess }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="w-full max-w-xl">
			<div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-border bg-primary-50/50 p-10 text-center">
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10">
					<MdFlightTakeoff className="-rotate-10 text-2xl text-primary-500" />
				</div>

				<div>
					<p className="text-xl font-medium text-text-primary">¿Ya sabes dónde será tu próxima aventura?</p>
					<p className="mt-2 max-w-sm text-sm text-text-secondary">
						Comienza a organizar tu próximo viaje hoy mismo. Añade vuelos, hoteles y actividades para
						tener todo en un solo lugar.
					</p>
				</div>

				<button
					onClick={() => setShowModal(true)}
					className="w-full max-w-xs rounded-xl bg-primary-600 px-6 py-4 text-sm font-semibold leading-tight text-white transition-colors duration-200 hover:bg-blue-950"
				>
					Crear nuevo viaje
				</button>
			</div>

			<CreateTripModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onSuccess={onSuccess}
			/>
		</div>
	);
};