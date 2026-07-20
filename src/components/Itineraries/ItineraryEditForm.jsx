import { useState } from "react";
import { Calendar, Compass, X } from "lucide-react";

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
		<div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
			<div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-blue-50 to-white p-6">
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
						<Compass size={20} />
					</div>

					<div>
						<h2 className="text-lg font-bold text-slate-900">Editar itinerario</h2>
						<p className="text-sm text-slate-500">Actualiza el nombre o las fechas.</p>
					</div>
				</div>

				<button
					type="button"
					onClick={onClose}
					className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
				>
					<X size={18} />
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5 p-6">
				<div>
					<label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
						<Compass size={14} className="text-blue-500" />
						Nombre
					</label>

					<input
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Ej. Roma histórico"
						className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
							<Calendar size={14} className="text-blue-500" />
							Inicio
						</label>

						<input
							type="date"
							value={startDate}
							onChange={(event) => setStartDate(event.target.value)}
							className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
						/>
					</div>

					<div>
						<label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
							<Calendar size={14} className="text-blue-500" />
							Fin
						</label>

						<input
							type="date"
							value={endDate}
							onChange={(event) => setEndDate(event.target.value)}
							className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
						/>
					</div>
				</div>

				<div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
					<button
						type="button"
						onClick={onClose}
						className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100"
					>
						Cancelar
					</button>

					<button
						type="submit"
						disabled={loading}
						className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
					>
						{loading ? "Guardando..." : "Guardar"}
					</button>
				</div>
			</form>
		</div>
	);
};
