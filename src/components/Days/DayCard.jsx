import { useState } from "react";

export const DayCard = ({ day }) => {
	const [showActivityForm, setShowActivityForm] = useState(false);

	return (
		<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
				<div>
					<h4 className="text-lg font-bold text-slate-900">
						📅{" "}
						{new Date(day.date).toLocaleDateString("es-ES", {
							weekday: "long",
							day: "numeric",
							month: "long",
						})}
					</h4>

					<p className="text-sm text-slate-500">
						{day.activities?.length || 0} actividades
					</p>
				</div>

				<button
					onClick={() => setShowActivityForm(!showActivityForm)}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
				>
					{showActivityForm ? "Cancelar" : "+ Actividad"}
				</button>
			</div>

			<div className="p-6">
				{showActivityForm && (
					<div className="mb-6">
						Aquí irá el CreateActivityForm
					</div>
				)}

				{day.activities?.length > 0 && (
					<div className="space-y-3">
						{day.activities.map((activity) => (
							<div
								key={activity.id}
								className="rounded-xl border border-slate-200 bg-slate-50 p-4"
							>
								<h5 className="font-semibold">
									{activity.title}
								</h5>

								<p className="text-sm text-slate-500">
									{activity.description}
								</p>
							</div>
						))}
					</div>
				)}

				{day.activities?.length === 0 && (
					<div className="rounded-xl border-2 border-dashed border-slate-200 py-8 text-center">
						<p className="text-slate-500">
							No hay actividades para este día.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};