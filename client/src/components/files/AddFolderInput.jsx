import React, { useRef } from "react";
import "./AddFolderInput.css";
import build from "../../build-type.json";

export default function AddFolderInput({ params, rerender, notify }) {
	const inputRef = useRef();

	function getFolderName() {
		const folderName = inputRef.current.value;
		inputRef.current.value = "";
		inputRef.current.blur();

		// If folderName is empty, folder name will be 'New Folder'
		return folderName.trim() ? folderName.trim() : "New Folder";
	}

	async function createFolder(e) {
		e.preventDefault();
		const folderName = getFolderName();
		let url = "/mkdir";

		// A fix for developers so the urls could automatically change to avoid CORS.
		if (build.TYPE === "DEVELOPMENT") {
			url = "http://localhost:5000/mkdir";
		}

		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({ name: `${params["*"]}/${folderName}` }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		if (data.err) {
			notify(data.errMsg, 5, "error");
		} else {
			notify(data.msg, 2, "success");
			rerender();
		}
	}

	return (
		<>
			<form className="add-folder-input-form" onSubmit={createFolder}>
				<input
					className="input-field"
					autoFocus
					placeholder="New Folder"
					ref={inputRef}
				></input>
			</form>
		</>
	);
}
