const STATUS = {
	planning: {
		label: "Planificando",
		color: "bg-amber-100 text-amber-700 border-amber-200",
	},
	upcoming: {
		label: "Próximamente",
		color: "bg-blue-100 text-blue-700 border-blue-200",
	},
	ongoing: {
		label: "En curso",
		color: "bg-green-100 text-green-700 border-green-200",
	},
	completed: {
		label: "Finalizado",
		color: "bg-slate-100 text-slate-700 border-slate-200",
	},
	cancelled: {
		label: "Cancelado",
		color: "bg-red-100 text-red-700 border-red-200",
	},
};

export const TripStatusBadge = ({ status }) => {
	const current = STATUS[status] || STATUS.planning;

	return (
		<span
			className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-semibold ${current.color}`}
		>
			{current.label}
		</span>
	);
};