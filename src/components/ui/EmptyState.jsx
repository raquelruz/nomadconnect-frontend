export const EmptyState = ({
	emoji = "📭",
	title = "No hay contenido",
	description = "No hay información para mostrar.",
	action = null,
}) => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-md sm:p-8">
				<div className="mb-4 text-5xl">{emoji}</div>

				<h2 className="mb-2 text-xl font-semibold text-slate-800">{title}</h2>

				<p className="mb-6 text-slate-500">{description}</p>

				{action}
			</div>
		</div>
	);
};
