import { useState } from "react";
import { Pencil } from "lucide-react";
import { useUpdateProfileField } from "../../hooks/Profile/useUpdateProfileField";

export const ProfileBio = ({ profile, onBioUpdated }) => {
	const [editing, setEditing] = useState(false);
	const [bioDraft, setBioDraft] = useState(profile.bio || "");
	const { updateField, saving } = useUpdateProfileField(profile, onBioUpdated);

	const handleSave = () => {
		updateField("bio", bioDraft).then(() => setEditing(false));
	};

    if (editing) {
        return (
            <div className="mt-3">
                <textarea
                    value={bioDraft}
                    onChange={(event) => setBioDraft(event.target.value)}
                    placeholder="Cuéntanos algo sobre ti..."
                    rows={3}
                    autoFocus
                    className="w-full rounded-xl border border-border bg-bg-secondary p-3 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
                <div className="mt-2 flex gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="text-xs font-semibold text-primary-500 hover:text-primary-600 disabled:opacity-50"
                    >
                        {saving ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={() => setEditing(false)} className="text-xs text-text-muted hover:text-text-secondary">
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    if (profile.bio) {
        return (
            <div className="mt-3">
                <p className="text-sm leading-relaxed text-text-secondary">{profile.bio}</p>
                <button
                    onClick={() => setEditing(true)}
                    className="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600"
                >
                    <Pencil size={12} />
                    Editar biografía
                </button>
            </div>
        );
    }

    return (
        <button onClick={() => setEditing(true)} className="mt-3 text-sm font-medium text-primary-500 hover:text-primary-600">
            + Añadir biografía
        </button>
    );
};