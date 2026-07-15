import { useState } from "react";
import { Compass } from "lucide-react";
import api from "../../api";

import { ActivityHeader } from "./ActivityHeader";
import { ActivityActions } from "./ActivityActions";
import { ActivityViewer } from "./ActivityViewer";
import { EditActivityModal } from "../Modals/EditActivityModal";

import { ConfirmModal } from "../ui/ConfirmModal";

export const ActivityCard = ({ activity, refreshTrip, isOwner }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [viewerOpen, setViewerOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	const handleOpenViewer = (index = 0) => {
		setCurrentImage(index);
		setViewerOpen(true);
	};

	const handleCloseViewer = () => {
		setViewerOpen(false);
	};

	const handleDelete = async () => {
		try {
			await api.delete(`/activities/${activity.id}`);
			refreshTrip();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="border-b border-slate-200 py-5 last:border-b-0">
				<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-1 gap-4">
						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
							<Compass size={20} />
						</div>

						<ActivityHeader activity={activity} onImageClick={handleOpenViewer} />
					</div>

					<ActivityActions
						isOwner={isOwner}
						onToggleEdit={() => setShowEditModal(true)}
						onDelete={() => setShowDeleteModal(true)}
					/>
				</div>
			</div>

			<ActivityViewer
				isOpen={viewerOpen}
				images={activity.images || []}
				currentImage={currentImage}
				setCurrentImage={setCurrentImage}
				onClose={handleCloseViewer}
			/>

			<EditActivityModal
				isOpen={showEditModal}
				activity={activity}
				refreshTrip={refreshTrip}
				onClose={() => setShowEditModal(false)}
			/>

			<ConfirmModal
				isOpen={showDeleteModal}
				title="Eliminar actividad"
				message="¿Seguro que quieres eliminar esta actividad? Esta acción no se puede deshacer."
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={async () => {
					await handleDelete();
					setShowDeleteModal(false);
				}}
			/>
		</>
	);
};
