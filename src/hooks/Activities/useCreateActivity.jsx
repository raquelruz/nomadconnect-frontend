import { useState } from "react";
import { useEntityActions } from "../Shared/useEntityActions";
import { useActivityForm } from "./useActivityForm";

export const useCreateActivity = ({ dayId, dayDate, onCreated, onClose }) => {
	const { form, handleChange, resetForm } = useActivityForm();
	const { create, loading } = useEntityActions({ resource: "activities", onSuccess: onCreated });

	const [images, setImages] = useState([]);
	const [previews, setPreviews] = useState([]);

	const handleImagesChange = (event) => {
		const files = Array.from(event.target.files);
		setImages(files);
		setPreviews(files.map((file) => URL.createObjectURL(file)));
	};

	const handleRemoveImage = (index) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
		setPreviews((prev) => prev.filter((_, i) => i !== index));
	};

	const close = () => {
		resetForm();
		setImages([]);
		setPreviews([]);
		onClose();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("title", form.title);
		formData.append("description", form.description);
		formData.append("date", dayDate);
		formData.append("time", form.time);
		formData.append("location", form.location);
		formData.append("price", form.price || "0");
		images.forEach((image) => formData.append("images", image));

		await create(dayId, formData);
		close();
	};

	return { form, handleChange, images, previews, handleImagesChange, handleRemoveImage, loading, handleSubmit, close };
};
