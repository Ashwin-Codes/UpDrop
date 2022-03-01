import React, { useRef } from "react";
import "./css/AddFolderInput.css";

export default function AddFolderInput({ params, rerender }) {
	const inputRef = useRef();

	function getFolderName() {
		const folderName = inputRef.current.value;
		inputRef.current.value = "";
		inputRef.current.blur();

		// If folderName is empty, folder name will be 'New Folder'
		return folderName.trim() ? folderName.trim() : "New Folder";
	}

	function createFolder(e) {
		e.preventDefault();
		const folderName = getFolderName();
		fetch("http://localhost:5000/mkdir", {
			method: "POST",
			body: JSON.stringify({ name: `${params["*"]}/${folderName}` }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			rerender();
		});
	}

	return (
		<form onSubmit={createFolder}>
			<input
				className="input-field"
				autoFocus
				placeholder="New Folder"
				ref={inputRef}
			></input>
		</form>
	);
}
