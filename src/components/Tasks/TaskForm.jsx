import { useState } from "react";
import { Send } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";

const VARIANTS = {
	default: {
		wrapper: "rounded-2xl border border-text-primary/10 bg-bg-card p-4",
		submitButton:
			"flex items-center gap-1.5 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
	},
	compact: {
		wrapper: "rounded-xl border border-text-primary/10 bg-bg-card p-3",
		submitButton:
			"flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
	},
};

export const TaskForm = ({
	onSubmit,
	placeholder = "Escribe una tarea...",
	autoFocus = false,
	onCancel,
	submitLabel = "Crear tarea",
	sendingLabel = "Creando tarea...",
	variant = "default",
	user,
	members = [],
}) => {
	const [title, setTitle] = useState("");
	const [assignedTo, setAssignedTo] = useState(null);
	const [sending, setSending] = useState(false);
	const [focused, setFocused] = useState(false);

	const styles = VARIANTS[variant];

	const handleSubmit = async (event) => {
		event.preventDefault();

		const trimmedTitle = title.trim();

		if (!trimmedTitle) {
			return;
		}

		try {
			setSending(true);

			await onSubmit(trimmedTitle, assignedTo);

			setTitle("");
			setAssignedTo(null);
			onCancel?.();
		} catch (error) {
			console.error(error);
		} finally {
			setSending(false);
		}
	};

	const toggleAssignee = (memberId) => {
		setAssignedTo((current) => (current === memberId ? null : memberId));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`${styles.wrapper} transition ${focused ? "border-primary-300 ring-4 ring-primary-500/10" : ""}`}
		>
			<div className="flex gap-3">
				{user && (
					<div className="shrink-0 pt-0.5">
						<UserAvatar user={user} />
					</div>
				)}

				<input
					type="text"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					placeholder={placeholder}
					autoFocus={autoFocus}
					className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-primary/35"
				/>
			</div>

			{members.length > 0 && (
				<div className="mt-3 flex flex-wrap items-center gap-2 border-t border-text-primary/5 pt-3">
					<span className="text-xs font-medium text-text-primary/50">Asignar a:</span>

					{members.map((member) => (
						<button
							key={member.id}
							type="button"
							onClick={() => toggleAssignee(member.id)}
							title={member.username}
							className={`rounded-full transition ${
								assignedTo === member.id
									? "ring-2 ring-primary-500 ring-offset-2 ring-offset-bg-card"
									: "opacity-50 hover:opacity-100"
							}`}
						>
							<UserAvatar user={member} size="sm" />
						</button>
					))}
				</div>
			)}

			<div className="mt-3 flex justify-end gap-2 border-t border-text-primary/5 pt-3">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="rounded-lg px-3 py-1.5 text-sm font-semibold text-text-primary/60 transition hover:bg-text-primary/5"
					>
						Cancelar
					</button>
				)}

				<button type="submit" disabled={sending || !title.trim()} className={styles.submitButton}>
					<Send size={14} />
					{sending ? sendingLabel : submitLabel}
				</button>
			</div>
		</form>
	);
};