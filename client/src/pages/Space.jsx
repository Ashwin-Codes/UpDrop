import React from "react";

// Components
import Sidebar from "../components/Sidebar";
import FileSearchForm from "../components/FileSearchForm";

export default function Space() {
	return (
		<div className="page">
			<Sidebar />
			<div className="content">
				<FileSearchForm />
			</div>
		</div>
	);
}
