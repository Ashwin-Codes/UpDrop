import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// Css and icons
import "./Uploader.css";
import { ImUpload as BrowseFilesIcon } from "react-icons/im";
import { ImCross as CrossIcon } from "react-icons/im";

// Components
import FileUploadDetails from "./FileUploadDetails.jsx";

// Configuration
import Configuration from "../../configuration.json";

export default function Index(rerender) {
	const params = useParams();
	const inputRef = useRef();

	// States
	const [openModal, setOpenModal] = useState(false);
	const [file, setFile] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [fileUploadProgress, setFileUploadProgress] = useState({});
	const [port, setPort] = useState(Configuration.port);
	const [abortFunction, setAbortFunction] = useState([]);

	// Get Server Port
	useEffect(() => {
		async function getCurrentPort() {
			let url = "/configuration/current-port";
			if (process.env.NODE_ENV === "development") {
				url = `http://localhost:${Configuration.port}/configuration/current-port/`;
			}
			const response = await fetch(url);
			const data = await response.json();
			return data["current-port"];
		}
		getCurrentPort().then((res) => {
			setPort(parseInt(res));
		});
	});

	// Resets all states
	useEffect(() => {
		setFile([]);
		setFileUploadProgress({});
	}, [openModal]);

	// Creates progress object for every file to read from later
	useEffect(() => {
		file.forEach((f) => {
			setFileUploadProgress((prevState) => {
				return { ...prevState, [f.name]: { progress: 0 } };
			});
		});
	}, [file]);

	// Returns to toggle from parent
	function toggleModal() {
		setOpenModal(!openModal);
	}

	// Gets all files picked for upload
	function getFiles(e) {
		setFile([]);
		setFileUploadProgress({});

		const fileList = [];
		Object.keys(inputRef.current.files).forEach((key) => {
			fileList.push(inputRef.current.files[key]);
		});
		setFile(fileList);
	}

	// Upload function. Used XML request for progress property.
	async function uploadRequest(file) {
		let data = new FormData();
		data.append("file", file);
		data.append("path", params["*"]);

		var http = new XMLHttpRequest();
		var url = "/upload";

		// A fix for developers so the urls could automatically change to avoid CORS.
		if (process.env.NODE_ENV === "development") {
			url = `http://localhost:${port}/upload`;
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

		// Upload Complete listener
		http.onreadystatechange = function () {
			if (http.readyState === 4 && http.status === 200) {
				// Rerender for uploaded file to appear
				rerender();
			}
		};

		// Abort Function
		abortFunction.push({ filename: file.name, abortFunc: http.abort.bind(http) });

		http.send(data);
	}

	// Starts Upload
	function handleSubmit(e) {
		e.preventDefault();
		setIsUploading(true);
		file.forEach((file) => {
			uploadRequest(file);
		});
	}

	// Uploader Components
	function Uploader() {
		if (!openModal) {
			return <></>;
		}
		return (
			<div className="backscreen">
				<div
					className="modal"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<CrossIcon
						className="file-upload-form-cross"
						onClick={() => {
							abortFunction.forEach((file) => {
								file.abortFunc();
							});
							setIsUploading(false);
							setOpenModal(false);
						}}
					/>

					<form className="file-upload-form">
						<label htmlFor="file" className="file-input-label">
							<BrowseFilesIcon className="file-input-label-icon" />
							Browse Files
						</label>

						<input
							className="file-input"
							type="file"
							id="file"
							ref={inputRef}
							onChange={() => {
								getFiles();
								setIsUploading(false);
							}}
							multiple
						/>
					</form>

					{file.length > 0 && (
						<button
							className="file-input-submit-btn"
							onClick={handleSubmit}
							disabled={isUploading}
						>
							Upload
						</button>
					)}

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

	return [Uploader, toggleModal];
}
