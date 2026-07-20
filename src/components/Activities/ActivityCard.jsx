import { MapPin, Pencil, Trash2 } from "lucide-react";
import { useActivityActions } from "../../hooks/useActivityActions";

const formatTime = (time) => {
	if (!time) {
		return { main: "--:--", period: "" };
	}

	const [hourStr, minuteStr] = time.split(":");
	const hour = parseInt(hourStr, 10);
	const period = hour >= 12 ? "PM" : "AM";
	const displayHour = hour % 12 === 0 ? 12 : hour % 12;

	return {
		main: `${String(displayHour).padStart(2, "0")}:${minuteStr}`,
		period,
	};
};

export const ActivityCard = ({ activity, refreshDay, isOwner, onEdit }) => {
	const { deleteActivity, loading } = useActivityActions({
		activity,
		refreshDay,
	});

	const time = formatTime(activity.time);

	return (
		<div className="group grid grid-cols-[64px_1fr_1fr_auto] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md sm:p-5">
			<div>
				<p className="text-base font-bold text-blue-600">{time.main}</p>
				<p className="text-[11px] font-semibold text-slate-400">{time.period}</p>
			</div>

			<div className="min-w-0">
				<p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Actividad</p>
				<p className="truncate font-semibold text-slate-800">{activity.title}</p>
			</div>

			<div className="min-w-0">
				<p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Ubicación</p>
				<p className="flex items-center gap-1.5 truncate text-slate-600">
					<MapPin size={13} className="shrink-0 text-slate-400" />
					{activity.location || "—"}
				</p>
			</div>

			{isOwner && (
				<div className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100">
					<button
						onClick={onEdit}
						title="Editar actividad"
						className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-blue-50 hover:text-blue-500"
					>
						<Pencil size={15} />
					</button>

					<button
						onClick={deleteActivity}
						disabled={loading}
						title="Eliminar actividad"
						className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
					>
						<Trash2 size={15} />
					</button>
				</div>
			)}
		</div>
	);
};