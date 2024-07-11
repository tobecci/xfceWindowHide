import { execFileSync } from "child_process"
import { enablePresentationMode, disablePresentationMode } from "../src/utils/xfce.js";
// import { sendNotification } from "../src/utils/alerts.js";
import { lockFileAbsolutePaths, noKeepAliveReasonExists } from "./lockFiles.js";

const timeIntervalInMilliseconds = 5000;

function ensureManualPresentationActive() {
	try {
		let command = `ls ${lockFileAbsolutePaths.manualPresentationActive}`

		const result = execFileSync(command, { shell: '/bin/sh', encoding: 'utf8' }).trim()
		//if line above does not throw error then manual is active
		enablePresentationMode('manual presentation mode is ON')
	} catch (error) {
		//command did not execute, hence manual is off
		if (noKeepAliveReasonExists()) {
			disablePresentationMode('manual presentation mode is OFF')
		}
		return false;
	}
}

setInterval(ensureManualPresentationActive, timeIntervalInMilliseconds);
