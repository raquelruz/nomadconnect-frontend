import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import api from "../../api";

export const EditableAccountField = ({ profile, field, label, icon: Icon, onUpdated }) => {
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState(profile[field] || "");
	const [saving, setSaving] = useState(false);
	const [fieldError, setFieldError] = useState(null);

	const handleSave = () => {
		setSaving(true);
		setFieldError(null);

		api.put(`/users/${profile.id}`, { ...profile, [field]: draft })
			.then((response) => {
				onUpdated(response.data);
				setEditing(false);
			})
			.catch((error) => {
				setFieldError(error.response?.data?.message || "Ese valor ya está en uso");
			})
			.finally(() => setSaving(false));
	};

	const handleCancel = () => {
		setDraft(profile[field] || "");
		setFieldError(null);
		setEditing(false);
	};

	return (
		<div className="flex items-start gap-3 py-4">
			<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-400">
				<Icon size={16} />
			</div>

			<div className="min-w-0 flex-1">
				<p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{label}</p>

				{!editing && (
					<div className="mt-1 flex items-center justify-between gap-3">
						<p className="truncate text-sm font-medium text-text-primary">{profile[field] || "—"}</p>

						<button
							onClick={() => setEditing(true)}
							title={`Editar ${label.toLowerCase()}`}
							className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-text-muted transition hover:bg-primary-500/10 hover:text-primary-400"
						>
							<Pencil size={14} />
						</button>
					</div>
				)}

				{editing && (
					<div className="mt-1.5">
						<div className="flex items-center gap-2">
							<input
								value={draft}
								onChange={(event) => setDraft(event.target.value)}
								autoFocus
								onKeyDown={(event) => {
									if (event.key === "Enter") handleSave();
									if (event.key === "Escape") handleCancel();
								}}
								className="w-full rounded-xl border border-border bg-bg-secondary px-3.5 py-2 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
							/>

							<button
								onClick={handleSave}
								disabled={saving}
								title="Guardar"
								className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-400 transition hover:bg-primary-500/20 disabled:opacity-50"
							>
								<Check size={15} />
							</button>

							<button
								onClick={handleCancel}
								title="Cancelar"
								className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-text-muted transition hover:bg-error-500/10 hover:text-error-500"
							>
								<X size={15} />
							</button>
						</div>

						{fieldError && <p className="mt-1.5 text-xs text-error-500">{fieldError}</p>}
					</div>
				)}
			</div>
		</div>
	);
};