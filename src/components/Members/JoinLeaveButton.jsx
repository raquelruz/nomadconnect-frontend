export const JoinLeaveButton = ({ isOwner, canJoin, canLeave, hasFreePlaces, loading, onJoin, onLeave }) => {
	if (isOwner) {
		return (
			<button disabled className="w-full rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-500">
				Eres el organizador
			</button>
		);
	}

	if (canLeave) {
		return (
			<button
				onClick={onLeave}
				disabled={loading}
				className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
			>
				{loading ? "Abandonando..." : "Abandonar viaje"}
			</button>
		);
	}

	if (canJoin) {
		return (
			<button
				onClick={onJoin}
				disabled={loading}
				className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
			>
				{loading ? "Uniéndote..." : "Unirme al viaje"}
			</button>
		);
	}

	if (!hasFreePlaces) {
		return (
			<button disabled className="w-full rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-500">
				Viaje completo
			</button>
		);
	}

	return null;
};
