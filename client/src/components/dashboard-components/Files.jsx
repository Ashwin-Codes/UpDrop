import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// BTN Icons
import { BsFolderPlus as AddFolderIcon } from "react-icons/bs";
import { BsPlusCircle as AddFileIcon } from "react-icons/bs";

// CSS and icons
import "./css/Files.css";
import { setIcon } from "./FileTypeIcons.jsx";

// Components
import SingleFile from "./SingleFile";
import AddFolderInput from "./AddFolderInput";
import UploadModal from "../UploadModal";

export default function Files({ searchInputText }) {
	const navigate = useNavigate();
	const params = useParams();

	// States
	const [files, setFiles] = useState([]);
	const [filteredFiles, setfilteredFiles] = useState([]);
	const [addingFolder, setAddingFolder] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	// Filter the files state when search input value changes
	useEffect(() => {
		const newFiles = files.filter((file) => {
			return file.name.toLowerCase().includes(searchInputText.toLowerCase());
		});
		setfilteredFiles(newFiles);
	}, [files, searchInputText]);

	// onClick Function for folders
	function changeUrl(dir) {
		const newUrl = `/${params["*"]}`;
		navigate(`/dashboard${newUrl}/${dir}`);
	}

	function downloadFile(fileName) {
		const url = "http://localhost:5000/download";
		let file = `${params["*"]}/${fileName}`;
		window.open(`${url}/${file}`);
	}

	// Rerenders by changing files state. Passed to child components
	async function rerender() {
		console.log("Rerender Function ran");
		const url = { directory: `${params["*"]}` };
		const res = await fetch("http://localhost:5000/files", {
			method: "POST",
			body: JSON.stringify(url),
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
			const url = { directory: `${params["*"]}` };
			const response = await fetch("http://localhost:5000/files", {
				method: "POST",
				body: JSON.stringify(url),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setFiles(data);
		}
		getFiles();
	}, [params]);

	return (
		<>
			{openModal && <UploadModal setOpenModal={setOpenModal} rerender={rerender} />}
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
								"Add Folder"
							) : (
								<AddFolderInput params={params} rerender={rerender} />
							)}
						</div>
						<button
							className="btn add-file-btn"
							onClick={() => {
								setOpenModal(!openModal);
							}}
						>
							<AddFileIcon className="btn-icon" />
							Add File
						</button>
					</div>
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
