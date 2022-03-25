import React from "react";

// css and icons
import "./SingleFile.css";
import { MdOutlineDeleteSweep } from "react-icons/md";

export default function SingleFile({ name, isFolder, filesize, icon, onClick, deleteFile }) {
	const Icon = icon;
	let trimmedName = `${name.slice(0, 25).trim()}${name.length > 25 ? "..." : ""}`;
	let nameSplit = name.split(".");
	let ext = nameSplit[nameSplit.length - 1];

	if (isFolder === false) {
		trimmedName = name.length > 25 ? `${trimmedName} .${ext}` : trimmedName;
	}
	let fileSize = filesize.toFixed(1) > 0.0 ? `${filesize.toFixed(1)} MB` : "< 0 MB";

	return (
		<div className="file" onClick={onClick.bind(this, name)}>
			<div className="filecontainer">
				<div className="fileicon">
					<Icon className="icon" />
				</div>
				<p className="filename">{trimmedName}</p>
			</div>

			<div
				className="delete-btn"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<MdOutlineDeleteSweep
					className="delete-btn-icon"
					onClick={deleteFile.bind(this, { name, isFolder })}
				/>
			</div>

			<div className="filestats">
				<p className="filestat">{isFolder ? "" : fileSize}</p>
			</div>
		</div>
	);
}
