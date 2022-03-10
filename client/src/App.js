import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Configure from "./pages/Configure";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Navigate replace to={"/dashboard"} />} exact />
					<Route path="/dashboard/*" element={<Dashboard />} exact />
					<Route path="/configure" element={<Configure />} exact />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
