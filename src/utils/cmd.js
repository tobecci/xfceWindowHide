import { execFile, execFileSync } from "child_process";
import { logError } from "../core/errorHandler.js";

export function runCommand(command, disableOutput = false) {
	try {
		if (disableOutput) {
			execFile(command, { shell: '/bin/sh' })
			return;
		} else {
			return execFileSync(command, { shell: '/bin/sh', encoding: 'utf-8' }).trim();
		}
	} catch (error) {
		logError(error)
		return false;
	}
}