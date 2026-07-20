import { Check, X } from "lucide-react";

export const CommentEditableBody = ({ editing, text, setText, displayText, onSave, onCancel }) => {
	if (!editing) {
		return <p className="mt-2 text-sm leading-relaxed text-slate-600">{displayText}</p>;
	}

	return (
		<div className="mt-3">
			<textarea
				value={text}
				onChange={(event) => setText(event.target.value)}
				rows={3}
				className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm"
			/>

			<div className="mt-3 flex gap-2">
				<button
					type="button"
					onClick={onSave}
					className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
				>
					<Check size={15} />
					Guardar
				</button>

				<button
					type="button"
					onClick={onCancel}
					className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
				>
					<X size={15} />
					Cancelar
				</button>
			</div>
		</div>
	);
};
