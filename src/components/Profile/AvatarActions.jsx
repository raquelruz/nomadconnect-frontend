import { Camera, Trash2 } from "lucide-react";

export const AvatarActions = ({
	hasAvatar,
	uploading,
	removing,
	onRemoveClick,
	onFileChange,
}) => {
	let cameraContent = <Camera size={14} />;

	if (uploading) {
		cameraContent = <span className="text-xs">…</span>;
	}

	return (
		<div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-2">
			{hasAvatar && (
				<button
					type="button"
					onClick={onRemoveClick}
					disabled={uploading || removing}
					title="Eliminar foto"
					className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-error-500 ring-4 ring-white transition hover:bg-error-500 hover:text-white"
				>
					<Trash2 size={14} />
				</button>
			)}

			<label
				title="Cambiar foto"
				className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-text-muted ring-4 ring-white transition cursor-pointer hover:bg-primary-500 hover:text-white"
			>
				{cameraContent}
				<input
					type="file"
					accept="image/*"
					className="hidden"
					onChange={onFileChange}
					disabled={uploading || removing}
				/>
			</label>
		</div>
	);
};
