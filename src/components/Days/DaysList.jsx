export const DaysList = ({ days, selectedDay, setSelectedDay }) => {
	if (!days || days.length === 0) {
		return <p className="px-3 py-2 text-xs text-text-primary/40">No hay días creados</p>;
	}

	return (
		<div className="relative ml-3 flex flex-col gap-0.5 border-l border-text-primary/10 pl-3">
			{days.map((day, index) => {
				const isSelected = selectedDay?.id === day.id;

				return (
					<button
						key={day.id}
						onClick={() => setSelectedDay(day)}
						className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${
							isSelected
								? "bg-primary-600/15 font-medium text-primary-400"
								: "text-text-primary/60 hover:bg-text-primary/5"
						}`}
					>
						Día {index + 1}
					</button>
				);
			})}
		</div>
	);
};