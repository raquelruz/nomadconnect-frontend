import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ActivityCarousel = ({ images = [], title, onImageClick }) => {
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		if (currentImage >= images.length) {
			setCurrentImage(0);
		}
	}, [images, currentImage]);

	if (!images?.length) return null;

	const nextImage = (event) => {
		event.stopPropagation();
		setCurrentImage((prev) => (prev + 1) % images.length);
	};

	const previousImage = (event) => {
		event.stopPropagation();
		setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
	};

	const handleImageClick = () => {
		onImageClick?.(currentImage);
	};

	return (
		<div className="group relative mt-4 overflow-hidden rounded-2xl">
			<img
				src={images[currentImage]}
				alt={title}
				loading="lazy"
				onClick={handleImageClick}
				className="h-72 w-full cursor-pointer object-cover transition duration-500 group-hover:scale-[1.02]"
			/>

			{images.length > 1 && (
				<>
					<button
						type="button"
						aria-label="Imagen anterior"
						onClick={previousImage}
						className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow transition-all duration-200 group-hover:opacity-100 hover:bg-white"
					>
						<ChevronLeft size={18} />
					</button>

					<button
						type="button"
						aria-label="Siguiente imagen"
						onClick={nextImage}
						className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow transition-all duration-200 group-hover:opacity-100 hover:bg-white"
					>
						<ChevronRight size={18} />
					</button>

					<div className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">
						{currentImage + 1} / {images.length}
					</div>

					<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
						{images.map((_, index) => (
							<button
								key={index}
								type="button"
								aria-label={`Ir a la imagen ${index + 1}`}
								onClick={(event) => {
									event.stopPropagation();
									setCurrentImage(index);
								}}
								className={`h-2 rounded-full transition-all ${
									index === currentImage ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white"
								}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};
