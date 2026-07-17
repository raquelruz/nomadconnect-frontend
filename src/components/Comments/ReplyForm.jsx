import { useState } from "react";

export const ReplyForm = ({ comment, replyComment, close }) => {
	const [text, setText] = useState("");
	const [sending, setSending] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!text.trim()) {
			return;
		}

		try {
			setSending(true);

			await replyComment(text, comment.id);

			setText("");
			close();
		} catch (error) {
			console.error(error);
		} finally {
			setSending(false);
		}
	};

	let buttonText = "Responder";

	if (sending) {
		buttonText = "Enviando...";
	}

	return (
		<form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-3">
			<textarea
				value={text}
				onChange={(event) => setText(event.target.value)}
				placeholder={`Responder a ${comment.author?.username}...`}
				rows={2}
				className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400"
			/>

			<div className="mt-2 flex justify-end gap-2">
				<button
					type="button"
					onClick={close}
					className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
				>
					Cancelar
				</button>

				<button
					type="submit"
					disabled={sending}
					className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
				>
					{buttonText}
				</button>
			</div>
		</form>
	);
};
