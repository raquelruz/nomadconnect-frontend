import { useEffect, useState } from "react";

const emptyForm = {
	title: "",
	description: "",
	time: "",
	location: "",
	price: "",
};

export const useActivityForm = (activity, isOpen) => {
	const [form, setForm] = useState(emptyForm);

	useEffect(() => {
		if (!activity) {
			setForm(emptyForm);
			return;
		}

		setForm({
			title: activity.title || "",
			description: activity.description || "",
			time: activity.time || "",
			location: activity.location || "",
			price: activity.price || "",
		});
	}, [activity, isOpen]);

	const handleChange = ({ target }) => {
		setForm((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const resetForm = () => setForm(emptyForm);

	return { form, setForm, handleChange, resetForm };
};
