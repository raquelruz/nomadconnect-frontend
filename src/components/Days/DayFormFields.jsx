import { Calendar, Compass } from "lucide-react";

export const DayFormFields = ({ title, date, onTitleChange, onDateChange }) => {
	return (
		<>
			<div>
				<label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-text-primary/80">
					<Compass size={14} className="text-primary-500" />
					Título
				</label>

				<input
					type="text"
					value={title}
					onChange={onTitleChange}
					placeholder="Ej. Llegada y check-in"
					className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-primary/30 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
				/>
			</div>

			<div>
				<label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-text-primary/80">
					<Calendar size={14} className="text-primary-500" />
					Fecha
				</label>

				<input
					type="date"
					value={date}
					onChange={onDateChange}
					required
					className="w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
				/>
			</div>
		</>
	);
};
