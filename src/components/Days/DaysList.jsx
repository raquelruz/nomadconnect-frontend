// src/components/Days/DaysList.jsx
export const DaysList = ({ days, selectedDay, setSelectedDay }) => {
	if (!days || days.length === 0) {
		return <p className="px-3 py-2 text-xs text-slate-400">No hay días creados</p>;
	}

	return (
		<div className="relative ml-3 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
			{days.map((day, index) => {
				const isSelected = selectedDay?.id === day.id;

				return (
					<button
						key={day.id}
						onClick={() => setSelectedDay(day)}
						className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${
							isSelected ? "bg-primary-500 font-medium text-white" : "text-slate-600 hover:bg-slate-100"
						}`}
					>
						Día {index + 1}
					</button>
				);
			})}
		</div>
	);
};
