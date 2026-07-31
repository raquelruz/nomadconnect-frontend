import { useState } from "react";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { useChangePassword } from "../../hooks/useChangePassword";

const PasswordInput = ({ label, value, onChange }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div>
			<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-muted">
				{label}
			</label>

			<div className="relative">
				<input
					type={visible ? "text" : "password"}
					value={value}
					onChange={onChange}
					className="w-full rounded-xl border border-border bg-bg-secondary px-3.5 py-2.5 pr-10 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
				/>

				<button
					type="button"
					onClick={() => setVisible((prev) => !prev)}
					tabIndex={-1}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-text-secondary"
				>
					{visible ? <EyeOff size={16} /> : <Eye size={16} />}
				</button>
			</div>
		</div>
	);
};

export const ChangePasswordCard = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [repeatNewPassword, setRepeatNewPassword] = useState("");

	const { changePassword, saving, error, success, resetStatus } = useChangePassword();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const ok = await changePassword({ currentPassword, newPassword, repeatNewPassword });

		if (ok) {
			setCurrentPassword("");
			setNewPassword("");
			setRepeatNewPassword("");
		}
	};

	const canSubmit = currentPassword && newPassword && repeatNewPassword;

	return (
		<div className="mt-6 rounded-3xl border border-border-light bg-bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
			<div className="flex items-center gap-3 border-b border-border pb-6">
				<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-400">
					<Lock size={18} />
				</div>

				<div>
					<h2 className="text-base font-bold text-text-primary">Contraseña</h2>
					<p className="text-sm text-text-muted">Actualiza tu contraseña de acceso.</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="mt-6 space-y-4">
				<PasswordInput
					label="Contraseña actual"
					value={currentPassword}
					onChange={(event) => {
						resetStatus();
						setCurrentPassword(event.target.value);
					}}
				/>

				<PasswordInput
					label="Nueva contraseña"
					value={newPassword}
					onChange={(event) => {
						resetStatus();
						setNewPassword(event.target.value);
					}}
				/>

				<PasswordInput
					label="Repite la nueva contraseña"
					value={repeatNewPassword}
					onChange={(event) => {
						resetStatus();
						setRepeatNewPassword(event.target.value);
					}}
				/>

				{error && <p className="text-sm text-error-500">{error}</p>}

				{success && (
					<p className="flex items-center gap-1.5 text-sm text-success-500">
						<ShieldCheck size={15} />
						Contraseña actualizada correctamente.
					</p>
				)}

				<button
					type="submit"
					disabled={saving || !canSubmit}
					className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-50"
				>
					{saving ? "Guardando..." : "Actualizar contraseña"}
				</button>
			</form>
		</div>
	);
};