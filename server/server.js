const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

const crudRoutes = require("./routes/file-folder-crud");
const fetchRoutes = require("./routes/file-folder-fetch");
const confiruarionRoutes = require("./routes/configuration");

// Handles File Uploads
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 * 1024 },
		useTempFiles: true,
		tempFileDir: "./tmp",
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
app.use("/configuration", confiruarionRoutes);

// Hosting Frontend
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Get Port from configuration
const configuration = require("../client/src/configuration.json");
const port = configuration.port;

app.listen(port, () => {
	console.log(`Server Running on port ${port} 🚀🚀🚀`);
});
