import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

// BTN Icons
import { BsFolderPlus as AddFolderIcon } from "react-icons/bs";
import { BsPlusCircle as AddFileIcon } from "react-icons/bs";

// CSS and icons
import "./Files.css";
import { setIcon } from "./FileTypeIcons.jsx";

// Components and hooks
import SingleFile from "./SingleFile";
import AddFolderInput from "./AddFolderInput";
import useUploader from "../../hooks/useUploader";
import useNotification from "../../hooks/useNotification";

// Configuration
import Configuration from "../../configuration.json";

export default function Files({ searchInputText }) {
	const navigate = useNavigate();
	const [Notification, notify] = useNotification("notification");
	const params = useParams();

	const [Uploader, toggleModal] = useUploader(rerender);

	// States
	const [files, setFiles] = useState([]);
	const [filteredFiles, setfilteredFiles] = useState([]);
	const [addingFolder, setAddingFolder] = useState(false);

	// Development server requirement
	const [port, setPort] = useState(Configuration.port);

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

	// Filter the files state when search input value changes
	useEffect(() => {
		const newFiles = files.filter((file) => {
			return file.name.toLowerCase().includes(searchInputText.toLowerCase());
		});
		setfilteredFiles(newFiles);
	}, [files, searchInputText]);

	// onClick Function for folders
	function changeUrl(dir) {
		const oldUrl = `${params["*"]}`;
		let newUrl = `/dashboard/${oldUrl}/${dir}`;
		if (oldUrl === "") {
			newUrl = `/dashboard/${dir}`;
		}
		navigate(newUrl);
	}

	function downloadFile(fileName) {
		let url = "/download";
		// A fix for developers so the urls could automatically change to avoid CORS.
		if (process.env.NODE_ENV === "development") {
			url = `http://localhost:${port}/download`;
		}
		let file = `${params["*"]}/${fileName}`;
		window.open(`${url}/${file}`);
	}

	async function deleteFile(file) {
		let url = "/rm";
		// A fix for developers so the urls could automatically change to avoid CORS.
		if (process.env.NODE_ENV === "development") {
			url = `http://localhost:${port}/rm`;
		}
		const body = { path: `${params["*"]}/${file.name}`, isFolder: file.isFolder };
		let response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (data?.err) {
			notify(data.errMsg, 4, "error");
		} else {
			notify("File Deleted.");
			rerender();
		}
	}

	// Rerenders by changing files state. Passed to child components
	async function rerender() {
		let url = "/files";
		// A fix for developers so the urls could automatically change to avoid CORS.
		if (process.env.NODE_ENV === "development") {
			url = `http://localhost:${port}/files`;
		}
		const body = { directory: `${params["*"]}` };
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		setFiles(data);
	}

	// Updating state everytime URL parameters are changed.
	// changeUrl changes the URL parameters and this useEffect listens for that change and update the state
	useEffect(() => {
		async function getFiles() {
			let url = "/files";
			// A fix for developers so the urls could automatically change to avoid CORS.
			if (process.env.NODE_ENV === "development") {
				url = `http://localhost:${port}/files`;
			}
			const body = { directory: `${params["*"]}` };
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			}).catch((err) => {
				notify("Failed to Fetch Files.", 3, "error");
			});
			const data = await response.json();
			if (data?.err) {
				notify(data.errMsg, 5, "error");
				if (data?.errCode === 404) {
					navigate("/dashboard");
				}
			} else {
				setFiles(data);
			}
		}
		getFiles();
	}, [params, notify, port, navigate]);

	return (
		<>
			<Uploader />
			<Notification />
			<div className="files">
				<div className="tools-and-title-container">
					<div className="title-container">
						<h1 className="title">Files</h1>
						<div className="underline"></div>
					</div>
					<div className="btns-container">
						<div
							className={
								addingFolder
									? "btn add-folder-btn adding-folder"
									: "btn add-folder-btn"
							}
							onClick={() => {
								setAddingFolder(true);
							}}
							onBlur={() => {
								setAddingFolder(false);
							}}
						>
							<AddFolderIcon className="btn-icon" />
							{!addingFolder ? (
								<p className="btn-text">Add Folder</p>
							) : (
								<AddFolderInput
									params={params}
									rerender={rerender}
									notify={notify}
									port={port}
								/>
							)}
						</div>
						<button
							className="btn add-file-btn"
							onClick={() => {
								toggleModal();
							}}
						>
							<AddFileIcon className="btn-icon" />
							<p className="btn-text">Add File</p>
						</button>
					</div>
				</div>

				{/* Dublicate DIV for mobile screens*/}
				<div className="mobile-title-container">
					<h1 className="mobile-title">Files</h1>
					<div className="mobile-underline"></div>
				</div>

				<div className="files-container">
					{filteredFiles.map((ele) => {
						return (
							<SingleFile
								onClick={ele.isFolder ? changeUrl : downloadFile}
								key={ele.name}
								name={ele.name}
								isFolder={ele.isFolder}
								filesize={ele.filesize}
								icon={setIcon(ele)}
								deleteFile={deleteFile}
							/>
						);
					})}
				</div>
				{files.length === 0 && filteredFiles.length === 0 && (
					<p className="file-msg">No Files</p>
				)}
				{files.length !== 0 && filteredFiles.length === 0 && (
					<p className="file-msg">
						No files returned from the search '{searchInputText}'
					</p>
				)}
			</div>
		</>
	);
}
