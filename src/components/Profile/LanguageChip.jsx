import { X } from "lucide-react";

export const LanguageChip = ({ language, saving, onRemove }) => {
    return (
        <span className="flex items-center gap-1.5 rounded-full bg-bg-secondary py-1 pl-2.5 pr-1.5 text-xs font-medium text-text-secondary">
            {language}
            <button
                onClick={onRemove}
                disabled={saving}
                className="text-text-muted transition hover:text-error-500 disabled:opacity-50"
            >
                <X size={12} />
            </button>
        </span>
    );
};