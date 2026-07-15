import { useState } from "react";
import { Compass, X } from "lucide-react";
import { ActivityForm } from "../Activities/ActivityForm";
import api from "../../api";

export const CreateActivityModal = ({ isOpen, dayId, onCreated, onClose }) => {
	const emptyForm = {
		title: "",
		description: "",
		date: "",
		time: "",
		location: "",
		price: "",
	};

	const [form, setForm] = useState(emptyForm);
	const [loading, setLoading] = useState(false);

	const [images, setImages] = useState([]);
	const [previews, setPreviews] = useState([]);

	const handleChange = ({ target }) => {
		setForm((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const handleImagesChange = (event) => {
		const files = Array.from(event.target.files);

		setImages(files);

		const urls = files.map((file) => URL.createObjectURL(file));

		setPreviews(urls);
	};

	const resetForm = () => {
		setForm(emptyForm);
		setImages([]);
		setPreviews([]);
	};

	const handleClose = () => {
		resetForm();
		onClose();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading(true);

			const formData = new FormData();

			formData.append("title", form.title);
			formData.append("description", form.description);
			formData.append("date", form.date);
			formData.append("time", form.time);
			formData.append("location", form.location);
			formData.append("price", form.price || "0");

			images.forEach((image) => {
				formData.append("images", image);
			});

			const response = await api.post(`/activities/${dayId}`, formData);

			onCreated?.(response.data);

			resetForm();
			onClose();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
			<div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
				<div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-blue-50 to-white p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
							<Compass size={20} />
						</div>

						<div>
							<h2 className="text-lg font-bold text-slate-900">Nueva actividad</h2>

							<p className="text-sm text-slate-500">Añade una actividad al día.</p>
						</div>
					</div>

					<button
						type="button"
						onClick={handleClose}
						className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
					>
						<X size={18} />
					</button>
				</div>

				<div className="p-6">
					<ActivityForm
						form={form}
						onChange={handleChange}
						onSubmit={handleSubmit}
						onCancel={handleClose}
						loading={loading}
						submitText="Crear actividad"
						showDate
						showImages
						previews={previews}
						onImagesChange={handleImagesChange}
					/>
				</div>
			</div>
		</div>
	);
};
