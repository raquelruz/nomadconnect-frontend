import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export const ActivityViewer = ({ isOpen, images = [], currentImage, setCurrentImage, onClose }) => {
	useEffect(() => {
		if (!isOpen) return;

		document.body.style.overflow = "hidden";

		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();

			if (event.key === "ArrowRight") {
				setCurrentImage((prev) => (prev + 1) % images.length);
			}

			if (event.key === "ArrowLeft") {
				setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, images.length, onClose, setCurrentImage]);

	if (!isOpen || images.length === 0) return null;

	const nextImage = () => {
		setCurrentImage((prev) => (prev + 1) % images.length);
	};

	const previousImage = () => {
		setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
	};

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 z-999 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
		>
			<button
				onClick={onClose}
				className="absolute right-5 top-5 rounded-full bg-bg-card/10 p-2 text-text-primary transition hover:bg-bg-card/20"
			>
				<X size={26} />
			</button>

			{images.length > 1 && (
				<>
					<button
						onClick={(event) => {
							event.stopPropagation();
							previousImage();
						}}
						className="absolute left-4 rounded-full bg-bg-card/10 p-3 text-text-primary transition hover:bg-bg-card/20"
					>
						<ChevronLeft size={32} />
					</button>

					<button
						onClick={(event) => {
							event.stopPropagation();
							nextImage();
						}}
						className="absolute right-4 rounded-full bg-bg-card/10 p-3 text-text-primary transition hover:bg-bg-card/20"
					>
						<ChevronRight size={32} />
					</button>
				</>
			)}

			<img
				src={images[currentImage]}
				alt=""
				onClick={(e) => e.stopPropagation()}
				className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
			/>

			{images.length > 1 && (
				<>
					<div className="absolute bottom-20 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
						{currentImage + 1} / {images.length}
					</div>

					<div className="absolute bottom-8 flex gap-2">
						{images.map((image, index) => (
							<button
								key={image}
								onClick={(e) => {
									e.stopPropagation();
									setCurrentImage(index);
								}}
								className={`overflow-hidden rounded-lg border-2 transition ${
									index === currentImage
										? "border-white"
										: "border-transparent opacity-60 hover:opacity-100"
								}`}
							>
								<img src={image} alt="" className="h-14 w-14 object-cover" />
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
};
