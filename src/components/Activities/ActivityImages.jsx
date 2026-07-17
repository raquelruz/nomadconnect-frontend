export const ActivityImages = ({ images = [] }) => {
	if (!images.length) return null;

	return (
		<div className="grid grid-cols-2 gap-2 mt-4">
			{images.map((image, index) => (
				<img
					key={index}
					src={image}
					alt="activity"
					className="
						w-full
						h-32
						object-cover
						rounded-xl
					"
				/>
			))}
		</div>
	);
};
