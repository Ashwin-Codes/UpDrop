import React, { useRef, useState } from "react";

// Components
import Sidebar from "../components/Sidebar";
import FileSearchForm from "../components/FileSearchForm";
import Files from "../components/dashboard-components/Files";

// CSS
import "./css/Dashboard.css";

export default function Dashboard() {
	const [searchInputText, setSearchInputText] = useState("");
	const searchInputRef = useRef();

	function getSearchText() {
		setSearchInputText(searchInputRef.current.value);
	}

	return (
		<div className="page">
			<Sidebar />
			<div className="content">
				<FileSearchForm searchInputRef={searchInputRef} onChange={getSearchText} />
				<Files searchInputText={searchInputText} />
			</div>
		</div>
	);
}
