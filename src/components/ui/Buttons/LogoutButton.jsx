import { FaSignOutAlt } from "react-icons/fa";
import { navIconButtonClass } from "./navIconButtonsStyles";

export const LogoutButton = ({ onClick, className = "" }) => {
	return (
		<button
			onClick={onClick}
			title="Cerrar sesión"
			aria-label="Cerrar sesión"
			className={`group ${navIconButtonClass} hover:border-error-400/30 hover:bg-error-500/10 hover:text-error-400 hover:shadow-error-500/10 focus:outline-none focus:ring-2 focus:ring-error-400/40 focus:ring-offset-2 focus:ring-offset-transparent active:scale-90 ${className}`}
		>
			<FaSignOutAlt className="text-sm transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
		</button>
	);
};