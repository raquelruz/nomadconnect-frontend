import { useState } from "react";

export const useCommentEditor = ({ id, initialText, onSave }) => {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(initialText);

	const startEditing = () => {
		setEditing(true);
	};

	const cancelEditing = () => {
		setEditing(false);
		setText(initialText);
	};

	const saveEditing = async () => {
		await onSave(id, text);
		setEditing(false);
	};

	return { editing, text, setText, startEditing, cancelEditing, saveEditing };
};
