export function runCommand(command, disableOutput = false) {
	try {
		if (disableOutput) {
			execFile(command, { shell: '/bin/sh' })
		} else {
			return execFileSync(command, { shell: '/bin/sh', encoding: 'utf-8' }).trim();
		}
	} catch (error) {
		logError(error)
		return false;
	}
}