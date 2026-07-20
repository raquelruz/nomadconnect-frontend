import { Pencil, Trash2 } from "lucide-react";

const VARIANTS = {
	detail: {
		wrapper: "flex shrink-0 gap-2 self-end md:self-start",
		button: "flex h-10 w-10 items-center justify-center rounded-xl border transition",
		edit: "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600",
		delete: "border-red-200 bg-white text-red-500 hover:border-red-300 hover:bg-red-50",
		iconSize: 18,
	},
	compact: {
		wrapper: "flex shrink-0 gap-1",
		button: "flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition",
		edit: "hover:bg-blue-50 hover:text-blue-500",
		delete: "hover:bg-red-50 hover:text-red-500",
		iconSize: 15,
	},
};

export const ActivityActions = ({ isOwner, onEdit, onDelete, deleting = false, variant = "detail" }) => {
	if (!isOwner) return null;

	const styles = VARIANTS[variant];

	return (
		<div className={styles.wrapper}>
			<button type="button" onClick={onEdit} title="Editar actividad" className={`${styles.button} ${styles.edit}`}>
				<Pencil size={styles.iconSize} />
			</button>

			<button
				type="button"
				onClick={onDelete}
				disabled={deleting}
				title="Eliminar actividad"
				className={`${styles.button} ${styles.delete} disabled:opacity-50`}
			>
				<Trash2 size={styles.iconSize} />
			</button>
		</div>
	);
};