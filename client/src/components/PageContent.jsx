import React from "react";
import "./css/PageContent.css";
import { Route, Routes } from "react-router-dom";

// Components
import FileSearchForm from "./FileSearchForm";

// Pages
import Dashboard from "../pages/Dashboard";
import RecentFiles from "../pages/RecentFiles";

export default function PageContent() {
	return (
		<>
			<FileSearchForm />
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} exact />
				<Route path="/recents" element={<RecentFiles />} exact />
			</Routes>
		</>
	);
}

// export default function PageContent() {
// 	const [file, setFile] = useState(null);

// 	function uploadFile(e) {
// 		e.preventDefault();
// 		let data = new FormData();
// 		data.append("file", file);

// 		fetch("http://localhost:5000/upload", {
// 			method: "POST",
// 			body: data,
// 		});
// 	}

// 	function onChange(e) {
// 		setFile(e.target.files[0]);
// 	}
// 	return (
// 		<div className="pageContent">
// 			<form action="">
// 				<input onChange={onChange} type="file" />
// 				<button onClick={uploadFile}>send</button>
// 			</form>
// 		</div>
// 	);
// }

// export default function PageContent() {
// 	async function testFunc() {
// 		const test = {
// 			directory: "/",
// 		};
// 		const response = await fetch("http://localhost:5000/files", {
// 			method: "POST",
// 			body: JSON.stringify(test),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		const body = await response.json();
// 		console.log(body);
// 	}
// 	async function createFolderFunc() {
// 		const folderName = { name: "New Folder" };
// 		const response = await fetch("http://localhost:5000/mkdir", {
// 			method: "POST",
// 			body: JSON.stringify(folderName),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		const body = await response.json();
// 		console.log(body);
// 	}
// 	async function downloadFile() {
// 		// const file = { name: "testImage.jpg" };
// 		window.location.href = "http://localhost:5000/download/testImage.jpg";
// 	}
// 	return (
// 		<div className="pageContent">
// 			<button onClick={testFunc}>GetInfo</button>
// 			<button onClick={createFolderFunc}>Create Folder</button>
// 			<button onClick={downloadFile}>Download File</button>
// 		</div>
// 	);
// }
