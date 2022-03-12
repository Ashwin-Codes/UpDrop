import React from "react";

// Components
import Sidebar from "../../components/sidebar";
import FileSearchForm from "../../components/search-file";

// Css
import "./Configure.css";

export default function Configure() {
	return (
		<div className="page">
			<Sidebar />
			<div className="content">
				<FileSearchForm />
			</div>
		</div>
	);
}
