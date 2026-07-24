import { FaSignOutAlt } from "react-icons/fa";

export const LogoutButton = ({ onClick, className = "" }) => {
	return (
		<button
			onClick={onClick}
			title="Cerrar sesión"
			aria-label="Cerrar sesión"
			className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-primary/70 backdrop-blur-md shadow-sm  hover:border-error-400/30 hover:bg-error-500/10 hover:text-error-400 hover:shadow-md hover:shadow-error-500/10 active:scale-90 focus:outline-none focus:ring-2 focus:ring-error-400/40 focus:ring-offset-2 focus:ring-offset-transparent ${className}`}
		>
			<FaSignOutAlt className="text-sm transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
		</button>
	);
};
