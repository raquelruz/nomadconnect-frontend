import { Ban, UserCheck } from "lucide-react";
import { ModalShell } from "./ModalShell";

export const BlockedUsersModal = ({ isOpen, onClose, blockedUsers, loading, onUnblock }) => {
    if (!isOpen) return null;

    return (
        <ModalShell
            icon={Ban}
            title="Usuarios bloqueados"
            description={`${blockedUsers.length} ${blockedUsers.length === 1 ? "persona bloqueada" : "personas bloqueadas"}`}
            onClose={onClose}
        >
            {blockedUsers.length === 0 && (
                <p className="text-sm text-text-primary/50">No has bloqueado a ningún usuario.</p>
            )}

            {blockedUsers.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {blockedUsers.map((member) => {
                        const memberId = member.id || member._id;

                        return (
                            <div
                                key={memberId}
                                className="flex items-center gap-2.5 rounded-xl border border-text-primary/5 bg-text-primary/2 p-2.5 transition hover:bg-text-primary/5"
                            >
                                <img
                                    src={member.avatar || "/default-avatar.png"}
                                    alt={member.username}
                                    className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-bg-card"
                                />

                                <p className="min-w-0 flex-1 truncate text-sm font-semibold text-text-primary">
                                    @{member.username}
                                </p>

                                <button
                                    onClick={() => onUnblock(member)}
                                    disabled={loading}
                                    title="Desbloquear usuario"
                                    className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-text-primary/40 transition hover:bg-primary-500/10 hover:text-primary-400 disabled:opacity-50"
                                >
                                    <UserCheck size={16} />
                                    <span>Desbloquear</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </ModalShell>
    );
};