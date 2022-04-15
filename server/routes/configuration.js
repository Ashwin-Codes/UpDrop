const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// Returns current port
router.get("/current-port", (req, res, next) => {
	const configuration = require("../../client/src/configuration.json");
	res.send({ "current-port": `${configuration.port}` });
});

// Changes current port in configuration file
router.post("/change-port", (req, res, next) => {
	const newPort = parseInt(req.body.newPort);

	const configuration = require("../../client/src/configuration.json");
	const newConfig = { ...configuration, port: newPort };

	fs.writeFileSync(
		path.join(__dirname, "..", "..", "client", "src", "configuration.json"),
		JSON.stringify(newConfig)
	);

	process.on("exit", (exitCode) => {
		if (exitCode === 1) {
			spawn(process.argv.shift(), process.argv);
		}
	});
	process.exit(1);
});

// Shutdown server
router.post("/shutdown", (req, res, next) => {
	const body = req.body;
	if (body.shutdown === true) {
		process.exit(0);
	}
});

module.exports = router;
