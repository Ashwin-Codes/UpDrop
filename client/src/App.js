import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import RecentFiles from "./pages/RecentFiles";
import Space from "./pages/Space";
import Storage from "./pages/Storage";
import Configure from "./pages/Configure";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Navigate replace to={"/dashboard"} />} exact />
					<Route path="/dashboard/*" element={<Dashboard />} exact />
					<Route path="/recents" element={<RecentFiles />} exact />
					<Route path="/space" element={<Space />} exact />
					<Route path="/storage" element={<Storage />} exact />
					<Route path="/configure" element={<Configure />} exact />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
