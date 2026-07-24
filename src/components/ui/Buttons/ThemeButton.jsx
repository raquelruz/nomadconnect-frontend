import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../../hooks/useTheme";
import { navIconButtonClass } from "./navIconButtonsStyles";

export const ThemeButton = ({ className = "" }) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			aria-label="Cambiar tema"
			className={`group ${navIconButtonClass} ${className}`}
		>
			<div className="relative w-5 h-5 flex items-center justify-center">
				<FaSun
					className={`absolute transition-all duration-300 ${
						theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
					}`}
				/>

				<FaMoon
					className={`absolute transition-all duration-300 ${
						theme === "dark" ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
					}`}
				/>
			</div>
		</button>
	);
};
