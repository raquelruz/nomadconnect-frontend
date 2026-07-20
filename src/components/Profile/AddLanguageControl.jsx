import { Plus } from "lucide-react";

export const AddLanguageControl = ({ adding, newLanguage, onStartAdding, onChangeLanguage, onConfirm }) => {
    if (adding) {
        return (
            <input
                value={newLanguage}
                onChange={(event) => onChangeLanguage(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && onConfirm()}
                onBlur={onConfirm}
                autoFocus
                placeholder="Idioma..."
                className="w-24 rounded-full border border-border bg-bg-secondary px-2.5 py-1 text-xs text-text-primary outline-none transition focus:ring-2 focus:ring-primary-500/20"
            />
        );
    }

    return (
        <button
            onClick={onStartAdding}
            className="flex items-center gap-1 rounded-full border border-dashed border-primary-500/30 py-1 pl-2.5 pr-3 text-xs font-medium text-primary-500 transition hover:bg-primary-500/10"
        >
            <Plus size={12} />
            Añadir
        </button>
    );
};