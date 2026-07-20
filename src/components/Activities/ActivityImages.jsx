export const ActivityImages = ({ images = [] }) => {
	if (!images.length) return null;

	return (
		<div
			className="
				mt-4
				flex
				gap-3
				overflow-hidden
			"
		>
			{images.map((image, index) => (
				<img
					key={index}
					src={image}
					alt="activity"
					className="
							h-20
							w-20
							rounded-xl
							object-cover
						"
				/>
			))}
		</div>
	);
};
