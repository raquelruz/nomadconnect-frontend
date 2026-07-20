import { useState } from "react";

const VARIANTS = {
	default: {
		wrapper: "rounded-xl border border-slate-200 bg-slate-50 p-4",
		textareaRows: 3,
		submitButton:
			"rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
	},
	compact: {
		wrapper: "rounded-xl border border-slate-200 bg-white p-3",
		textareaRows: 2,
		submitButton:
			"rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
	},
};

export const CommentForm = ({
	onSubmit,
	placeholder = "Escribe un comentario...",
	autoFocus = false,
	onCancel,
	submitLabel = "Comentar",
	sendingLabel = "Publicando...",
	variant = "default",
}) => {
	const [text, setText] = useState("");
	const [sending, setSending] = useState(false);

	const styles = VARIANTS[variant];

	const handleSubmit = async (event) => {
		event.preventDefault();

		const trimmedText = text.trim();

		if (!trimmedText) {
			return;
		}

		try {
			setSending(true);

			await onSubmit(trimmedText);

			setText("");
			onCancel?.();
		} catch (error) {
			console.error(error);
		} finally {
			setSending(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.wrapper}>
			<textarea
				value={text}
				onChange={(event) => setText(event.target.value)}
				placeholder={placeholder}
				autoFocus={autoFocus}
				rows={styles.textareaRows}
				className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-blue-400"
			/>

			<div className="mt-3 flex justify-end gap-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
					>
						Cancelar
					</button>
				)}

				<button type="submit" disabled={sending || !text.trim()} className={styles.submitButton}>
					{sending ? sendingLabel : submitLabel}
				</button>
			</div>
		</form>
	);
};
