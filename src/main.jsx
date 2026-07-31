import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { NotificationsProvider } from "./context/NotificationsContext.jsx";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<BrowserRouter>
			<ThemeProvider>
				<NotificationsProvider>
					<App />
				</NotificationsProvider>
			</ThemeProvider>
		</BrowserRouter>
	</AuthProvider>,
);
