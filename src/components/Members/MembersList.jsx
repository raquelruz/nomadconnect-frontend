export const MembersList = ({ trip }) => {
	const members = [trip.owner, ...(trip.members || [])];

	return (
		<section className="mt-8 rounded-2xl border border-text-primary/10 bg-bg-card p-6 shadow-sm">
			<div className="mb-5 flex items-center justify-between">
				<h2 className="text-lg font-bold text-text-primary">Participantes</h2>

				<span className="inline-flex rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-400">
					{members.length} {members.length === 1 ? "persona" : "personas"}
				</span>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
				{members.map((member, index) => (
					<div
						key={member.id}
						className="flex items-center gap-2.5 rounded-xl border border-text-primary/5 bg-text-primary/[0.02] p-2.5 transition hover:bg-text-primary/5"
					>
						<img
							src={member.avatar}
							alt={member.username}
							className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-bg-card"
						/>

						<div className="min-w-0">
							<p className="truncate text-sm font-semibold text-text-primary">{member.username}</p>
							{index === 0 && <p className="text-xs text-primary-400">Organizador</p>}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};