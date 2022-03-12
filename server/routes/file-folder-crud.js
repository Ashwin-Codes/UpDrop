const express = require("express");
const router = express.Router();

const fs = require("fs");

// Delete Files
router.post("/rm", (req, res) => {
	const body = req.body;
	const path = `${__dirname}/../uploads${body.path}`;
	console.log("File Deleted : ", path);
	if (body.isFolder) {
		fs.rmSync(path, { recursive: true, force: true });
	} else {
		fs.unlinkSync(path);
	}

	res.end();
});

// Upload Files
router.post("/upload", (req, res) => {
	const body = req.body;
	const file = req.files.file;
	file.mv(`${__dirname}/../uploads/${body.path}/${file.name}`);
	console.log("File Uploaded : ", file.name);
	res.end();
});

// Creates Folder
router.post("/mkdir", (req, res) => {
	const body = req.body;
	const folder = `${__dirname}/../uploads/${body.name}`;
	console.log(folder);
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}
	res.end();
});

module.exports = router;
