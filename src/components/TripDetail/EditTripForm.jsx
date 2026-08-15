import { useState } from "react";
import { MapPin, Image as ImageIcon, Eye, FileText } from "lucide-react";
import api from "../../api";
import { FormActions } from "../ui/FormActions";
import { useToast } from "../../context/ToastContext";

export const EditTripForm = ({ trip, onSuccess, onCancel }) => {
	const toast = useToast();
	const [country, setCountry] = useState(trip.country || "");
	const [city, setCity] = useState(trip.city || "");
	const [description, setDescription] = useState(trip.description || "");
	const [visibility, setVisibility] = useState(trip.visibility || "public");
	const [imageFile, setImageFile] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const inputClass =
		"w-full rounded-xl border border-text-primary/10 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-primary/30 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10";

	const labelClass = "mb-2 flex items-center gap-1.5 text-sm font-medium text-text-primary/80";

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError(null);

		try {
			setSubmitting(true);

			const response = await api.put(`/trips/${trip.id}`, {
				country,
				city,
				description,
				visibility,
			});

			let updatedTrip = response.data;

			if (imageFile) {
				const imageData = new FormData();
				imageData.append("image", imageFile);

				const imageResponse = await api.patch(`/trips/${trip.id}/image`, imageData);
				updatedTrip = imageResponse.data;
			}

			onSuccess(updatedTrip);
			toast.success("Cambios guardados");
		} catch (submitError) {
			setError(submitError.message || "Error al guardar los cambios");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label className={labelClass}>
						<MapPin size={14} className="text-primary-500" />
						País
					</label>

					<input
						type="text"
						value={country}
						onChange={(event) => setCountry(event.target.value)}
						required
						className={inputClass}
					/>
				</div>

				<div>
					<label className={labelClass}>
						<MapPin size={14} className="text-primary-500" />
						Ciudad
					</label>

					<input
						type="text"
						value={city}
						onChange={(event) => setCity(event.target.value)}
						required
						className={inputClass}
					/>
				</div>
			</div>

			<div>
				<label className={labelClass}>
					<FileText size={14} className="text-primary-500" />
					Descripción
				</label>

				<textarea
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					rows={3}
					className={`${inputClass} resize-none`}
				/>
			</div>

			<div>
				<label className={labelClass}>
					<Eye size={14} className="text-primary-500" />
					Visibilidad
				</label>

				<select value={visibility} onChange={(event) => setVisibility(event.target.value)} className={inputClass}>
					<option value="public">Público</option>
					<option value="private">Privado</option>
				</select>
			</div>

			<div>
				<label className={labelClass}>
					<ImageIcon size={14} className="text-primary-500" />
					Imagen de portada (opcional)
				</label>

				<input
					type="file"
					accept="image/*"
					onChange={(event) => setImageFile(event.target.files[0] || null)}
					className="block w-full text-sm text-text-primary/70 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-500/10 file:px-3 file:py-1.5 file:text-primary-600 hover:file:bg-primary-500/20"
				/>
			</div>

			{error && <p className="text-sm font-medium text-error-500">{error}</p>}

			<FormActions onCancel={onCancel} submitLabel="Guardar cambios" loadingLabel="Guardando..." loading={submitting} />
		</form>
	);
};
