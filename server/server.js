const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

const crudRoutes = require("./routes/file-folder-crud");
const fetchRoutes = require("./routes/file-folder-fetch");

// Handles File Uploads
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 * 1024 },
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Handles cors for development server
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handles Body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Routes
app.use(crudRoutes);
app.use(fetchRoutes);

// Hosting Frontend
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(5000, () => {
	console.log("Server Running on port 5000 🚀🚀🚀");
});
