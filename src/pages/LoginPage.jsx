import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import { AuthLayout } from "../components/Auth/AuthLayout";
import { AuthCard } from "../components/Auth/AuthCard";
import { AuthLogo } from "../components/Auth/AuthLogo";

export const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [form, setForm] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const from = location.state?.from?.pathname || "/";

	const submit = async (event) => {
		event.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await login(form.email, form.password);
			navigate(from, { replace: true });
		} catch (error) {
			setError(error.message || "Error al iniciar sesión");
		} finally {
			setLoading(false);
		}
	};

	const inputClass =
		"w-full rounded-lg border border-border bg-bg-secondary px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:bg-bg-card focus:ring-2 focus:ring-primary-500/20";

	return (
		<AuthLayout>
			<AuthCard>
				<div className="mb-10 text-center">
					<AuthLogo />

					<h2 className="font-bold text-text-primary">Bienvenido de nuevo</h2>
					<p className="text-sm text-text-secondary">La aventura te espera. Ingresa tus datos.</p>

					{error && <div className="pb-3 mb-4 text-sm text-error-500">{error}</div>}
				</div>

				<form onSubmit={submit} className="grid gap-3">
					<input
						type="email"
						placeholder="Correo electrónico"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						className={inputClass}
						required
					/>

					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Contraseña"
							value={form.password}
							onChange={(e) => setForm({ ...form, password: e.target.value })}
							className={`${inputClass} pr-12`}
							required
						/>

						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>

					<div className="flex items-center justify-center">
						<button
							type="submit"
							disabled={loading}
							className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-br from-primary-600 to-primary-400 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
						>
							{loading ? "Iniciando sesión..." : "Iniciar sesión"}
						</button>
					</div>
				</form>

				<div className="mt-6 border-t border-border pt-6 text-center">
					<p className="text-sm text-text-secondary">
						¿No tienes cuenta?{" "}
						<Link to="/register" className="font-semibold text-primary-500 transition-opacity hover:opacity-80">
							Regístrate
						</Link>
					</p>
				</div>
			</AuthCard>

			<p className="mt-6 text-center text-xs text-text-muted">
				La aventura te espera. Ingresa tus datos para continuar.
			</p>
		</AuthLayout>
	);
};