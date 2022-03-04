const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 * 1024 },
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Download Files
app.get("/download/*", (req, res) => {
	const filePath = req.params["0"];
	console.log(filePath);
	res.download(`${__dirname}/uploads/${filePath}`);
});

// Handles FileUpload
app.post("/upload", (req, res) => {
	const body = req.body;
	const file = req.files.file;
	file.mv(`${__dirname}/uploads/${body.path}/${file.name}`);
	res.end();
});

// Returns Files and Folders
app.post("/files", (req, res) => {
	const body = req.body;
	console.log("/files path : ", body);
	const files = [];
	const defaultPath = `${__dirname}/uploads${body.directory}`;

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

// Creates Folder
app.post("/mkdir", (req, res) => {
	const body = req.body;
	const folder = `${__dirname}/uploads/${body.name}`;
	console.log(folder);
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}
	res.end();
});

// Hosting Frontend
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(5000, () => {
	console.log("Server Running on port 5000 🚀🚀🚀");
});
