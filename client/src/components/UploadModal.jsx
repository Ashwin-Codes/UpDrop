import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import build from ".././build-type.json";

// Css and icons
import "./css/UploadModal.css";
import { ImUpload } from "react-icons/im";

// Components
import FileUploadDetails from "./dashboard-components/FileUploadDetails";

export default function UploadModal({ setOpenModal, rerender }) {
	const params = useParams();
	const [file, setFile] = useState([]);
	const [fileUploadProgress, setFileUploadProgress] = useState({});
	const inputRef = useRef();

	function getFiles(e) {
		const fileList = [];
		Object.keys(inputRef.current.files).forEach((key) => {
			fileList.push(inputRef.current.files[key]);
		});
		setFile(fileList);
	}

	useEffect(() => {
		file.forEach((f) => {
			setFileUploadProgress((prevState) => {
				return { ...prevState, [f.name]: { progress: 0 } };
			});
		});
	}, [file]);

	async function uploadRequest(file) {
		let data = new FormData();
		data.append("file", file);
		data.append("path", params["*"]);

		var http = new XMLHttpRequest();
		var url = "/upload";

		// A fix for developers so the urls could automatically change to avoid CORS.
		if (build.TYPE === "DEVELOPMENT") {
			url = "http://localhost:5000/upload";
		}

		http.open("POST", url, true);
		http.upload.addEventListener("progress", (event) => {
			setFileUploadProgress((prevState) => {
				return {
					...prevState,
					[file.name]: { progress: Math.floor((event.loaded / event.total) * 100) },
				};
			});
		});

		http.onreadystatechange = function () {
			if (http.readyState === 4 && http.status === 200) {
				rerender();
			}
		};
		http.send(data);
	}

	function handleSubmit(e) {
		e.preventDefault();
		file.forEach((file) => {
			uploadRequest(file);
		});
	}

	return (
		<div
			className="backscreen"
			onClick={() => {
				setOpenModal(false);
			}}
		>
			<div
				className="modal"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<form className="file-upload-form">
					<label htmlFor="file" className="file-input-label">
						<ImUpload className="file-input-label-icon" /> Browse Files
					</label>
					<input
						className="file-input"
						type="file"
						id="file"
						ref={inputRef}
						onChange={getFiles}
						multiple
					/>
				</form>
				<button className="file-input-submit-btn" onClick={handleSubmit}>
					Upload
				</button>
				<div className="progress-bars-container">
					{file.map((ele) => {
						return (
							<FileUploadDetails
								filename={ele.name}
								percentage={
									Object.keys(fileUploadProgress).length === file.length &&
									fileUploadProgress[ele.name].progress
								}
								key={ele.name}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
