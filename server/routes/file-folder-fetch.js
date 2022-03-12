const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

// Download Files
router.get("/download/*", (req, res) => {
	const filePath = req.params["0"];
	console.log(filePath);
	res.download(`${__dirname}/uploads/${filePath}`);
});

// Fetch Files and Folder
router.post("/files", (req, res) => {
	const body = req.body;
	console.log("/files path : ", body);
	const files = [];
	const defaultPath = `${__dirname}/../uploads${body.directory}`;
	const allFiles = fs.readdirSync(defaultPath, {
		withFileTypes: true,
	});
	let fileIndex = 0;
	allFiles.forEach((file) => {
		let stats = fs.statSync(`${defaultPath}/${file.name}`);
		let filesize = stats.size / (1024 * 1024);
		files[fileIndex] = {
			name: file.name,
			isFolder: file.isDirectory(),
			filesize: filesize,
			ext: path.extname(`${defaultPath}/${file.name}`),
		};
		fileIndex++;
	});

	res.json(files);
});

module.exports = router;
