import { DayFormFields } from "./DayFormFields";

export const CreateDayForm = ({ form, loading, onChange, onSubmit, onCancel }) => {
	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<DayFormFields
				title={form.title}
				date={form.date}
				onTitleChange={onChange}
				onDateChange={onChange}
			/>

			<div className="flex justify-end gap-2 pt-2">
				<button type="button" onClick={onCancel} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-text-primary/70 transition hover:bg-text-primary/5">
					Cancelar
				</button>

				<button
					type="submit"
					disabled={loading}
					className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? "Creando..." : "Crear día"}
				</button>
			</div>
		</form>
	);
};