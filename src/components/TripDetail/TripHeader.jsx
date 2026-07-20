import { Link } from "react-router-dom";
import { Calendar, MapPin, Heart, ArrowLeft } from "lucide-react";
import { TripCreator } from "../TripDetail/TripCreator";
import { TripMembersCard } from "../Members/TripMembersCard";

export const TripHeader = ({ trip, user, refreshTrip }) => {
	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	return (
		<div className="relative">
			<div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-125">
				<img src={trip.image} alt={trip.title} className="h-full w-full object-cover" />

				<div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/30 to-slate-900/10" />

				<div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
					<Link
						to="/trips"
						className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
					>
						<ArrowLeft size={18} />
					</Link>

					<button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25">
						<Heart size={18} />
					</button>
				</div>

				<div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
					<div className="mx-auto max-w-6xl">
						<h1 className="wrap-break-word text-3xl font-bold text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
							{trip.title}
						</h1>

						<div className="mt-4 flex flex-col gap-3 text-white/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
							<div className="flex items-center gap-2">
								<MapPin size={17} className="text-blue-300" />

								<span className="font-medium">
									{trip.city}, {trip.country}
								</span>
							</div>

							<div className="flex items-center gap-2">
								<Calendar size={17} className="text-blue-300" />

								<span className="font-medium">
									{formatDate(trip.startDate)} — {formatDate(trip.endDate)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="flex flex-col gap-6 py-6 lg:flex-row lg:items-start lg:justify-between">
					<div className="min-w-0 flex-1">{trip.owner && <TripCreator owner={trip.owner} />}</div>

					<div className="w-full lg:w-80">
						<TripMembersCard trip={trip} user={user} refreshTrip={refreshTrip} />
					</div>
				</div>
			</div>
		</div>
	);
};
