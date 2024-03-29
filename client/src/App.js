import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/dashboard/";
import Configure from "./pages/configure/";

// Hooks
import useTheme from "./hooks/useTheme";

function App() {
	// Theme Handler
	const { getCurrentTheme, setTheme } = useTheme();
	const currentTheme = getCurrentTheme();
	setTheme(currentTheme);

	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="*" element={<Navigate replace to={"/dashboard"} exact />} />
					<Route path="/" element={<Navigate replace to={"/dashboard"} exact />} exact />
					<Route path="/dashboard/*" element={<Dashboard />} exact />
					<Route path="/configure" element={<Configure />} exact />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
