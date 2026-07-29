import { useState } from "react";

export const useImageCarousel = (images = [], initialIndex = 0) => {
	const [currentImage, setCurrentImage] = useState(initialIndex);

	const next = () => setCurrentImage((prev) => (prev + 1) % images.length);
	const previous = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
	const goTo = (index) => setCurrentImage(index);

	return { currentImage, setCurrentImage, next, previous, goTo };
};