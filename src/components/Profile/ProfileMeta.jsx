import { useState, useRef } from "react";
import { useUpdateProfileField } from "../../hooks/Profile/useUpdateProfileField";
import { LanguageChip } from "./LanguageChip";
import { AddLanguageControl } from "./AddLanguageControl";

export const ProfileMeta = ({ profile, onProfileUpdated }) => {
	const [adding, setAdding] = useState(false);
	const [newLanguage, setNewLanguage] = useState("");
	const hasSubmitted = useRef(false);
	const { updateField, saving } = useUpdateProfileField(profile, onProfileUpdated);

	const languages = profile.languages || [];

	const saveLanguages = (updatedLanguages) => updateField("languages", updatedLanguages);

    const handleStartAdding = () => {
        hasSubmitted.current = false;
        setAdding(true);
    };

    const handleAddLanguage = () => {
        if (hasSubmitted.current) return;
        hasSubmitted.current = true;

        const trimmed = newLanguage.trim();
        setNewLanguage("");
        setAdding(false);

        if (!trimmed || languages.includes(trimmed)) return;

        saveLanguages([...languages, trimmed]);
    };

    const handleRemoveLanguage = (language) => {
        saveLanguages(languages.filter((item) => item !== language));
    };

    return (
        <div className="mt-3 flex flex-wrap items-center gap-2">
            {languages.map((language) => (
                <LanguageChip
                    key={language}
                    language={language}
                    saving={saving}
                    onRemove={() => handleRemoveLanguage(language)}
                />
            ))}

            <AddLanguageControl
                adding={adding}
                newLanguage={newLanguage}
                onStartAdding={handleStartAdding}
                onChangeLanguage={setNewLanguage}
                onConfirm={handleAddLanguage}
            />
        </div>
    );
};