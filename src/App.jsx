import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ExplorePage } from "./pages/ExplorePage";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";
import { MyTripsPage } from "./pages/MyTripsPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { DetailTripPage } from "./pages/DetailTripPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { NotificationsPage } from "./pages/NotificationsPage.jsx";

export const App = () => {
	return (
		<>
			<Navbar />

			<main className="bg-bg-primary">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					<Route path="/" element={<HomePage />} />
					<Route path="/explore" element={<ProtectedRoute>{<ExplorePage />}</ProtectedRoute>} />

					<Route path="/my-trips/:id" element={<ProtectedRoute>{<MyTripsPage />}</ProtectedRoute>} />

					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/settings"
						element={
							<ProtectedRoute>
								<SettingsPage />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/notifications"
						element={
							<ProtectedRoute>
								<NotificationsPage />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/trips/:id"
						element={
							<ProtectedRoute>
								<DetailTripPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</main>
		</>
	);
};
