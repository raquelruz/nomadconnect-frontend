import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { useAuth } from "../auth/AuthContext";
import { AuthLayout } from "../components/Auth/AuthLayout";
import { AuthCard } from "../components/Auth/AuthCard";
import { AuthLogo } from "../components/Auth/AuthLogo";

const FIELDS = [
	{ key: "username", label: "Nombre de usuario", type: "text", placeholder: "juanperez", icon: FaRegUser },
	{ key: "email", label: "Email", type: "email", placeholder: "juanperez@gmail.com", icon: MdOutlineEmail },
	{ key: "password", label: "Contraseña", type: "password", placeholder: "*******", icon: RiLockPasswordLine },
	{ key: "name", label: "Nombre", type: "text", placeholder: "Juan", icon: LuUser },
	{ key: "surname", label: "Apellidos", type: "text", placeholder: "Pérez", icon: LuUser },
];

export const RegisterPage = () => {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		name: "",
		surname: "",
		role: "user",
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const submit = async (event) => {
		event.preventDefault();
		setError(null);
		setLoading(true);

		try {
			await register(form);
			navigate("/", { replace: true });
		} catch (requestError) {
			setError(requestError.message || "Error al crear cuenta");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout>
			<AuthCard>
				<div className="mb-10 text-center">
					<AuthLogo />

					<h2 className="font-bold text-text-primary">Únete a la aventura</h2>
					<p className="text-sm text-text-secondary">Regístrate para empezar a conectar</p>

					{error && <div className="pb-3 mb-4 text-sm text-error-500">{error}</div>}
				</div>

				<form onSubmit={submit} className="grid gap-3">
					{FIELDS.map(({ key, label, type, placeholder, icon: Icon }) => (
						<div key={key}>
							<label className="mb-2 block text-sm font-semibold text-text-secondary">{label}</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
									<Icon />
								</span>

								<input
									type={type}
									placeholder={placeholder}
									value={form[key]}
									onChange={(event) => setForm({ ...form, [key]: event.target.value })}
									className="w-full rounded-lg border border-border bg-bg-secondary py-3 pl-10 pr-4 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:bg-bg-card focus:ring-2 focus:ring-primary-500/20"
									required
								/>
							</div>
						</div>
					))}

					<div className="flex items-center justify-center">
						<button
							type="submit"
							disabled={loading}
							className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-br from-primary-600 to-primary-400 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
						>
							{loading ? "Creando cuenta..." : "Crear cuenta"}
						</button>
					</div>
				</form>

				<div className="mt-6 border-t border-border pt-6 text-center">
					<p className="text-sm text-text-secondary">
						¿Ya tienes cuenta?{" "}
						<Link to="/login" className="font-semibold text-primary-500 transition-opacity hover:opacity-80">
							Inicia sesión
						</Link>
					</p>
				</div>
			</AuthCard>

			<p className="mt-6 text-center text-xs text-text-muted">Regístrate ahora y sé parte de la comunidad</p>
		</AuthLayout>
	);
};