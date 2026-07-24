export const ModalOverlay = ({ children }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
			{children}
		</div>
	);
};