export const DaysList = ({ days, selectedDay, setSelectedDay }) => {
	if (!days || days.length === 0) {
		return <p className="px-3 py-2 text-sm text-slate-400">No hay días creados</p>;
	}

	return (
		<div className="mt-2 ml-4 flex flex-col gap-1">
			{days.map((day, index) => {
				const isSelected = selectedDay?.id === day.id;

				return (
					<button
						key={day.id}
						onClick={() => setSelectedDay(day)}
						className={
							isSelected
								? "rounded-lg bg-sky-100 px-3 py-2 text-left text-sm font-medium text-sky-700"
								: "rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-100"
						}
					>
						Día {index + 1}
					</button>
				);
			})}
		</div>
	);
};
