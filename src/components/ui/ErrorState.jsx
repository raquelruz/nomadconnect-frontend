export const ErrorState = ({ title = "Ha ocurrido un error", message = "Ha ocurrido un error inesperado." }) => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-md sm:p-8">
				<div className="mb-4 text-4xl">⚠️</div>

				<h2 className="mb-2 text-xl font-semibold text-slate-800">{title}</h2>

				<p className="text-slate-500">{message}</p>
			</div>
		</div>
	);
};
