import { Clock } from "lucide-react";

export const ActivityHeader = ({ title, time }) => {
	return (
		<div>
			<div
				className="
					flex
					items-center
					gap-2
				"
			>
				<Clock size={16} className="text-blue-500" />

				<span
					className="
						text-sm
						font-medium
						text-blue-600
					"
				>
					{time}
				</span>
			</div>

			<h4
				className="
					mt-1
					text-base
					font-semibold
					text-slate-800
				"
			>
				{title}
			</h4>
		</div>
	);
};
