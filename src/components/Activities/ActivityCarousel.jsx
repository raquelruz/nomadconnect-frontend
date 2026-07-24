import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useImageCarousel } from "../../hooks/useImageCarousel";

export const ActivityCarousel = ({ images = [], title, onImageClick, badge, height = "h-72" }) => {
	const { currentImage, setCurrentImage, next, previous } = useImageCarousel(images);

	useEffect(() => {
		if (currentImage >= images.length) setCurrentImage(0);
	}, [images, currentImage, setCurrentImage]);

	if (!images?.length) return null;

	const nextImage = (event) => {
		event.stopPropagation();
		next();
	};

	const previousImage = (event) => {
		event.stopPropagation();
		previous();
	};

	const handleImageClick = () => {
		onImageClick?.(currentImage);
	};

	return (
		<div className={`group relative overflow-hidden rounded-2xl ${height}`}>
			<img
				src={images[currentImage]}
				alt={title}
				loading="lazy"
				onClick={handleImageClick}
				className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-[1.03]"
			/>

			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/60 to-transparent" />

			{badge && (
				<span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
					{badge}
				</span>
			)}

			{images.length > 1 && (
				<>
					<button
						type="button"
						aria-label="Imagen anterior"
						onClick={previousImage}
						className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow transition-all duration-200 group-hover:opacity-100 hover:bg-white"
					>
						<ChevronLeft size={16} />
					</button>

					<button
						type="button"
						aria-label="Siguiente imagen"
						onClick={nextImage}
						className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow transition-all duration-200 group-hover:opacity-100 hover:bg-white"
					>
						<ChevronRight size={16} />
					</button>

					<div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
						{currentImage + 1} / {images.length}
					</div>

					<div className="absolute bottom-3 right-3 flex gap-1">
						{images.map((_, index) => (
							<button
								key={index}
								type="button"
								aria-label={`Ir a la imagen ${index + 1}`}
								onClick={(event) => {
									event.stopPropagation();
									setCurrentImage(index);
								}}
								className={`h-1.5 rounded-full transition-all ${
									index === currentImage ? "w-4 bg-white" : "w-1.5 bg-white/60 hover:bg-white"
								}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};