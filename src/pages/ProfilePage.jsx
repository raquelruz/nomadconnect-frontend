import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../api";
import { ProfileAvatar } from "../components/Profile/ProfileAvatar";
import { AvatarActions } from "../components/Profile/AvatarActions";
import { ProfileBio } from "../components/Profile/ProfileBio";
import { ProfileStats } from "../components/Profile/ProfileStats";
import { ProfileMeta } from "../components/Profile/ProfileMeta";
import { TravelerBadge } from "../components/Profile/TravelerBadge";
import { TripsGallery } from "../components/MyTrips/TripsGallery";
import { TripThumbnailProfile } from "../components/Profile/TripThumbnailProfile";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { LikedTripsSection } from "../components/Profile/LikedTripsSection";
import { BlockedUsersModal } from "../components/ui/Modals/BlockedUsersModal";
import { useBlockedUsers } from "../hooks/useBlockedUsers";
import { useToast } from "../context/ToastContext";
import { Ban } from "lucide-react";

export const ProfilePage = () => {
	const { user: tokenUser } = useAuth();
	const [profile, setProfile] = useState(null);
	const [trips, setTrips] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [uploadingAvatar, setUploadingAvatar] = useState(false);
	const [removingAvatar, setRemovingAvatar] = useState(false);
	const [showRemoveAvatarConfirm, setShowRemoveAvatarConfirm] = useState(false);
	const [likedTrips, setLikedTrips] = useState([]);
	const [showBlockedModal, setShowBlockedModal] = useState(false);

	const { blockedUsers, loading: blockedLoading, unblockUser } = useBlockedUsers();
	const toast = useToast();

	useEffect(() => {
		if (!tokenUser?.id) return;
		setLoading(true);
		Promise.all([
			api.get(`/users/${tokenUser.id}`),
			api.get(`/trips/my-trips/${tokenUser.id}`),
			api.get(`/trips/liked/${tokenUser.id}`),
		])
			.then(([profileResponse, tripsResponse, likedTripsResponse]) => {
				setProfile(profileResponse.data);
				setTrips(tripsResponse.data);
				setLikedTrips(likedTripsResponse.data);
			})
			.catch((error) => setError(error.message || "Error cargando el perfil"))
			.finally(() => setLoading(false));
	}, [tokenUser?.id]);

	const handleAvatarChange = (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("avatar", file);

		setUploadingAvatar(true);
		api.patch("/users/avatar", formData)
			.then((response) => setProfile(response.data))
			.catch((error) => setError(error.message || "Error subiendo el avatar"))
			.finally(() => setUploadingAvatar(false));
	};

	const handleRemoveAvatar = () => {
		setRemovingAvatar(true);
		api.delete("/users/avatar")
			.then((response) => setProfile(response.data))
			.catch((error) => setError(error.message || "Error eliminando el avatar"))
			.finally(() => {
				setRemovingAvatar(false);
				setShowRemoveAvatarConfirm(false);
			});
	};

	const handleUnlikeTrip = async (tripId) => {
		try {
			await api.post(`/trips/${tripId}/like`);
			setLikedTrips((prev) => prev.filter((trip) => trip.id !== tripId));
		} catch (error) {
			setError(error.message || "Error al quitar el like");
		}
	};

	const handleUnblock = async (member) => {
		try {
			await unblockUser(member.id || member._id);
			toast.success(`Has desbloqueado a @${member.username}`);
		} catch (error) {
			toast.error(error.message || "Error al desbloquear el usuario");
		}
	};

	if (loading) return <p className="text-gray-500">Cargando perfil...</p>;

	if (error) {
		return <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>;
	}

	if (!profile) return <p className="text-gray-500">No se ha encontrado el perfil.</p>;

	const hasTrips = trips.length > 0;
	const recentTrips = trips.slice(0, 3);

	return (
		<div className="max-w-5xl mx-auto">
			<div className="bg-bg-card rounded-2xl shadow-sm border border-border p-6 mb-6">
				<div className="flex flex-col sm:flex-row sm:items-start gap-6">
					<div className="relative shrink-0 w-fit mx-auto sm:mx-0">
						<ProfileAvatar profile={profile} />

						<AvatarActions
							hasAvatar={!!profile.avatar}
							uploading={uploadingAvatar}
							removing={removingAvatar}
							onRemoveClick={() => setShowRemoveAvatarConfirm(true)}
							onFileChange={handleAvatarChange}
						/>
					</div>

					<ConfirmModal
						isOpen={showRemoveAvatarConfirm}
						title="Eliminar foto de perfil"
						message="¿Seguro que quieres eliminar tu foto de perfil? Se mostrará el avatar por defecto."
						onConfirm={handleRemoveAvatar}
						onCancel={() => setShowRemoveAvatarConfirm(false)}
						loading={removingAvatar}
					/>

					<div className="flex-1 text-center sm:text-left">
						<div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
							<h2 className="text-xl font-bold text-text-primary">
								{profile.fullName || profile.username}
							</h2>
							<TravelerBadge tripsCount={trips.length} />
						</div>
						<p className="text-text-muted text-sm mt-0.5">@{profile.username}</p>

						<ProfileBio profile={profile} onBioUpdated={setProfile} />
					</div>
				</div>

				<ProfileStats trips={trips} />
				<ProfileMeta profile={profile} onProfileUpdated={setProfile} />
			</div>

			<div className="mb-6">
				<button
					onClick={() => setShowBlockedModal(true)}
					className="flex w-full items-center justify-between rounded-2xl border border-border bg-bg-card p-4 text-sm font-semibold text-text-primary shadow-sm transition hover:bg-text-primary/5"
				>
					<span className="flex items-center gap-2">
						<Ban size={16} className="text-text-primary/40" />
						Usuarios bloqueados
					</span>
					<span className="rounded-full bg-text-primary/10 px-2.5 py-0.5 text-xs font-bold text-text-primary/60">
						{blockedUsers.length}
					</span>
				</button>
			</div>

			<div className="bg-bg-card rounded-2xl shadow-sm border border-border p-6 mb-6">
				<LikedTripsSection trips={likedTrips} onUnlike={handleUnlikeTrip} />
			</div>

			<div className="bg-bg-card rounded-2xl shadow-sm border border-border p-6 mb-6">
				<h3 className="font-bold text-text-primary mb-4">Galería de aventuras</h3>
				<TripsGallery trips={trips} />
			</div>

			<div className="bg-bg-card rounded-2xl shadow-sm border border-border p-6 mb-6">
				<h3 className="font-bold text-text-primary mb-4">Mis últimos viajes</h3>

				{!hasTrips && <p className="text-gray-400 text-sm">Aún no tienes viajes.</p>}

				{hasTrips && (
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{recentTrips.map((trip) => (
							<div
								key={trip.id}
								className="bg-bg-card/50 rounded-xl overflow-hidden border border-border hover:shadow-md transition cursor-pointer"
							>
								<TripThumbnailProfile trip={trip} />
								<div className="p-3">
									<p className="text-sm font-medium text-text-primary truncate">{trip.title}</p>
									{trip.destination && (
										<p className="text-xs text-gray-400 truncate">{trip.destination}</p>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<BlockedUsersModal
				isOpen={showBlockedModal}
				onClose={() => setShowBlockedModal(false)}
				blockedUsers={blockedUsers}
				loading={blockedLoading}
				onUnblock={handleUnblock}
			/>
		</div>
	);
};
