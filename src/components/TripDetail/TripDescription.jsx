export const TripDescription = ({ description }) => (
	<section className="mt-8 sm:mt-10">
		<h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
			Descripción
		</h2>

		<p className="mt-3 text-sm leading-relaxed wrap-break-word text-gray-600 sm:mt-4 sm:text-base">
			{description}
		</p>
	</section>
);