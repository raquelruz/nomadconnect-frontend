export const NotificationSkeleton = ({ count = 4 }) => {
	return (
		<div aria-hidden="true">
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="border-b border-border px-6 py-5 last:border-b-0">
					<div className="flex gap-4 animate-pulse">
						<div className="h-12 w-12 shrink-0 rounded-full bg-bg-secondary" />

						<div className="flex-1 space-y-2">
							<div className="h-3.5 w-1/3 rounded bg-bg-secondary" />

							<div className="h-3 w-4/5 rounded bg-bg-secondary" />

							<div className="mt-3 h-2.5 w-16 rounded bg-bg-secondary" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
