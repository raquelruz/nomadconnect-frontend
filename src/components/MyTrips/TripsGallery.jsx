import { Link } from "react-router-dom";
import { Camera, MapPin } from "lucide-react";

export const TripsGallery = ({ trips }) => {
	const tripsWithImage = trips.filter((trip) => trip.image);

	if (tripsWithImage.length === 0) {
		return (
			<div className="rounded-2xl border border-dashed border-border py-12 text-center">
				<Camera size={28} className="mx-auto mb-3 text-text-muted" />
				<p className="text-text-secondary text-sm font-medium">Aún no has subido fotos de tus viajes</p>
				<p className="text-text-muted text-xs mt-1">
					Añade una imagen a tus viajes para que aparezcan aquí
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[110px] sm:auto-rows-[130px] gap-3">
			{tripsWithImage.map((trip, index) => {
				let spanClasses = "";

				if (index === 0) {
					spanClasses = "col-span-2 row-span-2";
				}

				return (
					<Link
						key={trip.id}
						to={`/trips/${trip.id}`}
						className={`group relative overflow-hidden rounded-xl bg-bg-tertiary ${spanClasses}`}
					>
						<img
							src={trip.image}
							alt={trip.title}
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>

						<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/50" />

						<div className="absolute inset-x-0 bottom-0 translate-y-full p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
							<p className="truncate text-sm font-semibold text-white">{trip.title}</p>
							<div className="flex items-center gap-1 text-white/80">
								<MapPin size={11} />
								<p className="truncate text-[11px]">{trip.city}</p>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};