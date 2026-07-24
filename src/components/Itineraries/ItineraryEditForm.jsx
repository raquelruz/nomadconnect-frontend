import { useState } from "react";
import { Calendar, Compass, X } from "lucide-react";
import { FormActions } from "../ui/FormActions";

export const ItineraryEditForm = ({ itinerary, updateItinerary, loading, onClose }) => {
	const [title, setTitle] = useState(itinerary.title || "");
	const [startDate, setStartDate] = useState(itinerary.startDate?.slice(0, 10) || "");
	const [endDate, setEndDate] = useState(itinerary.endDate?.slice(0, 10) || "");

	const handleSubmit = async (event) => {
		event.preventDefault();

		await updateItinerary({ title, startDate, endDate });

		onClose();
	};

	return (
		<div className="w-full max-w-md overflow-hidden rounded-2xl bg-bg-card shadow-xl ring-1 ring-black/5">
			<div className="flex items-center justify-between border-b border-text-primary/10 p-6">
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm shadow-primary-600/30">
						<Compass size={20} />
					</div>

					<div>
						<h2 className="text-lg font-bold leading-tight text-text-primary">Editar itinerario</h2>
						<p className="text-sm text-text-primary/60">Actualiza el nombre o las fechas</p>
					</div>
				</div>

				<button
					type="button"
					onClick={onClose}
					className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-primary/50 transition hover:bg-text-primary/5 hover:text-text-primary"
				>
					<X size={18} />
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4 p-6">
				<div>
					<label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-text-primary/80">
						<Compass size={14} className="text-primary-500" />
						Nombre
					</label>

					<input
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Ej. Roma histórico"
						className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-primary/30 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-text-primary/80">
							<Calendar size={14} className="text-primary-500" />
							Inicio
						</label>

						<input
							type="date"
							value={startDate}
							onChange={(event) => setStartDate(event.target.value)}
							className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
						/>
					</div>

					<div>
						<label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-text-primary/80">
							<Calendar size={14} className="text-primary-500" />
							Fin
						</label>

						<input
							type="date"
							value={endDate}
							onChange={(event) => setEndDate(event.target.value)}
							className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
						/>
					</div>
				</div>

				<FormActions onCancel={onClose} submitLabel="Guardar" loadingLabel="Guardando..." loading={loading} />
			</form>
		</div>
	);
};