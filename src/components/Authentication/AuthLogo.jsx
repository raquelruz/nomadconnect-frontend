import { Link } from "react-router-dom";
import { FaRegCompass } from "react-icons/fa";

export const AuthLogo = () => (
	<Link to="/" className="mb-6 flex items-center justify-center gap-2">
		<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary-600 to-primary-400 text-xl font-bold text-white">
			<FaRegCompass className="text-2xl" />
		</div>
		<span className="text-lg font-semibold text-primary-500">NomadConnect</span>
	</Link>
);