const express = require("express");
const router = express.Router();

const fs = require("fs");

// Configuration
const configuration = require("../../client/src/configuration.json");

// Delete Files
router.post("/rm", (req, res) => {
	const body = req.body;
	console.log(body);
	const path = `${__dirname}/../uploads/${body.path}`;

	console.log(path);
	// Check if file exists
	if (!fs.existsSync(path)) {
		res.json({ err: true, errMsg: "File you want to delete does not exists." });
		return;
	}

	console.log("File Deleted : ", path);
	if (body.isFolder) {
		fs.rmSync(path, { recursive: true, force: true });
	} else {
		fs.unlinkSync(path);
	}
	res.json({});
	res.end();
});

// Upload Files
router.post("/upload", (req, res) => {
	const body = req.body;
	const file = req.files.file;

	const limit = configuration["file-size-cap"];
	if (limit !== "none" && file.size / 1024 / 1024 > limit) {
		res.json({ err: true, errMsg: `File Size Limit Exceeded. Allowed : ${limit}MB` });
		return;
	}

	try {
		file.mv(`${__dirname}/../uploads/${body.path}/${file.name}`);
	} catch (err) {
		res.json({ err: true, errMsg: "Upload Failed." });
		return;
	}

	console.log("File Uploaded : ", file.name);
	res.end();
});

// Creates Folder
router.post("/mkdir", (req, res) => {
	const body = req.body;
	const folder = `${__dirname}/../uploads/${body.name}`;
	console.log(folder);
	if (fs.existsSync(folder)) {
		res.json({ err: true, errMsg: "Folder allready exists" });
		return;
	} else {
		fs.mkdirSync(folder);
	}
	res.json({ err: false, msg: "Folder Added." });
	res.end();
});

module.exports = router;
