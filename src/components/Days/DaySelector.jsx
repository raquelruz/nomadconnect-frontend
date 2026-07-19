export const DaySelector = ({ days, selectedDay, setSelectedDay }) => {
	if (!days || days.length === 0) {
		return null;
	}

	return (
		<div className="mt-2 ml-4 flex flex-col gap-1">
			{days.map((day) => {
				let buttonClass = "w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-100";

				if (selectedDay?.id === day.id) {
					buttonClass = "w-full rounded-lg bg-sky-100 px-3 py-2 text-left text-sm font-medium text-sky-700";
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
