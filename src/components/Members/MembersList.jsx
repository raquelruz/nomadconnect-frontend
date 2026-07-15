export const MembersList = ({ trip }) => {
	const members = [trip.owner, ...(trip.members || [])];

	return (
		<section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold text-slate-800">Participantes</h2>

				<span className="mt-1 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
					{members.length} personas
				</span>
			</div>

			<div className="mt-5 flex items-center">
				{members.map((member) => (
					<img
						key={member.id}
						src={member.avatar}
						alt={member.username}
						title={member.username}
						className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
					/>
				))}
			</div>
		</section>
	);
};
