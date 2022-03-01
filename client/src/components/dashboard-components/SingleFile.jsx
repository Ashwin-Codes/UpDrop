import React from "react";
import "./css/SingleFile.css";

export default function SingleFile({ name, isFolder, filesize, icon, onClick }) {
	const Icon = icon;
	let trimmedName = `${name.slice(0, 25).trim()}${name.length > 25 ? "..." : ""}`;
	let nameSplit = name.split(".");
	let ext = nameSplit[nameSplit.length - 1];
	if (isFolder === false) {
		trimmedName = name.length > 25 ? `${trimmedName} .${ext}` : trimmedName;
	}

	return (
		<div className="file" onClick={onClick.bind(this, name)}>
			<div className="filecontainer">
				<div className="fileicon">
					<Icon className="icon" />
				</div>
				<p className="filename">{trimmedName}</p>
			</div>
			<div className="filestats">
				<p className="filestat">{isFolder ? "" : `${filesize.toFixed(1)} MB`}</p>
			</div>
		</div>
	);
}
