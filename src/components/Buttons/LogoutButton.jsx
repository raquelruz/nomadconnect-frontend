import { FaSignOutAlt } from "react-icons/fa";

export const LogoutButton = ({ onClick, className = "" }) => {
	return (
		<button
			onClick={onClick}
			title="Cerrar sesión"
			aria-label="Cerrar sesión"
			className={`flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-error-400 backdrop-blur-md shadow-md transition-all duration-300 ease-out hover:bg-error-500/10 hover:text-error-300 hover:shadow-lg active:scale-95 ${className}`}
		>
			<FaSignOutAlt className="text-base" />
		</button>
	);
};
