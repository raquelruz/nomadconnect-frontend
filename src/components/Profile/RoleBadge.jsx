export const RoleBadge = ({ role }) => {
    const isAdmin = role === "admin";

    return (
        <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
                isAdmin ? "bg-primary-600 text-white" : "bg-bg-secondary text-text-secondary"
            }`}
            title={isAdmin ? "Administrador" : "Usuario"}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${isAdmin ? "bg-primary-300" : "bg-text-muted"}`} />
            {isAdmin ? "Admin" : "User"}
        </span>
    );
};