import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

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
		<>
			<div className="relative">
				<img src={trip.image} alt={trip.title} className="h-56 w-full object-cover sm:h-72 lg:h-112.5" />

				<Link
					to="/trips"
					className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:shadow-lg sm:left-6 sm:top-6"
				>
					←
				</Link>

				<button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:shadow-lg sm:right-6 sm:top-6">
					♡
				</button>
			</div>

			<main className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="relative -mt-10 rounded-2xl bg-white p-5 shadow-xl sm:-mt-20 sm:rounded-3xl sm:p-8">
					<div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
						<div className="min-w-0 flex-1">
							<h1 className="wrap-break-word text-3xl font-bold text-blue-950 sm:text-4xl">
								{trip.title}
							</h1>

							<div className="mt-4 flex flex-col gap-3 text-slate-500 sm:flex-row sm:flex-wrap sm:gap-6">
								<div className="flex items-center gap-2">
									<MapPin size={18} className="text-blue-600" />

									<span className="font-medium">
										{trip.city}, {trip.country}
									</span>
								</div>

								<div className="flex items-center gap-2">
									<Calendar size={18} className="text-blue-600" />

									<span className="font-medium">
										{formatDate(trip.startDate)} — {formatDate(trip.endDate)}
									</span>
								</div>
							</div>

							{trip.owner && (
								<div className="mt-6">
									<TripCreator owner={trip.owner} />
								</div>
							)}
						</div>

						<div className="w-full lg:w-80">
							<TripMembersCard trip={trip} user={user} refreshTrip={refreshTrip} />
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
