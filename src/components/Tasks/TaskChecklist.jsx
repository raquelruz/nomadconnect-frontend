import { useMemo, useState } from "react";
import { ListChecks } from "lucide-react";
import { useTasks } from "../../hooks/useTasks";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";

const BASE_FILTERS = [
	{ id: "all", label: "Todas" },
	{ id: "pending", label: "Pendientes" },
	{ id: "completed", label: "Completadas" },
	{ id: "mine", label: "Mis tareas" },
];

export const TaskChecklist = ({ trip, user, isOwner }) => {
	const { loading, tasks, createTask, toggleTask, editTask, deleteTask } = useTasks(trip.id);
	const [filter, setFilter] = useState("all");

	const members = [trip.owner, ...(trip.members || [])];
	const completedCount = tasks.filter((task) => task.isCompleted).length;
	const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

	const filters = user ? BASE_FILTERS : BASE_FILTERS.filter((option) => option.id !== "mine");

	const visibleTasks = useMemo(() => {
		if (filter === "pending") return tasks.filter((task) => !task.isCompleted);
		if (filter === "completed") return tasks.filter((task) => task.isCompleted);
		if (filter === "mine") return tasks.filter((task) => task.assignedTo?.id === user?.id);
		return tasks;
	}, [tasks, filter, user]);

	return (
		<section id="checklist" className="mt-8 scroll-mt-24 rounded-2xl bg-bg-card p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
					<ListChecks size={20} />
				</div>

				<div className="flex-1">
					<h2 className="text-xl font-bold text-text-primary">Checklist del viaje</h2>
					<p className="text-sm text-text-primary/50">
						{completedCount} de {tasks.length} completadas
					</p>
				</div>
			</div>

			{tasks.length > 0 && (
				<div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-text-primary/10">
					<div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${progress}%` }} />
				</div>
			)}

			{user && (
				<div className="mb-4">
					<TaskForm
						onSubmit={createTask}
						members={members}
						variant="compact"
						submitLabel="Añadir"
						sendingLabel="Añadiendo..."
						placeholder="Nueva tarea..."
					/>
				</div>
			)}

			{tasks.length > 0 && (
				<div className="mb-4 flex flex-wrap gap-2">
					{filters.map((option) => (
						<button
							key={option.id}
							type="button"
							onClick={() => setFilter(option.id)}
							className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
								filter === option.id
									? "bg-primary-600 text-white"
									: "bg-text-primary/5 text-text-primary/60 hover:bg-text-primary/10"
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}

			{loading && <p className="text-sm text-text-primary/50">Cargando tareas...</p>}

			{!loading && tasks.length === 0 && (
				<p className="text-sm text-text-primary/50">Aún no hay tareas. Añade la primera.</p>
			)}

			{!loading && tasks.length > 0 && visibleTasks.length === 0 && (
				<p className="text-sm text-text-primary/50">No hay tareas en este filtro.</p>
			)}

			{!loading && visibleTasks.length > 0 && (
				<div className="space-y-2">
					{visibleTasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							canManage={isOwner}
							toggleTask={toggleTask}
							editTask={editTask}
							deleteTask={deleteTask}
						/>
					))}
				</div>
			)}
		</section>
	);
};