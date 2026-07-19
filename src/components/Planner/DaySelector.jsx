export const DaySelector = ({ days, selectedDay, setSelectedDay }) => {
	if (!days || days.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-col gap-2">
			{days.map((day) => {
				let buttonClass = "rounded-lg px-3 py-2 text-left hover:bg-slate-100";

				if (selectedDay?.id === day.id) {
					buttonClass = "rounded-lg bg-sky-100 px-3 py-2 text-left font-medium text-sky-700";
				}

				return (
					<button key={day.id} className={buttonClass} onClick={() => setSelectedDay(day)}>
						{day.title}
					</button>
				);
			})}
		</div>
	);
};
