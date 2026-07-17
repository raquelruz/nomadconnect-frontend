import { useState } from "react";

export const CommentForm = ({ createComment }) => {
	const [text, setText] = useState("");
	const [sending, setSending] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!text.trim()) {
			return;
		}

		try {
			setSending(true);

			await createComment(text);

			setText("");
		} catch (error) {
			console.error(error);
		} finally {
			setSending(false);
		}
	};

	let buttonText = "Comentar";

	if (sending) {
		buttonText = "Publicando...";
	}

	return (
		<form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
			<textarea
				value={text}
				onChange={(event) => setText(event.target.value)}
				placeholder="Escribe un comentario..."
				rows={3}
				className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-blue-400"
			/>

			<div className="mt-3 flex justify-end">
				<button
					type="submit"
					disabled={sending}
					className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
				>
					{buttonText}
				</button>
			</div>
		</form>
	);
};
