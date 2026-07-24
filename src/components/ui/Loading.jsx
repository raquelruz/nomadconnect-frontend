export const Loading = ({ message = "Cargando..." }) => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-bg-primary">
			<div className="flex flex-col items-center gap-4">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>

				<p className="font-medium text-text-secondary">{message}</p>
			</div>
		</div>
	);
};