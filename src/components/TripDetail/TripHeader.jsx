import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Heart, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { TripCreator } from "../TripDetail/TripCreator";
import { TripMembersCard } from "../Members/TripMembersCard";
import { useTripLikes } from "../../hooks/useTripLikes";
import { EditTripModal } from "../ui/Modals/EditTripModal";
import { ConfirmModal } from "../ui/ConfirmModal";
import api from "../../api";

export const TripHeader = ({ trip, user, refreshTrip, isOwner = false }) => {
	const { liked, likesCount, loading, toggleLike } = useTripLikes(trip, user);
	const navigate = useNavigate();

	const [showEditModal, setShowEditModal] = useState(false);
	const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	let heartClasses = "flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white shadow-sm backdrop-blur-md transition hover:bg-black/50"

	if (liked) {
		heartClasses = "flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-error-500 shadow-sm backdrop-blur-md transition hover:bg-black/50"
	}

	const handleConfirmDelete = async () => {
		try {
			setDeleting(true);
			await api.delete(`/trips/${trip.id}`);
			navigate(`/my-trips/${user.id}`);
		} catch (error) {
			setDeleting(false);
			setConfirmDeleteOpen(false);
			alert(error.message || "Error al eliminar el viaje");
		}
	};

	return (
		<div className="relative">
			<div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-125">
				<img src={trip.image} alt={trip.title} className="h-full w-full object-cover" />

				<div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/30 to-slate-900/10" />

				<div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
					<Link
						to="/trips"
						className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white shadow-sm backdrop-blur-md transition hover:bg-black/50"
					>
						<ArrowLeft size={18} />
					</Link>

					<div className="flex items-center gap-2">
						{isOwner && (
							<>
								<button
									onClick={() => setShowEditModal(true)}
									title="Editar viaje"
									className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white shadow-sm backdrop-blur-md transition hover:bg-primary-600"
								>
									<Pencil size={16} />
								</button>

								<button
									onClick={() => setConfirmDeleteOpen(true)}
									title="Eliminar viaje"
									className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white shadow-sm backdrop-blur-md transition hover:bg-error-500"
								>
									<Trash2 size={16} />
								</button>
							</>
						)}

						<button
							onClick={toggleLike}
							disabled={loading}
							className={heartClasses}>
								<Heart size={18} fill={liked ? "currentColor" : "none" }/>
						</button>
					</div>
				</div>

				<div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
					<div className="mx-auto max-w-6xl">
						<h1 className="wrap-break-word text-3xl font-bold text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
							{trip.title}
						</h1>

						<div className="mt-4 flex flex-col gap-3 text-white/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
							<div className="flex items-center gap-2">
								<MapPin size={17} className="text-blue-300" />

								<span className="font-medium">
									{trip.city}, {trip.country}
								</span>
							</div>

							<div className="flex items-center gap-2">
								<Calendar size={17} className="text-blue-300" />

								<span className="font-medium">
									{formatDate(trip.startDate)} — {formatDate(trip.endDate)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="flex flex-col gap-6 py-6 lg:flex-row lg:items-start lg:justify-between">
					<div className="min-w-0 flex-1">{trip.owner && <TripCreator owner={trip.owner} />}</div>

					<div className="w-full lg:w-80">
						<TripMembersCard trip={trip} user={user} refreshTrip={refreshTrip} />
					</div>
				</div>
			</div>

			<EditTripModal
				isOpen={showEditModal}
				trip={trip}
				onClose={() => setShowEditModal(false)}
				onUpdated={refreshTrip}
			/>

			<ConfirmModal
				isOpen={confirmDeleteOpen}
				title="Eliminar viaje"
				message={`¿Seguro que quieres eliminar "${trip.title}"? Se borrarán también sus itinerarios, tareas, comentarios y actualizaciones. Esta acción no se puede deshacer.`}
				onConfirm={handleConfirmDelete}
				onCancel={() => setConfirmDeleteOpen(false)}
				loading={deleting}
			/>
		</div>
	);
};
