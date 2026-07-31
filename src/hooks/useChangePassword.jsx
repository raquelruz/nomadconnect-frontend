import { useState } from "react";
import api from "../api";

export const useChangePassword = () => {
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const changePassword = async ({ currentPassword, newPassword, repeatNewPassword }) => {
		setSaving(true);
		setError(null);
		setSuccess(false);

		try {
			await api.patch("/auth/change-password", { currentPassword, newPassword, repeatNewPassword });
			setSuccess(true);
			return true;
		} catch (err) {
			setError(err.message || "No se ha podido cambiar la contraseña");
			return false;
		} finally {
			setSaving(false);
		}
	};

	const resetStatus = () => {
		setError(null);
		setSuccess(false);
	};

	return { changePassword, saving, error, success, resetStatus };
};