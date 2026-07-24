import { useCallback, useEffect, useState } from "react";
import api from "../api";

export const useTasks = (tripId) => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	const getTasks = useCallback(async () => {
		try {
			setLoading(true);
			const { data } = await api.get(`/tasks/trip/${tripId}`);
			setTasks(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [tripId]);

	useEffect(() => {
		if (!tripId) return;
		getTasks();
	}, [tripId, getTasks]);

	const runAndRefresh = async (request) => {
		try {
			await request();
			getTasks();
		} catch (error) {
			console.error(error);
		}
	};

	const createTask = (title, assignedTo) =>
		runAndRefresh(() => api.post("/tasks", { title, tripId, assignedTo }));

	const toggleTask = (taskId) => runAndRefresh(() => api.patch(`/tasks/${taskId}`));

	const editTask = (taskId, title) => runAndRefresh(() => api.put(`/tasks/${taskId}`, { title }));

	const deleteTask = (taskId) => runAndRefresh(() => api.delete(`/tasks/${taskId}`));

	return { loading, tasks, getTasks, createTask, toggleTask, editTask, deleteTask };
};