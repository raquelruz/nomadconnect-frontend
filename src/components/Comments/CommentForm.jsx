import { useState } from "react";

export const CommentForm = ({ createComment, placeholder = "Escribe un comentario...", autoFocus = false }) => {
	const [text, setText] = useState("");
	const [sending, setSending] = useState(false);

	const resetForm = () => {
		setText("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const trimmedText = text.trim();

		if (!trimmedText) {
			return;
		}

		setSending(true);

		await createComment(trimmedText);

		resetForm();

		setSending(false);
	};

	return (
		<form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
			<textarea
				value={text}
				onChange={(event) => setText(event.target.value)}
				placeholder={placeholder}
				autoFocus={autoFocus}
				rows={3}
				className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-blue-400"
			/>

			<div className="mt-3 flex justify-end">
				<button
					type="submit"
					disabled={sending || !text.trim()}
					className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{sending && "Publicando..."}
					{!sending && "Comentar"}
				</button>
			</div>
		</form>
	);
};
