import { execFileSync } from "child_process";
import { logError } from "../core/errorHandler.js";

export function runCommand(command, disableOutput = false) {
	try {
		if (disableOutput) {
			// const child = execFile(command, { shell: '/bin/sh' }).on('close', function(){
			// 	child.kill('SIGKILL')
			// })
			execFileSync(command, { shell: '/bin/sh' })
			return;
		} else {
			return execFileSync(command, { shell: '/bin/sh', encoding: 'utf-8' }).trim();
		}
	} catch (error) {
		logError(error)
		return false;
	}
}