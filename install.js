#! /usr/bin/env node

const { exec, execFile } = require("child_process");
const { createSpinner } = require("nanospinner");

(async () => {
	// Clear Console
	console.clear();

	// Check if GIT is installed
	const gitIsInstalled = await runCommand(checkGit);
	if (!gitIsInstalled) return;

	await runCommand(getRepo);
	await runCommand(installDependecies);
	await runCommand(buildUpdrop);

	console.info("\nRun `npm start` in ./UpDrop Directory to start server\n");
})();

async function checkGit(resolve) {
	execFile("git", ["--version"], (error) => {
		if (error) {
			console.info("GIT not found");
			console.info("Please install GIT to proceed");
			console.info("https://git-scm.com/downloads");
			resolve(false);
			return;
		}
		resolve(true);
	});
}

async function getRepo(resolve) {
	const spinner = createSpinner("Downloading Files").start();

	exec("git clone https://github.com/ashwin-codes/updrop.git", (err) => {
		spinner.success({ text: "Files Downloaded" });
		resolve();
	});
}

async function installDependecies(resolve) {
	const spinner = createSpinner("Installing Dependencies").start();

	exec("cd ./updrop && npm install ", (err) => {
		spinner.success({ text: "Dependencies Installed" });
		resolve();
	});
}

async function buildUpdrop(resolve) {
	const spinner = createSpinner("Building UpDrop").start();

	exec("cd ./updrop && npm run build ", (err) => {
		spinner.success({ text: "Build Complete" });
		resolve();
	});
}

// Promisified Function
function runCommand(cb) {
	return new Promise((resolve, reject) => {
		try {
			cb(resolve);
		} catch (err) {
			reject();
		}
	});
}
