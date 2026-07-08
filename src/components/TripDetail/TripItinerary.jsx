export const TripItinerary = ({itinerary=[]}) => {


	return (

		<section className="mt-10">


			<h2 className="
				text-2xl
				font-bold
				text-blue-950
				mb-5
			">
				Trip Itinerary
			</h2>



			{
				itinerary.length === 0
				?
				<div className="
					bg-white
					rounded-2xl
					p-5
				">
					No itinerary available
				</div>

				:

				itinerary.map((day,index)=>(
					
					<div
						key={index}
						className="
							bg-white
							rounded-2xl
							p-5
							mb-3
						"
					>

						{day}

					</div>

				))
			}


		</section>

	);

};