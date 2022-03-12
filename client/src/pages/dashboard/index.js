import React, { useRef, useState } from "react";

// Components
import Sidebar from "../../components/sidebar";
import FileSearchForm from "../../components/search-file";
import Files from "../../components/files";

// CSS
import "./Dashboard.css";

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
