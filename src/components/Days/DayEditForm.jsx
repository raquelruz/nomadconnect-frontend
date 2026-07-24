import { useState } from "react";
import { Calendar, Compass, X } from "lucide-react";

export const DayEditForm = ({ day, updateDay, loading, onClose }) => {
	const [title, setTitle] = useState(day.title || "");
	const [date, setDate] = useState(day.date?.slice(0, 10) || "");

	const handleSubmit = async (event) => {
		event.preventDefault();

		await updateDay({ title, date });

		onClose();
	};

	return (
		<div className="w-full max-w-md overflow-hidden rounded-2xl bg-bg-card shadow-xl ring-1 ring-black/5">
			<div className="flex items-center justify-between border-b border-border-light p-6">
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
						<Compass size={20} />
					</div>

					<div>
						<h2 className="text-lg font-bold leading-tight text-text-primary">Editar día</h2>
						<p className="text-sm text-text-primary/60">Actualiza el título o la fecha</p>
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
					<label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-text-primary">
						<Compass size={14} className="text-primary-500" />
						Título
					</label>

					<input
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Ej. Llegada y check-in"
						className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary/50 outline-none transition placeholder:text-text-primary/30 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
					/>
				</div>

				<div>
					<label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-text-primary">
						<Calendar size={14} className="text-primary-500" />
						Fecha
					</label>

					<input
						type="date"
						value={date}
						onChange={(event) => setDate(event.target.value)}
						required
						className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary/50 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
					/>
				</div>

				<div className="flex justify-end gap-2 pt-2">
					<button
						type="button"
						onClick={onClose}
						className="rounded-xl px-4 py-2.5 text-sm font-semibold text-text-primary/70 transition hover:bg-text-primary/5"
					>
						Cancelar
					</button>

					<button
						type="submit"
						disabled={loading}
						className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-text-primary shadow-sm shadow-blue-600/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading ? "Guardando..." : "Guardar"}
					</button>
				</div>
			</form>
		</div>
	);
};