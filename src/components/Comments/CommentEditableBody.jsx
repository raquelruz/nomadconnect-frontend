import { Check } from "lucide-react";

export const CommentEditableBody = ({ editing, text, setText, displayText, onSave, onCancel }) => {
	if (!editing) {
		return <p className="mt-2 text-sm leading-relaxed text-text-primary/70">{displayText}</p>;
	}

	return (
		<div className="mt-3">
			<textarea
				value={text}
				onChange={(event) => setText(event.target.value)}
				rows={3}
				autoFocus
				className="w-full resize-none rounded-xl border border-text-primary/10 bg-bg-card p-3 text-sm text-text-primary outline-none transition placeholder:text-text-primary/30 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
			/>

			<div className="mt-2.5 flex justify-end gap-2">
				<button
					type="button"
					onClick={onCancel}
					className="rounded-lg px-3 py-2 text-sm font-semibold text-text-primary/60 transition hover:bg-text-primary/5"
				>
					Cancelar
				</button>

				<button
					type="button"
					onClick={onSave}
					className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98]"
				>
					<Check size={15} />
					Guardar
				</button>
			</div>
		</div>
	);
};