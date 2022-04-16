import React from "react";

// Css and icons
import "./FileUploadDetails.css";
import { BsFileEarmarkTextFill as UploadFileIcon } from "react-icons/bs";
import { AiOutlineCheck as Checkmark } from "react-icons/ai";

export default function FileUploadDetails({ filename, percentage }) {
	let trimmedFilename = filename.substr(0, 10).trim();
	let fileParts = filename.split(".");
	let fileExt = fileParts[fileParts.length - 1];

	if (filename.length > 15) {
		trimmedFilename = `${trimmedFilename}.. .${fileExt}`;
	}

	return (
		<div className="file-container">
			<UploadFileIcon className="upload-file-icon" />
			<div className="upload-details-container">
				<div className="details">
					<p className="upload-filename">{trimmedFilename}</p>
					{percentage > 0 && percentage < 99 ? (
						<p className="upload-percentage">{`${percentage}%`}</p>
					) : (
						""
					)}
					{percentage === 100 ? <Checkmark className="upload-checkmark" /> : ""}
				</div>
				<div className="progress-bar">
					<div
						className="progress-bar-filler"
						style={{
							width: `${percentage}%`,
						}}
					></div>
				</div>
			</div>
		</div>
	);
}
