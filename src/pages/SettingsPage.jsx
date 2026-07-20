// src/pages/SettingsPage.jsx
import { AtSign, Mail, User, UserRound } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useProfile } from "../hooks/useProfile";
import { EditableAccountField } from "../components/Settings/EditableAccountField";
import { RoleBadge } from "../components/Profile/RoleBadge";
import { Loading } from "../components/ui/Loading";

const FIELDS = [
	{ field: "username", label: "Usuario", icon: AtSign },
	{ field: "email", label: "Email", icon: Mail },
	{ field: "name", label: "Nombre", icon: User },
	{ field: "surname", label: "Apellido", icon: UserRound },
];

export const SettingsPage = () => {
	const { user: tokenUser } = useAuth();
	const { profile, setProfile, loading, error } = useProfile(tokenUser?.id);

	if (loading) {
		return <Loading message="Cargando ajustes..."/>;
	}

	if (error) {
		return (
			<div className="mx-auto max-w-2xl px-4 py-12">
				<div className="rounded-xl border border-error-500/20 bg-error-500/10 p-4 text-sm text-error-500">
					{error}
				</div>
			</div>
		);
	}

	if (!profile) {
		return <p className="mx-auto max-w-2xl px-4 py-12 text-sm text-text-muted">No se ha encontrado el perfil.</p>;
	}

	const initial = (profile.username || "?").charAt(0).toUpperCase();
	const displayName = profile.name ? `${profile.name} ${profile.surname || ""}`.trim() : profile.username;

	return (
		<div className="relative mx-auto max-w-2xl px-4 py-10 sm:py-14">
			<div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/20 blur-[100px]" />

			<div className="mb-8 text-center">
				<p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Ajustes</p>
				<h1 className="font-title mt-1 bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-4xl text-transparent">
					Tu cuenta
				</h1>
				<p className="mt-2 text-sm text-text-secondary">
					Gestiona tus datos personales y de acceso a NomadConnect.
				</p>
			</div>

			<div className="rounded-3xl border border-border-light bg-bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
				<div className="flex items-center gap-4 border-b border-border pb-6">
					<div className="relative shrink-0">
						<div className="absolute inset-0 rounded-2xl bg-primary-500/40 blur-md" />
						<div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary-600 to-primary-400 text-2xl font-bold text-white ring-2 ring-primary-400/40">
							{initial}
						</div>
					</div>

					<div className="min-w-0 flex-1">
						<p className="truncate text-lg font-bold text-text-primary">{displayName}</p>
						<p className="truncate text-sm text-text-muted">@{profile.username}</p>
					</div>

					<RoleBadge role={profile.role} />
				</div>

				<dl className="divide-y divide-border">
					{FIELDS.map(({ field, label, icon }) => (
						<EditableAccountField
							key={field}
							profile={profile}
							field={field}
							label={label}
							icon={icon}
							onUpdated={setProfile}
						/>
					))}
				</dl>
			</div>
		</div>
	);
};
