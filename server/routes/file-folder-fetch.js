const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

// Download Files
router.get("/download/*", (req, res) => {
	const filePath = req.params["0"];

	// Directory traversal vulnerability fix
	if (filePath.indexOf("..") !== -1) {
		res.json({ err: true, errMsg: "File Not Found." });
	}

	try {
		res.download(`${__dirname}/../uploads/${filePath}`);
	} catch (err) {
		console.error(err);
		res.json({ err: true, errMsg: "File Not Found." });
	}
});

// Fetch Files and Folder
router.post("/files", (req, res) => {
	try {
		const body = req.body;

		// Directory traversal vulnerability fix
		if (body.directory.indexOf("..") !== -1) {
			body.directory = "";
		}

		const files = [];
		const defaultPath = `${__dirname}/../uploads/${body.directory}`;
		// Check if folder exists
		if (!fs.existsSync(defaultPath)) {
			res.json({ err: true, errMsg: "Folder Does Not exists !", errCode: 404 });
			return;
		}

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
	} catch (err) {
		console.error(err);
		res.json({ err: true, errMsg: "Server Error. Please Check server config." });
	}
});

module.exports = router;
