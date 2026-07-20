// src/pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import { Camera, Loader } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import api from "../api";
import { useProfile } from "../hooks/useProfile";
import { UserAvatar } from "../components/ui/UserAvatar";
import { ProfileBio } from "../components/Profile/ProfileBio";
import { ProfileStats } from "../components/Profile/ProfileStats";
import { ProfileMeta } from "../components/Profile/ProfileMeta";
import { TravelerBadge } from "../components/Profile/TravelerBadge";
import { TripsGallery } from "../components/MyTrips/TripsGallery";
import { TripThumbnailProfile } from "../components/Profile/TripThumbnailProfile";
import { Loading } from "../components/ui/Loading";

export const ProfilePage = () => {
	const { user: tokenUser } = useAuth();
	const { profile, setProfile, loading: profileLoading, error: profileError } = useProfile(tokenUser?.id);

	const [trips, setTrips] = useState([]);
	const [tripsLoading, setTripsLoading] = useState(true);
	const [tripsError, setTripsError] = useState(null);
	const [uploadingAvatar, setUploadingAvatar] = useState(false);
	const [avatarError, setAvatarError] = useState(null);

	useEffect(() => {
		if (!tokenUser?.id) return;

		setTripsLoading(true);

		api.get(`/trips/my-trips/${tokenUser.id}`)
			.then((response) => setTrips(response.data))
			.catch((error) => setTripsError(error.message || "Error cargando los viajes"))
			.finally(() => setTripsLoading(false));
	}, [tokenUser?.id]);

	const handleAvatarChange = (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("avatar", file);

		setUploadingAvatar(true);
		setAvatarError(null);

		api.patch("/users/avatar", formData)
			.then((response) => setProfile(response.data))
			.catch((error) => setAvatarError(error.message || "Error subiendo el avatar"))
			.finally(() => setUploadingAvatar(false));
	};

	const loading = profileLoading || tripsLoading;
	const error = profileError || tripsError;

	if (loading) return <Loading message="Cargando perfil..."/>;

	if (error) {
		return (
			<div className="max-w-3xl px-4 py-12">
				<div className="rounded-xl border border-error-500/20 bg-error-500/10 p-4 text-sm text-error-500">
					{error}
				</div>
			</div>
		);
	}

	if (!profile)
		return <p className="mx-auto max-w-3xl px-4 py-12 text-sm text-text-muted">No se ha encontrado el perfil.</p>;

	const hasTrips = trips.length > 0;
	const recentTrips = trips.slice(0, 3);
	const memberSince = profile.createdAt
		? new Date(profile.createdAt).toLocaleDateString("es-ES", { month: "long", year: "numeric" })
		: null;

	return (
		<div className="mx-auto max-w-3xl px-4 py-10">
			<div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-7">
				<div className="flex gap-4">
					<div className="relative shrink-0">
						<UserAvatar user={profile} size="xl" />

						<label
							className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-border bg-bg-card text-text-secondary shadow-sm transition hover:text-primary-500"
							title="Cambiar foto"
						>
							<Camera size={13} />
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleAvatarChange}
								disabled={uploadingAvatar}
							/>
						</label>
					</div>

					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-center gap-2">
							<h2 className="text-lg font-semibold text-text-primary">
								{profile.name ? `${profile.name} ${profile.surname || ""}`.trim() : profile.username}
							</h2>
							<TravelerBadge tripsCount={trips.length} />
						</div>

						<p className="mt-0.5 text-sm text-text-muted">
							@{profile.username}
							{memberSince && <> · Miembro desde {memberSince}</>}
						</p>

						{uploadingAvatar && <p className="mt-1 text-xs text-text-muted">Subiendo foto...</p>}
						{avatarError && <p className="mt-1 text-xs text-error-500">{avatarError}</p>}

						<ProfileBio profile={profile} onBioUpdated={setProfile} />
						<ProfileMeta profile={profile} onProfileUpdated={setProfile} />
					</div>
				</div>

				<ProfileStats trips={trips} />
			</div>

			<div className="mt-6 rounded-2xl border border-border bg-bg-card p-6 sm:p-7">
				<h3 className="mb-4 text-sm font-semibold text-text-primary">Galería de aventuras</h3>
				<TripsGallery trips={trips} />
			</div>

			<div className="mt-6 rounded-2xl border border-border bg-bg-card p-6 sm:p-7">
				<h3 className="mb-4 text-sm font-semibold text-text-primary">Mis últimos viajes</h3>

				{!hasTrips && <p className="text-sm text-text-muted">Aún no tienes viajes.</p>}

				{hasTrips && (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{recentTrips.map((trip) => (
							<div
								key={trip.id}
								className="cursor-pointer overflow-hidden rounded-xl border border-border transition hover:shadow-md"
							>
								<TripThumbnailProfile trip={trip} />
								<div className="p-3">
									<p className="truncate text-sm font-medium text-text-primary">{trip.title}</p>
									{trip.city && (
										<p className="truncate text-xs text-text-muted">
											{trip.city}, {trip.country}
										</p>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
