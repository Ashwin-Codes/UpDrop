import React from "react";

// Css and icons
import "./css/FileUploadDetails.css";
import { BsFileEarmarkTextFill } from "react-icons/bs";

export default function FileUploadDetails({ filename, percentage }) {
	return (
		<div className="file-container">
			<BsFileEarmarkTextFill className="upload-file-icon" />
			<div className="upload-details-container">
				<div className="details">
					<p className="upload-filename">{filename}</p>
					{percentage > 0 ? <p className="upload-percentage">{`${percentage}%`}</p> : ""}
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
