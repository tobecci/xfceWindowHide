import { execFileSync } from "child_process"
import { enablePresentationMode } from "../src/utils/xfce.js";
// import { sendNotification } from "../src/utils/alerts.js";
import { createLockFile, removeLockFile } from "./lockFiles.js";

const timeIntervalInMilliseconds = 2000;

function checkIfPacmanRunning() {
	try {
		let command = `ls /var/lib/pacman/db.lck`

		const result = execFileSync(command, { shell: '/bin/sh', encoding: 'utf8' }).trim()
		//if line above does not throw error then pacman is running
		enablePresentationMode('pacman is running')
		createLockFile('pacman')
	} catch (error) {
		removeLockFile('pacman')
		return false;
	}
}

setInterval(checkIfPacmanRunning, timeIntervalInMilliseconds);
