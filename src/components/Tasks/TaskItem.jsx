import { Trash2, Pencil, Check, X } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { useCommentEditor } from "../../hooks/Comments/useCommentEditor";

export const TaskItem = ({ task, canManage, toggleTask, editTask, deleteTask }) => {
	const { editing, text, setText, startEditing, cancelEditing, saveEditing } = useCommentEditor({
		id: task.id,
		initialText: task.title,
		onSave: editTask,
	});

	return (
		<div className="flex items-center gap-3 rounded-xl border border-text-primary/10 bg-bg-card p-3">
			<button
				type="button"
				onClick={() => toggleTask(task.id)}
				className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
					task.isCompleted
						? "border-primary-600 bg-primary-600 text-white"
						: "border-text-primary/25 hover:border-primary-500"
				}`}
			>
				{task.isCompleted && (
					<svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3}>
						<path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				)}
			</button>

			{editing ? (
				<div className="flex flex-1 items-center gap-2">
					<input
						type="text"
						value={text}
						onChange={(event) => setText(event.target.value)}
						autoFocus
						className="w-full rounded-lg border border-text-primary/15 bg-transparent px-2 py-1 text-sm text-text-primary outline-none focus:border-primary-400"
					/>

					<button
						type="button"
						onClick={saveEditing}
						className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-primary-600 hover:bg-primary-50"
					>
						<Check size={15} />
					</button>

					<button
						type="button"
						onClick={cancelEditing}
						className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-primary/50 hover:bg-text-primary/5"
					>
						<X size={15} />
					</button>
				</div>
			) : (
				<p className={`flex-1 text-sm ${task.isCompleted ? "text-text-primary/40 line-through" : "text-text-primary"}`}>
					{task.title}
				</p>
			)}

			{!editing && task.assignedTo && <UserAvatar user={task.assignedTo} size="sm" />}

			{!editing && canManage && (
				<>
					<button
						type="button"
						onClick={startEditing}
						title="Editar tarea"
						className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-primary/40 transition hover:bg-text-primary/5 hover:text-text-primary"
					>
						<Pencil size={15} />
					</button>

					<button
						type="button"
						onClick={() => deleteTask(task.id)}
						title="Eliminar tarea"
						className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-primary/40 transition hover:bg-red-50 hover:text-red-500"
					>
						<Trash2 size={16} />
					</button>
				</>
			)}
		</div>
	);
};