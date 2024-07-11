import { execFileSync } from "child_process"
import { sendNotification } from "../src/utils/alerts.js"
import { enablePresentationMode } from "../src/utils/xfce.js";
import { createLockFile, removeLockFile } from "./lockFiles.js";

const timeIntervalInMilliseconds = 2000;

function checkIfMediaPlaying() {
	try {
		let command = `/usr/bin/pactl list sink-inputs`

		let mediaIsPlaying = execFileSync(command, { shell: '/bin/sh', encoding: "utf-8" }).trim()

		if (mediaIsPlaying) {
			enablePresentationMode('media is playing')
			createLockFile('media')
		} 
		else {
			removeLockFile('media')
		}

	} catch (error) {
		sendNotification('error occurred in media playingChecker')
	}
}

setInterval(checkIfMediaPlaying, timeIntervalInMilliseconds);

