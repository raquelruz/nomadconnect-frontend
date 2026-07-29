export const PageStateCard = ({ emoji, title, description, action = null }) => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
			<div className="w-full max-w-md rounded-2xl bg-bg-card p-6 text-center shadow-md sm:p-8">
				<div className="mb-4 text-5xl">{emoji}</div>

				<h2 className="mb-2 text-xl font-semibold text-text-primary">{title}</h2>

				<p className={action ? "mb-6 text-text-secondary" : "text-text-secondary"}>{description}</p>

				{action}
			</div>
		</div>
	);
};